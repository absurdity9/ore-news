// Archives page — loads from Sanity CMS, renders paginated magazine/podcast grids

const ITEMS_PER_PAGE = 8;

document.addEventListener('DOMContentLoaded', () => {
    loadArchives();
});

async function loadArchives() {
    try {
        const grid = document.getElementById('archive-grid');
        if (!grid) return;

        const isMagazines = grid.classList.contains('archive-grid--magazines');

        const items = isMagazines
            ? await sanityFetch(`*[_type == "magazine"] | order(publishedAt desc) { week, url, "cover": cover.asset->url }`)
            : await sanityFetch(`*[_type == "podcast" && show == "ore-insiders"] | order(episode asc) { title, episode, color, videoId, url, "thumbnail": thumbnail.asset->url }`);

        const startPage = getPageFromHash();
        renderPage(items, startPage, isMagazines);

        window.addEventListener('hashchange', () => {
            renderPage(items, getPageFromHash(), isMagazines);
        });
    } catch (err) {
        console.error('Failed to load archives:', err);
        const grid = document.getElementById('archive-grid');
        if (grid) {
            grid.innerHTML = '<p style="text-align:center;font-family:var(--font-pixel);font-size:0.5rem;color:var(--gold);grid-column:1/-1;">Failed to load archives. Please try again.</p>';
        }
    }
}

function getPageFromHash() {
    const match = location.hash.match(/page=(\d+)/);
    return match ? Math.max(1, parseInt(match[1], 10)) : 1;
}

function renderPage(items, page, isMagazines) {
    const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
    page = Math.min(page, totalPages) || 1;

    const start = (page - 1) * ITEMS_PER_PAGE;
    const pageItems = items.slice(start, start + ITEMS_PER_PAGE);

    const grid = document.getElementById('archive-grid');
    grid.innerHTML = '';
    pageItems.forEach(item => {
        grid.appendChild(isMagazines ? createMagazineCard(item) : createPodcastCard(item));
    });

    renderPagination(page, totalPages);
}

function createMagazineCard(mag) {
    const link = document.createElement('a');
    link.href = mag.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'archive-card-magazine';
    link.setAttribute('aria-label', `Mineshaft Weekly — ${mag.week}`);

    link.innerHTML = `
        <div class="archive-card-cover">
            <img src="${mag.cover}" alt="Mineshaft Weekly — ${mag.week}" loading="lazy">
        </div>
        <div class="archive-card-body">
            <div class="archive-card-date">${mag.week}</div>
        </div>
    `;

    return link;
}

function createPodcastCard(cd) {
    const link = document.createElement('a');
    link.href = cd.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'archive-card-podcast';
    link.setAttribute('aria-label', `Ore Insiders Ep. ${cd.episode}: ${cd.title}`);

    const thumb = cd.thumbnail
        ? `<img class="archive-card-thumb" src="${cd.thumbnail}" alt="" loading="lazy">`
        : '';

    link.innerHTML = `
        <div class="archive-card-disc">
            <div class="archive-card-vinyl">
                ${thumb}
            </div>
            <span class="archive-card-ep-badge">Ep. ${cd.episode}</span>
        </div>
        <div class="archive-card-info">
            <span class="archive-card-eyebrow">ORE INSIDERS</span>
            <span class="archive-card-title">${cd.title}</span>
            <span class="archive-card-link">YouTube →</span>
        </div>
    `;

    return link;
}

function renderPagination(currentPage, totalPages) {
    const container = document.getElementById('archive-pagination');
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
