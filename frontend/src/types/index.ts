export type EventStatus = 'previous' | 'ongoing' | 'upcoming'

export interface Member {
  id: number | string
  name: string
  rollNo: string
  rollNumber?: string
  domain: string
  imageUrl?: string
  photo?: string
  cloudinaryId?: string
}

export interface NewsItem {
  id: number | string
  title: string
  description: string
  content?: string
  date: string
  imageUrl?: string
  image?: string
  cloudinaryId?: string
}

export interface ClubEvent {
  id: number | string
  title: string
  description: string
  date: string
  location: string
  status: EventStatus
  imageUrl?: string
  image?: string
  cloudinaryId?: string
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
