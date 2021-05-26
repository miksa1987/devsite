module.exports = {
  siteMetadata: {
    title: "DevSite",
  },
  plugins: [
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: "FKNtvRqFKpSM-4XxjK1tEz1W6Fc47d9fyQfZPAk2b-o",
        spaceId: "u8kk0rkv977x",
      },
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-react-helmet",
  ],
};
