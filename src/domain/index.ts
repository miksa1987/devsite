export type IndexData = {
  contentfulPerson: {
    displayName: string
    descriptionTitle: string
    skills: string[]
    email?: string
    github?: string
    twitter?: string
    linkedIn?: string
    facebook?: string
    avatar: {
      file: {
        url: string
      }
    }
  }
}
