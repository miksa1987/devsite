import React from "react";
import styled from 'styled-components'
import { FaGithub, FaTwitter, FaFacebook, FaInstagram, FaEnvelope, FaLinkedin } from 'react-icons/fa'

import { Row, scale } from './general'

const ICON_SIZE = scale(5)

const Container = styled(Row)`
  margin-top: ${scale(10)};
  justify-content: space-between;
  align-items: center;
  width: calc(100% - ${scale(3)});
  max-width: ${scale(40)};
  padding-left: ${scale(2)};
  padding-right: ${scale(2)};
`


const Contact = ({ linkedIn, twitter, github, email, facebook, instagram }) => {
  return (
    <Container>
      {email && <a target="_blank"href={`mailto:${email}`} rel="noreferrer"><FaEnvelope color="black" size={ICON_SIZE}/></a>}
      {github && <a target="_blank"href={github} rel="noreferrer"><FaGithub color="black" size={ICON_SIZE}/></a>}
      {twitter && <a target="_blank"href={twitter} rel="noreferrer"><FaTwitter color="black" size={ICON_SIZE}/></a>}
      {linkedIn && <a target="_blank"href={linkedIn} rel="noreferrer"><FaLinkedin color="black" size={ICON_SIZE}/></a>}
      {facebook && <a target="_blank"href={facebook} rel="noreferrer"><FaFacebook color="black" size={ICON_SIZE}/></a>}
      {instagram && <a target="_blank"href={instagram} rel="noreferrer"><FaInstagram color="black" size={ICON_SIZE}/></a>}
    </Container>
  )
}


export default Contact
