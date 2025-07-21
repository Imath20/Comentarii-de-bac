import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import scriitoriData from '../scriitoriData';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Scriitor = () => {
  const query = useQuery();
  const name = query.get('name');
  const data = scriitoriData[name];
  const bannerRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (!isFullScreen) {
      if (bannerRef.current.requestFullscreen) {
        bannerRef.current.requestFullscreen();
      } else if (bannerRef.current.webkitRequestFullscreen) {
        bannerRef.current.webkitRequestFullscreen();
      } else if (bannerRef.current.msRequestFullscreen) {
        bannerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      // Scroll la top după tranziție (după 700ms)
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 700);
    }
  };

  useEffect(() => {
    const handleChange = () => {
      const fsElement = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
      setIsFullScreen(!!fsElement);
    };
    document.addEventListener('fullscreenchange', handleChange);
    document.addEventListener('webkitfullscreenchange', handleChange);
    document.addEventListener('msfullscreenchange', handleChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleChange);
      document.removeEventListener('webkitfullscreenchange', handleChange);
      document.removeEventListener('msfullscreenchange', handleChange);
    };
  }, []);

  if (!data) {
    return <div style={{ padding: '3rem', textAlign: 'center' }}>Scriitorul nu a fost găsit.</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', width: '100vw', overflowX: 'hidden' }}>
      {/* Banner pe toată lățimea ferestrei */}
      <div
        ref={bannerRef}
        style={{
          width: '100vw',
          height: isFullScreen ? '100vh' : 450,
          background: `url(${data.banner}) center center/cover no-repeat`,
          backgroundPosition: name === 'eminescu' ? 'center 30%' : 'center',
          position: 'relative',
          left: 0,
          top: 0,
          margin: 0,
          padding: 0,
          boxShadow: '0 4px 24px 0 rgba(124,79,43,0.10)',
          zIndex: 1,
          transition: 'height 0.3s',
        }}
      >
        {/* Buton full screen dreapta sus */}
        <button
          onClick={handleFullScreen}
          style={{
            position: 'absolute',
            top: 18,
            right: 28,
            background: 'none',
            border: 'none',
            borderRadius: '50%',
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'none',
            cursor: 'pointer',
            zIndex: 20,
            transition: 'background 0.2s',
            padding: 0,
          }}
          title={isFullScreen ? "Ieși din full screen" : "Full screen banner"}
        >
          <img
            src={isFullScreen ? '/utilitary/minimize.png' : '/utilitary/full-size.png'}
            alt={isFullScreen ? 'Ieși din full screen' : 'Full screen'}
            style={{ width: 20, height: 20, objectFit: 'contain', filter: 'invert(1) brightness(2)' }}
          />
        </button>
        {/* Poza de profil și info scriitor - ascunse în full screen */}
        {!isFullScreen && (
          <>
            {/* Poza de profil rotundă, centrată absolut peste banner */}
            <div style={{
              position: 'absolute',
              left: '50%',
              bottom: -90,
              transform: 'translateX(-50%)',
              width: 180,
              height: 180,
              borderRadius: '50%',
              background: '#fff',
              boxShadow: '0 8px 32px 0 rgba(60,40,20,0.13)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '7px solid #fff',
              zIndex: 10,
            }}>
              <img src={data.img} alt={data.nume} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </>
        )}
      </div>
      {/* Info scriitor centrat sub poză */}
      {!isFullScreen && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 110,
          marginBottom: 32,
          padding: '0 1rem',
          zIndex: 2,
        }}>
          <h1 style={{ fontSize: '2.7rem', fontWeight: 900, margin: 0, textAlign: 'center' }}>{data.nume}</h1>
          <div style={{ fontSize: '1.25rem', color: '#a97c50', fontWeight: 500, marginTop: 8, textAlign: 'center' }}>{data.date}</div>
        </div>
      )}
      {/* Conținut jos (necompletat) */}
      <div style={{ minHeight: 300, background: 'transparent', textAlign: 'center', color: '#bbb', fontStyle: 'italic' }}>
        {/* Aici va fi conținutul detaliat pentru scriitor */}
      </div>
    </div>
  );
};

export default Scriitor; 