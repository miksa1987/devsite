import * as React from "react";
import { graphql, Link } from "gatsby";
import Navigation from "../components/Navigation";
import { texts } from "../config";

import { Page, Title, SubTitle, SubSubTitle } from "../components/general";
import { Post, Tag, TagsContainer } from "../components/post";
import { getTags } from "../util/parser";

const BlogPage = ({ data, pageContext: { tag } }) => {
  const blogPosts = data.allContentfulBlogPost.edges.map((edge) => edge.node);

  const shownPosts = blogPosts.filter((post) =>
    post.tags.map((tag) => tag.toLowerCase()).includes(tag)
  );

  return (
    <Page>
      <Navigation />
      <Link to="/">{texts.common.backToHome}</Link>
      <Title>{texts.blog.title}</Title>
      <SubSubTitle>{texts.taggedPosts.searchDescription}</SubSubTitle>
      <TagsContainer>
        {getTags(blogPosts).map((tag, index) => (
          <Tag key={index} tag={tag} />
        ))}
      </TagsContainer>
      <SubTitle>
        {texts.taggedPosts.withTag} {tag}
      </SubTitle>
      {shownPosts.map((post, index) => (
        <Post key={index} post={post} />
      ))}
    </Page>
  );
};

export default BlogPage;

export const query = graphql`
  query TaggedBlogPostsQuery {
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
