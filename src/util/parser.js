import React from "react";
import {
  Image,
  Title,
  SubTitle,
  SubSubTitle,
  Body,
  Code,
  FullWidth,
} from "../components/general";

const textContentTypes = [
  "paragraph",
  "heading-1",
  "heading-2",
  "heading-3",
  "heading-4",
  "heading-5",
];

export const parseContent = (content, assets) =>
  content.map((chunk, index) => {
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
          <FullWidth key={index}>
            <Body bold={isBold} italic={isItalic} underline={isUnderline}>
              {chunkTextContent}
            </Body>
          </FullWidth>
        );

      case "heading-1":
        return (
          <FullWidth key={index}>
            <Title>{chunkTextContent}</Title>
          </FullWidth>
        );

      case "heading-2":
        return (
          <FullWidth key={index}>
            <SubTitle>{chunkTextContent}</SubTitle>
          </FullWidth>
        );

      case "heading-3":
        return (
          <FullWidth key={index}>
            <SubSubTitle>{chunkTextContent}</SubSubTitle>
          </FullWidth>
        );

      case "heading-4":
        return (
          <FullWidth key={index}>
            <Body bold as="h4">
              {chunkTextContent}
            </Body>
          </FullWidth>
        );

      case "heading-5":
        return (
          <FullWidth key={index}>
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
          return <Image key={index} {...asset} />;
        }
        return null;

      default:
        return null;
    }
  });

export const getTags = (blogPosts) => {
  let tags = [];

  blogPosts.forEach((post) => {
    tags = tags.concat(post.tags);
  });
  return Array.from(new Set(tags));
};
