import React, { useState, useEffect } from 'react';
import { getProductPhoto } from '../utils/imageStorage';

interface ProductImageProps {
  photoName: string;
  primarySrc: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  photoName,
  primarySrc,
  fallbackSrc,
  alt,
  className = '',
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(primarySrc);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Check if custom uploaded photo exists in browser storage
    getProductPhoto(photoName).then((customData) => {
      if (isMounted && customData) {
        setCurrentSrc(customData);
      }
    });

    const handlePhotoUpdated = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.filename === photoName) {
        setCurrentSrc(customEvent.detail.dataUrl);
        setHasError(false);
      }
    };

    window.addEventListener('sl_photo_updated', handlePhotoUpdated);
    return () => {
      isMounted = false;
      window.removeEventListener('sl_photo_updated', handlePhotoUpdated);
    };
  }, [photoName, primarySrc]);

  const handleError = () => {
    if (!hasError && currentSrc !== fallbackSrc) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      className={className}
      referrerPolicy="no-referrer"
      loading="lazy"
    />
  );
};
