document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('search-input');
    const resultsEl = document.getElementById('search-results');
    const detailEl = document.getElementById('search-detail');
    const splitEl = document.getElementById('search-split');
    const backBtn = document.getElementById('search-detail-back');

    let debounceTimer = null;
    let results = [];
    let selectedIndex = -1;
    let activeQuery = '';
    let detailRequestId = 0;
    const detailCache = new Map();

    function isMobileSplit() {
        return window.matchMedia('(max-width: 899px)').matches;
    }

    function resultKey(item) {
        return `${item._type}:${item.slug || item.url || item.title}`;
    }

    function getParamsFromUrl() {
        const params = new URLSearchParams(location.search);
        return {
            q: params.get('q')?.trim() || '',
            type: params.get('type') || '',
            slug: params.get('slug') || '',
        };
    }

    function syncUrl(query, item) {
        const url = new URL(location.href);
        if (query.length >= 2) {
            url.searchParams.set('q', query);
        } else {
            url.searchParams.delete('q');
        }
        if (item && item.slug) {
            url.searchParams.set('type', item._type);
            url.searchParams.set('slug', item.slug);
        } else {
            url.searchParams.delete('type');
            url.searchParams.delete('slug');
        }
        const next = url.pathname + url.search + url.hash;
        const current = location.pathname + location.search + location.hash;
        if (next !== current) {
            history.replaceState(null, '', next);
        }
    }

    function setDetailMode(open) {
        splitEl.classList.toggle('is-detail-open', open);
        backBtn.hidden = !open || !isMobileSplit();
    }

    function showDetailEmpty(message) {
        detailEl.innerHTML = `<p class="search-detail-empty">${escapeHtml(message)}</p>`;
        setDetailMode(false);
    }

    function showDetailLoading() {
        detailEl.innerHTML =
            '<div class="search-loading search-detail-loading">' +
                '<span class="search-loading-text">Loading</span>' +
                '<span class="search-loading-dots"><span></span><span></span><span></span></span>' +
            '</div>';
    }

    function badgeFor(item) {
        if (item._type === 'podcast') return { label: 'Podcast', className: 'search-badge--podcast' };
        if (item.eyebrow === 'The MineShaft Weekly') return { label: 'Weekly', className: 'search-badge--article' };
        if (item.eyebrow === 'Deep Dive') return { label: 'Deep Dive', className: 'search-badge--article' };
        return { label: 'Article', className: 'search-badge--article' };
    }

    function formatDate(iso) {
        if (!iso) return '';
        const d = new Date(iso);
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    function truncate(str, max) {
        if (!str) return '';
        if (str.length <= max) return str;
        return str.slice(0, max).replace(/\s+\S*$/, '') + '…';
    }

    function extractSnippet(item, query) {
        const haystack = [item.title, item.excerpt, item.subtitle || item.description, item.authorName, item.bodyText]
            .filter(Boolean)
            .join('. ')
            .replace(/\s+/g, ' ')
            .trim();
        const sentence = findSentenceWithQuery(haystack, query);
        if (sentence) {
            return sentence.length <= 160 ? sentence : windowAround(sentence, query);
        }
        return truncate(item.fallbackSnippet || '', 120);
    }

    function findSentenceWithQuery(text, query) {
        const sentences = text.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g);
        if (!sentences) return null;
        const q = query.toLowerCase();
        for (const s of sentences) {
            if (s.toLowerCase().includes(q)) return s.trim();
        }
        return null;
    }

    function windowAround(text, query) {
        const idx = text.toLowerCase().indexOf(query.toLowerCase());
        if (idx === -1) return truncate(text, 160);
        const start = Math.max(0, idx - 40);
        const end = Math.min(text.length, idx + query.length + 100);
        let out = text.slice(start, end);
        if (start > 0) out = '…' + out.replace(/^\S*\s+/, '').trim();
        if (end < text.length) out = out.replace(/\s+\S*$/, '') + '…';
        return out.trim();
    }

    function fullPageHref(item) {
        if (item._type === 'article' && item.slug) {
            return `article.html?slug=${encodeURIComponent(item.slug)}`;
        }
        if (item._type === 'podcast' && item.slug) {
            return `podcast.html?slug=${encodeURIComponent(item.slug)}`;
        }
        return item.url || null;
    }

    input.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        const query = input.value.trim();
        syncUrl(query, null);
        if (query.length < 2) {
            results = [];
            selectedIndex = -1;
            activeQuery = '';
            resultsEl.innerHTML = '';
            showDetailEmpty('Select a result to read');
            return;
        }
        debounceTimer = setTimeout(() => runSearch(query), 300);
    });

    input.addEventListener('keydown', (e) => {
        if (!results.length) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectIndex(Math.min(selectedIndex + 1, results.length - 1), { openMobile: false });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectIndex(Math.max(selectedIndex - 1, 0), { openMobile: false });
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            const href = fullPageHref(results[selectedIndex]);
            if (href) {
                if (href.startsWith('http')) {
                    window.open(href, '_blank', 'noopener,noreferrer');
                } else {
                    location.href = href;
                }
            }
        }
    });

    resultsEl.addEventListener('keydown', (e) => {
        if (!results.length) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectIndex(Math.min(selectedIndex + 1, results.length - 1), { openMobile: false, focusRow: true });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectIndex(Math.max(selectedIndex - 1, 0), { openMobile: false, focusRow: true });
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            const href = fullPageHref(results[selectedIndex]);
            if (href) {
                if (href.startsWith('http')) {
                    window.open(href, '_blank', 'noopener,noreferrer');
                } else {
                    location.href = href;
                }
            }
        }
    });

    backBtn.addEventListener('click', () => {
        setDetailMode(false);
        const row = resultsEl.querySelector('.search-card.is-selected');
        if (row) row.focus();
    });

    window.addEventListener('resize', () => {
        if (!isMobileSplit()) {
            backBtn.hidden = true;
            splitEl.classList.remove('is-detail-open');
        } else if (selectedIndex >= 0 && detailEl.querySelector('.search-detail-body')) {
            backBtn.hidden = false;
        }
    });

    window.addEventListener('popstate', () => {
        const { q, type, slug } = getParamsFromUrl();
        input.value = q;
        clearTimeout(debounceTimer);
        if (q.length < 2) {
            results = [];
            selectedIndex = -1;
            resultsEl.innerHTML = '';
            showDetailEmpty('Select a result to read');
            return;
        }
        runSearch(q, { type, slug });
    });

    const initial = getParamsFromUrl();
    if (initial.q) {
        input.value = initial.q;
        if (initial.q.length >= 2) {
            runSearch(initial.q, { type: initial.type, slug: initial.slug });
        }
    }

    async function runSearch(query, prefer) {
        activeQuery = query;
        resultsEl.innerHTML =
            '<div class="search-loading">' +
                '<span class="search-loading-text">Searching</span>' +
                '<span class="search-loading-dots"><span></span><span></span><span></span></span>' +
            '</div>';
        showDetailEmpty('Select a result to read');
        selectedIndex = -1;

        try {
            const [articles, podcasts] = await Promise.all([
                searchArticles(query),
                searchPodcasts(query),
            ]);
            if (query !== activeQuery) return;

            results = [...articles, ...podcasts].sort(
                (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
            );
            renderResults(results, query);

            if (!results.length) {
                syncUrl(query, null);
                return;
            }

            let index = 0;
            if (prefer && prefer.slug && prefer.type) {
                const found = results.findIndex(
                    (r) => r._type === prefer.type && r.slug === prefer.slug
                );
                if (found >= 0) index = found;
            }
            selectIndex(index, { openMobile: Boolean(prefer && prefer.slug) });
        } catch (err) {
            console.error('Search failed:', err);
            results = [];
            resultsEl.innerHTML = `<p class="search-status">Search failed: ${escapeHtml(err.message)}</p>`;
            showDetailEmpty('Select a result to read');
        }
    }

    function searchArticles(q) {
        return sanityFetch(
            `*[_type == "article" && (
                title match $q ||
                subtitle match $q ||
                excerpt match $q ||
                sections[].heading match $q ||
                pt::text(intro) match $q ||
                pt::text(sections[].body) match $q ||
                author->name match $q ||
                author->xHandle match $q ||
                tags[]->title match $q
            )] | order(publishedAt desc) {
                _type, title, subtitle, excerpt, eyebrow, "slug": slug.current, publishedAt,
                "authorName": author->name,
                "fallbackSnippet": coalesce(excerpt, subtitle, sections[0].heading),
                "bodyText": coalesce(pt::text(intro), "") + " " + coalesce(pt::text(sections[].body), "")
            }`,
            { q: q + '*' }
        );
    }

    function searchPodcasts(q) {
        return sanityFetch(
            `*[_type == "podcast" && (
                title match $q ||
                description match $q ||
                sections[].heading match $q ||
                pt::text(sections[].body) match $q
            )] | order(publishedAt desc) {
                _type, title, description, episode, show, url, publishedAt,
                "slug": slug.current,
                "fallbackSnippet": description,
                "bodyText": coalesce(pt::text(sections[].body), "")
            }`,
            { q: q + '*' }
        );
    }

    function renderResults(items, query) {
        if (items.length === 0) {
            resultsEl.innerHTML = `<p class="search-status">No results for “${escapeHtml(query)}”</p>`;
            return;
        }
        resultsEl.innerHTML =
            `<p class="search-count" id="search-count">${items.length} result${items.length === 1 ? '' : 's'}</p>` +
            `<div class="search-result-list" role="listbox" aria-label="Search results">` +
            items.map((r, i) => renderCard(r, i, query)).join('') +
            `</div>`;

        resultsEl.querySelectorAll('.search-card').forEach((btn) => {
            btn.addEventListener('click', () => {
                const index = Number(btn.dataset.index);
                selectIndex(index, { openMobile: true, focusDetail: isMobileSplit() });
            });
        });
    }

    function renderCard(item, index, query) {
        const badge = badgeFor(item);
        const date = formatDate(item.publishedAt);
        const authorBit = item.authorName ? `${item.authorName} · ` : '';
        const snippet = extractSnippet(item, query);
        const delay = Math.min(index * 50, 350);

        return `<button type="button" class="search-card" role="option" id="search-result-${index}" data-index="${index}" aria-selected="false" style="animation-delay:${delay}ms">
            <span class="search-badge ${badge.className}">${badge.label}</span>
            <span class="search-card-body">
                <span class="search-card-title">${escapeHtml(item.title)}</span>
                <span class="search-card-meta">${escapeHtml(authorBit)}${date}</span>
                ${snippet ? `<span class="search-card-snippet">${escapeHtml(snippet)}</span>` : ''}
            </span>
        </button>`;
    }

    function selectIndex(index, opts = {}) {
        if (index < 0 || index >= results.length) return;
        selectedIndex = index;
        const item = results[index];

        resultsEl.querySelectorAll('.search-card').forEach((el, i) => {
            const selected = i === index;
            el.classList.toggle('is-selected', selected);
            el.setAttribute('aria-selected', selected ? 'true' : 'false');
        });

        const row = resultsEl.querySelector(`#search-result-${index}`);
        if (row) {
            row.scrollIntoView({ block: 'nearest' });
            if (opts.focusRow) row.focus();
        }

        syncUrl(activeQuery || input.value.trim(), item);
        loadDetail(item, opts);
    }

    async function loadDetail(item, opts = {}) {
        const requestId = ++detailRequestId;
        const key = resultKey(item);
        const openMobile = opts.openMobile !== false;

        if (detailCache.has(key)) {
            renderDetail(item, detailCache.get(key));
            if (openMobile && isMobileSplit()) setDetailMode(true);
            if (opts.focusDetail) detailEl.focus();
            return;
        }

        if (!item.slug) {
            renderExternalDetail(item);
            if (openMobile && isMobileSplit()) setDetailMode(true);
            return;
        }

        showDetailLoading();
        if (openMobile && isMobileSplit()) setDetailMode(true);

        try {
            const doc = item._type === 'article'
                ? await fetchArticleDetail(item.slug)
                : await fetchPodcastDetail(item.slug);
            if (requestId !== detailRequestId) return;
            if (!doc) {
                detailEl.innerHTML = `<p class="search-detail-empty">Content not found</p>`;
                return;
            }
            detailCache.set(key, doc);
            renderDetail(item, doc);
            if (opts.focusDetail) {
                detailEl.setAttribute('tabindex', '-1');
                detailEl.focus();
            }
        } catch (err) {
            if (requestId !== detailRequestId) return;
            console.error('Detail load failed:', err);
            detailEl.innerHTML = `<p class="search-detail-empty">Failed to load: ${escapeHtml(err.message)}</p>`;
        }
    }

    function fetchArticleDetail(slug) {
        return sanityFetch(
            `*[_type == "article" && slug.current == $slug][0] {
                title, eyebrow, subtitle, excerpt, publishedAt, xUrl,
                "author": author-> { name, handle, xHandle, xUrl },
                "tags": tags[]-> { title },
                intro,
                sections[] { heading, date, body }
            }`,
            { slug }
        );
    }

    function fetchPodcastDetail(slug) {
        return sanityFetch(
            `*[_type == "podcast" && slug.current == $slug][0] {
                title, episode, show, description, videoId, url, publishedAt,
                sections[] { heading, timestamp, body }
            }`,
            { slug }
        );
    }

    function renderExternalDetail(item) {
        const href = item.url || '#';
        detailEl.innerHTML = `
            <article class="search-detail-body">
                <header class="search-detail-header">
                    <span class="search-badge search-badge--podcast">Podcast</span>
                    <h2 class="search-detail-title">${escapeHtml(item.title)}</h2>
                    <p class="search-detail-meta">${formatDate(item.publishedAt)}</p>
                    <a class="search-detail-open" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">Open full page ↗</a>
                </header>
                ${item.description ? `<p class="search-detail-lead">${escapeHtml(item.description)}</p>` : ''}
            </article>
        `;
    }

    function renderDetail(listItem, doc) {
        if (listItem._type === 'article') {
            renderArticleDetail(doc, listItem.slug);
        } else {
            renderPodcastDetail(doc, listItem.slug);
        }
        detailEl.scrollTop = 0;
        const pane = document.getElementById('search-detail-pane');
        if (pane) pane.scrollTop = 0;
    }

    function renderArticleDetail(article, slug) {
        const badge = badgeFor({ _type: 'article', eyebrow: article.eyebrow });
        const openHref = slug ? `article.html?slug=${encodeURIComponent(slug)}` : '#';

        let authorHtml = '';
        if (article.author) {
            const xUrl = article.author.xUrl
                || (article.author.xHandle
                    ? `https://x.com/${article.author.xHandle.replace('@', '')}`
                    : '');
            const name = article.author.name || article.author.handle || 'Author';
            const nameBit = xUrl
                ? `<a href="${escapeHtml(xUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(name)}</a>`
                : escapeHtml(name);
            const dateLabel = formatDate(article.publishedAt);
            authorHtml = `<p class="search-detail-meta">by ${nameBit}${dateLabel ? ` · ${dateLabel}` : ''}</p>`;
        } else if (article.publishedAt) {
            authorHtml = `<p class="search-detail-meta">${formatDate(article.publishedAt)}</p>`;
        }

        let bodyHtml = '';
        if (article.intro) {
            bodyHtml += renderPortableText(article.intro)
                .replace(/<p>/g, '<p class="deep-dive-intro">');
        }
        if (article.sections && article.sections.length) {
            article.sections.forEach((section) => {
                if (section.date) {
                    bodyHtml += `
                        <section class="deep-dive-content search-detail-section">
                            <span class="timeline-date-badge">${escapeHtml(section.date)}</span>
                            <h2>${escapeHtml(section.heading)}</h2>
                            ${section.body ? renderPortableText(section.body) : ''}
                        </section>
                    `;
                } else {
                    bodyHtml += `
                        <section class="deep-dive-content search-detail-section">
                            <h2>${escapeHtml(section.heading)}</h2>
                            ${section.body ? renderPortableText(section.body) : ''}
                        </section>
                    `;
                }
            });
        }
        if (article.tags && article.tags.length) {
            bodyHtml += `<div class="article-tags"><span class="article-tags-label">Tags</span>` +
                article.tags.map((t) => `<span class="article-tag">${escapeHtml(t.title)}</span>`).join('') +
                `</div>`;
        }

        detailEl.innerHTML = `
            <article class="search-detail-body">
                <header class="search-detail-header">
                    <span class="search-badge ${badge.className}">${badge.label}</span>
                    ${article.eyebrow ? `<p class="search-detail-eyebrow">${escapeHtml(article.eyebrow)}</p>` : ''}
                    <h2 class="search-detail-title">${escapeHtml(article.title)}</h2>
                    ${article.subtitle ? `<p class="search-detail-subtitle">${escapeHtml(article.subtitle)}</p>` : ''}
                    ${authorHtml}
                    <a class="search-detail-open" href="${openHref}">Open full page ↗</a>
                </header>
                <div class="search-detail-content">${bodyHtml}</div>
            </article>
        `;
    }

    function renderPodcastDetail(podcast, slug) {
        const showLabel = podcast.show === 'minerside-chats' ? 'Minerside Chats' : 'Ore Insiders';
        const openHref = slug ? `podcast.html?slug=${encodeURIComponent(slug)}` : (podcast.url || '#');
        const openTarget = slug ? '' : ' target="_blank" rel="noopener noreferrer"';

        let embedHtml = '';
        if (podcast.videoId) {
            embedHtml = `
                <div class="podcast-embed search-detail-embed">
                    <div class="podcast-embed-frame">
                        <iframe
                            src="https://www.youtube.com/embed/${encodeURIComponent(podcast.videoId)}?rel=0"
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                            loading="lazy"></iframe>
                    </div>
                </div>
            `;
        } else if (podcast.url) {
            embedHtml = `<p><a class="podcast-watch-link" href="${escapeHtml(podcast.url)}" target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></p>`;
        }

        let sectionsHtml = '';
        if (podcast.sections && podcast.sections.length) {
            podcast.sections.forEach((section) => {
                const time = typeof section.timestamp === 'number'
                    ? `<span class="podcast-toc-time">${formatTimestamp(section.timestamp)}</span> `
                    : '';
                sectionsHtml += `
                    <section class="deep-dive-content podcast-section search-detail-section">
                        <h2>${time}${escapeHtml(section.heading)}</h2>
                        ${section.body ? renderPortableText(section.body) : ''}
                    </section>
                `;
            });
        }

        detailEl.innerHTML = `
            <article class="search-detail-body">
                <header class="search-detail-header">
                    <span class="search-badge search-badge--podcast">Podcast</span>
                    <p class="search-detail-eyebrow">${escapeHtml(showLabel)}${podcast.episode != null ? ` · Ep. ${podcast.episode}` : ''}</p>
                    <h2 class="search-detail-title">${escapeHtml(podcast.title)}</h2>
                    <p class="search-detail-meta">${formatDate(podcast.publishedAt)}</p>
                    <a class="search-detail-open" href="${openHref}"${openTarget}>Open full page ↗</a>
                </header>
                ${podcast.description ? `<p class="search-detail-lead">${escapeHtml(podcast.description)}</p>` : ''}
                ${embedHtml}
                <div class="search-detail-content">${sectionsHtml}</div>
            </article>
        `;
    }

    function formatTimestamp(total) {
        const t = Math.max(0, Math.trunc(total));
        const h = Math.floor(t / 3600);
        const m = Math.floor((t % 3600) / 60);
        const s = t % 60;
        const pad = (n) => n.toString().padStart(2, '0');
        return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
    }
});
