import { PreviewConfig } from 'sanity'
import { ComponentIcon } from '@sanity/icons'

function getBlockPreview(name: string): PreviewConfig {
  return {
    prepare: () => ({
      title: name,
      subtitle: 'Block',
      media: ComponentIcon,
    }),
  }
}

export default getBlockPreview
