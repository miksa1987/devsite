import * as React from "react";
import { graphql, Link } from "gatsby";
import Navigation from "../components/Navigation";

import { Page, Title, SubTitle, SubSubTitle } from "../components/general";
import { Post, Tag, TagsContainer } from "../components/post";

const BlogPage = ({ data }) => {
  const blogPosts = data.allContentfulBlogPost.edges.map((edge) => edge.node);

  const getTags = () => {
    let tags = [];

    blogPosts.forEach((post) => {
      tags = tags.concat(post.tags);
    });
    return tags;
  };

  const shownPosts = blogPosts.length < 10 ? blogPosts : blogPosts.slice(0, 10);

  return (
    <Page>
      <Navigation />
      <Link to="/">Back to home</Link>
      <Title>Blog</Title>
      <SubSubTitle>You can search posts by tag:</SubSubTitle>
      <TagsContainer>
        {getTags().map((tag, index) => (
          <Tag key={index} tag={tag} />
        ))}
      </TagsContainer>
      <SubTitle>Latest posts</SubTitle>
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
