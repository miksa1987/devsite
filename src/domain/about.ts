import { ContentBlock } from './general'

type AssetNode = {
  node: {
    contentful_id: string
    title: string
    file: {
      url: string
    }
  }
}

export type AboutData = {
  contentfulPerson: {
    displayName: string
    longBio: {
      raw: string
    }
  }
  allContentfulAsset: {
    edges: AssetNode[]
  }
}
export type LongBio = {
  data: object
  nodeType: 'document'
  content: ContentBlock
}
