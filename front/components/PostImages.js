import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import ImageZoom from './ImagesZoom';

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img src={`http://localhost:8080/${images[0].src}`} onClick={onZoom} alt={images[0].src} />
        {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <div>
        <img src={`http://localhost:8080/${images[0].src}`} width="50%" onClick={onZoom} alt={images[0].src} />
        <img src={`http://localhost:8080/${images[1].src}`} width="50%" onClick={onZoom} alt={images[1].src} />
        {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
      </div>
    );
  }

  return (
    <>
      <div>
        <img src={`http://localhost:8080/${images[0].src}`} width="50%" onClick={onZoom} alt={images[0].src} />
        <div style={{
          display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle',
        }}
        >
          <Icon type="plus" />
          <br />
          {images.length - 1}
          {' '}
        개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImageZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string,
  })).isRequired,
};

export default PostImages;
