import * as React from 'react'
import { Link } from 'gatsby'
import { texts } from '../config'

import { Page, Title, Body } from '../components/general'

const NotFoundPage: React.FC = () => {
    return (
        <Page>
            <Link to="/">{texts.common.backToHome}</Link>
            <Title>{texts.notFound.title}</Title>
            <Title>{texts.notFound.emoji}</Title>
            <Body>{texts.notFound.description}</Body>
        </Page>
    )
}

export default NotFoundPage
