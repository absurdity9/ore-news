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
      options: {source: 'title', isUnique: (value, context) => context.defaultIsUnique(value, context)},
      validation: (rule) =>
        rule.required().custom(async (slug, context) => {
          if (!slug?.current) return true
          const {document, getClient} = context
          const client = getClient({apiVersion: '2024-01-01'})
          const id = document?._id?.replace(/^drafts\./, '')
          const existing = await client.fetch(
            `count(*[_type == "article" && slug.current == $slug && !(_id in [$id, "drafts." + $id])])`,
            {slug: slug.current, id: id || ''},
          )
          return existing === 0 || 'Slug must be unique'
        }),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description:
        'Label above the title. Use "The MineShaft Weekly" for the newsstand, "Deep Dive" for deep dives, or "Article" for long-form ecosystem essays.',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on the Articles listing and in search snippets.',
    }),
    defineField({
      name: 'cover',
      title: 'Cover Image',
      type: 'image',
      description: 'Banner shown on the newsstand / magazine shelf (~2.5:1 landscape). Required for the article to appear on the shelf.',
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
      name: 'xUrl',
      title: 'X Post URL',
      type: 'url',
      description: 'Link to the corresponding X / Twitter post or article',
    }),
    defineField({
      name: 'sourceDocUrl',
      title: 'Source Google Doc URL',
      type: 'url',
      description: 'Editorial reference — original Google Doc used for import',
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
