import { useEffect, useState } from 'react'
import BookCover from './BookCover'
import useBookCoverImage from '../hooks/useBookCoverImage'

export default function SmartBookCover({ book, size = 'full', className = '' }) {
  const { coverUrl, loading } = useBookCoverImage(book)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgFailed, setImgFailed] = useState(false)

  useEffect(() => {
    setImgLoaded(false)
    setImgFailed(false)
  }, [coverUrl])

  if (loading) {
    return <div className={`cover-skeleton w-full h-full ${className}`} aria-hidden="true" />
  }

  if (coverUrl && !imgFailed) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        {!imgLoaded && <div className="cover-skeleton absolute inset-0" aria-hidden="true" />}
        <img
          src={coverUrl}
          alt={`${book.title} cover`}
          loading="lazy"
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgFailed(true)}
          width="320"
          height="480"
          className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
    )
  }

  return <BookCover book={book} size={size} className={className} />
}
