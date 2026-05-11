import { readFileSync } from 'fs';
import { randomUUID } from 'crypto';

const SANITY_PROJECT = 'w9x60sjf';
const SANITY_DATASET = 'production';
const SANITY_TOKEN = process.env.SANITY_API_TOKEN;

if (!SANITY_TOKEN) {
  console.error('Set SANITY_API_TOKEN env var');
  process.exit(1);
}

const docId = process.argv[2];
const mdPath = process.argv[3];

if (!docId || !mdPath) {
  console.error('Usage: npx tsx scripts/upload-transcript.ts <docId> <mdPath>');
  process.exit(1);
}

const md = readFileSync(mdPath, 'utf-8');
const lines = md.split('\n');

const blocks: any[] = [];

for (const line of lines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed === '---') continue;

  if (trimmed.startsWith('# ')) {
    blocks.push({
      _type: 'block',
      _key: randomUUID().slice(0, 12),
      style: 'h1',
      markDefs: [],
      children: [{ _type: 'span', _key: randomUUID().slice(0, 12), text: trimmed.slice(2), marks: [] }],
    });
  } else if (trimmed.startsWith('## ')) {
    blocks.push({
      _type: 'block',
      _key: randomUUID().slice(0, 12),
      style: 'h2',
      markDefs: [],
      children: [{ _type: 'span', _key: randomUUID().slice(0, 12), text: trimmed.slice(3), marks: [] }],
    });
  } else if (trimmed.startsWith('**') && trimmed.includes(':**')) {
    const match = trimmed.match(/^\*\*(.+?):\*\*\s*(.*)/);
    if (match) {
      const speaker = match[1] + ':';
      const text = match[2];
      blocks.push({
        _type: 'block',
        _key: randomUUID().slice(0, 12),
        style: 'normal',
        markDefs: [],
        children: [
          { _type: 'span', _key: randomUUID().slice(0, 12), text: speaker + ' ', marks: ['strong'] },
          { _type: 'span', _key: randomUUID().slice(0, 12), text, marks: [] },
        ],
      });
    }
  } else {
    blocks.push({
      _type: 'block',
      _key: randomUUID().slice(0, 12),
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: randomUUID().slice(0, 12), text: trimmed, marks: [] }],
    });
  }
}

console.log(`Parsed ${blocks.length} blocks from ${mdPath}`);

async function upload() {
  const mutation = {
    mutations: [
      {
        patch: {
          id: docId,
          set: { transcript: blocks },
        },
      },
    ],
  };

  const url = `https://${SANITY_PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${SANITY_DATASET}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SANITY_TOKEN}`,
    },
    body: JSON.stringify(mutation),
  });

  const result = await res.json();

  if (!res.ok) {
    console.error('Sanity mutation failed:', JSON.stringify(result, null, 2));
    process.exit(1);
  }

  console.log('Transcript uploaded:', JSON.stringify(result, null, 2));
}

upload();
