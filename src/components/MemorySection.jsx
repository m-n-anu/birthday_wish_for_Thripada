import React from 'react';
import PhotoFrame from './PhotoFrame';

export default function MemorySection({
  memory,
  index,
  total = 5,
  onPrev,
  onNext,
  isLast = false
}) {
  const isOdd = index % 2 === 0;

  return (
    <section
      id={`memory-${memory.id}`}
      className="section-stage royal-pattern-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '90px 20px 80px 20px',
      }}
    >
      <div
        className="royal-card"
        style={{
          maxWidth: '1050px',
          width: '100%',
          padding: '50px 36px',
          position: 'relative',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(254, 250, 245, 0.92) 100%)',
        }}
      >
        {/* Memory Counter Badge */}
        {index > 0 && <div style={{ textAlign: 'center', marginBottom: '14px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '30px',
              padding: '6px 20px',
              fontSize: '12px',
              fontFamily: 'var(--font-serif)',
              fontWeight: 700,
              color: 'var(--text-gold)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            <span>📜</span>
            <span>{memory.indexLabel}</span>
          </div>
        </div>}

        {/* Section Heading & Subtitle */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2
            className="font-royal-title gold-text-gradient"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 800,
              lineHeight: 1.25,
              marginBottom: '10px',
            }}
          >
            {memory.title}
          </h2>
          {memory.subtitle && (
            <p
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '13px',
                color: 'var(--text-muted)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {memory.subtitle}
            </p>
          )}
        </div>

        {/* ==============================================================
            CREATIVE PHOTO COMPOSITIONS ACROSS THE 5 SECTIONS
            ============================================================== */}
        <div style={{ marginBottom: '36px' }}>
          {/* LAYOUT 1: Duo Royal Collage (Memory 1 & 5) */}
          {(memory.layout === 'royal-duo' || memory.layout === 'royal-duo-warm') && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '32px',
                alignItems: 'center',
                maxWidth: '820px',
                margin: '0 auto',
              }}
            >
              {memory.photos.map((photo, pIdx) => (
                <div
                  key={photo.id}
                  style={{
                    transform: pIdx === 0 ? 'rotate(-1.5deg)' : 'rotate(1.5deg)',
                    transition: 'transform 0.3s ease',
                  }}
                  className="memory-photo-wrap"
                >
                  <PhotoFrame
                    photo={photo}
                    aspectRatio="4/5"
                    theme={memory.decorativeTheme}
                  />
                </div>
              ))}
            </div>
          )}

          {/* LAYOUT 2: Layered Editorial Composition (Memory 2 with Throwball decorative frame) */}
          {memory.layout === 'layered-editorial' && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '24px',
                maxWidth: '860px',
                margin: '0 auto',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '320px',
                  maxWidth: '100%',
                  zIndex: 2,
                  transform: 'rotate(-2deg)',
                }}
                className="memory-photo-wrap"
              >
                <PhotoFrame
                  photo={memory.photos[0]}
                  aspectRatio="4/5"
                  theme={memory.decorativeTheme} // throwball-accent decorative graphics
                />
              </div>

              <div
                style={{
                  width: '330px',
                  maxWidth: '100%',
                  zIndex: 1,
                  transform: 'rotate(2deg) translateY(10px)',
                }}
                className="memory-photo-wrap"
              >
                <PhotoFrame
                  photo={memory.photos[1]}
                  aspectRatio="4/5"
                  theme="royal-flourish"
                />
              </div>
            </div>
          )}

          {/* LAYOUT 3: Featured Solo Grand Frame (Memory 3 - Exactly 1 Photo) */}
          {memory.layout === 'featured-solo' && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxWidth: '480px',
                margin: '0 auto',
              }}
            >
              <div
                style={{
                  width: '100%',
                  transform: 'scale(1.02)',
                }}
                className="memory-photo-wrap"
              >
                <PhotoFrame
                  photo={memory.photos[0]}
                  aspectRatio="4/5"
                  theme="ornate-centerpiece"
                />
              </div>
            </div>
          )}

          {/* LAYOUT 4: Blended Collage (Memory 4 with Badminton decorative frame) */}
          {memory.layout === 'blended-collage' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '28px',
                alignItems: 'center',
                maxWidth: '820px',
                margin: '0 auto',
              }}
            >
              <div
                style={{
                  transform: 'rotate(-1deg)',
                }}
                className="memory-photo-wrap"
              >
                <PhotoFrame
                  photo={memory.photos[0]}
                  aspectRatio="4/5"
                  theme={memory.decorativeTheme} // badminton-accent decorative graphics
                />
              </div>
              <div
                style={{
                  transform: 'rotate(1.5deg)',
                }}
                className="memory-photo-wrap"
              >
                <PhotoFrame
                  photo={memory.photos[1]}
                  aspectRatio="4/5"
                  theme="royal-flourish"
                />
              </div>
            </div>
          )}
        </div>

        {/* Meaningful Emotional Caption */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto 36px auto',
            textAlign: 'center',
            position: 'relative',
            padding: '24px 30px',
            background: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            borderRadius: '16px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 8px 24px rgba(110, 80, 40, 0.05)',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '8px',
              left: '16px',
              fontFamily: 'var(--font-serif)',
              fontSize: '32px',
              color: 'rgba(212, 175, 55, 0.35)',
              lineHeight: 1,
            }}
          >
            “
          </span>

          <p
            className="font-editorial"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.22rem)',
              color: 'var(--text-primary)',
              lineHeight: 1.7,
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            {memory.caption}
          </p>

          <span
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '16px',
              fontFamily: 'var(--font-serif)',
              fontSize: '32px',
              color: 'rgba(212, 175, 55, 0.35)',
              lineHeight: 1,
            }}
          >
            ”
          </span>
        </div>

        {/* Navigation Controls: Previous / Next Memory */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '680px',
            margin: '0 auto',
            paddingTop: '10px',
            borderTop: '1px solid rgba(212, 175, 55, 0.2)',
          }}
        >
          {index > 0 ? (
            <button
              onClick={onPrev}
              className="btn-royal-outline"
              style={{ fontSize: '12px', padding: '8px 18px' }}
            >
              <span>←</span>
              <span>Previous Memory</span>
            </button>
          ) : (
            <button
              onClick={() => {
                const el = document.getElementById('cake');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-royal-outline"
              style={{ fontSize: '12px', padding: '8px 18px' }}
            >
              <span>←</span>
              <span>Back to Cake</span>
            </button>
          )}

          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '11px',
              color: 'var(--text-gold)',
              fontWeight: 700,
              letterSpacing: '0.1em',
            }}
          >
            {index + 1} of {total}
          </div>

          {!isLast && <button onClick={onNext} className="btn-royal" style={{ fontSize: '12px', padding: '10px 22px' }}><span>Next Memory</span><span>&rarr;</span></button>}
        </div>
      </div>

      <style>{`
        .memory-photo-wrap:hover {
          transform: translateY(-4px) scale(1.01) !important;
        }
      `}</style>
    </section>
  );
}

