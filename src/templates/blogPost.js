import * as React from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import Navigation from "../components/Navigation";
import { texts } from "../config";

import {
  Page,
  Image,
  Title,
  SubTitle,
  SubSubTitle,
  Body,
  Code,
} from "../components/general";

const FullWidth = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const textContentTypes = [
  "paragraph",
  "heading-1",
  "heading-2",
  "heading-3",
  "heading-4",
  "heading-5",
];

const parseBlogContent = (content, assets) =>
  content.map((chunk, index) => {
    console.log(chunk);
    const chunkTextContent = textContentTypes.includes(chunk.nodeType)
      ? chunk.content[0].value
      : "";

    if (chunkTextContent === "") {
      return null;
    }

    switch (chunk.nodeType) {
      case "paragraph":
        const styles = chunk.content[0].marks.map((mark) => mark.type);

        if (styles.includes("code")) {
          return <Code>{chunkTextContent}</Code>;
        }

        const isBold = styles.includes("bold");
        const isItalic = styles.includes("italic");
        const isUnderline = styles.includes("underline");

        return (
          <FullWidth>
            <Body bold={isBold} italic={isItalic} underline={isUnderline}>
              {chunkTextContent}
            </Body>
          </FullWidth>
        );

      case "heading-1":
        return (
          <FullWidth>
            <Title>{chunkTextContent}</Title>
          </FullWidth>
        );

      case "heading-2":
        return (
          <FullWidth>
            <SubTitle>{chunkTextContent}</SubTitle>
          </FullWidth>
        );

      case "heading-3":
        return (
          <FullWidth>
            <SubSubTitle>{chunkTextContent}</SubSubTitle>
          </FullWidth>
        );

      case "heading-4":
        return (
          <FullWidth>
            <Body bold as="h4">
              {chunkTextContent}
            </Body>
          </FullWidth>
        );

      case "heading-5":
        return (
          <FullWidth>
            <Body bold as="h5">
              {chunkTextContent}
            </Body>
          </FullWidth>
        );

      case "embedded-asset-block":
        if (
          chunk.data?.target?.sys?.type === "Link" &&
          chunk.data?.target?.sys?.linkType === "Asset"
        ) {
          const asset = assets.find(
            (asset) => asset.id === chunk.data.target.sys.id
          );
          return <Image {...asset} />;
        }
        return null;

      default:
        return null;
    }
  });

const BlogPostPage = ({ data }) => {
  const content = JSON.parse(data.contentfulBlogPost.body.raw).content;
  const title = data.contentfulBlogPost.title;

  const assets = data.allContentfulAsset.edges.map((edge) => ({
    id: edge.node.contentful_id,
    src: edge.node.file.url,
    alt: edge.node.title,
  }));
  console.log(assets);

  return (
    <Page>
      <Navigation />
      <Link to="/">{texts.common.backToHome}</Link>
      <Title>{title}</Title>
      {parseBlogContent(content, assets)}
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
