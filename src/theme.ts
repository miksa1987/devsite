export type Theme = {
  background: string
  text: string
  textSecondary: string
  primary: string
  link: string
  codeBackground: string
  codeText: string
}

const theme: Theme = {
  background: '#fbf1c7',
  text: '#282828',
  textSecondary: '#504945',
  primary: '#cc241d',
  link: '#d65d0e',
  codeBackground: '#f2e5bc',
  codeText: '#282828',
}

export const darkTheme = {
  background: '#333333',
  text: '#F1B1C7',
  textSecondary: '#282828',
  primary: '#F1B1C7',
  link: '#457AFF',
}

export const tagColors = {
  cyan: '#8BE9FD',
  green: '#50FA7B',
  orange: '#FFB86C',
  pink: '#FF79C6',
  purple: '#BD93F9',
  red: 'FF5555',
  yellow: '#F1FA8C',
}

export const defaultTagColor = tagColors.cyan

export default theme
