import React, { useId } from 'react';

export default function FloatingDecorations() {
  const compId = useId().replace(/:/g, '');

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Soft Ambient Radial Lights */}
      <div 
        style={{
          position: 'absolute',
          top: '5%',
          left: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(243, 229, 171, 0.25) 0%, rgba(253, 251, 247, 0) 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />
      <div 
        style={{
          position: 'absolute',
          top: '60%',
          right: '5%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(232, 180, 184, 0.2) 0%, rgba(253, 251, 247, 0) 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
        }}
      />

      {/* Floating Sparkles Array */}
      {[
        { top: '12%', left: '8%', size: 14, delay: '0s', duration: '3s' },
        { top: '22%', right: '12%', size: 18, delay: '1.2s', duration: '4s' },
        { top: '45%', left: '5%', size: 12, delay: '0.5s', duration: '3.5s' },
        { top: '65%', right: '8%', size: 16, delay: '2s', duration: '4.5s' },
        { top: '80%', left: '15%', size: 20, delay: '1.5s', duration: '3.8s' },
        { top: '90%', right: '20%', size: 14, delay: '0.8s', duration: '3.2s' },
      ].map((sp, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: sp.top,
            left: sp.left,
            right: sp.right,
            width: `${sp.size}px`,
            height: `${sp.size}px`,
            animation: `sparkleShimmer ${sp.duration} infinite ease-in-out`,
            animationDelay: sp.delay,
            color: '#D4AF37',
            opacity: 0.6,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div>
      ))}

      {/* Subtle Floating Balloons on Margins */}
      <div
        className="animate-balloon-sway"
        style={{
          position: 'absolute',
          top: '18%',
          left: '3%',
          width: '38px',
          height: '48px',
          opacity: 0.45,
        }}
      >
        <svg viewBox="0 0 40 55" fill="none">
          <defs>
            <linearGradient id={`balloon-g1-${compId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#F5E5C9" />
              <stop offset="100%" stop-color="#D4AF37" />
            </linearGradient>
          </defs>
          <ellipse cx="20" cy="22" rx="18" ry="22" fill={`url(#balloon-g1-${compId})`} />
          <polygon points="17,44 23,44 20,48" fill="#AA7C11" />
          <path d="M 20,48 Q 24,55 18,65" stroke="#AA7C11" strokeWidth="1" fill="none" opacity="0.6" />
        </svg>
      </div>

      <div
        className="animate-balloon-sway"
        style={{
          position: 'absolute',
          top: '55%',
          right: '3%',
          width: '42px',
          height: '52px',
          animationDelay: '2.5s',
          opacity: 0.45,
        }}
      >
        <svg viewBox="0 0 40 55" fill="none">
          <defs>
            <linearGradient id={`balloon-g2-${compId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FCE4EC" />
              <stop offset="100%" stop-color="#C98A7D" />
            </linearGradient>
          </defs>
          <ellipse cx="20" cy="22" rx="18" ry="22" fill={`url(#balloon-g2-${compId})`} />
          <polygon points="17,44 23,44 20,48" fill="#B76E79" />
          <path d="M 20,48 Q 16,56 22,66" stroke="#B76E79" strokeWidth="1" fill="none" opacity="0.6" />
        </svg>
      </div>
    </div>
  );
}

