import * as React from "react";
import { graphql } from "gatsby";
import Navigation from "../components/Navigation";
import { texts } from "../config";

import { Page, Title, TextLink } from "../components/general";
import { parseContent } from "../util/parser";

const BlogPostPage = ({ data }) => {
  const content = JSON.parse(data.contentfulBlogPost.body.raw).content;
  const title = data.contentfulBlogPost.title;

  const assets = data.allContentfulAsset.edges.map((edge) => ({
    id: edge.node.contentful_id,
    src: edge.node.file.url,
    alt: edge.node.title,
  }));

  return (
    <Page>
      <Navigation />
      <TextLink to="/">{texts.common.backToHome}</TextLink>
      <Title>{title}</Title>
      {parseContent(content, assets)}
    </Page>
  );
};

export default BlogPostPage;

export const BlogPostQuery = graphql`
  query BlogPostQuery($contentfulId: String!) {
    contentfulBlogPost(contentful_id: { eq: $contentfulId }) {
      title
      body {
        raw
      }
      tags
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
