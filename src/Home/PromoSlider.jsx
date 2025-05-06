import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import './PromoSlider.css';

const slides = [
  {
    image: 'src/assets/minecraft.png',
  },
  {
    image: 'src/assets/mission-impossible.png', // Додайте ще зображення для слайдера
  },
  {
    image: 'src/assets/One-Punch-Man.png',
  },

  {
    image: 'src/assets/Clown-Cornfield.png',
  },
  
  {
    image: 'src/assets/Serfer.png',
  },
];

export default function PromoSlider() {
  return (
    <Swiper
      navigation
      modules={[Navigation]}
      autoplay={{ delay: 3000 }}  // Автоматичне перемикання кожні 3 секунди
      className="promo-slider"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div 
            className="slide" 
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay">
              <div className="slide-info">
                <h1>Title of the Slide</h1>
                {/* Можна додати більше інформації тут */}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}


