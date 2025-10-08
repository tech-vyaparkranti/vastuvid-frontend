import { useState, useCallback } from 'react';

const FALLBACK_SRC = 'https://placehold.co/800x500?text=Image';

const AppImage = ({ src, alt = '', className = '', ...rest }) => {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK_SRC);
  const [didFallback, setDidFallback] = useState(false);

  const handleError = useCallback(() => {
    if (didFallback) return;
    setDidFallback(true);
    setImgSrc(FALLBACK_SRC);
  }, [didFallback]);

  return (
    <img src={imgSrc} alt={alt} className={className} onError={handleError} {...rest} />
  );
};

export default AppImage;


