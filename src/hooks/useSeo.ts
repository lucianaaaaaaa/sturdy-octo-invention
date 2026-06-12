import { useEffect } from 'react'

interface SeoConfig {
  title: string
  description: string
}

const setMetaTag = (selector: string, attribute: 'name' | 'property', value: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`${selector}[${attribute}="${value}"]`)

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, value)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
}

const useSeo = ({ title, description }: SeoConfig) => {
  useEffect(() => {
    document.title = title

    setMetaTag('meta', 'name', 'description', description)
    setMetaTag('meta', 'property', 'og:title', title)
    setMetaTag('meta', 'property', 'og:description', description)
    setMetaTag('meta', 'property', 'og:type', 'website')
    setMetaTag('meta', 'property', 'og:image', '/vite.svg')
  }, [description, title])
}

export default useSeo