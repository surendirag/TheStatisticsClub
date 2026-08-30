import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { SiteContent, ClubEvent, NewsItem, Member } from '../types'
import { defaultContent } from '../data/mockData'

const API_BASE = 'http://localhost:5000/api'

interface ContentContextValue {
  content: SiteContent
  loading: boolean
  error: string | null
  refetch: () => void
}

const ContentContext = createContext<ContentContextValue | null>(null)

async function fetchAll(): Promise<Partial<SiteContent>> {
  const [eventsRes, newsRes, membersRes] = await Promise.all([
    fetch(`${API_BASE}/events`),
    fetch(`${API_BASE}/news`),
    fetch(`${API_BASE}/members`),
  ])

  if (!eventsRes.ok || !newsRes.ok || !membersRes.ok) {
    throw new Error('Failed to fetch data from server')
  }

  const rawEvents: ClubEvent[] = await eventsRes.json()
  const rawNews: NewsItem[] = await newsRes.json()
  const rawMembers: Member[] = await membersRes.json()

  // Normalise Mongoose _id → id
  const events: ClubEvent[] = rawEvents.map((e) => ({
    ...e,
    id: (e as unknown as { _id: string })._id ?? e.id,
  }))

  const news: NewsItem[] = rawNews.map((n) => ({
    ...n,
    id: (n as unknown as { _id: string })._id ?? n.id,
    // Backend uses `description`; keep it as-is, component reads it directly
  }))

  const members: Member[] = rawMembers.map((m) => ({
    ...m,
    id: (m as unknown as { _id: string })._id ?? m.id,
    // Backend uses `rollNo`
  }))

  return { events, news, members }
}

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchAll()
      .then((data) => {
        if (!cancelled) {
          setContent((prev) => ({ ...prev, ...data }))
          setLoading(false)
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          // Keep showing mock/stale data so the UI isn't blank
          console.warn('API unavailable, using mock data:', err.message)
          setError(err.message)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [tick])

  const refetch = () => setTick((t) => t + 1)

  return (
    <ContentContext.Provider value={{ content, loading, error, refetch }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
