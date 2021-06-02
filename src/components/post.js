import * as React from "react";
import styled from "styled-components";
import { Link as UnstyledLink } from "gatsby";

import { Link, Body, Column, Row, scale, MOBILE_BREAKPOINT } from "./general";

const TagLink = styled(UnstyledLink)`
  color: black;
  text-decoration: none;
  padding: ${scale(0.5)} ${scale(2)};
  margin: ${scale(1)};
  border: 1px solid black;
`;

const TitleLink = styled(Link)`
  max-height: ${scale(5)};
  margin: ${scale(2)} ${scale(1)};
  padding: ${scale(0.5)} ${scale(3)};
`;

const PostContainer = styled.div`
  width: 100%;
  border-top: 1px dotted black;

  &:last-child {
    border-bottom: 1px dotted black;
  }
`;

const SpaceBetween = styled(Row)`
  justify-content: space-between;
  align-items: center;

  ${TitleLink} {
    word-wrap: break-word;
  }

  @media (max-width: ${MOBILE_BREAKPOINT}) {
    flex-direction: column;
  }
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
  <PostContainer>
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
  </PostContainer>
);
