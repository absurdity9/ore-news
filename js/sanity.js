// Sanity CMS client — lightweight fetch wrapper, image URLs, portable text renderer

const SANITY_PROJECT = 'w9x60sjf';
const SANITY_DATASET = 'production';
const SANITY_API = `https://${SANITY_PROJECT}.apicdn.sanity.io/v2024-01-01/data/query/${SANITY_DATASET}`;
const SANITY_CDN = `https://cdn.sanity.io/images/${SANITY_PROJECT}/${SANITY_DATASET}`;

async function sanityFetch(query, params = {}) {
    const url = new URL(SANITY_API);
    url.searchParams.set('query', query);
    for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(`$${key}`, JSON.stringify(value));
    }
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`Sanity API ${res.status}`);
    const data = await res.json();
    return data.result;
}

function sanityImageUrl(ref, width) {
    if (!ref) return '';
    if (typeof ref === 'string' && ref.startsWith('http')) return ref;
    const assetRef = typeof ref === 'string' ? ref : ref.asset?._ref;
    if (!assetRef) return '';
    const [, id, dims, ext] = assetRef.split('-');
    let url = `${SANITY_CDN}/${id}-${dims}.${ext}`;
    if (width) url += `?w=${width}`;
    return url;
}

function renderPortableText(blocks) {
    if (!blocks || !blocks.length) return '';
    return blocks.map(block => {
        if (block._type === 'block') {
            const text = (block.children || []).map(c => escapeHtml(c.text || '')).join('');
            if (!text.trim()) return '';
            const tag = block.style === 'h2' ? 'h2' : block.style === 'h3' ? 'h3' : 'p';
            return `<${tag}>${text}</${tag}>`;
        }
        if (block._type === 'image') {
            const url = sanityImageUrl(block, null);
            const assetRef = block.asset?._ref;
            if (!assetRef) return '';
            const [, id, dims, ext] = assetRef.split('-');
            const src = `${SANITY_CDN}/${id}-${dims}.${ext}`;
            const alt = escapeHtml(block.alt || '');
            const caption = block.caption ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : '';
            return `<figure class="content-figure"><img src="${src}" alt="${alt}" loading="lazy">${caption}</figure>`;
        }
        return '';
    }).join('\n');
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
