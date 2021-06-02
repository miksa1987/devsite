import React from "react";
import { ResponsiveGrid, Link } from "./general";

const links = {
  about: {
    title: "About",
    path: "/about",
  },
  work: {
    title: "Work",
    path: "/work",
  },
  blog: {
    title: "Blog",
    path: "/blog",
  },
};

const Navigation = () => (
  <ResponsiveGrid>
    <Link to={links.about.path}>{links.about.title}</Link>
    <Link to={links.work.path}>{links.work.title}</Link>
    <Link to={links.blog.path}>{links.blog.title}</Link>
  </ResponsiveGrid>
);

export default Navigation;
