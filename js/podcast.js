// Podcast page — fetches a single podcast from Sanity by slug and renders it.

document.addEventListener('DOMContentLoaded', () => {
    const slug = new URLSearchParams(location.search).get('slug');
    if (!slug) {
        document.getElementById('podcast-title').textContent = 'Podcast not found';
        return;
    }
    loadPodcast(slug);
});

async function loadPodcast(slug) {
    try {
        const podcast = await sanityFetch(
            `*[_type == "podcast" && slug.current == $slug][0] {
                title, episode, show, description, videoId, url, publishedAt,
                sections[] { heading, timestamp, body }
            }`,
            { slug }
        );

        if (!podcast) {
            document.getElementById('podcast-title').textContent = 'Podcast not found';
            return;
        }

        document.title = `${podcast.title} — OreNews`;

        const showLabel = podcast.show === 'minerside-chats' ? 'Minerside Chats' : 'Ore Insiders';
        document.getElementById('podcast-eyebrow').textContent =
            `${showLabel} · Ep. ${podcast.episode}`;
        document.getElementById('podcast-title').textContent = podcast.title;

        if (podcast.description) {
            const desc = document.getElementById('podcast-description');
            desc.textContent = podcast.description;
            desc.style.display = '';
        }

        if (podcast.publishedAt) {
            document.getElementById('podcast-meta').textContent = formatDate(podcast.publishedAt);
        }

        renderEmbed(podcast.videoId, podcast.url);
        renderTOC(podcast.sections);
        renderSections(podcast.sections);

        attachTOCSeek();
        initYouTubeAPI();
    } catch (err) {
        console.error('Failed to load podcast:', err);
        document.getElementById('podcast-title').textContent = 'Failed to load podcast';
    }
}

function renderEmbed(videoId, url) {
    const container = document.getElementById('podcast-embed');
    if (!videoId) {
        if (url) {
            container.innerHTML = `<a href="${url}" target="_blank" rel="noopener noreferrer" class="podcast-watch-link">Watch on YouTube ↗</a>`;
        }
        return;
    }
    container.innerHTML = `
        <div class="podcast-embed-frame">
            <iframe
                id="podcast-iframe"
                src="https://www.youtube.com/embed/${encodeURIComponent(videoId)}?enablejsapi=1&rel=0"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                loading="lazy"></iframe>
        </div>
        ${url ? `<a href="${url}" target="_blank" rel="noopener noreferrer" class="podcast-watch-link">Watch on YouTube ↗</a>` : ''}
    `;
}

function renderTOC(sections) {
    const tocEl = document.getElementById('podcast-toc');
    if (!sections || !sections.length) {
        tocEl.style.display = 'none';
        return;
    }
    const hint = document.createElement('p');
    hint.className = 'podcast-toc-hint';
    hint.textContent = 'Click any chapter to jump the video to that moment.';
    tocEl.appendChild(hint);
    sections.forEach((section, i) => {
        const id = `s${i + 1}`;
        const link = document.createElement('a');
        link.href = `#${id}`;
        if (typeof section.timestamp === 'number') {
            link.dataset.seconds = String(section.timestamp);
            link.innerHTML = `<span class="podcast-toc-time">${formatTimestamp(section.timestamp)}</span> ${escapeHtml(section.heading)}`;
        } else {
            link.textContent = `${i + 1}. ${section.heading}`;
        }
        tocEl.appendChild(link);
    });
}

function renderSections(sections) {
    const sectionsEl = document.getElementById('podcast-sections');
    if (!sections || !sections.length) return;
    sections.forEach((section, i) => {
        const el = document.createElement('section');
        el.className = 'deep-dive-content podcast-section';
        el.id = `s${i + 1}`;
        el.innerHTML = `
            <h2>${escapeHtml(section.heading)}</h2>
            ${section.body ? renderPortableText(section.body) : ''}
        `;
        sectionsEl.appendChild(el);
    });
}

function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatTimestamp(total) {
    const t = Math.max(0, Math.trunc(total));
    const h = Math.floor(t / 3600);
    const m = Math.floor((t % 3600) / 60);
    const s = t % 60;
    const pad = (n) => n.toString().padStart(2, '0');
    return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

let ytPlayer = null;
let ytPlayerReady = false;

function initYouTubeAPI() {
    const iframe = document.getElementById('podcast-iframe');
    if (!iframe) return;
    if (window.YT && window.YT.Player) {
        createPlayer(iframe);
        return;
    }
    window.onYouTubeIframeAPIReady = () => createPlayer(iframe);
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
}

function createPlayer(iframe) {
    ytPlayer = new YT.Player(iframe, {
        events: {
            onReady: () => { ytPlayerReady = true; },
        },
    });
}

function attachTOCSeek() {
    const tocEl = document.getElementById('podcast-toc');
    if (!tocEl) return;
    tocEl.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;
        const seconds = link.dataset.seconds;
        const id = (link.getAttribute('href') || '').replace(/^#/, '');
        const target = id ? document.getElementById(id) : null;
        if (target) {
            e.preventDefault();
            history.replaceState(null, '', `#${id}`);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (seconds && ytPlayer && ytPlayerReady) {
            const n = Number(seconds);
            if (!Number.isNaN(n)) {
                ytPlayer.seekTo(n, true);
                ytPlayer.playVideo();
            }
        }
    });
}
