import {defineType, defineField, defineArrayMember} from 'sanity'

export const article = defineType({
  name: 'article',
  title: 'Article',
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
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Label above the title, e.g. "The MineShaft Weekly" or "Deep Dive"',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'author'}],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}],
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
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
              name: 'date',
              title: 'Date Label',
              type: 'string',
              description: 'Optional — for timeline-style articles, e.g. "Oct 22, 2025"',
            }),
            defineField({
              name: 'body',
              title: 'Body',
              type: 'array',
              of: [
                defineArrayMember({type: 'block'}),
                defineArrayMember({
                  type: 'image',
                  options: {hotspot: true},
                  fields: [
                    defineField({
                      name: 'caption',
                      title: 'Caption',
                      type: 'string',
                    }),
                    defineField({
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                    }),
                  ],
                }),
              ],
            }),
          ],
          preview: {
            select: {title: 'heading', subtitle: 'date'},
          },
        }),
      ],
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      group: 'seo',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      group: 'seo',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'seo',
    }),
  ],
  groups: [
    {name: 'seo', title: 'SEO'},
  ],
  orderings: [
    {title: 'Published (newest)', name: 'publishedDesc', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'eyebrow', date: 'publishedAt'},
    prepare({title, subtitle, date}) {
      return {
        title,
        subtitle: [subtitle, date?.split('T')[0]].filter(Boolean).join(' — '),
      }
    },
  },
})
