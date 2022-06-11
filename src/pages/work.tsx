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
  TextLink,
} from '../components/general'

const SpaceBetweenResponsiveRow = styled(ResponsiveRow)`
  justify-content: space-between;
`

const ProjectCardContainer = styled.div`
  display: flex;
  width: 95%;
  border-top: 1px dotted black;
  display: flex;
  flex-direction: column;
  padding: ${scale(1)};
  margin: ${scale(2)};

  border-bottom: 1px dotted ${props => props.theme.primary};
  padding-bottom: ${scale(5)};
`

type ProjectCardProps = {
  project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => (
  <ProjectCardContainer>
    <SpaceBetweenResponsiveRow>
      <SubTitle compact>{project.title}</SubTitle>
      <Row>
        {project.sourceUrl && (
          <Link to={project.sourceUrl}>{texts.work.sourceUrl}</Link>
        )}
        {project.url && <Link to={project.url}>{texts.work.projectUrl}</Link>}
      </Row>
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
      <TextLink to="/">{texts.common.backToHome}</TextLink>
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
