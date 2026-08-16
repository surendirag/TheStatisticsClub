import type { SiteContent } from '../types'

export const defaultContent: SiteContent = {
  home: {
    heroTitle: 'The Statistics Club',
    heroSubtitle: 'Exploring data, probability, and insight together',
    intro:
      'Welcome to The Statistics Club — a community for students passionate about statistics, data science, and analytical thinking. Join us for workshops, talks, and collaborative projects.',
  },
  members: [
    {
      id: '1',
      name: 'Alex Rivera',
      rollNumber: 'CS24B001',
      photo: '',
      domain: 'Core Team',
    },
    {
      id: '2',
      name: 'Jordan Lee',
      rollNumber: 'CS24B014',
      photo: '',
      domain: 'Core Team',
    },
    {
      id: '3',
      name: 'Sam Patel',
      rollNumber: 'CS24B027',
      photo: '',
      domain: 'Events',
    },
    {
      id: '4',
      name: 'Taylor Kim',
      rollNumber: 'CS24B033',
      photo: '',
      domain: 'Events',
    },
    {
      id: '5',
      name: 'Casey Morgan',
      rollNumber: 'CS24B045',
      photo: '',
      domain: 'Outreach',
    },
  ],
  news: [
    {
      id: '1',
      title: 'Club registration open for 2026',
      content:
        'We are now accepting new members for the upcoming academic year. Fill out the interest form at our next orientation session.',
      date: '2026-08-01',
    },
    {
      id: '2',
      title: 'Guest lecture: Bayesian methods in practice',
      content:
        'Join us for an introductory talk on Bayesian inference with real-world case studies from industry and research.',
      date: '2026-08-10',
    },
  ],
  events: [
    {
      id: '1',
      title: 'Intro to R Workshop',
      description: 'Hands-on session covering data import, visualization, and basic modeling in R.',
      date: '2026-07-15',
      location: 'Lab 204',
      status: 'previous',
    },
    {
      id: '2',
      title: 'Statistics Olympiad Prep',
      description: 'Weekly problem-solving sessions for the national statistics competition.',
      date: '2026-08-16',
      location: 'Seminar Hall A',
      status: 'ongoing',
    },
    {
      id: '3',
      title: 'Data Visualization Hackathon',
      description: 'Team-based challenge to tell compelling stories with open datasets.',
      date: '2026-09-05',
      location: 'Innovation Center',
      status: 'upcoming',
    },
    {
      id: '4',
      title: 'Annual Club Meet',
      description: 'End-of-semester celebration with member presentations and awards.',
      date: '2026-11-20',
      location: 'Main Auditorium',
      status: 'upcoming',
    },
  ],
}

const STORAGE_KEY = 'statistics-club-content'

export function loadContent(): SiteContent {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored) as SiteContent
    }
  } catch {
    // fall through to default
  }
  return defaultContent
}

export function saveContent(content: SiteContent): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
}

export function resetContent(): SiteContent {
  localStorage.removeItem(STORAGE_KEY)
  return defaultContent
}
