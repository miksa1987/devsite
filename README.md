# DevSite

A minimalistic site template for developers. Featuring portfolio-like features as highlighting projects and about me section, and above all, a blog, featuring search by tags.

## 🚀 Quick start

#### 1. Clone this repository

#### 2. Create a Contentful space with content types: Person, Project, BlogPost At least following fields are required.

**BlogPost fields:**

- Title, short text
- Body, rich text
- Tags, short text, list
- Slug, short text

**Person fields:**

- Avatar, media
- Display name, short text
- Description title, short text
- Github, short text
- Email, short text
- Twitter, short text
- Facebook, short text
- Linkedin, short text
- Short bio, short text
- Skills, short text, list
- Long bio, rich text

**Project fields:**

- Title, short text
- Role, short text
- Description, short text
- URL, short text
- Source URL, short text

Update your Person ID to queries at the bottom of src/pages/index.js and src/pages/about.js
in here:
`contentfulPerson(contentful_id: { eq: "your id" })`

#### 3. Get your Contentful content delivery API key and space ID And place them in .env. See .env.example.

#### 4. Customize UI texts in src/config.js if you like

#### 5. Start the dev server to see what it looks like!

`Run 'gatsby develop' `

## Contributing

Feel free to submit an issue or pull request!
