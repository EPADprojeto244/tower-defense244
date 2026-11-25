export class AudioSystem {
  enabled = true;
  private context: AudioContext | null = null;

  play(
    frequency = 440,
    duration = 0.08
  ): void {
    if (!this.enabled) return;

    try {
      this.context ??= new AudioContext();

      const oscillator =
        this.context.createOscillator();

      const gain = this.context.createGain();

      oscillator.frequency.value = frequency;
      gain.gain.value = 0.035;

      oscillator.connect(gain);
      gain.connect(this.context.destination);

      oscillator.start();

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        this.context.currentTime + duration
      );

      oscillator.stop(
        this.context.currentTime + duration
      );
    } catch {
      // O áudio é opcional.
    }
  }
}
