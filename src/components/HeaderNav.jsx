import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/soundEffects';
import { birthdayCelebrant } from '../data/birthdayContent';

export default function HeaderNav({ activeSection }) {
  const [isMuted, setIsMuted] = useState(sounds.isMuted);

  const toggleSound = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        background: 'rgba(253, 251, 247, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
        boxShadow: '0 4px 20px rgba(110, 80, 40, 0.04)',
      }}
    >
      {/* Royal Crest / Brand */}
      <div 
        onClick={() => scrollTo('countdown')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <span style={{ fontSize: '20px' }}>👑</span>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--text-gold)',
              lineHeight: 1.2,
            }}
          >
            Royal Celebration
          </div>
          <div
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-body)',
              color: 'var(--text-muted)',
              letterSpacing: '0.05em',
            }}
          >
            {birthdayCelebrant.name}
          </div>
        </div>
      </div>

      {/* Center navigation shortcuts for larger screens */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
        className="nav-shortcuts"
      >
        <button
          onClick={() => scrollTo('diya')}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-serif)',
            fontSize: '12px',
            letterSpacing: '0.08em',
            color: activeSection === 'diya' ? 'var(--text-gold)' : 'var(--text-secondary)',
            fontWeight: activeSection === 'diya' ? 700 : 500,
            cursor: 'pointer',
            padding: '4px 8px',
            borderBottom: activeSection === 'diya' ? '2px solid var(--gold-primary)' : '2px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          Diya
        </button>

        <button
          onClick={() => scrollTo('cake')}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-serif)',
            fontSize: '12px',
            letterSpacing: '0.08em',
            color: activeSection === 'cake' ? 'var(--text-gold)' : 'var(--text-secondary)',
            fontWeight: activeSection === 'cake' ? 700 : 500,
            cursor: 'pointer',
            padding: '4px 8px',
            borderBottom: activeSection === 'cake' ? '2px solid var(--gold-primary)' : '2px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          Cake
        </button>

        <button
          onClick={() => scrollTo('memory-1')}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-serif)',
            fontSize: '12px',
            letterSpacing: '0.08em',
            color: activeSection && activeSection.startsWith('memory') ? 'var(--text-gold)' : 'var(--text-secondary)',
            fontWeight: activeSection && activeSection.startsWith('memory') ? 700 : 500,
            cursor: 'pointer',
            padding: '4px 8px',
            borderBottom: activeSection && activeSection.startsWith('memory') ? '2px solid var(--gold-primary)' : '2px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          Memories (5)
        </button>

        <button
          onClick={() => scrollTo('finale')}
          style={{
            background: 'none',
            border: 'none',
            fontFamily: 'var(--font-serif)',
            fontSize: '12px',
            letterSpacing: '0.08em',
            color: activeSection === 'finale' ? 'var(--text-gold)' : 'var(--text-secondary)',
            fontWeight: activeSection === 'finale' ? 700 : 500,
            cursor: 'pointer',
            padding: '4px 8px',
            borderBottom: activeSection === 'finale' ? '2px solid var(--gold-primary)' : '2px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          Finale ✨
        </button>
      </nav>

      {/* Right controls: Audio Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          onClick={toggleSound}
          title={isMuted ? "Click to play soothing royal music & chimes" : "Mute music and sounds"}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: isMuted ? 'rgba(255, 255, 255, 0.7)' : 'rgba(212, 175, 55, 0.15)',
            border: isMuted ? '1px solid rgba(212, 175, 55, 0.3)' : '1px solid #D4AF37',
            borderRadius: '30px',
            padding: '6px 14px',
            cursor: 'pointer',
            fontSize: '12px',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            color: isMuted ? 'var(--text-secondary)' : 'var(--gold-dark)',
            transition: 'all 0.25s ease',
          }}
        >
          <span>{isMuted ? '🔇' : '🎵'}</span>
          <span>{isMuted ? 'Sound Off' : 'Music On'}</span>
          {!isMuted && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '12px' }}>
              <span className="audio-bar audio-bar-1" />
              <span className="audio-bar audio-bar-2" />
              <span className="audio-bar audio-bar-3" />
            </div>
          )}
        </button>
      </div>

      <style>{`
        .audio-bar {
          display: inline-block;
          width: 2.5px;
          background: #AA7C11;
          border-radius: 2px;
          animation: audioWave 1s infinite ease-in-out;
        }
        .audio-bar-1 { height: 6px; animation-delay: 0.1s; }
        .audio-bar-2 { height: 12px; animation-delay: 0.3s; }
        .audio-bar-3 { height: 8px; animation-delay: 0.5s; }

        @keyframes audioWave {
          0%, 100% { height: 4px; }
          50% { height: 13px; }
        }

        @media (max-width: 680px) {
          .nav-shortcuts {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}

