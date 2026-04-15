// OreNews App — loads content.json and renders magazines + CDs

document.addEventListener('DOMContentLoaded', () => {
    // Only load newsstand content on pages that render it
    if (document.querySelector('#shelf-row-1')) {
        loadContent();
    }
    setupHamburger();
});

async function loadContent() {
    try {
        const response = await fetch('data/content.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        renderMagazines(data.magazines);
        renderCDs(data.cds);
        renderDonate(data.donate);
    } catch (err) {
        console.error('Failed to load content:', err);
        showError();
    }
}

function renderMagazines(magazines) {
    const row1 = document.querySelector('#shelf-row-1 .shelf-items');
    const row2 = document.querySelector('#shelf-row-2 .shelf-items');

    magazines.forEach(mag => {
        const target = mag.row === 1 ? row1 : row2;
        target.appendChild(createMagazineEl(mag));
    });
}

function createMagazineEl(mag) {
    const link = document.createElement('a');
    link.href = mag.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'magazine-item';
    link.setAttribute('aria-label', `Issue #${mag.issueNumber}: ${mag.title} (Tap to Read)`);

    link.innerHTML = `
        <div class="magazine-cover" data-theme="${mag.theme}">
            <div class="cover-masthead">MINESHAFT<br>WEEKLY</div>
            <div class="cover-illustration">
                ${getCoverSVG(mag.theme)}
            </div>
            <div class="cover-footer">
                <span class="cover-issue">Issue #${mag.issueNumber}</span>
            </div>
        </div>
        <div class="magazine-label">
            <span class="magazine-title">Issue #${mag.issueNumber}: ${mag.title}</span>
            <span class="magazine-cta">(Tap to Read)</span>
        </div>
    `;

    return link;
}

function renderCDs(cds) {
    const rack = document.querySelector('#cd-rack .cd-items');

    cds.forEach(cd => {
        rack.appendChild(createCDEl(cd));
    });
}

function createCDEl(cd) {
    const link = document.createElement('a');
    link.href = cd.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'cd-item';
    const ariaPrefix = cd.episode ? `Ore Insiders Ep. ${cd.episode}: ` : '';
    link.setAttribute('aria-label', `${ariaPrefix}${cd.title} (Tap to Play)`);

    const epLabel = cd.episode ? `Ep. ${cd.episode}` : cd.title;
    const thumb = cd.thumbnail
        ? `<img class="cd-thumb" src="${cd.thumbnail}" alt="" loading="lazy" />`
        : `<span class="cd-name">${cd.title}</span>`;

    link.innerHTML = `
        <div class="cd-disc" style="--cd-color: ${cd.color}">
            <div class="cd-label">
                ${thumb}
            </div>
            <div class="cd-hole"></div>
        </div>
        <span class="cd-ep">${epLabel}</span>
        <span class="cd-cta">(Tap to Play)</span>
    `;

    return link;
}

function renderDonate(donate) {
    const rack = document.querySelector('#donate-rack');
    if (!rack || !donate) return;

    const address = donate.address || '';
    const network = donate.network || 'Solana';

    rack.innerHTML = `
        <div class="donate-chest">
            <div class="donate-gem" aria-hidden="true">
                <svg viewBox="0 0 32 32" width="44" height="44">
                    <defs>
                        <linearGradient id="solGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#9945FF"/>
                            <stop offset="50%" stop-color="#7A5BFF"/>
                            <stop offset="100%" stop-color="#14F195"/>
                        </linearGradient>
                    </defs>
                    <polygon points="16,2 28,10 28,22 16,30 4,22 4,10" fill="url(#solGrad)" stroke="#1a0f2e" stroke-width="1.5"/>
                    <polygon points="16,2 28,10 16,14 4,10" fill="#fff" opacity="0.18"/>
                    <polygon points="4,10 16,14 16,30 4,22" fill="#000" opacity="0.18"/>
                    <line x1="16" y1="14" x2="16" y2="30" stroke="#fff" stroke-width="0.6" opacity="0.4"/>
                </svg>
            </div>
            <div class="donate-body">
                <div class="donate-eyebrow">
                    <span class="donate-network">${network}</span>
                    <span class="donate-divider">•</span>
                    <span class="donate-hint">Pickaxes, lanterns &amp; cave coffee</span>
                </div>
                <button type="button" class="donate-tablet" id="donate-copy" aria-label="Copy ${network} wallet address">
                    <code class="donate-address">${address}</code>
                    <span class="donate-copy-icon" aria-hidden="true">
                        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                            <rect x="3" y="3" width="8" height="10" rx="1"/>
                            <path d="M5.5 3V2.5a1 1 0 011-1h6a1 1 0 011 1v8a1 1 0 01-1 1H13"/>
                        </svg>
                    </span>
                    <span class="donate-copy-feedback" aria-live="polite"></span>
                </button>
            </div>
        </div>
    `;

    const btn = rack.querySelector('#donate-copy');
    const feedback = rack.querySelector('.donate-copy-feedback');

    btn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(address);
            feedback.textContent = 'COPIED';
            btn.classList.add('is-copied');
            setTimeout(() => {
                feedback.textContent = '';
                btn.classList.remove('is-copied');
            }, 1600);
        } catch {
            feedback.textContent = 'COPY FAILED';
            setTimeout(() => { feedback.textContent = ''; }, 1600);
        }
    });
}

