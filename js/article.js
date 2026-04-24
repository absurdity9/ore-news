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
                title, eyebrow, subtitle, publishedAt,
                "author": author-> { name, handle, xHandle },
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
    } catch (err) {
        console.error('Failed to load article:', err);
        document.getElementById('article-title').textContent = 'Failed to load article';
    }
}
