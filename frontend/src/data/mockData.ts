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
      id: 1,
      name: 'Alex Rivera',
      rollNo: 'CS24B001',
      rollNumber: 'CS24B001',
      imageUrl: '',
      photo: '',
      domain: 'Core Team',
    },
    {
      id: 2,
      name: 'Jordan Lee',
      rollNo: 'CS24B014',
      rollNumber: 'CS24B014',
      imageUrl: '',
      photo: '',
      domain: 'Core Team',
    },
    {
      id: 3,
      name: 'Sam Patel',
      rollNo: 'CS24B027',
      rollNumber: 'CS24B027',
      imageUrl: '',
      photo: '',
      domain: 'Events',
    },
    {
      id: 4,
      name: 'Taylor Kim',
      rollNo: 'CS24B033',
      rollNumber: 'CS24B033',
      imageUrl: '',
      photo: '',
      domain: 'Events',
    },
    {
      id: 5,
      name: 'Casey Morgan',
      rollNo: 'CS24B045',
      rollNumber: 'CS24B045',
      imageUrl: '',
      photo: '',
      domain: 'Outreach',
    },
  ],
  news: [
    {
      id: 1,
      title: 'Club registration open for 2026',
      description:
        'We are now accepting new members for the upcoming academic year. Fill out the interest form at our next orientation session.',
      content:
        'We are now accepting new members for the upcoming academic year. Fill out the interest form at our next orientation session.',
      date: '2026-08-01',
    },
    {
      id: 2,
      title: 'Guest lecture: Bayesian methods in practice',
      description:
        'Join us for an introductory talk on Bayesian inference with real-world case studies from industry and research.',
      content:
        'Join us for an introductory talk on Bayesian inference with real-world case studies from industry and research.',
      date: '2026-08-10',
    },
  ],
  events: [
    {
      id: 1,
      title: 'Intro to R Workshop',
      description: 'Hands-on session covering data import, visualization, and basic modeling in R.',
      date: '2026-07-15',
      location: 'Lab 204',
      status: 'previous',
      imageUrl: '',
      cloudinaryId: '',
    },
    {
      id: 2,
      title: 'Statistics Olympiad Prep',
      description: 'Weekly problem-solving sessions for the national statistics competition.',
      date: '2026-08-16',
      location: 'Seminar Hall A',
      status: 'ongoing',
      imageUrl: '',
      cloudinaryId: '',
    },
    {
      id: 3,
      title: 'Data Visualization Hackathon',
      description: 'Team-based challenge to tell compelling stories with open datasets.',
      date: '2026-09-05',
      location: 'Innovation Center',
      status: 'upcoming',
      imageUrl: '',
      cloudinaryId: '',
    },
    {
      id: 4,
      title: 'Annual Club Meet',
      description: 'End-of-semester celebration with member presentations and awards.',
      date: '2026-11-20',
      location: 'Main Auditorium',
      status: 'upcoming',
      imageUrl: '',
      cloudinaryId: '',
    },
  ],
}
