export type MusicMood = 'night' | 'crimson';

// Japanese Hirajoshi pentatonic frequencies in D (D, Eb, G, A, Bb)
const HIRAJOSHI_NOTES = [
  146.83, // D3
  155.56, // Eb3
  196.0,  // G3
  220.0,  // A3
  233.08, // Bb3
  293.66, // D4
  311.13, // Eb4
  392.0,  // G4
  440.0,  // A4
  466.16, // Bb4
  587.33, // D5
];

class AmbientMusicEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private lfoOsc: OscillatorNode | null = null;
  private delayNode: DelayNode | null = null;
  private noteTimer: number | null = null;
  private breathTimer: number | null = null;
  private drumTimer: number | null = null;
  private isPlaying = false;
  private volume = 0.45;
  private mood: MusicMood = 'night';
  private stepIndex = 0;

  private initContext() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();

    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -18;
    compressor.knee.value = 18;
    compressor.ratio.value = 4;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.0001;

    // Warm dark temple echo bus
    const delay = ctx.createDelay(1.0);
    delay.delayTime.value = 0.38;

    const delayFeedback = ctx.createGain();
    delayFeedback.gain.value = 0.32;

    const delayFilter = ctx.createBiquadFilter();
    delayFilter.type = 'lowpass';
    delayFilter.frequency.value = 1350;

    delay.connect(delayFilter);
    delayFilter.connect(delayFeedback);
    delayFeedback.connect(delay);
    delayFilter.connect(compressor);

    compressor.connect(masterGain);
    masterGain.connect(ctx.destination);

    this.ctx = ctx;
    this.masterGain = masterGain;
    this.delayNode = delay;
  }

  private startDrone() {
    if (!this.ctx || !this.masterGain || this.droneOsc1) return;
    const ctx = this.ctx;

    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 210;

    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.16;

    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.value = 73.42; // D2

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 110.0; // A2

    // Slow breathing LFO on filter cutoff
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 75;
    lfo.connect(lfoGain);
    lfoGain.connect(droneFilter.frequency);

    osc1.connect(droneFilter);
    osc2.connect(droneFilter);
    droneFilter.connect(droneGain);
    droneGain.connect(this.masterGain);

    osc1.start();
    osc2.start();
    lfo.start();

    this.droneOsc1 = osc1;
    this.droneOsc2 = osc2;
    this.lfoOsc = lfo;
  }

  private stopDrone() {
    try {
      this.droneOsc1?.stop();
      this.droneOsc2?.stop();
      this.lfoOsc?.stop();
    } catch {
      // Ignore already stopped oscillators
    }
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.lfoOsc = null;
  }

  private playKotoPluck(freq: number, velocity = 0.14) {
    if (!this.ctx || !this.masterGain || !this.delayNode) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const oscMain = ctx.createOscillator();
    const oscHarmonic = ctx.createOscillator();
    oscMain.type = 'triangle';
    oscHarmonic.type = 'sine';
    oscMain.frequency.setValueAtTime(freq, now);
    oscHarmonic.frequency.setValueAtTime(freq * 2, now);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 4.5, now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(260, freq * 1.1), now + 1.4);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(velocity, now + 0.012);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

    const harmonicGain = ctx.createGain();
    harmonicGain.gain.value = 0.25;

    oscMain.connect(filter);
    oscHarmonic.connect(harmonicGain);
    harmonicGain.connect(filter);
    filter.connect(env);

    env.connect(this.masterGain);
    env.connect(this.delayNode);

    oscMain.start(now);
    oscHarmonic.start(now);
    oscMain.stop(now + 2.5);
    oscHarmonic.stop(now + 2.5);
  }

  private playShakuhachiSwell(freq: number) {
    if (!this.ctx || !this.masterGain || !this.delayNode) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 0.992, now);
    osc.frequency.linearRampToValueAtTime(freq, now + 0.8);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(0.065, now + 1.8);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 5.2);

    osc.connect(env);
    env.connect(this.masterGain);
    env.connect(this.delayNode);

    osc.start(now);
    osc.stop(now + 5.4);
  }

  private playDeepTaiko() {
    if (!this.ctx || !this.masterGain) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(92, now);
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.35);

    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(0.24, now + 0.015);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

    osc.connect(env);
    env.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.75);
  }

  private scheduleLoops() {
    const nightPattern = [0, 3, 4, 5, 7, 5, 4, 2, 1, 0, 5, 8, 7, 4, 3, 0];
    const crimsonPattern = [0, 1, 4, 3, 6, 5, 4, 1, 0, 4, 7, 6, 4, 3, 1, 0];

    const runNote = () => {
      if (!this.isPlaying) return;
      const pattern = this.mood === 'night' ? nightPattern : crimsonPattern;
      const noteIdx = pattern[this.stepIndex % pattern.length];
      const freq = HIRAJOSHI_NOTES[noteIdx];
      const velocity = this.stepIndex % 4 === 0 ? 0.16 : 0.11;
      this.playKotoPluck(freq, velocity);
      this.stepIndex += 1;

      const intervalMs = this.mood === 'night' ? 950 : 720;
      this.noteTimer = window.setTimeout(runNote, intervalMs + Math.random() * 140);
    };

    const runBreath = () => {
      if (!this.isPlaying) return;
      const swellNotes = [293.66, 311.13, 392.0, 440.0];
      const freq = swellNotes[Math.floor(Math.random() * swellNotes.length)];
      this.playShakuhachiSwell(freq);
      this.breathTimer = window.setTimeout(runBreath, 5800);
    };

    const runDrum = () => {
      if (!this.isPlaying) return;
      if (this.mood === 'crimson') {
        this.playDeepTaiko();
      }
      this.drumTimer = window.setTimeout(runDrum, 2880);
    };

    runNote();
    this.breathTimer = window.setTimeout(runBreath, 1400);
    this.drumTimer = window.setTimeout(runDrum, 1200);
  }

  private clearLoops() {
    if (this.noteTimer !== null) {
      clearTimeout(this.noteTimer);
      this.noteTimer = null;
    }
    if (this.breathTimer !== null) {
      clearTimeout(this.breathTimer);
      this.breathTimer = null;
    }
    if (this.drumTimer !== null) {
      clearTimeout(this.drumTimer);
      this.drumTimer = null;
    }
  }

  public async start() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isPlaying) return;
    this.isPlaying = true;
    this.startDrone();
    this.scheduleLoops();

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(Math.max(0.0001, this.masterGain.gain.value), now);
    this.masterGain.gain.linearRampToValueAtTime(this.volume, now + 0.9);
  }

  public stop() {
    if (!this.ctx || !this.masterGain || !this.isPlaying) return;
    this.isPlaying = false;
    this.clearLoops();

    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.45);

    window.setTimeout(() => {
      if (!this.isPlaying) {
        this.stopDrone();
      }
    }, 500);
  }

  public setVolume(nextVolume: number) {
    this.volume = Math.max(0, Math.min(1, nextVolume));
    if (this.ctx && this.masterGain && this.isPlaying) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setTargetAtTime(Math.max(0.0001, this.volume), now, 0.08);
    }
  }

  public setMood(nextMood: MusicMood) {
    this.mood = nextMood;
  }
}

export const ambientMusic = new AmbientMusicEngine();
