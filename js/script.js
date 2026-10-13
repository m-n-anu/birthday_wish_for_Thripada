/**
 * Royal Birthday Surprise — Wine & Glassmorphism Interactive Experience Controller
 * Standalone, 100% client-side, zero build-step, GitHub Pages compatible.
 */

// ==========================================================================
// 1. Audio System (Music ON by default, unlocked upon first user interaction)
// ==========================================================================
class RoyalAudioSystem {
  constructor() {
    this.isMuted = false;
    this.audioEl = new Audio('audio/A_Year_Around_the_Sun.mp3');
    this.audioEl.loop = true;
    this.audioEl.volume = 0.55;
    this.ctx = null;
    this.hasUnlocked = false;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  unlockAndPlay() {
    if (this.hasUnlocked) return;
    this.hasUnlocked = true;
    this.init();
    if (!this.isMuted) {
      this.audioEl.play().catch(() => {
        this.hasUnlocked = false;
        document.addEventListener('pointerdown', () => this.unlockAndPlay(), { once: true });
      });
    }
  }

  toggle() {
    this.init();
    this.isMuted = !this.isMuted;
    const textSpan = document.getElementById('audio-status-text');
    const wave = document.getElementById('audio-wave-anim');
    const btn = document.getElementById('audio-toggle-btn');

    if (this.isMuted) {
      this.audioEl.pause();
      if (textSpan) textSpan.textContent = 'Sound Off';
      if (wave) wave.style.display = 'none';
      if (btn) btn.style.opacity = '0.6';
    } else {
      this.audioEl.play().catch(() => this.playSynthAmbience());
      if (textSpan) textSpan.textContent = 'Music On';
      if (wave) wave.style.display = 'flex';
      if (btn) btn.style.opacity = '1';
    }
  }

  playTone(freq, type = 'sine', duration = 0.8, delay = 0, gainLevel = 0.12) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(gainLevel, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.05);
    } catch (e) {}
  }

  playDiyaChime() {
    this.init();
    [440, 554.37, 659.25, 830.61, 880].forEach((f, i) =>
      this.playTone(f, 'sine', 1.2, i * 0.12, 0.14)
    );
  }

  playCakeCutChime() {
    this.init();
    [587.33, 659.25, 739.99, 880, 987.77].forEach((f, i) =>
      this.playTone(f, 'triangle', 0.6, i * 0.08, 0.1)
    );
  }

  playCakeServeChime() {
    this.init();
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      this.playTone(f, 'sine', 1.5, i * 0.05, 0.14)
    );
  }

  playFinaleChime() {
    this.init();
    [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98].forEach((f, i) =>
      this.playTone(f, 'sine', 1.8, i * 0.09, 0.12)
    );
  }

  playSynthAmbience() {
    if (this.isMuted || !this.ctx) return;
    const chords = [
      [261.63, 329.63, 392.0, 523.25],
      [220.0, 261.63, 329.63, 440.0],
      [174.61, 220.0, 261.63, 349.23],
      [196.0, 246.94, 293.66, 392.0]
    ];
    let idx = 0;
    const loop = () => {
      if (this.isMuted) return;
      const c = chords[idx % chords.length];
      c.forEach((n, i) => this.playTone(n, 'sine', 2.0, i * 0.5, 0.03));
      idx++;
      setTimeout(loop, 2400);
    };
    loop();
  }
}

const royalAudio = new RoyalAudioSystem();

