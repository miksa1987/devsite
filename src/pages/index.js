import * as React from "react";
import { graphql } from "gatsby";
import Navigation from "../components/Navigation";

import {
  Page,
  AvatarImage,
  List,
  ListItem,
  Title,
  Body,
  scale,
} from "../components/general";

const IndexPage = ({ data }) => {
  const {
    displayName,
    descriptionTitle,
    skills,
    avatar: {
      file: { url: avatar },
    },
  } = data.contentfulPerson;

  return (
    <Page>
      <Navigation />
      <AvatarImage src={avatar} alt="Avatar" marginTop={scale(12)} />
      <Title>Hi, I'm {displayName} 👋</Title>
      <Body>{descriptionTitle}</Body>
      <Body>Like for example...</Body>
      <List>
        {skills.map((skill) => (
          <ListItem key={skill}>
            <Body>{skill}</Body>
          </ListItem>
        ))}
      </List>
    </Page>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexQuery {
    contentfulPerson(contentful_id: { eq: "1j1ULAoJlGjKwrUCiSIwVl" }) {
      displayName
      descriptionTitle
      skills
      avatar {
        file {
          url
        }
      }
    }
  }
`;
