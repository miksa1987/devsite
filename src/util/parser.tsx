import React from 'react'
import {
  Image,
  Title,
  SubTitle,
  Body,
  Code,
  FullWidth,
  CodeFullWidth,
} from '../components/general'
import { ContentBlock, AssetNode } from '../domain/general'

const renderText = (chunk: ContentBlock) => {
  console.log(chunk)
  const textContent = chunk.value
  const styles = chunk.marks.map((mark) => mark.type)

  if (styles.includes('code')) {
    return (
      <CodeFullWidth>
        <Code>{textContent}</Code>
      </CodeFullWidth>
    )
  }

  const isBold = styles.includes('bold')
  const isItalic = styles.includes('italic')
  const isUnderline = styles.includes('underline')

  return (
    <FullWidth>
      <Body bold={isBold} italic={isItalic} underline={isUnderline}>
        {textContent}
      </Body>
    </FullWidth>
  )
}

const renderHyperlink = (chunk: ContentBlock) => {
  const uri = chunk.data.uri
  const text = chunk.content[0].value // TODO checkcheck

  return (
    <FullWidth>
      <a href={uri}>{text}</a>
    </FullWidth>
  )
}

const renderEmbeddedBlock = (chunk: ContentBlock, assets: AssetNode[]) => {
  if (
    chunk.data?.target?.sys?.type === 'Link' &&
    chunk.data?.target?.sys?.linkType === 'Asset'
  ) {
    const asset = assets.find((asset) => asset.id === chunk.data.target.sys.id)
    return <Image {...asset} />
  }
  return null
}

const renderParagraph = (content) => {
  const paragraphFunctions = {
    text: renderText,
    hyperlink: renderHyperlink,
  }
  const chunkContent = content.map((innerChunk, index) => {
    const fn = paragraphFunctions[innerChunk.nodeType]

    return (
      <React.Fragment key={index}>{fn ? fn(innerChunk) : null}</React.Fragment>
    )
  })

  return chunkContent
}

const renderHeading = (Component) => (chunk) => {
  const textContent = chunk.content[0].value // TODO check if needed to loop

  return (
    <FullWidth>
      <Component>{textContent}</Component>
    </FullWidth>
  )
}

const contentFunctions = {
  paragraph: renderParagraph,
  'heading-1': renderHeading(Title),
  'heading-2': renderHeading(SubTitle),
  'heading-3': renderHeading(({ children }) => (
    <Body bold as="h4">
      {children}
    </Body>
  )),
  'heading-4': renderHeading(({ children }) => (
    <Body bold as="h5">
      {children}
    </Body>
  )),
  'embedded-asset-block': renderEmbeddedBlock,
}

export const aparseContent = (content, assets) =>
  content?.map((chunk, index) => {
    const fn = contentFunctions[chunk.nodeType]
    return (
      <React.Fragment key={index}>
        {fn ? fn(chunk, assets) : null}
      </React.Fragment>
    )
  })

export const parseContent = (content, assets) =>
  content.map((chunk) => {
    let Component

    switch (chunk.nodeType) {
    case 'paragraph':
      return renderParagraph(chunk.content)

    case 'heading-1':
      return renderHeading(Title)(chunk)

    case 'heading-2':
      return renderHeading(SubTitle)(chunk)

    case 'heading-3':
      Component = ({ children }) => (
        <SubTitle bold as="h3">
          {children}
        </SubTitle>
      )
      return renderHeading(Component)(chunk)

    case 'heading-4':
      Component = ({ children }) => (
        <Body bold as="h4">
          {children}
        </Body>
      )
      return renderHeading(Component)(chunk)

    case 'heading-5':
      Component = ({ children }) => (
        <Body bold as="h5">
          {children}
        </Body>
      )
      return renderHeading(Component)(chunk)

    case 'embedded-asset-block':
      return renderEmbeddedBlock(chunk, assets)

    default:
      return null
    }
  })

export const getTags = (blogPosts) => {
  let tags = []

  blogPosts.forEach((post) => {
    tags = tags.concat(post.tags)
  })
  return Array.from(new Set(tags))
}
