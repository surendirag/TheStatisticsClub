import { createContext, useContext, type ReactNode } from 'react'
import { defaultContent } from '../data/mockData'
import type { SiteContent } from '../types'

interface ContentContextValue {
  content: SiteContent
}

const ContentContext = createContext<ContentContextValue | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  return (
    <ContentContext.Provider value={{ content: defaultContent }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) {
    throw new Error('useContent must be used within ContentProvider')
  }
  return ctx
}
