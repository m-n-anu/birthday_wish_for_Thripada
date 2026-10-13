import React from 'react';

export default function ProgressIndicator({ activeSection }) {
  const steps = [
    { id: 'countdown', label: 'Introduction', short: 'Intro' },
    { id: 'diya', label: 'Diya Ceremony', short: 'Diya' },
    { id: 'cake', label: 'Cake Celebration', short: 'Cake' },
    { id: 'memory-1', label: 'Memory 1 of 5', short: 'Mem 1' },
    { id: 'memory-2', label: 'Memory 2 of 5', short: 'Mem 2' },
    { id: 'memory-3', label: 'Memory 3 of 5', short: 'Mem 3' },
    { id: 'memory-4', label: 'Memory 4 of 5', short: 'Mem 4' },
    { id: 'memory-5', label: 'Memory 5 of 5', short: 'Mem 5' },
    { id: 'finale', label: 'Grand Birthday Finale', short: 'Finale' },
  ];

  const currentIndex = steps.findIndex(s => s.id === activeSection);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const progressPercent = ((safeIndex) / (steps.length - 1)) * 100;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top micro progress line */}
      <div
        style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          right: 0,
          height: '3px',
          background: 'rgba(212, 175, 55, 0.15)',
          zIndex: 49,
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progressPercent}%`,
            background: 'linear-gradient(90deg, #DFBA52 0%, #D4AF37 50%, #B8860B 100%)',
            transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.7)',
          }}
        />
      </div>

      {/* Side Vertical Progress Dots (Visible on larger screens) */}
      <aside
        className="royal-progress-tracker"
        aria-label="Celebration Journey Progress"
        style={{
          position: 'fixed',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: '16px 8px',
          borderRadius: '30px',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          boxShadow: '0 10px 25px rgba(110, 80, 40, 0.08)',
        }}
      >
        {steps.map((step, idx) => {
          const isActive = step.id === activeSection;
          const isPassed = idx < safeIndex;

          return (
            <button
              key={step.id}
              onClick={() => scrollTo(step.id)}
              className="progress-dot-btn"
              title={step.label}
              style={{
                background: 'none',
                border: 'none',
                padding: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: isActive ? '12px' : '8px',
                  height: isActive ? '12px' : '8px',
                  borderRadius: '50%',
                  background: isActive
                    ? 'linear-gradient(135deg, #D4AF37 0%, #AA7C11 100%)'
                    : isPassed
                    ? '#DFBA52'
                    : 'rgba(197, 160, 89, 0.25)',
                  boxShadow: isActive ? '0 0 10px rgba(212, 175, 55, 0.8)' : 'none',
                  transition: 'all 0.3s ease',
                  border: isActive ? '2px solid #FFFFFF' : 'none',
                }}
              />
              <span className="progress-tooltip">
                {step.label}
              </span>
            </button>
          );
        })}
      </aside>

      <style>{`
        .progress-dot-btn .progress-tooltip {
          position: absolute;
          right: 26px;
          white-space: nowrap;
          background: rgba(45, 35, 30, 0.85);
          backdrop-filter: blur(8px);
          color: #FAF7F2;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 4px 10px;
          border-radius: 6px;
          pointer-events: none;
          opacity: 0;
          transform: translateX(6px);
          transition: all 0.2s ease;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }

        .progress-dot-btn:hover .progress-tooltip {
          opacity: 1;
          transform: translateX(0);
        }

        @media (max-width: 900px) {
          .royal-progress-tracker {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

