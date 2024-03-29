import * as React from 'react'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import { texts } from '../config'
import { Project, ProjectData } from '../domain/work'

import {
  Page,
  Title,
  SubTitle,
  Body,
  ResponsiveRow,
  Row,
  scale,
} from '../components/general'

const SpaceBetweenResponsiveRow = styled(ResponsiveRow)`
  justify-content: space-between;
  align-items: center;
`

const LinksRow = styled(Row)`
  & > * {
    margin-right: ${scale(1)};
    text-decoration: none;
  }
`

const ProjectCardContainer = styled.div`
  display: flex;
  width: 95%;
  border-bottom: 1px dotted ${props => props.theme.primary};
  display: flex;
  flex-direction: column;
  padding: ${scale(1)};
  margin: ${scale(2)};

  &:last-of-type {
    padding-bottom: ${scale(5)};
  }
`

type ProjectCardProps = {
  project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <ProjectCardContainer>
    <SpaceBetweenResponsiveRow>
      <SubTitle compact>{project.title}</SubTitle>
      <LinksRow>
        {project.sourceUrl && (
          <Link to={project.sourceUrl}>{texts.work.sourceUrl}</Link>
        )}
        {project.url && <Link to={project.url}>{texts.work.projectUrl}</Link>}
      </LinksRow>
    </SpaceBetweenResponsiveRow>
    <Body compact>{project.description}</Body>
    {project.role && <Body compact>Role: {project.role}</Body>}
  </ProjectCardContainer>
)

type Props = {
  data: ProjectData
}

const WorkPage: React.FC<Props> = ({ data }) => {
  const {
    allContentfulProject: { edges },
  } = data
  const projects = edges.map((edge) =>
    edge.node
  )

  return (
    <Page>
      <Title>{texts.work.title}</Title>
      {projects?.length > 0 &&
        projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
    </Page>
  )
}

export default WorkPage

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
        }
      }
    }
  }
`