function getCoverSVG(theme) {
    const svgs = {
        crystal: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="30,58 20,30 35,5 45,5 55,25 40,58" fill="#4a9eff" opacity="0.9"/>
            <polygon points="45,58 40,35 50,15 58,18 60,40 50,58" fill="#3a80dd" opacity="0.8"/>
            <polygon points="20,58 15,45 22,30 30,32 28,58" fill="#5ab0ff" opacity="0.7"/>
            <line x1="35" y1="5" x2="38" y2="25" stroke="#7fbfff" stroke-width="1" opacity="0.6"/>
            <line x1="50" y1="15" x2="52" y2="32" stroke="#7fbfff" stroke-width="1" opacity="0.5"/>
        </svg>`,

        safety: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="40" cy="42" rx="25" ry="8" fill="#d4a843" opacity="0.3"/>
            <path d="M20 35 Q20 18 40 15 Q60 18 60 35 L58 38 L22 38 Z" fill="#f0c94d"/>
            <rect x="35" y="10" width="10" height="8" rx="3" fill="#d4a843"/>
            <path d="M30 28 L37 35 L52 20" stroke="#2a6f2a" stroke-width="3" stroke-linecap="round" fill="none"/>
        </svg>`,

        shovel: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="38" y="5" width="4" height="40" rx="1" fill="#8B7355" transform="rotate(15, 40, 25)"/>
            <ellipse cx="36" cy="48" rx="14" ry="10" fill="#7B8794" transform="rotate(15, 36, 48)"/>
            <ellipse cx="36" cy="48" rx="10" ry="7" fill="#9AA5B1" transform="rotate(15, 36, 48)"/>
            <rect x="35" y="3" width="10" height="6" rx="2" fill="#5c3a1e" transform="rotate(15, 40, 6)"/>
        </svg>`,

        cart: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 40 L20 20 L60 20 L65 40 Z" fill="#8B7355"/>
            <path d="M18 38 L22 22 L58 22 L62 38 Z" fill="#A08060"/>
            <polygon points="30,22 35,10 45,10 50,22" fill="#7B8794" opacity="0.6"/>
            <circle cx="22" cy="45" r="6" fill="#5c3a1e" stroke="#3d2510" stroke-width="2"/>
            <circle cx="58" cy="45" r="6" fill="#5c3a1e" stroke="#3d2510" stroke-width="2"/>
            <circle cx="22" cy="45" r="2" fill="#3d2510"/>
            <circle cx="58" cy="45" r="2" fill="#3d2510"/>
        </svg>`,

        gem: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="40,5 55,20 50,50 30,50 25,20" fill="#e04080"/>
            <polygon points="40,5 55,20 40,18 25,20" fill="#f06090" opacity="0.8"/>
            <polygon points="25,20 30,50 40,18" fill="#c03070" opacity="0.7"/>
            <polygon points="55,20 50,50 40,18" fill="#d03878" opacity="0.6"/>
            <line x1="40" y1="5" x2="40" y2="18" stroke="#ff80b0" stroke-width="1" opacity="0.5"/>
        </svg>`,

        tunnel: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="5" width="70" height="50" rx="2" fill="#3d3025"/>
            <ellipse cx="40" cy="35" rx="25" ry="22" fill="#1a1510"/>
            <ellipse cx="40" cy="35" rx="18" ry="16" fill="#0d0a08"/>
            <rect x="14" y="8" width="4" height="48" fill="#8B7355"/>
            <rect x="62" y="8" width="4" height="48" fill="#8B7355"/>
            <rect x="12" y="6" width="56" height="4" fill="#8B7355"/>
            <circle cx="40" cy="35" r="3" fill="#f0c94d" opacity="0.4"/>
        </svg>`,

        lantern: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="32" y="4" width="16" height="4" rx="2" fill="#8B7355"/>
            <path d="M30 8 L30 10 Q30 12 32 12 L48 12 Q50 12 50 10 L50 8 Z" fill="#5c3a1e"/>
            <rect x="30" y="12" width="20" height="30" rx="3" fill="#d4a843" opacity="0.3" stroke="#8B7355" stroke-width="2"/>
            <line x1="30" y1="18" x2="50" y2="18" stroke="#8B7355" stroke-width="1"/>
            <line x1="30" y1="36" x2="50" y2="36" stroke="#8B7355" stroke-width="1"/>
            <ellipse cx="40" cy="27" rx="6" ry="8" fill="#f0c94d" opacity="0.7"/>
            <ellipse cx="40" cy="27" rx="3" ry="5" fill="#fff4d4" opacity="0.5"/>
            <rect x="32" y="42" width="16" height="4" rx="2" fill="#5c3a1e"/>
            <circle cx="40" cy="27" r="12" fill="#f0c94d" opacity="0.1"/>
        </svg>`,

        dynamite: `<svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="25" y="22" width="12" height="35" rx="3" fill="#cc3333" transform="rotate(-10, 31, 39)"/>
            <rect x="35" y="20" width="12" height="35" rx="3" fill="#dd4444"/>
            <rect x="45" y="22" width="12" height="35" rx="3" fill="#cc3333" transform="rotate(10, 51, 39)"/>
            <rect x="37" y="32" width="8" height="4" fill="#f0c94d"/>
            <path d="M41 20 Q42 12 45 8 Q46 6 44 5" stroke="#8B7355" stroke-width="1.5" fill="none"/>
            <circle cx="44" cy="4" r="3" fill="#f0c94d"/>
            <circle cx="44" cy="4" r="2" fill="#ff8833" opacity="0.8"/>
        </svg>`
    };

    return svgs[theme] || svgs.crystal;
}

function showError() {
    const row1 = document.querySelector('#shelf-row-1 .shelf-items');
    const row2 = document.querySelector('#shelf-row-2 .shelf-items');
    const cdRack = document.querySelector('#cd-rack .cd-items');
    row1.innerHTML = '<p class="shelf-error">No issues available. Check back soon!</p>';
    row2.innerHTML = '';
    cdRack.innerHTML = '';
}

function setupHamburger() {
    const btn = document.querySelector('.hamburger');
    const nav = document.querySelector('.main-nav');

    btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !expanded);
        nav.classList.toggle('open');
        btn.classList.toggle('active');
    });
}