// ==========================================================================
// 2. High-Performance Golden Dust Particles Canvas
// ==========================================================================
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 2.2 + 0.8,
    speedY: -(Math.random() * 0.35 + 0.12),
    speedX: (Math.random() - 0.5) * 0.2,
    alpha: Math.random() * 0.45 + 0.15,
    phase: Math.random() * Math.PI * 2
  }));

  function animate() {
    ctx.clearRect(0, 0, w, h);
    const t = Date.now() * 0.001;
    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(t + p.phase) * 0.12;

      if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;

      const a = Math.max(0.08, Math.min(0.65, p.alpha + Math.sin(t * 1.5 + p.phase) * 0.08));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${a})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(240, 208, 96, ${a * 0.7})`;
      ctx.fill();
    });
    ctx.shadowBlur = 0;
    requestAnimationFrame(animate);
  }
  animate();
}

// ==========================================================================
// 3. Delicate Rose / Gold Petals Canvas
// ==========================================================================
function initPetals() {
  const canvas = document.getElementById('petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  });

  const colors = [
    'rgba(201, 144, 125, 0.45)',
    'rgba(232, 180, 184, 0.4)',
    'rgba(240, 208, 96, 0.35)',
    'rgba(145, 48, 85, 0.3)'
  ];

  const petals = Array.from({ length: 16 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h - h,
    size: Math.random() * 8 + 6,
    speedY: Math.random() * 0.5 + 0.25,
    speedX: (Math.random() - 0.5) * 0.3,
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 1.2,
    color: colors[Math.floor(Math.random() * colors.length)],
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: Math.random() * 0.02 + 0.01
  }));

  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-p.size * 0.5, -p.size * 0.6, -p.size, p.size * 0.2, 0, p.size);
    ctx.bezierCurveTo(p.size, p.size * 0.2, p.size * 0.5, -p.size * 0.6, 0, 0);
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    petals.forEach(p => {
      p.y += p.speedY;
      p.wobble += p.wobbleSpeed;
      p.x += p.speedX + Math.sin(p.wobble) * 0.4;
      p.rotation += p.rotSpeed;

      if (p.y > h + 20) {
        p.y = -20;
        p.x = Math.random() * w;
      }
      drawPetal(p);
    });
    requestAnimationFrame(animate);
  }
  animate();
}

// ==========================================================================
// 4. Pure CSS/Canvas Gold & Wine Confetti Cannon
// ==========================================================================
function fireRoyalConfetti() {
  const count = 85;
  const colors = ['#D4AF37', '#F0D060', '#C9907D', '#E8B4B8', '#FFFFFF', '#913055'];
  const confettiCanvas = document.createElement('canvas');
  confettiCanvas.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:9999';
  document.body.appendChild(confettiCanvas);
  const ctx = confettiCanvas.getContext('2d');
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const pieces = Array.from({ length: count }, () => ({
    x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 240,
    y: window.innerHeight * 0.55,
    size: Math.random() * 7 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 16,
    vy: -(Math.random() * 14 + 7),
    rotation: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 10,
    opacity: 1
  }));

  const start = Date.now();
  function render() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    const elapsed = Date.now() - start;
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.32;
      p.rotation += p.rotSpeed;
      if (elapsed > 1600) p.opacity -= 0.02;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      ctx.restore();
    });

    if (elapsed < 3000) {
      requestAnimationFrame(render);
    } else {
      confettiCanvas.remove();
    }
  }
  render();
}

// ==========================================================================
// 5. Countdown Portal (Triggers on Page Load & scrolls to Diya, NOT Cake)
// ==========================================================================
function initCountdown() {
  const portal = document.getElementById('countdown-portal');
  const countEl = document.getElementById('countdown-digits');
  const enterBtn = document.getElementById('portal-enter-btn');
  let current = 5;

  function dismissPortal() {
    royalAudio.unlockAndPlay();
    portal.classList.add('portal-hidden');
    setTimeout(() => {
      portal.style.display = 'none';
      // Strictly scroll to the Diya ceremony (Ceremony 1)
      const diyaEl = document.getElementById('diya');
      if (diyaEl) {
        diyaEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 1200);
  }

  if (enterBtn) enterBtn.addEventListener('click', dismissPortal);

  const interval = setInterval(() => {
    current--;
    if (current > 0) {
      countEl.textContent = current;
      countEl.style.animation = 'none';
      void countEl.offsetWidth;
      countEl.style.animation = 'numPulse 1s cubic-bezier(0.16, 1, 0.3, 1)';
      royalAudio.playTone(520 + (5 - current) * 45, 'sine', 0.25, 0, 0.08);
    } else {
      clearInterval(interval);
      countEl.textContent = '✨';
      setTimeout(dismissPortal, 800);
    }
  }, 1300);
}

// ==========================================================================
// 6. Interactive Diya Ceremony (Trace over wick to light)
// ==========================================================================
function initDiya() {
  const wickTarget = document.getElementById('wick-touch-target');
  const flameGroup = document.getElementById('diya-flame-group');
  const halo = document.getElementById('diya-halo');
  const progressFill = document.getElementById('diya-progress-fill');
  const progressText = document.getElementById('diya-progress-text');
  const continueBtn = document.getElementById('diya-continue-wrap');
  const blessingText = document.getElementById('diya-instruction-text');

  let traceProgress = 0;
  let isLit = false;
  let isTracing = false;
  let lastPos = null;

  function onPointerDown(e) {
    if (isLit) return;
    royalAudio.unlockAndPlay();
    isTracing = true;
    lastPos = { x: e.clientX, y: e.clientY };
  }

  function onPointerMove(e) {
    if (isLit || !isTracing || !lastPos) return;
    const dist = Math.hypot(e.clientX - lastPos.x, e.clientY - lastPos.y);
    if (dist > 3) {
      traceProgress = Math.min(100, traceProgress + 4.5);
      if (progressFill) progressFill.style.width = `${traceProgress}%`;
      if (progressText) progressText.textContent = `${Math.round(traceProgress)}%`;
      if (flameGroup) flameGroup.style.transform = `scale(${traceProgress / 100})`;
      if (traceProgress >= 100) igniteDiya();
      lastPos = { x: e.clientX, y: e.clientY };
    }
  }

  function onPointerUp() { isTracing = false; lastPos = null; }

  function igniteDiya() {
    if (isLit) return;
    isLit = true;
    if (flameGroup) {
      flameGroup.style.transform = 'scale(1)';
      flameGroup.classList.add('lit');
    }
    if (halo) halo.classList.add('lit');
    if (wickTarget) wickTarget.style.cursor = 'default';
    royalAudio.playDiyaChime();

    if (blessingText) {
      blessingText.innerHTML =
        '<span style="color:var(--gold);font-weight:600">' +
        '✨ A golden flame ignited for a radiant year ahead! May your days shine with peace and prosperity.' +
        '</span>';
    }
    const tracker = document.getElementById('diya-progress-container');
    if (tracker) tracker.style.display = 'none';
    if (continueBtn) continueBtn.style.display = 'block';
  }

  if (wickTarget) {
    wickTarget.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  }
}

// ==========================================================================
// 7. Realistic Cake Cutting & Serving (Strictly Glitch-Free)
// ==========================================================================
function initCake() {
  const cutArea = document.getElementById('cake-cut-area');
  const cutProgressFill = document.getElementById('cake-progress-fill');
  const cutProgressText = document.getElementById('cake-progress-text');
  const cutPromptWrap = document.getElementById('cake-cut-prompt-wrap');
  const instructionText = document.getElementById('cake-instruction-text');
  const interactiveSlice = document.getElementById('interactive-slice');
  const cutLine = document.getElementById('cake-cut-line');
  const cutWedgeCavity = document.getElementById('cut-wedge-cavity');
  const continueWrap = document.getElementById('cake-continue-wrap');
  const sliceHint = document.getElementById('slice-serve-hint');
  const quickCutBtn = document.getElementById('quick-cut-btn');
  const globalBalloons = document.getElementById('global-balloons-container');

  let cakeState = 'uncut';
  let cutProgress = 0;
  let isDragging = false;
  let lastPos = null;

  function onDown(e) {
    if (cakeState !== 'uncut') return;
    royalAudio.unlockAndPlay();
    isDragging = true;
    lastPos = { x: e.clientX, y: e.clientY };
  }

  function onMove(e) {
    if (cakeState !== 'uncut' || !isDragging || !lastPos) return;
    const dy = Math.max(0, e.clientY - lastPos.y);
    const dist = Math.hypot(e.clientX - lastPos.x, e.clientY - lastPos.y);

    if (dist > 3) {
      cutProgress = Math.min(100, cutProgress + (dy > 0 ? 9 : 5));
      if (cutProgressFill) cutProgressFill.style.width = `${cutProgress}%`;
      if (cutProgressText) cutProgressText.textContent = `${Math.round(cutProgress)}%`;
      if (cutProgress >= 100) completeCut();
      lastPos = { x: e.clientX, y: e.clientY };
    }
  }

  function onUp() { isDragging = false; lastPos = null; }

  function completeCut() {
    if (cakeState !== 'uncut') return;
    cakeState = 'cut';
    royalAudio.playCakeCutChime();

    // 1. Reveal Cut incision line
    if (cutLine) cutLine.style.display = 'block';

    // 2. Reveal realistic exposed sponge interior cavity
    if (cutWedgeCavity) cutWedgeCavity.style.display = 'block';

    // 3. Reveal the cake slice ready to be served
    if (interactiveSlice) interactiveSlice.style.display = 'block';

    // 4. Hide knife drag overlay & prompt
    if (cutArea) cutArea.style.display = 'none';
    if (cutPromptWrap) cutPromptWrap.style.display = 'none';
    if (sliceHint) sliceHint.style.display = 'block';

    if (instructionText) {
      instructionText.innerHTML =
        '<span style="color:var(--gold);font-weight:600">' +
        '✨ Clean cut made! The sponge layers are exposed. Click the slice to place it neatly onto the porcelain plate.' +
        '</span>';
    }
  }

  function serveSlice() {
    if (cakeState !== 'cut') return;
    cakeState = 'served';
    royalAudio.playCakeServeChime();
    fireRoyalConfetti();

    // Glide slice smoothly onto the plate
    if (interactiveSlice) {
      interactiveSlice.classList.add('slice-served');
    }
    if (sliceHint) sliceHint.style.display = 'none';
    if (continueWrap) continueWrap.style.display = 'block';

    // ACTIVATE GLOBAL BALLOONS FLOATING ACROSS ALL SECTIONS FROM HERE ONWARD
    if (globalBalloons) {
      globalBalloons.style.display = 'block';
      setTimeout(() => { globalBalloons.style.opacity = '1'; }, 50);
    }

    // Update text gracefully without unwanted verbose strings
    if (instructionText) {
      instructionText.innerHTML =
        '<span style="color:var(--gold);font-weight:600">' +
        '🎉 Slice served! Wishing you an unforgettable celebration filled with joy and sweetness.' +
        '</span>';
    }
  }

  if (cutArea) {
    cutArea.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }
  if (quickCutBtn) quickCutBtn.addEventListener('click', completeCut);
  if (interactiveSlice) interactiveSlice.addEventListener('click', serveSlice);
  if (sliceHint) sliceHint.addEventListener('click', serveSlice);
}

// ==========================================================================
// 8. Scroll-Reveal Observer for Seamless Continuous Scrolling
// ==========================================================================
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ==========================================================================
// 9. Navigation Helpers & Finale Confetti on Scroll
// ==========================================================================
function initNavigation() {
  document.querySelectorAll('[data-scroll-to]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-scroll-to');
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const audioBtn = document.getElementById('audio-toggle-btn');
  if (audioBtn) audioBtn.addEventListener('click', () => royalAudio.toggle());

  let finaleTriggered = false;
  const finaleEl = document.getElementById('finale');
  if (finaleEl && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !finaleTriggered) {
            finaleTriggered = true;
            royalAudio.playFinaleChime();
            fireRoyalConfetti();
            setTimeout(fireRoyalConfetti, 400);
            setTimeout(fireRoyalConfetti, 900);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(finaleEl);
  }

  window.addEventListener('pointerdown', () => royalAudio.unlockAndPlay(), { once: true });
}

// ==========================================================================
// DOM Initialization
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // Ensure the document begins at the top on initial load
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  initParticles();
  initPetals();
  initCountdown();
  initDiya();
  initCake();
  initScrollReveal();
  initNavigation();
});
