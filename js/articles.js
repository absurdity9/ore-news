// Articles page — ecosystem essays in the same grid as magazine archives

const ITEMS_PER_PAGE = 8;

document.addEventListener('DOMContentLoaded', () => {
    loadArticles();
});

async function loadArticles() {
    const grid = document.getElementById('articles-grid');
    if (!grid) return;

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
            grid.innerHTML = '<p class="articles-empty">No articles yet. Check back soon.</p>';
            return;
        }

        const startPage = getPageFromHash();
        renderPage(articles, startPage);

        window.addEventListener('hashchange', () => {
            renderPage(articles, getPageFromHash());
        });
    } catch (err) {
        console.error('Failed to load articles:', err);
        grid.innerHTML = '<p class="articles-empty">Failed to load articles. Please try again.</p>';
    }
}

function getPageFromHash() {
    const match = location.hash.match(/page=(\d+)/);
    return match ? Math.max(1, parseInt(match[1], 10)) : 1;
}

function renderPage(articles, page) {
    const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
    page = Math.min(page, totalPages) || 1;

    const start = (page - 1) * ITEMS_PER_PAGE;
    const pageItems = articles.slice(start, start + ITEMS_PER_PAGE);

    const grid = document.getElementById('articles-grid');
    grid.innerHTML = '';
    pageItems.forEach((article) => {
        grid.appendChild(createArticleCard(article));
    });

    renderPagination(page, totalPages);
}

function createArticleCard(article) {
    const href = article.slug
        ? `article.html?slug=${encodeURIComponent(article.slug)}`
        : '#';
    const date = formatArticleDate(article.publishedAt);
    const author = article.author?.name || '';
    const title = article.title || 'Untitled';
    const coverAlt = author ? `${title} — ${author}` : title;

    const link = document.createElement('a');
    link.href = href;
    link.className = 'archive-card-magazine';
    link.setAttribute('aria-label', title);

    const coverMarkup = article.cover
        ? `<img src="${escapeHtml(article.cover)}" alt="${escapeHtml(coverAlt)}" loading="lazy">`
        : `<div class="archive-card-cover-placeholder" aria-hidden="true">
                <span class="archive-card-placeholder-eyebrow">Article</span>
                ${author ? `<span class="archive-card-placeholder-author">${escapeHtml(author)}</span>` : ''}
           </div>`;

    const meta = [author, date].filter(Boolean).join(' · ');

    link.innerHTML = `
        <div class="archive-card-cover">
            ${coverMarkup}
        </div>
        <div class="archive-card-body">
            ${meta ? `<div class="archive-card-date">${escapeHtml(meta)}</div>` : ''}
            <div class="archive-card-headline">${escapeHtml(title)}</div>
        </div>
    `;

    return link;
}

function renderPagination(currentPage, totalPages) {
    const container = document.getElementById('articles-pagination');
    if (!container || totalPages <= 1) {
        if (container) container.innerHTML = '';
        return;
    }

    let html = '';

    html += `<a class="archive-page-btn${currentPage === 1 ? ' disabled' : ''}" href="#page=${currentPage - 1}" aria-label="Previous page"${currentPage === 1 ? ' aria-disabled="true"' : ''}>Prev</a>`;

    html += '<span class="archive-page-numbers">';
    for (let i = 1; i <= totalPages; i++) {
        html += `<a class="archive-page-btn${i === currentPage ? ' active' : ''}" href="#page=${i}" aria-label="Page ${i}">${i}</a>`;
    }
    html += '</span>';

    html += `<span class="archive-page-mobile">Page ${currentPage} of ${totalPages}</span>`;

    html += `<a class="archive-page-btn${currentPage === totalPages ? ' disabled' : ''}" href="#page=${currentPage + 1}" aria-label="Next page"${currentPage === totalPages ? ' aria-disabled="true"' : ''}>Next</a>`;

    container.innerHTML = html;
}

function formatArticleDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('en-GB', {day: 'numeric', month: 'short', year: 'numeric'});
}
