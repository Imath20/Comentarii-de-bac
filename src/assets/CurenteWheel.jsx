import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CURENTE from '../data/curente.js';
import '../styles/curenteWheel.scss';

const CurenteWheel = ({ darkTheme }) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startAngle, setStartAngle] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);
  const wheelRef = useRef(null);
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

  // Gestionează începutul drag-ului
  const handleMouseDown = (e) => {
    setIsDragging(true);
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    setStartAngle(startAngle);
    setCurrentRotation(rotation);
    e.preventDefault();
    e.stopPropagation();
  };

  // Gestionează drag-ul
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const rect = wheelRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const angleDiff = currentAngle - startAngle;
    const newRotation = currentRotation + (angleDiff * 180 / Math.PI);
    
    setRotation(newRotation);
  };

  // Gestionează sfârșitul drag-ului
  const handleMouseUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  // Adaugă event listeners pentru drag
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
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

  // Eliminat complet funcționalitatea de click pe cercuri

  return (
    <div 
      className={`curente-wheel-container ${darkTheme ? 'dark-theme' : ''}`}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
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
                transform: `rotate(${angle}deg) translateX(260px) rotate(-${angle}deg)`,
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
