import React, { useState, useEffect, useId } from 'react';
import { countdownContent, birthdayCelebrant } from '../data/birthdayContent';
import { sounds } from '../utils/soundEffects';

export default function CountdownSection({ onComplete }) {
  const [count, setCount] = useState(countdownContent.initialCount);
  const [isDone, setIsDone] = useState(false);
  const compId = useId().replace(/:/g, '');

  useEffect(() => {
    if (count <= 0) {
      setIsDone(true);
      if (onComplete) {
        // Trigger celebratory chime if unmuted
        sounds.playTone(880, 'sine', 0.8, 0, 0.1);
        setTimeout(() => {
          sounds.startBgMusic();
          onComplete();
        }, 800);
      }
      return;
    }

    const timer = setTimeout(() => {
      // Play a soft tick note if unmuted
      sounds.playTone(520 + (5 - count) * 40, 'sine', 0.25, 0, 0.05);
      setCount(prev => prev - 1);
    }, 1300);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  const handleSkip = () => {
    setCount(0);
    setIsDone(true);
    if (onComplete) {
      sounds.startBgMusic();
      onComplete();
    }
  };

  return (
    <section
      id="countdown"
      className="section-stage royal-pattern-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '100px 20px 60px 20px',
      }}
    >
      {/* Central Royal Invitation Card */}
      <div
        className="royal-card"
        style={{
          maxWidth: '680px',
          width: '100%',
          padding: '60px 40px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(253, 251, 247, 0.92) 100%)',
          border: '1.5px solid rgba(212, 175, 55, 0.45)',
          boxShadow: '0 25px 60px -15px rgba(110, 80, 40, 0.18), 0 0 35px rgba(212, 175, 55, 0.15)',
        }}
      >
        {/* Ornate Corner SVGs */}
        <div className="ornate-corner corner-tl">
          <svg viewBox="0 0 40 40" fill="none" stroke="#D4AF37" strokeWidth="1.5">
            <path d="M 5,35 L 5,5 L 35,5" />
            <circle cx="5" cy="5" r="3" fill="#D4AF37" />
            <path d="M 12,28 C 12,18 18,12 28,12" stroke="#AA7C11" strokeWidth="1" />
          </svg>
        </div>
        <div className="ornate-corner corner-tr">
          <svg viewBox="0 0 40 40" fill="none" stroke="#D4AF37" strokeWidth="1.5">
            <path d="M 5,35 L 5,5 L 35,5" />
            <circle cx="5" cy="5" r="3" fill="#D4AF37" />
            <path d="M 12,28 C 12,18 18,12 28,12" stroke="#AA7C11" strokeWidth="1" />
          </svg>
        </div>
        <div className="ornate-corner corner-bl">
          <svg viewBox="0 0 40 40" fill="none" stroke="#D4AF37" strokeWidth="1.5">
            <path d="M 5,35 L 5,5 L 35,5" />
            <circle cx="5" cy="5" r="3" fill="#D4AF37" />
            <path d="M 12,28 C 12,18 18,12 28,12" stroke="#AA7C11" strokeWidth="1" />
          </svg>
        </div>
        <div className="ornate-corner corner-br">
          <svg viewBox="0 0 40 40" fill="none" stroke="#D4AF37" strokeWidth="1.5">
            <path d="M 5,35 L 5,5 L 35,5" />
            <circle cx="5" cy="5" r="3" fill="#D4AF37" />
            <path d="M 12,28 C 12,18 18,12 28,12" stroke="#AA7C11" strokeWidth="1" />
          </svg>
        </div>

        {/* Delicate Golden Crest / Tiara */}
        <div style={{ marginBottom: '18px' }}>
          <span style={{ fontSize: '38px', display: 'inline-block' }} className="animate-float">
            👑
          </span>
        </div>

        {/* Eyebrow */}
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '13px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--text-gold)',
            marginBottom: '14px',
            fontWeight: 700,
          }}
        >
          {countdownContent.eyebrow}
        </div>

        {/* Main Prominent Heading */}
        <h1
          className="font-royal-title gold-text-gradient"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 800,
            lineHeight: 1.25,
            marginBottom: '16px',
          }}
        >
          {countdownContent.title}
        </h1>

        {/* Heartfelt Subtitle */}
        <p
          className="font-editorial"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            fontStyle: 'italic',
            color: 'var(--text-secondary)',
            maxWidth: '520px',
            margin: '0 auto 36px auto',
            lineHeight: 1.6,
          }}
        >
          "{countdownContent.subtitle}"
        </p>

        {/* Golden Ornamental Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '36px',
          }}
        >
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
          <span style={{ color: '#D4AF37', fontSize: '18px' }}>✦</span>
          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
        </div>

        {/* Instruction */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--text-muted)',
            letterSpacing: '0.04em',
            marginBottom: '24px',
          }}
        >
          {countdownContent.instruction}
        </p>

        {/* Animated Countdown Timer Focal Point */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '130px',
            position: 'relative',
            marginBottom: '20px',
          }}
        >
          {/* Circular halo glow behind number */}
          <div
            style={{
              position: 'absolute',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.28) 0%, rgba(253, 251, 247, 0) 70%)',
              border: '1.5px dashed rgba(212, 175, 55, 0.4)',
              animation: 'spinSlow 20s linear infinite',
            }}
          />

          {!isDone && count > 0 ? (
            <div
              key={count}
              className="animate-count-zoom"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '84px',
                fontWeight: 900,
                color: '#B8860B',
                textShadow: '0 0 25px rgba(212, 175, 55, 0.6), 0 4px 10px rgba(110, 80, 40, 0.2)',
                userSelect: 'none',
              }}
            >
              {count}
            </div>
          ) : (
            <div
              className="animate-count-zoom"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '44px',
                fontWeight: 700,
                color: '#AA7C11',
                letterSpacing: '0.1em',
              }}
            >
              Let's Begin ✨
            </div>
          )}
        </div>

        {/* Quick Skip or Explore Button */}
        <div>
          <button
            onClick={handleSkip}
            className="btn-royal"
            style={{ fontSize: '13px', padding: '12px 28px' }}
          >
            <span>Begin the Journey</span>
            <span>↓</span>
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

