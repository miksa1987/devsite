import * as React from "react";
import { graphql, Link } from "gatsby";
import Navigation from "../components/Navigation";
import { texts } from "../config";

import { Page, Title, SubTitle, SubSubTitle } from "../components/general";
import { Post, Tag, TagsContainer } from "../components/post";

const BlogPage = ({ data }) => {
  const blogPosts = data.allContentfulBlogPost.edges.map((edge) => edge.node);

  const getTags = () => {
    let tags = [];

    blogPosts.forEach((post) => {
      tags = tags.concat(post.tags);
    });
    return Array.from(new Set(tags));
  };

  const shownPosts = blogPosts.length < 10 ? blogPosts : blogPosts.slice(0, 10);

  return (
    <Page>
      <Navigation />
      <Link to="/">{texts.common.backToHome}</Link>
      <Title>{texts.blog.title}</Title>
      <SubSubTitle>{texts.blog.searchDescription}</SubSubTitle>
      <TagsContainer>
        {getTags().map((tag, index) => (
          <Tag key={index} tag={tag} />
        ))}
      </TagsContainer>
      <SubTitle>{texts.blog.latest}</SubTitle>
      {shownPosts.map((post, index) => (
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
