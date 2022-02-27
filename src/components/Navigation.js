import React from "react";
import { ResponsiveGrid, Link } from "./general";
import { navigationLinks } from "../config";

const Navigation = () => (
  <ResponsiveGrid>
    <Link to={navigationLinks.about.path}>{navigationLinks.about.title}</Link>
    <Link to={navigationLinks.work.path}>{navigationLinks.work.title}</Link>
  </ResponsiveGrid>
);

export default Navigation;
