import * as React from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import Navigation from "../components/Navigation";

import {
  Page,
  Title,
  SubTitle,
  Body,
  ResponsiveRow,
  Row,
  scale,
} from "../components/general";

const SpaceBetweenResponsiveRow = styled(ResponsiveRow)`
  justify-content: space-between;
`;

const ProjectCardContainer = styled.div`
  display: flex;
  width: 95%;
  border-top: 1px dotted black;
  display: flex;
  flex-direction: column;
  padding: ${scale(1)};
  margin: ${scale(2)};

  &:last-child {
    border-bottom: 1px dotted black;
    padding-bottom: ${scale(5)};
  }
`;

const ProjectCard = ({ project }) => (
  <ProjectCardContainer>
    <SpaceBetweenResponsiveRow>
      <SubTitle compact>{project.title}</SubTitle>
      <Row>
        {project.sourceUrl && <Link to={project.sourceUrl}>[ source ]</Link>}
        {project.url && <Link to={project.url}>[ live ]</Link>}
      </Row>
    </SpaceBetweenResponsiveRow>
    <Body compact>{project.description}</Body>
    {project.role && <Body compact>Role: {project.role}</Body>}
  </ProjectCardContainer>
);

const WorkPage = ({ data }) => {
  const {
    allContentfulProject: { edges },
  } = data;
  const projects = edges.map((edge) => ({
    ...edge.node,
    screenshot: edge.node.screenshot?.file?.url ?? null,
  }));

  return (
    <Page>
      <Navigation />
      <Link to="/">Back to home</Link>
      <Title>Work</Title>
      {projects?.length > 0 &&
        projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
    </Page>
  );
};

export default WorkPage;

export const query = graphql`
  query WorkQuery {
    allContentfulProject {
      edges {
        node {
          description
          role
          shortDescription
          sourceUrl
          url
          title
          sreenshot {
            file {
              url
            }
          }
        }
      }
    }
  }
`;
