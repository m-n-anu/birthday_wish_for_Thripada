import React, { useState, useRef, useEffect, useId } from 'react';
import { diyaContent } from '../data/birthdayContent';
import { sounds } from '../utils/soundEffects';

export default function DiyaSection({ onContinue }) {
  const [traceProgress, setTraceProgress] = useState(0); // 0 to 100
  const [isLit, setIsLit] = useState(false);
  const [isTracing, setIsTracing] = useState(false);
  const wickRef = useRef(null);
  const lastPointRef = useRef(null);
  const compId = useId().replace(/:/g, '');

  const handlePointerDown = (e) => {
    if (isLit) return;
    setIsTracing(true);
    lastPointRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (isLit || !isTracing) return;
    if (!lastPointRef.current) {
      lastPointRef.current = { x: e.clientX, y: e.clientY };
      return;
    }

    const dist = Math.hypot(e.clientX - lastPointRef.current.x, e.clientY - lastPointRef.current.y);
    if (dist > 3) {
      // User is moving pointer over the wick
      setTraceProgress((prev) => {
        const next = Math.min(100, prev + 4.5);
        if (next >= 100 && !isLit) {
          triggerLighting();
        }
        return next;
      });
      lastPointRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = () => {
    setIsTracing(false);
    lastPointRef.current = null;
  };

  const triggerLighting = () => {
    setIsLit(true);
    sounds.playDiyaLit();
  };

  const handleContinueClick = () => {
    if (onContinue) {
      onContinue();
    } else {
      const cakeEl = document.getElementById('cake');
      if (cakeEl) cakeEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="diya"
      className="section-stage royal-pattern-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '90px 20px 70px 20px',
      }}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div
        className="royal-card"
        style={{
          maxWidth: '800px',
          width: '100%',
          padding: '50px 36px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 250, 244, 0.92) 100%)',
        }}
      >
        {/* Step Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(212, 175, 55, 0.12)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            borderRadius: '30px',
            padding: '6px 18px',
            fontSize: '12px',
            fontFamily: 'var(--font-serif)',
            fontWeight: 700,
            color: 'var(--text-gold)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          <span>🪔</span>
          <span>{diyaContent.stepBadge}</span>
        </div>

        {/* Section Title */}
        <h2
          className="font-royal-title gold-text-gradient"
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.7rem)',
            fontWeight: 800,
            marginBottom: '12px',
          }}
        >
          {diyaContent.title}
        </h2>

        {/* Dynamic Instructional Callout */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'var(--text-secondary)',
            maxWidth: '560px',
            margin: '0 auto 30px auto',
            lineHeight: 1.6,
          }}
        >
          {isLit ? (
            <span style={{ color: '#AA7C11', fontWeight: 600 }}>
              ✨ {diyaContent.blessingMessage} {diyaContent.subtext}
            </span>
          ) : (
            diyaContent.instruction
          )}
        </p>

        {/* Ceremonial Diya Arena */}
        <div
          style={{
            position: 'relative',
            width: '320px',
            height: '280px',
            margin: '0 auto 24px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            userSelect: 'none',
          }}
        >
          {/* Rangoli Base Geometry SVG */}
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              width: '320px',
              height: '140px',
              pointerEvents: 'none',
              opacity: isLit ? 0.9 : 0.6,
              transition: 'opacity 1s ease',
            }}
          >
            <svg viewBox="0 0 320 140" fill="none">
              <ellipse cx="160" cy="80" rx="140" ry="40" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" />
              <ellipse cx="160" cy="80" rx="110" ry="30" fill="none" stroke="#E8C547" strokeWidth="1.2" />
              {/* Petals */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <circle
                  key={deg}
                  cx={160 + 110 * Math.cos((deg * Math.PI) / 180)}
                  cy={80 + 30 * Math.sin((deg * Math.PI) / 180)}
                  r="3.5"
                  fill="#DFBA52"
                />
              ))}
            </svg>
          </div>

          {/* Warm Halo Glow behind flame when lit or tracing */}
          <div
            className={isLit ? 'animate-halo' : ''}
            style={{
              position: 'absolute',
              top: '15px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: isLit ? '220px' : `${traceProgress * 1.5}px`,
              height: isLit ? '220px' : `${traceProgress * 1.5}px`,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 180, 20, 0.45) 0%, rgba(255, 120, 0, 0.15) 50%, transparent 75%)',
              filter: 'blur(20px)',
              pointerEvents: 'none',
              opacity: isLit ? 1 : traceProgress / 100,
              transition: 'all 0.5s ease',
            }}
          />

          {/* Traditional Brass Diya SVG */}
          <svg
            viewBox="0 0 240 220"
            style={{ width: '240px', height: '220px', position: 'relative', zIndex: 2 }}
          >
            <defs>
              <linearGradient id={`brass-body-${compId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F9E29D" />
                <stop offset="35%" stopColor="#D4AF37" />
                <stop offset="70%" stopColor="#B38728" />
                <stop offset="100%" stopColor="#7A5612" />
              </linearGradient>
              <linearGradient id={`flame-grad-${compId}`} x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#FF3D00" />
                <stop offset="30%" stopColor="#FF9100" />
                <stop offset="70%" stopColor="#FFEA00" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
              <radialGradient id={`oil-glow-${compId}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFE082" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#B38728" stopOpacity="0.3" />
              </radialGradient>
            </defs>

            {/* Diya Base Pedestal */}
            <path
              d="M 85,190 L 155,190 L 140,165 L 100,165 Z"
              fill={`url(#brass-body-${compId})`}
              stroke="#AA7C11"
              strokeWidth="1.5"
            />
            <ellipse cx="120" cy="190" rx="35" ry="7" fill="#8F6317" />

            {/* Diya Main Deep Bowl */}
            <path
              d="M 40,140 Q 120,200 200,140 Q 210,120 180,120 Q 120,135 60,120 Q 30,120 40,140 Z"
              fill={`url(#brass-body-${compId})`}
              stroke="#AA7C11"
              strokeWidth="2"
            />

            {/* Diya Rim & Oil Surface */}
            <ellipse cx="120" cy="126" rx="65" ry="14" fill={`url(#oil-glow-${compId})`} stroke="#AA7C11" strokeWidth="1" />

            {/* Embossed Floral Ornaments on Diya rim */}
            <path d="M 75,138 Q 120,165 165,138" stroke="#FDE49E" strokeWidth="1.5" fill="none" opacity="0.8" />
            <circle cx="120" cy="154" r="3" fill="#FDE49E" />
            <circle cx="95" cy="148" r="2.5" fill="#FDE49E" />
            <circle cx="145" cy="148" r="2.5" fill="#FDE49E" />

            {/* The Cotton Wick */}
            <path
              d="M 120,126 Q 123,105 120,95"
              stroke="#5D4037"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Charred Tip */}
            <circle cx="120" cy="95" r="3" fill="#3E2723" />

            {/* The Flame (Animated when Lit, or scaling with traceProgress) */}
            {(isLit || traceProgress > 0) && (
              <g
                className={isLit ? 'animate-flame' : ''}
                style={{
                  transformOrigin: '120px 95px',
                  transform: isLit ? 'scale(1)' : `scale(${traceProgress / 100})`,
                  transition: isLit ? 'none' : 'transform 0.2s ease-out',
                }}
              >
                {/* Outer Flame Aura */}
                <path
                  d="M 120,95 C 105,80 102,55 120,25 C 138,55 135,80 120,95 Z"
                  fill={`url(#flame-grad-${compId})`}
                  opacity="0.95"
                />
                {/* Inner Core Bright White/Yellow */}
                <path
                  d="M 120,95 C 112,85 110,68 120,48 C 130,68 128,85 120,95 Z"
                  fill="#FFFDE7"
                  opacity="0.9"
                />
              </g>
            )}
          </svg>

          {/* Interactive Wick Tracing Touch / Hover Area */}
          <div
            ref={wickRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            style={{
              position: 'absolute',
              top: '40px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              cursor: isLit ? 'default' : 'grab',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              touchAction: 'none', // Critical for mobile gesture tracking
            }}
            title={isLit ? "The diya is glowing warmly" : "Trace with cursor or finger to light"}
          >
            {!isLit && (
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  border: isTracing ? '2px solid #DFBA52' : '1.5px dashed rgba(212, 175, 55, 0.5)',
                  backgroundColor: isTracing ? 'rgba(255, 230, 150, 0.15)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: isTracing ? 'none' : 'spinSlow 12s linear infinite',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: '18px', opacity: 0.75 }}>
                  {isTracing ? '🔥' : '✨'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Tracing Gesture Progress Bar (visible while unlit) */}
        {!isLit ? (
          <div style={{ maxWidth: '300px', margin: '0 auto 24px auto' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '11px',
                fontFamily: 'var(--font-serif)',
                color: 'var(--text-muted)',
                marginBottom: '6px',
                letterSpacing: '0.08em',
              }}
            >
              <span>Gently trace over wick</span>
              <span>{Math.round(traceProgress)}%</span>
            </div>
            <div
              style={{
                width: '100%',
                height: '6px',
                background: 'rgba(212, 175, 55, 0.18)',
                borderRadius: '6px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${traceProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #FFB300 0%, #FF6F00 100%)',
                  borderRadius: '6px',
                  transition: 'width 0.15s ease-out',
                }}
              />
            </div>
          </div>
        ) : (
          /* Smoothly revealed "Continue to the Cake" button */
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={handleContinueClick}
              className="btn-royal"
              style={{ padding: '16px 38px', fontSize: '14px' }}
            >
              <span>{diyaContent.continueButtonText}</span>
              <span>🎂 →</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

