import React from 'react'
import { Helmet } from 'react-helmet'
import { seo } from '../config'

const Seo = () => {
  return (
    <Helmet title={seo.title} titleTemplate="Mikas corner">
      <meta name="description" content={seo.description} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
    </Helmet>
  )
}

export default Seo
