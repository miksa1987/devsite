import * as React from "react";
import { graphql } from "gatsby";
import Navigation from "../components/Navigation";
import { texts, commentsEnabled } from "../config";

import { Page, Title, TextLink } from "../components/general";
import Comments from "../components/Comments";
import { parseContent } from "../util/parser";
import {
  initFirebase,
  getCommentsForPost,
  setAuthObserver,
  signIn,
  signOut,
} from "../util/firebase";

const BlogPostPage = ({ data }) => {
  const [user, setUser] = React.useState(null);
  const [comments, setComments] = React.useState([]);

  const content = JSON.parse(data.contentfulBlogPost.body.raw).content;
  const title = data.contentfulBlogPost.title;

  const assets = data.allContentfulAsset.edges.map((edge) => ({
    id: edge.node.contentful_id,
    src: edge.node.file.url,
    alt: edge.node.title,
  }));

  const firebaseConfig = data.site.siteMetadata.firebaseConfig;

  const getComments = async () => {
    await initFirebase(firebaseConfig);
    const commentsData = await getCommentsForPost(
      data.contentfulBlogPost.contentful_id
    );
    setComments(commentsData);
  };

  React.useEffect(() => {
    if (commentsEnabled) {
      getComments();
      setAuthObserver(setUser);
    }
  }, []);

  return (
    <Page>
      <Navigation />
      <TextLink to="/">{texts.common.backToHome}</TextLink>
      <Title>{title}</Title>
      {parseContent(content, assets)}
      {commentsEnabled && (
        <Comments
          postId={data.contentfulBlogPost.contentful_id}
          comments={comments}
          getComments={getComments}
          user={user}
          signIn={signIn}
          signOut={signOut}
        />
      )}
    </Page>
  );
};

export default BlogPostPage;

export const BlogPostQuery = graphql`
  query BlogPostQuery($contentfulId: String!) {
    contentfulBlogPost(contentful_id: { eq: $contentfulId }) {
      contentful_id
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
    site {
      siteMetadata {
        firebaseConfig {
          apiKey
          authDomain
          appId
          storageBucket
          projectId
        }
      }
    }
  }
`;
