import {defineType, defineField} from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'handle',
      title: 'Solana Handle',
      type: 'string',
      description: 'e.g. zinnresearch.sol',
    }),
    defineField({
      name: 'xHandle',
      title: 'X / Twitter Handle',
      type: 'string',
      description: 'e.g. @zinnresearch — used to build the author profile URL (https://x.com/…)',
    }),
    defineField({
      name: 'xUrl',
      title: 'X Profile URL',
      type: 'url',
      description: 'Optional full profile URL. Prefer xHandle when both are set.',
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'walletAddress',
      title: 'Wallet Address',
      type: 'string',
      description: 'Solana wallet address for donations',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'handle', media: 'avatar'},
  },
})
