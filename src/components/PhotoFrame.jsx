import React, { useState, useId } from 'react';

export default function PhotoFrame({
  photo,
  aspectRatio = '4/5', // '4/5', '1/1', '16/9', etc.
  theme = 'royal-flourish', // 'royal-flourish' | 'throwball-accent' | 'badminton-accent' | 'ornate-centerpiece' | 'grand-finale'
  priority = false,
  className = '',
  style = {}
}) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const compId = useId().replace(/:/g, '');

  const src = imgError ? (photo.fallback || photo.src) : photo.src;

  return (
    <div
      className={`royal-photo-container ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        maxWidth: '100%',
        ...style
      }}
    >
      {/* Outer Decorative Golden Frame */}
      <div
        className="royal-frame-border"
        style={{
          position: 'relative',
          padding: theme === 'grand-finale' ? '14px' : '10px',
          background: 'linear-gradient(135deg, #FFFDF8 0%, #F5ECDB 40%, #E8D8BA 100%)',
          borderRadius: '16px',
          border: '1.5px solid rgba(212, 175, 55, 0.65)',
          boxShadow:
            theme === 'grand-finale'
              ? '0 25px 60px -10px rgba(110, 80, 40, 0.28), 0 0 35px rgba(212, 175, 55, 0.35)'
              : '0 15px 40px -10px rgba(110, 80, 40, 0.16), 0 0 20px rgba(212, 175, 55, 0.12)',
        }}
      >
        {/* Subtle Embossed Double Inner Rim */}
        <div
          style={{
            position: 'absolute',
            inset: '6px',
            border: '1px solid rgba(197, 160, 89, 0.45)',
            borderRadius: '12px',
            pointerEvents: 'none',
            zIndex: 3,
          }}
        />

        {/* ==============================================================
            THEME 1: Throwball-Inspired Decorative Frame Embellishments
            Applied to Memory 2: fine court lines, small corner throwball ornament
            ============================================================== */}
        {theme === 'throwball-accent' && (
          <>
            {/* Fine court-line boundary pattern around outer perimeter */}
            <svg
              style={{
                position: 'absolute',
                inset: '-6px',
                width: 'calc(100% + 12px)',
                height: 'calc(100% + 12px)',
                pointerEvents: 'none',
                zIndex: 4,
              }}
            >
              <rect
                x="3"
                y="3"
                width="calc(100% - 6px)"
                height="calc(100% - 6px)"
                fill="none"
                stroke="#C5A059"
                strokeWidth="0.8"
                strokeDasharray="12, 4"
                opacity="0.45"
                rx="18"
              />
            </svg>

            {/* Small Illustrated Throwball Decorative Corner Ornament */}
            <div
              title="Decorative motif"
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                width: '32px',
                height: '32px',
                zIndex: 10,
                pointerEvents: 'none',
                filter: 'drop-shadow(0 2px 5px rgba(110, 80, 40, 0.25))',
              }}
            >
              <svg viewBox="0 0 32 32" fill="none">
                {/* Motion breeze arcs */}
                <path d="M 4,28 Q 12,24 16,20" stroke="#DFBA52" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
                <path d="M 6,32 Q 14,28 18,24" stroke="#DFBA52" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
                {/* Mini Ball */}
                <circle cx="20" cy="12" r="10" fill="url(#throwball-grad)" stroke="#C5A059" strokeWidth="1" />
                <defs>
                  <linearGradient id="throwball-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFDF7" />
                    <stop offset="60%" stopColor="#F5E5C9" />
                    <stop offset="100%" stopColor="#D4AF37" />
                  </linearGradient>
                </defs>
                {/* Curved Panel Seams */}
                <path d="M 12,12 Q 20,6 28,12" stroke="#AA7C11" strokeWidth="0.8" fill="none" />
                <path d="M 20,4 Q 14,12 20,20" stroke="#AA7C11" strokeWidth="0.8" fill="none" />
                <circle cx="17" cy="9" r="1.5" fill="#FFF" opacity="0.7" />
              </svg>
            </div>
          </>
        )}

        {/* ==============================================================
            THEME 2: Badminton-Inspired Decorative Frame Embellishments
            Applied to Memory 4: small shuttlecock ornament & racket string lines
            ============================================================== */}
        {theme === 'badminton-accent' && (
          <>
            {/* Subtle Racket-String Mesh Pattern in frame corner */}
            <svg
              style={{
                position: 'absolute',
                bottom: '2px',
                left: '2px',
                width: '45px',
                height: '45px',
                pointerEvents: 'none',
                zIndex: 4,
                opacity: 0.35,
              }}
            >
              {/* Crossed subtle string grid */}
              <line x1="5" y1="0" x2="45" y2="40" stroke="#AA7C11" strokeWidth="0.7" />
              <line x1="15" y1="0" x2="45" y2="30" stroke="#AA7C11" strokeWidth="0.7" />
              <line x1="0" y1="5" x2="40" y2="45" stroke="#AA7C11" strokeWidth="0.7" />
              <line x1="0" y1="15" x2="30" y2="45" stroke="#AA7C11" strokeWidth="0.7" />
            </svg>

            {/* Small Refined Shuttlecock Vector Ornament */}
            <div
              title="Decorative motif"
              style={{
                position: 'absolute',
                top: '-12px',
                left: '-10px',
                width: '32px',
                height: '32px',
                zIndex: 10,
                pointerEvents: 'none',
                filter: 'drop-shadow(0 2px 5px rgba(110, 80, 40, 0.25))',
              }}
            >
              <svg viewBox="0 0 32 32" fill="none">
                <defs>
                  <linearGradient id="shuttle-cork" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFDF7" />
                    <stop offset="100%" stopColor="#DFBA52" />
                  </linearGradient>
                </defs>
                {/* Feathers */}
                <path d="M 8,24 L 20,8 L 26,14 L 14,28 Z" fill="rgba(255, 255, 255, 0.85)" stroke="#C5A059" strokeWidth="0.7" />
                <line x1="12" y1="20" x2="22" y2="10" stroke="#D4AF37" strokeWidth="0.6" />
                <line x1="15" y1="23" x2="25" y2="13" stroke="#D4AF37" strokeWidth="0.6" />
                {/* Base cork */}
                <ellipse cx="9" cy="25" rx="4" ry="3.5" fill="url(#shuttle-cork)" stroke="#AA7C11" strokeWidth="0.8" />
              </svg>
            </div>
          </>
        )}

        {/* ==============================================================
            THEME 3: Ornate Centerpiece / Grand Finale Flourishes
            ============================================================== */}
        {(theme === 'ornate-centerpiece' || theme === 'grand-finale') && (
          <>
            {/* Top Center Crown / Crest */}
            <div
              style={{
                position: 'absolute',
                top: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #FFFDF8 0%, #F5ECDB 100%)',
                border: '1.5px solid #D4AF37',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(110, 80, 40, 0.15)',
                zIndex: 10,
              }}
            >
              <span style={{ fontSize: '16px' }}>👑</span>
            </div>
          </>
        )}

        {/* Corner Filigree Ornaments for all royal frames */}
        <div style={{ position: 'absolute', top: '8px', left: '8px', width: '16px', height: '16px', zIndex: 4, pointerEvents: 'none' }}>
          <svg viewBox="0 0 20 20" fill="none" stroke="#D4AF37" strokeWidth="1.5">
            <path d="M 2,16 L 2,2 L 16,2" />
          </svg>
        </div>
        <div style={{ position: 'absolute', top: '8px', right: '8px', width: '16px', height: '16px', zIndex: 4, pointerEvents: 'none', transform: 'scaleX(-1)' }}>
          <svg viewBox="0 0 20 20" fill="none" stroke="#D4AF37" strokeWidth="1.5">
            <path d="M 2,16 L 2,2 L 16,2" />
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: '8px', left: '8px', width: '16px', height: '16px', zIndex: 4, pointerEvents: 'none', transform: 'scaleY(-1)' }}>
          <svg viewBox="0 0 20 20" fill="none" stroke="#D4AF37" strokeWidth="1.5">
            <path d="M 2,16 L 2,2 L 16,2" />
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: '8px', right: '8px', width: '16px', height: '16px', zIndex: 4, pointerEvents: 'none', transform: 'scale(-1)' }}>
          <svg viewBox="0 0 20 20" fill="none" stroke="#D4AF37" strokeWidth="1.5">
            <path d="M 2,16 L 2,2 L 16,2" />
          </svg>
        </div>

        {/* Image Display Surface */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: aspectRatio,
            borderRadius: '10px',
            overflow: 'hidden',
            backgroundColor: '#F7F2EA',
          }}
        >
          {/* Skeleton placeholder while loading */}
          {!imgLoaded && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, #F5EDE0 0%, #FFFDF8 50%, #F5EDE0 100%)',
                backgroundSize: '200% 100%',
                animation: 'skeletonShimmer 1.8s infinite',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '24px', opacity: 0.5 }}>✨</span>
            </div>
          )}

          <img
            src={src}
            alt={photo.alt || 'Birthday Memory'}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={() => setImgLoaded(true)}
            onError={() => {
              if (!imgError) {
                setImgError(true);
              }
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              objectPosition: 'center',
              display: 'block',
              transition: 'opacity 0.5s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              opacity: imgLoaded ? 1 : 0.4,
            }}
            className="royal-photo-img"
          />
        </div>
      </div>

      {/* Caption Label underneath photo if available */}
      {photo.captionLabel && (
        <div
          style={{
            textAlign: 'center',
            marginTop: '8px',
            fontFamily: 'var(--font-serif)',
            fontSize: '12px',
            color: 'var(--text-muted)',
            letterSpacing: '0.04em',
            fontStyle: 'italic',
          }}
        >
          {photo.captionLabel}
        </div>
      )}

      <style>{`
        .royal-photo-container:hover .royal-photo-img {
          transform: scale(1.025);
        }
        @keyframes skeletonShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

