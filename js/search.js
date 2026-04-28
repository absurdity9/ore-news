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
        resultsEl.innerHTML = '<p class="search-status">Searching…</p>';
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
            resultsEl.innerHTML = '<p class="search-status">Search failed — please try again.</p>';
        }
    }

    function searchArticles(q) {
        return sanityFetch(
            `*[_type == "article" && (title match $q || subtitle match $q || sections[].heading match $q)] | order(publishedAt desc) {
                _type, title, subtitle, "slug": slug.current, publishedAt,
                "snippet": coalesce(subtitle, sections[0].heading)
            }`,
            { q: q + '*' }
        );
    }

    function searchPodcasts(q) {
        return sanityFetch(
            `*[_type == "podcast" && (title match $q || description match $q)] | order(publishedAt desc) {
                _type, title, description, episode, show, url, publishedAt,
                "snippet": description
            }`,
            { q: q + '*' }
        );
    }

    function render(results, query) {
        if (results.length === 0) {
            resultsEl.innerHTML = `<p class="search-status">No results for "${escapeHtml(query)}"</p>`;
            return;
        }
        resultsEl.innerHTML = `<p class="search-count">${results.length} result${results.length === 1 ? '' : 's'}</p>` +
            results.map(r => renderCard(r)).join('');
    }

    function renderCard(item) {
        const isArticle = item._type === 'article';
        const badge = isArticle ? 'Article' : 'Podcast';
        const badgeClass = isArticle ? 'search-badge--article' : 'search-badge--podcast';
        const href = isArticle
            ? `article.html?slug=${encodeURIComponent(item.slug)}`
            : item.url || '#';
        const target = isArticle ? '' : ' target="_blank" rel="noopener noreferrer"';
        const date = formatDate(item.publishedAt);
        const snippet = truncate(item.snippet || '', 120);

        return `<a class="search-card" href="${href}"${target}>
            <span class="search-badge ${badgeClass}">${badge}</span>
            <span class="search-card-body">
                <span class="search-card-title">${escapeHtml(item.title)}</span>
                <span class="search-card-meta">${date}</span>
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
});
