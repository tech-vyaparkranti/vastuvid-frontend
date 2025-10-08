import { useEffect, useRef, useState } from 'react';

const FALLBACK_VIDEO = 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4';

const AppVideo = ({ sources = [], className = '', autoPlay = true, muted = true, loop = true, playsInline = true, ...rest }) => {
  const videoRef = useRef(null);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onError = () => {
      if (usedFallback) return;
      setUsedFallback(true);
      while (video.firstChild) video.removeChild(video.firstChild);
      const s = document.createElement('source');
      s.src = FALLBACK_VIDEO;
      s.type = 'video/mp4';
      video.appendChild(s);
      try {
        video.load();
        video.play && video.play();
      } catch {}
    };
    video.addEventListener('error', onError, true);
    return () => video.removeEventListener('error', onError, true);
  }, [usedFallback]);

  return (
    <video ref={videoRef} className={className} autoPlay={autoPlay} muted={muted} loop={loop} playsInline={playsInline} {...rest}>
      {sources.map((s, i) => (
        <source key={i} src={s.src} type={s.type || 'video/mp4'} />
      ))}
    </video>
  );
};

export default AppVideo;


