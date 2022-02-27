import * as React from "react";
import { graphql } from "gatsby";
import Navigation from "../components/Navigation";
import { texts } from "../config";

import {
  Page,
  Title,
  SubTitle,
  SubSubTitle,
  TextLink,
} from "../components/general";
import { Post, Tag, TagsContainer } from "../components/post";
import { getTags } from "../util/parser";

const BlogPage = ({ data }) => {
  const blogPosts = data.allContentfulBlogPost.edges.map((edge) => edge.node);
  const shownPosts = blogPosts.length < 10 ? blogPosts : blogPosts.slice(0, 10);

  return (
    <Page>
      <TextLink to="/">{texts.common.backToHome}</TextLink>
      <Title>{texts.blog.title}</Title>
      <SubSubTitle>{texts.blog.searchDescription}</SubSubTitle>
      <TagsContainer>
        {getTags(blogPosts).map((tag, index) => (
          <Tag key={index} tag={tag} />
        ))}
      </TagsContainer>
      <SubTitle>{texts.blog.latest}</SubTitle>
      {shownPosts
        .sort((a, b) =>
          new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1
        )
        .map((post, index) => (
          <Post key={index} post={post} />
        ))}
    </Page>
  );
};

export default BlogPage;

export const query = graphql`
  query BlogQuery {
    allContentfulBlogPost {
      edges {
        node {
          title
          tags
          slug
          createdAt
        }
      }
    }
  }
`;
