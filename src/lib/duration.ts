/**
 * 残り時間を日・時・分・秒・センチ秒に分解する
 * @param duration 残り時間
 * */
export function formatDuration(duration: number) {
  return {
    days: Math.trunc(duration / 1000 / 60 / 60 / 24),
    hours: Math.trunc(duration / 1000 / 60 / 60) % 24,
    minutes: Math.trunc(duration / 1000 / 60) % 60,
    seconds: Math.trunc(duration / 1000) % 60,
    cs: Math.trunc(duration / 10) % 100,
  };
}
