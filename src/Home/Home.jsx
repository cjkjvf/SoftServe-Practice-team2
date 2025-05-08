import React from 'react';
import './Home.css';
import PromoSlider from './PromoSlider';

const Home = () => {
  return (
    <div className='home'>
      <PromoSlider />
      
      <div className="additional-content">
        <h2>Заголовок контенту після слайдера</h2>
        <p>
          Це додатковий текст або інформація, яку можна додати під слайдером. 
          Тут ви можете помістити будь-який контент, наприклад, текст, зображення чи інші компоненти.
        </p>
        <button className="cta-button">Дізнатись більше</button>
      </div>

      <div className="extra-section">
        <h3>Ще один розділ</h3>
        <p>
          Цей розділ можна використати для ще більшого контенту або для якихось конкретних 
          пропозицій або новин.
        </p>
      </div>
    </div>
  );
}

export default Home;
