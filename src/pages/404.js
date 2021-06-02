import * as React from "react";
import { Link } from "gatsby";
import Navigation from "../components/Navigation";
import { texts } from "../config";

import { Page, Title, Body } from "../components/general";

const NotFoundPage = () => {
  return (
    <Page>
      <Navigation />
      <Link to="/">{texts.common.backToHome}</Link>
      <Title>{texts.notFound.title}</Title>
      <Title>{texts.notFound.emoji}</Title>
      <Body>{texts.notFound.description}</Body>
    </Page>
  );
};

export default NotFoundPage;
