import {defineType, defineField, defineArrayMember} from 'sanity'

export const podcast = defineType({
  name: 'podcast',
  title: 'Podcast',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'episode',
      title: 'Episode Number',
      type: 'number',
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: 'show',
      title: 'Show',
      type: 'string',
      options: {
        list: [
          {title: 'Ore Insiders', value: 'ore-insiders'},
          {title: 'Minerside Chats', value: 'minerside-chats'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Episode summary / show notes',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
    }),
    defineField({
      name: 'sections',
      title: 'Transcript Sections',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'section',
          title: 'Section',
          fields: [
            defineField({
              name: 'heading',
              title: 'Heading',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'timestamp',
              title: 'Timestamp (seconds)',
              type: 'number',
              description: 'Seconds offset into the YouTube video for this section. Optional — leave blank to disable seek (TOC link will still scroll).',
              validation: (rule) => rule.min(0).integer(),
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'array',
              of: [defineArrayMember({type: 'block'})],
            }),
          ],
          preview: {
            select: {title: 'heading', timestamp: 'timestamp'},
            prepare({title, timestamp}) {
              const sub =
                typeof timestamp === 'number'
                  ? formatTimestamp(timestamp)
                  : '—'
              return {title, subtitle: sub}
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'color',
      title: 'Disc Color',
      type: 'string',
      description: 'Hex color for the CD disc, e.g. #4a9eff',
    }),
    defineField({
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Link to YouTube video',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
    }),
  ],
  orderings: [
    {title: 'Episode (newest)', name: 'episodeDesc', by: [{field: 'episode', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', episode: 'episode', show: 'show'},
    prepare({title, episode, show}) {
      const showLabel = show === 'minerside-chats' ? 'Minerside Chats' : 'Ore Insiders'
      return {
        title,
        subtitle: `${showLabel} — Ep ${episode}`,
      }
    },
  },
})

function formatTimestamp(total: number): string {
  const t = Math.max(0, Math.trunc(total))
  const h = Math.floor(t / 3600)
  const m = Math.floor((t % 3600) / 60)
  const s = t % 60
  const pad = (n: number) => n.toString().padStart(2, '0')
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
}
