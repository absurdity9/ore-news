import {defineType, defineField} from 'sanity'

export const magazine = defineType({
  name: 'magazine',
  title: 'Magazine',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Mineshaft Weekly — 10 April"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'week',
      title: 'Week Label',
      type: 'string',
      description: 'Short label shown on shelf, e.g. "10 April"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cover',
      title: 'Cover Image',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Link to the X / Twitter thread',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {title: 'Published (newest)', name: 'publishedDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'week', media: 'cover'},
  },
})
