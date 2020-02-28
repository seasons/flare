export interface NavProps {
  fixed?: boolean
  links?: { text: string; url: string; match?: RegExp }[]
}
