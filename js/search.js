document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('search-input');
    const resultsEl = document.getElementById('search-results');
    let debounceTimer = null;

    input.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        const query = input.value.trim();
        if (query.length < 2) {
            resultsEl.innerHTML = '';
            return;
        }
        debounceTimer = setTimeout(() => runSearch(query), 300);
    });

    async function runSearch(query) {
        resultsEl.innerHTML =
            '<div class="search-loading">' +
                '<span class="search-loading-text">Searching</span>' +
                '<span class="search-loading-dots"><span></span><span></span><span></span></span>' +
            '</div>';
        try {
            const [articles, podcasts] = await Promise.all([
                searchArticles(query),
                searchPodcasts(query),
            ]);
            const merged = [...articles, ...podcasts].sort(
                (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
            );
            render(merged, query);
        } catch (err) {
            console.error('Search failed:', err);
            resultsEl.innerHTML = `<p class="search-status">Search failed: ${escapeHtml(err.message)}</p>`;
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

    function render(results, query) {
        if (results.length === 0) {
            resultsEl.innerHTML = `<p class="search-status">No results for “${escapeHtml(query)}”</p>`;
            return;
        }
        resultsEl.innerHTML =
            `<p class="search-count">${results.length} result${results.length === 1 ? '' : 's'}</p>` +
            results.map((r, i) => renderCard(r, i, query)).join('');
    }

    function renderCard(item, index, query) {
        const isArticle = item._type === 'article';
        const badge = isArticle
            ? (item.eyebrow === 'The MineShaft Weekly' ? 'Weekly' : item.eyebrow === 'Deep Dive' ? 'Deep Dive' : 'Article')
            : 'Podcast';
        const badgeClass = isArticle ? 'search-badge--article' : 'search-badge--podcast';
        const internalHref = isArticle
            ? (item.slug ? `article.html?slug=${encodeURIComponent(item.slug)}` : null)
            : (item.slug ? `podcast.html?slug=${encodeURIComponent(item.slug)}` : null);
        const href = internalHref || item.url || '#';
        const target = internalHref ? '' : ' target="_blank" rel="noopener noreferrer"';
        const date = formatDate(item.publishedAt);
        const authorBit = item.authorName ? `${item.authorName} · ` : '';
        const snippet = extractSnippet(item, query);
        const delay = Math.min(index * 60, 400);

        return `<a class="search-card" href="${href}"${target} style="animation-delay:${delay}ms">
            <span class="search-badge ${badgeClass}">${badge}</span>
            <span class="search-card-body">
                <span class="search-card-title">${escapeHtml(item.title)}</span>
                <span class="search-card-meta">${escapeHtml(authorBit)}${date}</span>
                ${snippet ? `<span class="search-card-snippet">${escapeHtml(snippet)}</span>` : ''}
            </span>
        </a>`;
    }

    function formatDate(iso) {
        if (!iso) return '';
        const d = new Date(iso);
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    function truncate(str, max) {
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
            return sentence.length <= 200 ? sentence : windowAround(sentence, query);
        }
        return truncate(item.fallbackSnippet || '', 160);
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
        if (idx === -1) return truncate(text, 200);
        const start = Math.max(0, idx - 60);
        const end = Math.min(text.length, idx + query.length + 120);
        let out = text.slice(start, end);
        if (start > 0) out = '…' + out.replace(/^\S*\s+/, '').trim();
        if (end < text.length) out = out.replace(/\s+\S*$/, '') + '…';
        return out.trim();
    }
});
