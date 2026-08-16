import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { loadContent, resetContent, saveContent } from '../data/mockData'
import type { ClubEvent, HomeContent, Member, NewsItem, SiteContent } from '../types'

interface ContentContextValue {
  content: SiteContent
  updateHome: (home: HomeContent) => void
  updateMembers: (members: Member[]) => void
  updateNews: (news: NewsItem[]) => void
  updateEvents: (events: ClubEvent[]) => void
  resetToDefault: () => void
}

const ContentContext = createContext<ContentContextValue | null>(null)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => loadContent())

  const persist = useCallback((updater: (prev: SiteContent) => SiteContent) => {
    setContent((prev) => {
      const next = updater(prev)
      saveContent(next)
      return next
    })
  }, [])

  const updateHome = useCallback(
    (home: HomeContent) => {
      persist((prev) => ({ ...prev, home }))
    },
    [persist],
  )

  const updateMembers = useCallback(
    (members: Member[]) => {
      persist((prev) => ({ ...prev, members }))
    },
    [persist],
  )

  const updateNews = useCallback(
    (news: NewsItem[]) => {
      persist((prev) => ({ ...prev, news }))
    },
    [persist],
  )

  const updateEvents = useCallback(
    (events: ClubEvent[]) => {
      persist((prev) => ({ ...prev, events }))
    },
    [persist],
  )

  const resetToDefault = useCallback(() => {
    const next = resetContent()
    setContent(next)
  }, [])

  const value = useMemo(
    () => ({
      content,
      updateHome,
      updateMembers,
      updateNews,
      updateEvents,
      resetToDefault,
    }),
    [content, updateHome, updateMembers, updateNews, updateEvents, resetToDefault],
  )

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) {
    throw new Error('useContent must be used within ContentProvider')
  }
  return ctx
}
