import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Autoplay, Navigation } from 'swiper/modules';
import './PromoSlider.css';

const slides = [
  { image: 'src/assets/minecraft.png' },
  { image: 'src/assets/mission-impossible.png' },
  { image: 'src/assets/One-Punch-Man.png' },
  { image: 'src/assets/Clown-Cornfield.png' },
  { image: 'src/assets/Serfer.png' },
  { image: 'src/assets/Shaleniy-copu.png' },
  { image: 'src/assets/Pynct-priznachenya-rodove-proclyatya.png' },
];

export default function PromoSlider() {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{
        delay: 4100,
        disableOnInteraction: false,
      }}
      loop={true}
      speed={1500}
      initialSlide={0}
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
              </div>
              {/* Кнопка на кожному слайді */}
              <button className="action-button">Обрати сеанс</button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}


