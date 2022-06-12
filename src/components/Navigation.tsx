import React from 'react'
import styled from 'styled-components'
import { ResponsiveGrid, Link  } from './general'
import { navigationLinks } from '../config'

const NavigationContainer = styled.div`
  width: 100%;
  justify-content: flex-start;
  border-bottom: 1px dotted ${props => props.theme.primary};
`

const Navigation: React.FC = () => (
  <NavigationContainer>
    <ResponsiveGrid>
      <Link to={navigationLinks.index.path}>{navigationLinks.index.title}</Link>
      <Link to={navigationLinks.about.path}>{navigationLinks.about.title}</Link>
      <Link to={navigationLinks.work.path}>{navigationLinks.work.title}</Link>
    </ResponsiveGrid>
  </NavigationContainer>
)

export default Navigation
