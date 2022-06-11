export type AssetNode = {
  node: {
    contentful_id: string
    title: string
    file: {
      url: string
    }
  }
}

type Style = 'code' | 'bold' | 'italic' | 'underline'

type Mark = {
  type: Style
}

export type ContentBlock = {
  data: object
  marks: Mark[]
  nodeType: string
  value?: string
  content?: ContentBlock
}
