// Article page — fetches a single article from Sanity by slug and renders it

document.addEventListener('DOMContentLoaded', () => {
    const slug = new URLSearchParams(location.search).get('slug');
    if (!slug) {
        document.getElementById('article-title').textContent = 'Article not found';
        return;
    }
    loadArticle(slug);
});

async function loadArticle(slug) {
    try {
        const article = await sanityFetch(
            `*[_type == "article" && slug.current == $slug][0] {
                title, eyebrow, subtitle, publishedAt, xUrl,
                "author": author-> { name, handle, xHandle, walletAddress },
                intro,
                sections[] { heading, date, body },
                metaDescription, keywords
            }`,
            {slug}
        );

        if (!article) {
            document.getElementById('article-title').textContent = 'Article not found';
            return;
        }

        document.title = `${article.title} — OreNews`;

        if (article.xUrl) {
            const xLinkEl = document.createElement('a');
            xLinkEl.href = article.xUrl;
            xLinkEl.target = '_blank';
            xLinkEl.rel = 'noopener noreferrer';
            xLinkEl.className = 'article-x-link';
            xLinkEl.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> View on X';
            const header = document.querySelector('.deep-dive-header');
            header.insertBefore(xLinkEl, header.firstChild);
        }

        document.getElementById('article-eyebrow').textContent = article.eyebrow || '';

        document.getElementById('article-title').textContent = article.title;

        if (article.subtitle) {
            const subtitleEl = document.getElementById('article-subtitle');
            subtitleEl.textContent = article.subtitle;
            subtitleEl.style.display = '';
        }

        if (article.author) {
            const authorEl = document.getElementById('article-author');
            const xUrl = article.author.xHandle
                ? `https://x.com/${article.author.xHandle.replace('@', '')}`
                : '#';
            authorEl.innerHTML = `by <a href="${xUrl}" target="_blank" rel="noopener noreferrer">${article.author.handle || article.author.name}</a>`;
        }

        const introEl = document.getElementById('article-intro');
        if (article.intro) {
            introEl.innerHTML = renderPortableText(article.intro)
                .replace(/<p>/g, '<p class="deep-dive-intro">');
        }

        const tocEl = document.getElementById('article-toc');
        const sectionsEl = document.getElementById('article-sections');

        if (article.sections && article.sections.length) {
            article.sections.forEach((section, i) => {
                const id = `s${i + 1}`;

                const tocLink = document.createElement('a');
                tocLink.href = `#${id}`;
                tocLink.textContent = `${i + 1}. ${section.heading}`;
                tocEl.appendChild(tocLink);

                const hasDate = section.date;

                if (hasDate) {
                    const li = document.createElement('li');
                    li.className = 'timeline-item';
                    li.id = id;
                    li.innerHTML = `
                        <div class="timeline-marker">
                            <span class="timeline-dot" aria-hidden="true"></span>
                            <span class="timeline-date">${section.date}</span>
                        </div>
                        <article class="timeline-panel">
                            <span class="timeline-date-badge">${section.date}</span>
                            <h3>${escapeHtml(section.heading)}</h3>
                            ${section.body ? renderPortableText(section.body) : ''}
                        </article>
                    `;

                    let timeline = sectionsEl.querySelector('.timeline');
                    if (!timeline) {
                        timeline = document.createElement('ol');
                        timeline.className = 'timeline';
                        sectionsEl.appendChild(timeline);
                    }
                    timeline.appendChild(li);
                } else {
                    const sectionEl = document.createElement('section');
                    sectionEl.className = 'deep-dive-content';
                    sectionEl.id = id;
                    sectionEl.innerHTML = `
                        <h2>${escapeHtml(section.heading)}</h2>
                        ${section.body ? renderPortableText(section.body) : ''}
                    `;
                    sectionsEl.appendChild(sectionEl);
                }
            });
        }

        if (article.author && article.author.walletAddress) {
            const address = article.author.walletAddress;
            const tipEl = document.createElement('div');
            tipEl.className = 'donate-rack article-tip';
            tipEl.innerHTML = `
                <div class="donate-chest">
                    <div class="donate-gem" aria-hidden="true">
                        <img src="images/solana-logo.svg" alt="" width="44" height="34">
                    </div>
                    <div class="donate-body">
                        <div class="donate-eyebrow">
                            <span class="donate-hint">Tip the author. Pickaxes, lanterns &amp; cave coffee</span>
                        </div>
                        <button type="button" class="donate-tablet" aria-label="Copy wallet address">
                            <code class="donate-address">${escapeHtml(address)}</code>
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
            sectionsEl.appendChild(tipEl);

            const btn = tipEl.querySelector('.donate-tablet');
            const feedback = tipEl.querySelector('.donate-copy-feedback');
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
    } catch (err) {
        console.error('Failed to load article:', err);
        document.getElementById('article-title').textContent = 'Failed to load article';
    }
}
