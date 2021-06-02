exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query {
      allContentfulBlogPost {
        edges {
          node {
            slug
            contentful_id
            tags
          }
        }
      }
    }
  `);

  const tags = Array.from(
    new Set(
      data.allContentfulBlogPost.edges.map((edge) => edge.node.tags).flat()
    )
  );

  tags.forEach((tag) => {
    const tagInLowerCase = tag.toLowerCase();
    actions.createPage({
      path: `/blog/tag/${tagInLowerCase}`,
      component: require.resolve("./src/templates/taggedPosts"),
      context: { tag: tagInLowerCase },
    });
  });

  data.allContentfulBlogPost.edges.forEach((edge) => {
    const slug = edge.node.slug;
    const contentfulId = edge.node.contentful_id;

    actions.createPage({
      path: `/blog/post/${slug}`,
      component: require.resolve("./src/templates/blogPost"),
      context: { contentfulId },
    });
  });
};
