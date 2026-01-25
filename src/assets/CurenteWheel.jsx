import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CURENTE from '../data/curente.js';
import '../styles/curenteWheel.scss';

const CurenteWheel = ({ darkTheme }) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startAngle, setStartAngle] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [translateX, setTranslateX] = useState(260); // Default desktop value
  const wheelRef = useRef(null);
  const rotationRef = useRef(0);
  const navigate = useNavigate();

  // Calculează curentul activ bazat pe rotație (cel de sub săgeată)
  const getCurrentCurent = () => {
    const totalCurente = CURENTE.length;
    if (totalCurente === 0) return null;
    
    const anglePerCurent = 360 / totalCurente;
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    // Inversează logica și ajustează cu 5 poziții înainte
    let currentIndex = (Math.round((360 - normalizedRotation) / anglePerCurent) - 4) % totalCurente;
    
    // Asigură-te că indexul este valid
    if (currentIndex < 0) {
      currentIndex = (currentIndex + totalCurente) % totalCurente;
    }
    
    return CURENTE[currentIndex] || CURENTE[0];
  };

  const currentCurent = getCurrentCurent();

  // Gestionează începutul drag-ului (mouse și touch)
  const handleStart = (clientX, clientY) => {
    setIsDragging(true);
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const startAngle = Math.atan2(clientY - centerY, clientX - centerX);
    setStartAngle(startAngle);
    setCurrentRotation(rotation);
  };

  const handleMouseDown = (e) => {
    handleStart(e.clientX, e.clientY);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      handleStart(touch.clientX, touch.clientY);
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Gestionează drag-ul (mouse și touch)
  const handleMove = (clientX, clientY) => {
    if (!isDragging) return;
    
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const currentAngle = Math.atan2(clientY - centerY, clientX - centerX);
    const angleDiff = currentAngle - startAngle;
    const newRotation = currentRotation + (angleDiff * 180 / Math.PI);
    
    setRotation(newRotation);
    rotationRef.current = newRotation;
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging) {
      const touch = e.touches[0];
      e.preventDefault();
      e.stopPropagation();
      handleMove(touch.clientX, touch.clientY);
    }
  };

  // Gestionează sfârșitul drag-ului (mouse și touch)
  const handleEnd = () => {
    setIsDragging(false);

    // Snap la cel mai apropiat curent (comportament general)
    const totalCurente = CURENTE.length;
    if (!totalCurente) return;
    const anglePerCurent = 360 / totalCurente;

    // Normalize current rotation to [0, 360) using latest ref
    const currentRot = rotationRef.current;
    const normalizedRotation = ((currentRot % 360) + 360) % 360;

    // Compute nearest step used in active calculation
    const t = Math.round((360 - normalizedRotation) / anglePerCurent);

    // Align exactly to that step, then choose closest equivalent to current rotation
    const normalizedSnap = 360 - t * anglePerCurent;
    const turns = Math.round((currentRot - normalizedSnap) / 360);
    const snapped = normalizedSnap + 360 * turns;

    setRotation(snapped);
    rotationRef.current = snapped;
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleEnd();
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleEnd();
  };

  // Previne scroll-ul paginii când utilizatorul interacționează cu roata
  const handleWheel = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Adaugă event listeners pentru drag (mouse și touch)
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      document.addEventListener('wheel', handleWheel, { passive: false });
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
      document.body.style.touchAction = 'none';
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('wheel', handleWheel);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.style.touchAction = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('wheel', handleWheel);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.body.style.touchAction = '';
      document.body.style.overflow = '';
    };
  }, [isDragging, startAngle, currentRotation]);

  // Gestionează click-ul pe butonul central
  const handleCenterClick = () => {
    if (currentCurent && currentCurent.id) {
      // Trimite informația despre de unde vine utilizatorul
      const currentPath = window.location.pathname;
      const fromPath = currentPath === '/' ? '/' : '/curente';
      
      navigate(`/curent/${currentCurent.id}`, { 
        state: { 
          from: { 
            pathname: fromPath, 
            scrollY: window.scrollY 
          } 
        } 
      });
    }
  };

  // Calculează translateX bazat pe dimensiunea ecranului
  useEffect(() => {
    const updateTranslateX = () => {
      const width = window.innerWidth;
      let newTranslateX = 260; // Desktop default
      
      if (width <= 360) {
        newTranslateX = 125; // Mobile small
      } else if (width <= 480) {
        newTranslateX = 150; // Mobile medium
      } else if (width <= 600) {
        newTranslateX = 170; // Mobile large
      } else if (width <= 768) {
        newTranslateX = 195; // Tablet
      } else if (width <= 1024) {
        newTranslateX = 240; // Tablet large
      }
      
      setTranslateX(newTranslateX);
    };

    updateTranslateX();
    window.addEventListener('resize', updateTranslateX);
    
    return () => {
      window.removeEventListener('resize', updateTranslateX);
    };
  }, []);

  // Eliminat complet funcționalitatea de click pe cercuri

  return (
    <div 
      className={`curente-wheel-container ${darkTheme ? 'dark-theme' : ''}`}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
      onWheel={handleWheel}
    >
      {/* Săgeata care arată curentul activ */}
      <div className="curente-wheel-arrow">
        <div className="arrow-head"></div>
        <div className="arrow-line"></div>
      </div>

      {/* Roata cu curente */}
      <div 
        ref={wheelRef}
        className={`curente-wheel ${isDragging ? 'dragging' : ''} ${darkTheme ? 'dark-theme' : ''}`}
        style={{ transform: `rotate(${rotation}deg)` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onWheel={handleWheel}
        onClick={(e) => e.stopPropagation()}
      >
        {CURENTE.map((curent, index) => {
          const angle = (360 / CURENTE.length) * index;
          // Curentul activ este cel de la poziția 0 (sub săgeată)
          const normalizedRotation = ((rotation % 360) + 360) % 360;
          const anglePerCurent = 360 / CURENTE.length;
          // Inversează logica și ajustează cu 5 poziții înainte
          let currentIndex = (Math.round((360 - normalizedRotation) / anglePerCurent) - 4) % CURENTE.length;
          
          // Asigură-te că indexul este valid
          if (currentIndex < 0) {
            currentIndex = (currentIndex + CURENTE.length) % CURENTE.length;
          }
          
          const isActive = index === currentIndex;
          
          return (
            <div
              key={curent.id}
              className={`curent-circle ${isActive ? 'active' : ''} ${darkTheme ? 'dark-theme' : ''}`}
              style={{
                transform: `rotate(${angle}deg) translateX(${translateX}px) rotate(-${angle}deg)`,
                '--glow-color': curent.glowColor
              }}
              onMouseDown={(e) => {
                // Permite drag and drop-ul pe cerc
                // Nu oprește propagarea pentru a permite drag-ul
              }}
              onClick={(e) => {
                // Blochează click-urile pe cerc
                e.preventDefault();
                e.stopPropagation();
                return false;
              }}
            >
              <div 
                className="curent-circle-content"
              >
                <img 
                  src={curent.img} 
                  alt={curent.nume}
                  className="curent-image"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Butonul și numele curentului în centru */}
      <div className={`curente-wheel-center ${darkTheme ? 'dark-theme' : ''}`}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCenterClick();
          }}
          className={`curente-wheel-button ${darkTheme ? 'dark-theme' : ''}`}
        >
          Vezi curent
        </button>
        <div className={`curente-current-name ${darkTheme ? 'dark-theme' : ''}`}>
          {currentCurent ? currentCurent.nume : 'Curent'}
        </div>
      </div>
    </div>
  );
};

export default CurenteWheel;
