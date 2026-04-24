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
      name: 'transcript',
      title: 'Transcript',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
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
