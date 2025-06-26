import { defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons'

const menuItem = defineType({
  title: 'Menu item',
  name: 'menuItem',
  type: 'object',
  preview: {
    select: {
      label: 'label',
    },
    prepare: ({ label = '' }) => ({
      title: label,
      subtitle: 'Menu item',
      icon: LinkIcon,
    }),
  },
  fields: [
    defineField({
      title: 'Label',
      name: 'label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'URL',
      name: 'url',
      type: 'link',
      validation: (Rule) => Rule.required(),
    }),
  ],
})

export default menuItem
