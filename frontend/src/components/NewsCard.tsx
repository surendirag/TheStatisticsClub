import type { NewsItem } from '../types'
import './NewsCard.css'

interface NewsCardProps {
  item: NewsItem
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function NewsCard({ item }: NewsCardProps) {
  return (
    <article className="news-card card">
      <time dateTime={item.date}>{formatDate(item.date)}</time>
      <h3>{item.title}</h3>
      <p>{item.content}</p>
    </article>
  )
}
