export type EventStatus = 'previous' | 'ongoing' | 'upcoming'

export interface Member {
  id: string
  name: string
  rollNumber: string
  photo: string
  domain: string
}

export interface NewsItem {
  id: string
  title: string
  content: string
  date: string
  image?: string
}

export interface ClubEvent {
  id: string
  title: string
  description: string
  date: string
  location: string
  status: EventStatus
  image?: string
}

export interface HomeContent {
  heroTitle: string
  heroSubtitle: string
  intro: string
}

export interface SiteContent {
  home: HomeContent
  members: Member[]
  news: NewsItem[]
  events: ClubEvent[]
}
