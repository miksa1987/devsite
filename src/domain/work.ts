export type ProjectData = {
  allContentfulProject: {
    edges: Array<{
      node: Project
    }>
  }
}

export type Project = {
  description: string
  title: string
  role: string
  shortDescription: string
  sourceUrl: string
  url: string
}
