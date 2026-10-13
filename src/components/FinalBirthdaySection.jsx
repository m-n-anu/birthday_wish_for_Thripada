import React, { useEffect } from 'react';
import PhotoFrame from './PhotoFrame';
import { finalCelebrationContent, birthdayCelebrant } from '../data/birthdayContent';
import { sounds } from '../utils/soundEffects';

export default function FinalBirthdaySection({ onReplay }) {
  useEffect(() => {
    // Fire celebratory sparkles and sound when this climax section is rendered
    const fireClimax = async () => {
      try {
        sounds.playCelebrationChime();
        const confettiModule = await import('canvas-confetti');
        const confetti = confettiModule.default || confettiModule;
        // Confetti burst from both sides
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6, x: 0.2 },
          colors: ['#D4AF37', '#F3E5AB', '#C98A7D', '#FFFFFF', '#AA7C11'],
        });
        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6, x: 0.8 },
            colors: ['#D4AF37', '#F3E5AB', '#C98A7D', '#FFFFFF', '#AA7C11'],
          });
        }, 350);
      } catch {
        // Fallback
      }
    };

    fireClimax();
  }, []);

  const handleReplay = () => {
    if (onReplay) {
      onReplay();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const finalPhotoObj = {
    id: 'final-photo',
    src: finalCelebrationContent.finalPhotoPath,
    fallback: finalCelebrationContent.finalPhotoFallback,
    alt: `Happy Birthday to ${birthdayCelebrant.name}`,
    captionLabel: finalCelebrationContent.photoTitle,
  };

  return (
    <section
      id="finale"
      className="section-stage royal-pattern-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '100px 20px 80px 20px',
        overflow: 'hidden',
      }}
    >
      {/* Floating rising balloons for the grand finale */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[
          { left: '10%', delay: '0s', duration: '14s', size: 45, color: '#D4AF37' },
          { left: '25%', delay: '4s', duration: '16s', size: 38, color: '#F3E5AB' },
          { left: '75%', delay: '2s', duration: '15s', size: 42, color: '#C98A7D' },
          { left: '88%', delay: '6s', duration: '17s', size: 36, color: '#E8B4B8' },
        ].map((b, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              bottom: '-80px',
              left: b.left,
              width: `${b.size}px`,
              height: `${b.size * 1.3}px`,
              animation: `balloonFloatUp ${b.duration} linear infinite`,
              animationDelay: b.delay,
              opacity: 0.75,
            }}
          >
            <svg viewBox="0 0 40 55" fill="none">
              <ellipse cx="20" cy="22" rx="18" ry="22" fill={b.color} />
              <polygon points="17,44 23,44 20,48" fill="#AA7C11" />
              <path d="M 20,48 Q 24,55 18,65" stroke="#AA7C11" strokeWidth="1" fill="none" opacity="0.6" />
            </svg>
          </div>
        ))}
      </div>

      <div
        className="royal-card"
        style={{
          maxWidth: '850px',
          width: '100%',
          padding: '60px 40px',
          textAlign: 'center',
          position: 'relative',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(254, 250, 244, 0.94) 100%)',
          border: '2px solid rgba(212, 175, 55, 0.5)',
          boxShadow: '0 30px 70px -15px rgba(110, 80, 40, 0.22), 0 0 45px rgba(212, 175, 55, 0.25)',
        }}
      >
        {/* Crown Badge */}
        <div style={{ marginBottom: '16px' }}>
          <span style={{ fontSize: '42px', display: 'inline-block' }} className="animate-float">
            👑
          </span>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '13px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--text-gold)',
            marginBottom: '10px',
            fontWeight: 700,
          }}
        >
          {finalCelebrationContent.badge}
        </div>

        {/* Large Prominent Celebration Heading */}
        <h1
          className="font-royal-title gold-text-gradient"
          style={{
            fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: '32px',
          }}
        >
          {finalCelebrationContent.heading}
        </h1>

        {/* THE VISUAL CENTERPIECE: Grand Photograph in Large Royal Frame */}
        <div
          style={{
            maxWidth: '460px',
            margin: '0 auto 40px auto',
            transform: 'scale(1.03)',
          }}
        >
          <PhotoFrame
            photo={finalPhotoObj}
            aspectRatio="2/3"
            theme="grand-finale"
            priority={true}
          />
        </div>

        {/* Heartfelt Birthday Message Paragraphs */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto 36px auto',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          {finalCelebrationContent.messageParagraphs.map((para, pIdx) => (
            <p
              key={pIdx}
              className="font-editorial"
              style={{
                fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
                color: 'var(--text-primary)',
                lineHeight: 1.75,
                fontStyle: 'normal',
                margin: 0,
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Elegant Ornamental Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            margin: '30px auto',
          }}
        >
          <div style={{ width: '80px', height: '1px', background: 'linear-gradient(90deg, transparent, #D4AF37)' }} />
          <span style={{ color: '#D4AF37', fontSize: '20px' }}>❦</span>
          <div style={{ width: '80px', height: '1px', background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
        </div>

        {/* Concluding Line */}
        <p
          className="font-script"
          style={{
            fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
            color: 'var(--burgundy-accent)',
            marginBottom: '40px',
            lineHeight: 1.4,
          }}
        >
          {finalCelebrationContent.closingLine}
        </p>

        {/* Replay Button to Relive Celebration */}
        <div>
          <button
            onClick={handleReplay}
            className="btn-royal"
            style={{ padding: '16px 42px', fontSize: '14px' }}
          >
            <span>✨ {finalCelebrationContent.replayButtonText}</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </section>
  );
}

