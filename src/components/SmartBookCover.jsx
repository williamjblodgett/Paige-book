import BookCover from './BookCover'
import useBookCoverImage from '../hooks/useBookCoverImage'

export default function SmartBookCover({ book, size = 'full', className = '' }) {
  const { coverUrl } = useBookCoverImage(book)

  if (coverUrl) {
    return (
      <img
        src={coverUrl}
        alt={`${book.title} cover`}
        className={`w-full h-full object-cover ${className}`}
      />
    )
  }

  return <BookCover book={book} size={size} className={className} />
}
