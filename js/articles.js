// Articles listing — long-form ecosystem essays from Sanity (eyebrow == "Article")

document.addEventListener('DOMContentLoaded', () => {
    loadArticles();
});

async function loadArticles() {
    const list = document.getElementById('articles-list');
    if (!list) return;

    try {
        const articles = await sanityFetch(
            `*[_type == "article" && eyebrow == "Article"] | order(publishedAt desc) {
                title,
                excerpt,
                publishedAt,
                "slug": slug.current,
                "cover": cover.asset->url,
                "author": author->{ name, xHandle }
            }`
        );

        if (!articles || !articles.length) {
            list.innerHTML = '<p class="articles-empty">No articles yet. Check back soon.</p>';
            return;
        }

        list.innerHTML = articles.map(renderCard).join('');
    } catch (err) {
        console.error('Failed to load articles:', err);
        list.innerHTML = '<p class="articles-empty">Failed to load articles. Please try again.</p>';
    }
}

function renderCard(article) {
    const href = article.slug
        ? `article.html?slug=${encodeURIComponent(article.slug)}`
        : '#';
    const date = formatArticleDate(article.publishedAt);
    const author = article.author?.name || '';
    const cover = article.cover
        ? `<div class="articles-card-cover"><img src="${escapeHtml(article.cover)}" alt="" loading="lazy"></div>`
        : '';
    const excerpt = article.excerpt
        ? `<p class="articles-card-excerpt">${escapeHtml(article.excerpt)}</p>`
        : '';

    return `<a class="articles-card" href="${href}">
        ${cover}
        <div class="articles-card-body">
            <div class="articles-card-meta">
                ${author ? `<span class="articles-card-author">${escapeHtml(author)}</span>` : ''}
                ${date ? `<time datetime="${escapeHtml(article.publishedAt || '')}">${escapeHtml(date)}</time>` : ''}
            </div>
            <h3 class="articles-card-title">${escapeHtml(article.title || '')}</h3>
            ${excerpt}
            <span class="articles-card-cta">Read →</span>
        </div>
    </a>`;
}

function formatArticleDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
}
