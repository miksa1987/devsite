import * as React from "react";
import { graphql, Link } from "gatsby";
import Navigation from "../components/Navigation";
import { texts } from "../config";
import { parseContent } from "../util/parser";

import { Page, Title } from "../components/general";

const AboutPage = ({ data }) => {
  const { displayName, longBio } = data.contentfulPerson;

  const { content } = JSON.parse(longBio.raw);
  const assets = data.allContentfulAsset.edges.map((edge) => ({
    id: edge.node.contentful_id,
    src: edge.node.file.url,
    alt: edge.node.title,
  }));

  return (
    <Page>
      <Navigation />
      <Link to="/">{texts.common.backToHome}</Link>
      <Title>{texts.about.title}</Title>
      {parseContent(content, assets)}
    </Page>
  );
};

export default AboutPage;

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
`;
