import * as React from 'react'
import { graphql } from 'gatsby'
import { texts } from '../config'
import { parseContent } from '../util/parser'
import { AboutData, LongBio } from '../domain/about'

import { Page, Title, TextLink } from '../components/general'

type Props = {
  data: AboutData
}
const AboutPage: React.FC<Props> = ({ data }) => {
  const { longBio } = data.contentfulPerson

  const { content } = JSON.parse(longBio.raw) as LongBio
  const assets = data.allContentfulAsset.edges.map((edge) => ({
    id: edge.node.contentful_id,
    src: edge.node.file.url,
    alt: edge.node.title,
  }))

  return (
    <Page>
      <Title>{texts.about.title}</Title>
      {parseContent(content, assets)}
    </Page>
  )
}

export default AboutPage

export const query = graphql`
  query AboutQuery {
    contentfulPerson(contentful_id: { eq: "1j1ULAoJlGjKwrUCiSIwVl" }) {
      displayName
      longBio {
        raw
      }
    }
    allContentfulAsset {
      edges {
        node {
          file {
            url
          }
          contentful_id
          title
        }
      }
    }
  }
`
