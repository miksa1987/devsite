import * as React from "react";
import styled from "styled-components";
import { Link as UnstyledLink } from "gatsby";

import {
  DottedContainer,
  TitleLink,
  SpaceBetween,
  Body,
  Column,
  scale,
} from "./general";

const TagLink = styled(UnstyledLink)`
  color: black;
  text-decoration: none;
  padding: ${scale(0.5)} ${scale(2)};
  margin: ${scale(1)};
  border: 1px solid black;
`;

export const Tag = ({ tag }) => (
  <TagLink to={`/blog/tag/${tag.toLowerCase()}`}>{tag}</TagLink>
);

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
