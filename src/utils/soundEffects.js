/**
 * Sound & Audio Controller
 * 
 * Supports both dedicated background music (/audio/birthday-bgm.mp3)
 * and rich Web Audio API synthesis for chimes, sparkles, and offline audio.
 */

class SoundSystem {
  constructor() {
    this.ctx = null;
    this.isMuted = false; // Birthday music starts when the countdown ends
    this.audioEl = null;
    this.isPlayingBg = false;
    this.melodyTimer = null;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (!this.audioEl && typeof Audio !== 'undefined') {
      this.audioEl = new Audio('/audio/A_Year_Around_the_Sun.mp3');
      this.audioEl.loop = true;
      this.audioEl.volume = 0.45;
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.isMuted) {
      this.stopBgMusic();
    } else {
      this.init();
      this.startBgMusic();
    }
  }

  toggleMute() {
    this.setMuted(!this.isMuted);
    return this.isMuted;
  }

  // Soft chime note synthesizer
  playTone(freq, type = 'sine', duration = 0.8, delay = 0, gainLevel = 0.15) {
    if (this.isMuted || !this.ctx) return;
    try {
      const now = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(gainLevel, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // AudioContext catch
    }
  }

  // 1. Diya Lighting Chime
  playDiyaLit() {
    if (this.isMuted) return;
    this.init();
    const notes = [440, 554.37, 659.25, 830.61, 880];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 1.2, idx * 0.12, 0.12);
    });
  }

  // 2. Cake Cut Sparkle
  playCakeCut() {
    if (this.isMuted) return;
    this.init();
    const notes = [587.33, 659.25, 739.99, 880, 987.77];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'triangle', 0.6, idx * 0.08, 0.1);
    });
  }

  // 3. Cake Served Chime
  playCakeServed() {
    if (this.isMuted) return;
    this.init();
    const chord = [523.25, 659.25, 783.99, 1046.50];
    chord.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 1.5, idx * 0.05, 0.14);
    });
  }

  // 4. Celebratory Fanfare
  playCelebrationChime() {
    if (this.isMuted) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5, 1567.98];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 'sine', 1.8, idx * 0.09, 0.12);
    });
  }

  // Background Music: plays audio file or synthesized melody
  startBgMusic() {
    if (this.isPlayingBg || this.isMuted) return;
    this.init();
    this.isPlayingBg = true;

    if (this.audioEl) {
      this.audioEl.play().catch(() => {
        this.isPlayingBg = false;
        document.addEventListener('pointerdown', () => this.startBgMusic(), { once: true });
      });
    } else {
      this.startSynthHarp();
    }
  }

  stopBgMusic() {
    this.isPlayingBg = false;
    if (this.audioEl) {
      this.audioEl.pause();
    }
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
  }

  startSynthHarp() {
    if (!this.isPlayingBg || this.isMuted || !this.ctx) return;
    const chords = [
      [261.63, 329.63, 392.00, 523.25],
      [220.00, 261.63, 329.63, 440.00],
      [174.61, 220.00, 261.63, 349.23],
      [196.00, 246.94, 293.66, 392.00]
    ];
    let chordIdx = 0;
    const playBar = () => {
      if (!this.isPlayingBg || this.isMuted) return;
      const currentChord = chords[chordIdx % chords.length];
      currentChord.forEach((note, i) => {
        this.playTone(note, 'sine', 2.0, i * 0.5, 0.035);
      });
      chordIdx++;
      this.melodyTimer = setTimeout(playBar, 2200);
    };
    playBar();
  }
}

export const sounds = new SoundSystem();

