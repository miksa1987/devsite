import * as React from "react";
import { graphql } from "gatsby";
import Navigation from "../components/Navigation";
import Contact from "../components/Contact";
import { texts } from "../config";

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
    email,
    github,
    twitter,
    linkedIn,
    facebook,
    avatar: {
      file: { url: avatar },
    },
  } = data.contentfulPerson;

  const contactData = { email, github, twitter, linkedIn, facebook };

  return (
    <Page>
      <AvatarImage src={avatar} alt="Avatar" marginTop={scale(12)} />
      <Title>
        {texts.index.hi} {displayName} {texts.index.hiEmoji}
      </Title>
      <Body>{descriptionTitle}</Body>
      <Body>{texts.index.like}</Body>
      <List>
        {skills.map((skill) => (
          <ListItem key={skill}>
            <Body>{skill}</Body>
          </ListItem>
        ))}
      </List>
      <Contact {...contactData} />
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
      linkedIn
      facebook
      email
      twitter
      github
      avatar {
        file {
          url
        }
      }
    }
  }
`;
