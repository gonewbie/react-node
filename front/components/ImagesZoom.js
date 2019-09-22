import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';
import {
  Overlay, Header, CloseBtn, Slickwrapper, ImageWrapper, Indicator,
} from './styles/ImagesZoom';

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn type="close" onClick={onClose} />
      </Header>
      <Slickwrapper>
        <div>
          <Slick
            initialSlide={0}
            afterChange={(slide) => setCurrentSlide(slide)}
            infinite={false}
            arrows
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => (
              <ImageWrapper style={{ padding: 32, textAlign: 'center' }}>
                <img src={`http://localhost:8080/${v.src}`} alt="" style={{ margin: '0 auto', maxHeight: 750 }} />
              </ImageWrapper>
            ))}
          </Slick>
          <div>
            <Indicator>
              <div>
                {currentSlide + 1}
                {' '}
                /
                {' '}
                {images.length}
              </div>
            </Indicator>
          </div>
        </div>
      </Slickwrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;
