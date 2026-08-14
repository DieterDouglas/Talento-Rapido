import { Star } from 'lucide-react'

type RatingStarsProps = {
  rating: number
}

export function RatingStars({ rating }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < rating ? 'fill-primary text-primary' : 'text-primary-light'}`}
        />
      ))}
    </div>
  )
}
