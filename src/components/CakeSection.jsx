import React, { useState, useRef, useId } from 'react';
import { cakeContent } from '../data/birthdayContent';
import { sounds } from '../utils/soundEffects';

export default function CakeSection({ onOpenMemories }) {
  // States: 'uncut' | 'cut' | 'served'
  const [cakeState, setCakeState] = useState('uncut');
  const [cutProgress, setCutProgress] = useState(0); // 0 to 100
  const [isCutting, setIsCutting] = useState(false);
  const cutAreaRef = useRef(null);
  const lastPosRef = useRef(null);
  const compId = useId().replace(/:/g, '');

  const triggerConfetti = async () => {
    try {
      const confettiModule = await import('canvas-confetti');
      const confetti = confettiModule.default || confettiModule;
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#D4AF37', '#F3E5AB', '#C98A7D', '#E8B4B8', '#FFF'],
      });
    } catch {
      // Fallback if canvas-confetti is not yet loaded
    }
  };

  const handlePointerDown = (e) => {
    if (cakeState !== 'uncut') return;
    setIsCutting(true);
    lastPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (cakeState !== 'uncut' || !isCutting) return;
    if (!lastPosRef.current) {
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      return;
    }

    const dist = Math.hypot(e.clientX - lastPosRef.current.x, e.clientY - lastPosRef.current.y);
    if (dist > 4) {
      setCutProgress((prev) => {
        const next = Math.min(100, prev + 8);
        if (next >= 100) {
          finishCut();
        }
        return next;
      });
      lastPosRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = () => {
    setIsCutting(false);
    lastPosRef.current = null;
  };

  const finishCut = () => {
    setCakeState('cut');
    sounds.playCakeCut();
  };

  const handleServeSlice = () => {
    if (cakeState === 'cut') {
      setCakeState('served');
      sounds.playCakeServed();
      triggerConfetti();
    }
  };

  const handleContinue = () => {
    if (onOpenMemories) {
      onOpenMemories();
    } else {
      const memEl = document.getElementById('memory-1');
      if (memEl) memEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="cake"
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
          maxWidth: '850px',
          width: '100%',
          padding: '50px 36px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(254, 250, 245, 0.94) 100%)',
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
          <span>🎂</span>
          <span>{cakeContent.stepBadge}</span>
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
          {cakeContent.title}
        </h2>

        {/* Dynamic Instructional Banner */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 28px auto',
            lineHeight: 1.6,
          }}
        >
          {cakeState === 'uncut' && (
            <span>
              {cakeContent.instruction} (Drag or swipe along the golden line)
            </span>
          )}
          {cakeState === 'cut' && (
            <span style={{ color: '#AA7C11', fontWeight: 600 }}>
              ✨ Slice created! Now tap on the highlighted piece to serve it onto the plate!
            </span>
          )}
          {cakeState === 'served' && (
            <span style={{ color: '#AA7C11', fontWeight: 600 }}>
              🎉 {cakeContent.servedMessage} {cakeContent.servedSubtext}
            </span>
          )}
        </p>

        {/* Festive Cake Arena */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '460px',
            height: '310px',
            margin: '0 auto 20px auto',
            userSelect: 'none',
          }}
        >
          {/* Decorative Serving Plate for the served slice */}
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              right: '15px',
              width: '140px',
              height: '50px',
              borderRadius: '50%',
              background: 'radial-gradient(ellipse at center, #FFFDF9 0%, #F5E8D3 70%, #D4AF37 100%)',
              border: '2px solid #C5A059',
              boxShadow: '0 8px 20px rgba(110, 80, 40, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '10px',
                color: '#AA7C11',
                letterSpacing: '0.06em',
                fontWeight: 600,
              }}
            >
              Serving Plate
            </span>
          </div>

          {/* SVG Illustrated Royal Cake */}
          <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%' }}>
            <defs>
              {/* Frosting Gradients */}
              <linearGradient id={`cake-tier1-${compId}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFF9F0" />
                <stop offset="50%" stopColor="#FFF2E2" />
                <stop offset="100%" stopColor="#F5E4D0" />
              </linearGradient>
              <linearGradient id={`cake-tier2-${compId}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FFF4E6" />
                <stop offset="50%" stopColor="#FDEBD0" />
                <stop offset="100%" stopColor="#F3D8BA" />
              </linearGradient>
              <linearGradient id={`gold-trim-${compId}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FCE79F" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#AA7C11" />
              </linearGradient>
              <linearGradient id={`candle-body-${compId}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FAD4D8" />
                <stop offset="100%" stopColor="#E8B4B8" />
              </linearGradient>
            </defs>

            {/* Stand Pedestal */}
            <ellipse cx="200" cy="275" rx="140" ry="18" fill="#F0E5D8" stroke="#D4AF37" strokeWidth="1.5" />
            <path d="M 175,275 L 180,290 L 220,290 L 225,275 Z" fill="#D4AF37" opacity="0.8" />
            <ellipse cx="200" cy="290" rx="40" ry="8" fill="#B38728" />

            {/* Cake Bottom Tier (Tier 1) */}
            <g id="bottom-tier">
              <path
                d="M 90,200 L 90,250 C 90,270 310,270 310,250 L 310,200 Z"
                fill={`url(#cake-tier1-${compId})`}
                stroke="#E5C158"
                strokeWidth="1"
              />
              <ellipse cx="200" cy="200" rx="110" ry="22" fill="#FFFBF5" stroke="#E5C158" strokeWidth="1" />
              {/* Pearl Trim on bottom tier */}
              {[105, 130, 155, 180, 205, 230, 255, 280, 295].map((x) => (
                <circle key={x} cx={x} cy="254" r="3" fill="#D4AF37" />
              ))}
            </g>

            {/* Cake Top Tier (Tier 2) */}
            <g id="top-tier">
              <path
                d="M 130,140 L 130,185 C 130,202 270,202 270,185 L 270,140 Z"
                fill={`url(#cake-tier2-${compId})`}
                stroke="#E5C158"
                strokeWidth="1"
              />
              <ellipse cx="200" cy="140" rx="70" ry="16" fill="#FFFDF9" stroke="#E5C158" strokeWidth="1" />
              {/* Golden Drips / Filigree Swirls */}
              <path
                d="M 130,140 Q 145,155 160,143 Q 180,160 200,142 Q 220,158 240,143 Q 255,155 270,140"
                stroke={`url(#gold-trim-${compId})`}
                strokeWidth="3.5"
                fill="none"
              />
            </g>

            {/* Center Candle & Flame */}
            <g transform="translate(193, 85)">
              <rect x="3" y="16" width="8" height="40" rx="2" fill={`url(#candle-body-${compId})`} stroke="#C98A7D" strokeWidth="0.8" />
              {/* Candle stripes */}
              <line x1="3" y1="26" x2="11" y2="23" stroke="#D4AF37" strokeWidth="1.5" />
              <line x1="3" y1="38" x2="11" y2="35" stroke="#D4AF37" strokeWidth="1.5" />
              {/* Candle Wick */}
              <line x1="7" y1="16" x2="7" y2="10" stroke="#333" strokeWidth="1.5" />
              {/* Flame */}
              <g className="animate-flame" style={{ transformOrigin: '7px 10px' }}>
                <path d="M 7,10 C 2,6 1,-4 7,-12 C 13,-4 12,6 7,10 Z" fill="#FFB300" />
                <path d="M 7,10 C 4,7 4,0 7,-6 C 10,0 10,7 7,10 Z" fill="#FFF" opacity="0.9" />
              </g>
            </g>

            {/* Left Candle */}
            <g transform="translate(160, 95)">
              <rect x="3" y="14" width="7" height="34" rx="2" fill={`url(#candle-body-${compId})`} />
              <line x1="6" y1="14" x2="6" y2="8" stroke="#333" strokeWidth="1.5" />
              <g className="animate-flame" style={{ transformOrigin: '6px 8px' }}>
                <path d="M 6,8 C 2,5 1,-3 6,-9 C 11,-3 10,5 6,8 Z" fill="#FFB300" />
              </g>
            </g>

            {/* Right Candle */}
            <g transform="translate(228, 95)">
              <rect x="3" y="14" width="7" height="34" rx="2" fill={`url(#candle-body-${compId})`} />
              <line x1="6" y1="14" x2="6" y2="8" stroke="#333" strokeWidth="1.5" />
              <g className="animate-flame" style={{ transformOrigin: '6px 8px' }}>
                <path d="M 6,8 C 2,5 1,-3 6,-9 C 11,-3 10,5 6,8 Z" fill="#FFB300" />
              </g>
            </g>

            {/* Visual Cut Line across the cake */}
            {cakeState !== 'uncut' && (
              <path
                d="M 200,140 L 250,195 L 250,248"
                stroke="#D4AF37"
                strokeWidth="3.5"
                strokeDasharray={cakeState === 'cut' ? 'none' : '4 2'}
                filter="drop-shadow(0 0 5px #DFBA52)"
              />
            )}

            {/* The Cut Slice: Animated when Served */}
            {cakeState !== 'uncut' && (
              <g
                id="interactive-slice"
                onClick={handleServeSlice}
                className={cakeState === 'served' ? 'animate-slice-serve' : ''}
                style={{
                  cursor: cakeState === 'cut' ? 'pointer' : 'default',
                  filter: cakeState === 'cut' ? 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.8))' : 'none',
                }}
              >
                {/* Triangular Wedge Slice Graphic */}
                <path
                  d="M 200,140 L 250,195 L 285,178 Z"
                  fill="#FFF4E6"
                  stroke="#D4AF37"
                  strokeWidth="2"
                />
                <path
                  d="M 250,195 L 285,178 L 285,225 L 250,248 Z"
                  fill="#F5E4D0"
                  stroke="#D4AF37"
                  strokeWidth="2"
                />
                {/* Strawberry / Golden Cherry Garnish */}
                <circle cx="245" cy="170" r="5" fill="#E8B4B8" stroke="#B76E79" strokeWidth="1" />
              </g>
            )}
          </svg>

          {/* Knife Cutting Path Overlay for 'uncut' state */}
          {cakeState === 'uncut' && (
            <div
              ref={cutAreaRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              style={{
                position: 'absolute',
                top: '90px',
                left: '120px',
                width: '180px',
                height: '140px',
                cursor: 'crosshair',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                touchAction: 'none',
              }}
              title="Drag or swipe across to cut the cake"
            >
              {/* Cutting guideline guide */}
              <div
                style={{
                  width: '140px',
                  height: '2px',
                  background: 'linear-gradient(90deg, #D4AF37 0%, #FFF 50%, #D4AF37 100%)',
                  transform: 'rotate(45deg)',
                  boxShadow: '0 0 8px #FFD700',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-18px',
                    left: `${cutProgress}%`,
                    transform: 'translateX(-50%)',
                    fontSize: '22px',
                    transition: 'left 0.1s',
                  }}
                >
                  🗡️
                </div>
              </div>
            </div>
          )}

          {/* Highlight Indicator to Tap Slice when Cut */}
          {cakeState === 'cut' && (
            <div
              onClick={handleServeSlice}
              style={{
                position: 'absolute',
                top: '120px',
                right: '110px',
                background: 'rgba(212, 175, 55, 0.95)',
                color: '#FFF',
                fontFamily: 'var(--font-serif)',
                fontSize: '11px',
                fontWeight: 700,
                padding: '6px 12px',
                borderRadius: '20px',
                cursor: 'pointer',
                boxShadow: '0 0 15px rgba(212, 175, 55, 0.8)',
                animation: 'floatGentle 2s infinite ease-in-out',
                zIndex: 20,
              }}
            >
              ✨ Tap to Serve
            </div>
          )}
        </div>

        {/* Progress or Actions Footer */}
        {cakeState === 'uncut' && (
          <div style={{ maxWidth: '300px', margin: '0 auto 16px auto' }}>
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
              <span>{cakeContent.cutActionPrompt}</span>
              <span>{Math.round(cutProgress)}%</span>
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
                  width: `${cutProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #DFBA52 0%, #AA7C11 100%)',
                  borderRadius: '6px',
                  transition: 'width 0.15s ease-out',
                }}
              />
            </div>
            {/* Quick single-click button for convenience */}
            <button
              onClick={finishCut}
              className="btn-royal-outline"
              style={{ marginTop: '14px', fontSize: '11px', padding: '6px 16px' }}
            >
              Or click here to slice cleanly 🍰
            </button>
          </div>
        )}

        {cakeState === 'served' && (
          <div style={{ marginTop: '24px' }}>
            <button
              onClick={handleContinue}
              className="btn-royal"
              style={{ padding: '16px 40px', fontSize: '14px' }}
            >
              <span>{cakeContent.continueButtonText}</span>
              <span>🖼️ →</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

