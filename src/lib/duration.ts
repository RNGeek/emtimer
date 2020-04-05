export function formatDuration(duration: number) {
  return {
    days: Math.trunc(duration / 1000 / 60 / 60 / 24),
    hours: Math.trunc(duration / 1000 / 60 / 60) % 24,
    minutes: Math.trunc(duration / 1000 / 60) % 60,
    seconds: Math.trunc(duration / 1000) % 60,
    cs: Math.trunc(duration / 10) % 100,
  };
}
