import * as React from "react";
import styled from "styled-components";
import { Link as UnstyledLink } from "gatsby";
import { tagColors, defaultTagColor } from "../theme";

import {
  DottedContainer,
  TitleLink,
  SpaceBetween,
  Body,
  Column,
  scale,
} from "./general";

const randomizeTagColor = () => {
  const keys = Object.keys(tagColors);
  const randomColorIndex = Math.floor(Math.random() * keys.length);
  const colorKey = keys[randomColorIndex];
  return tagColors[colorKey];
};

const TagLink = styled(UnstyledLink)`
  color: black;
  background-color: ${(props) => props.color ?? defaultTagColor};
  text-decoration: none;
  padding: ${scale(0.5)} ${scale(2)};
  margin: ${scale(1)};
  font-size: 90%;
  border: 1px solid black;
`;

export const Tag = ({ tag }) => {
  const color = React.useMemo(() => randomizeTagColor(), []);
  return (
    <TagLink color={color} to={`/blog/tag/${tag.toLowerCase()}`}>
      {tag.toUpperCase()}
    </TagLink>
  );
};

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: ${scale(3)};
`;

export const Post = ({ post }) => (
  <DottedContainer>
    <Column>
      <SpaceBetween>
        <TitleLink to={`/blog/post/${post.slug}`}>{post.title}</TitleLink>
        <Body>{new Date(post.createdAt).toLocaleString()}</Body>
      </SpaceBetween>
      <TagsContainer>
        {post.tags.map((tag, index) => (
          <Tag key={index} tag={tag} />
        ))}
      </TagsContainer>
    </Column>
  </DottedContainer>
);
