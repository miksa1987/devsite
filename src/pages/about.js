import * as React from "react";
import { graphql, Link } from "gatsby";
import Navigation from "../components/Navigation";

import { Page, Title, Body, scale } from "../components/general";

const AboutPage = ({ data }) => {
  const { displayName, longBio } = data.contentfulPerson;

  const getParagraphs = () => {
    const { content } = JSON.parse(longBio.raw);
    return content.map((chunk) => chunk.content[0].value);
  };

  return (
    <Page>
      <Navigation />
      <Link to="/">Back to home</Link>
      <Title>About me</Title>
      {getParagraphs().map((paragraph, index) => (
        <Body key={index}>{paragraph}</Body>
      ))}
    </Page>
  );
};

export default AboutPage;

export const query = graphql`
  query AboutQuery {
    contentfulPerson(contentful_id: { eq: "1j1ULAoJlGjKwrUCiSIwVl" }) {
      displayName
      longBio {
        raw
      }
    }
  }
`;
