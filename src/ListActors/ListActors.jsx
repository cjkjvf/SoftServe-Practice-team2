import React, { useRef, useState, useEffect } from 'react'
import './ListActors.scss'
import listActors from './listActors.json'

const ListActors = () => {
  const scrollRef = useRef(null)
  const [widthImg, setWidthImg] = useState(window.innerWidth > 768 ? 216 : 108)
  const [gap, setGap] = useState(10)
  const [widthScroll, setWidthScroll] = useState(widthImg + gap)

  useEffect(() => {
    const handleResize = () => {
      const newWidthImg = window.innerWidth > 768 ? 216 : 108
      setWidthImg(newWidthImg)
      setWidthScroll(newWidthImg + gap)
    }

    window.addEventListener('resize', handleResize)

    // Запустити один раз на старті
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [gap])

  const [isStart, setIsStart] = useState(true)
  const [isFinish, setIsFinish] = useState(false)

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setIsStart(scrollLeft === 0)
      setIsFinish(scrollLeft + clientWidth >= scrollWidth - 1) // -1 для компенсації округлення
    }
  }

  const scroll = direction => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -widthScroll : widthScroll,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    const node = scrollRef.current
    if (!node) return

    // Перевірка при завантаженні
    checkScrollPosition()

    // Слухач скролу
    const handleScroll = () => {
      checkScrollPosition()
    }
    node.addEventListener('scroll', handleScroll)

    return () => {
      node.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="list-actors-wrapper">
      <div className="pagination">
        <div
          className={`left ${isStart ? 'no-active' : 'active'}`}
          onClick={() => scroll('left')}
        >
          <svg width="6" height="11" viewBox="0 0 6 11" fill="none">
            <path
              d="M5.56047 0.3C5.04291 0.8176 2.57979 3.2808 1.00544 4.8551C0.69302 5.1675 0.69374 5.6733 1.00616 5.9857L5.56047 10.54"
              stroke="white"
              strokeWidth="0.8"
            />
          </svg>
        </div>
        <div
          className={`right ${isFinish ? 'no-active' : 'active'}`}
          onClick={() => scroll('right')}
        >
          <svg width="6" height="11" viewBox="0 0 6 11" fill="none">
            <path
              d="M0.439532 10.7C0.9571 10.1824 3.42021 7.7192 4.99456 6.1449C5.30698 5.8325 5.30626 5.3267 4.99384 5.0143L0.439532 0.46"
              stroke="white"
              strokeWidth="0.8"
            />
          </svg>
        </div>
      </div>
      <div className="list-actors" style={{ gap: gap + 'px' }} ref={scrollRef}>
        {listActors.map(x => (
          <div className="actor" key={x.id}>
            <img src={x.src} width={widthImg + 'px'} />
            <p style={{ width: widthImg }}>{x.name}</p>
            <span>{x.role}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListActors