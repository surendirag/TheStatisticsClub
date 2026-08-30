import type { NewsItem } from '../types'
import './NewsCard.css'

interface NewsCardProps {
  item: NewsItem
}

function formatDate(date: string) {
  if (!date) return ''
  const parsed = new Date(date)
  if (isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function NewsCard({ item }: NewsCardProps) {
  const image = item.imageUrl || item.image
  const description = item.description || item.content

  return (
    <article className="news-card card">
      {image && (
        <div className="card-image-wrapper">
          <img src={image} alt={item.title} className="card-image" />
        </div>
      )}
      <time dateTime={item.date}>{formatDate(item.date)}</time>
      <h3>{item.title}</h3>
      <p>{description}</p>
    </article>
  )
}
