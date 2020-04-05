import { formatDuration } from './duration';

const ONE_CS = 10;
const ONE_SECOND = 100 * ONE_CS;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_YEAR = 365 * ONE_DAY;

describe('formatDuration', () => {
  test('formatする時間が1年以上の場合は `days` プロパティが365以上になる', () => {
    const expected = formatDuration(
      ONE_YEAR + 2 * ONE_DAY + 3 * ONE_HOUR + 4 * ONE_MINUTE + 5 * ONE_SECOND + 6 * ONE_CS,
    );
    expect(expected).toMatchObject({
      days: 365 + 2,
      hours: 3,
      minutes: 4,
      seconds: 5,
      cs: 6,
    });
  });
  test('formatする時間にセンチ秒未満の精度が含まれる場合は切り落とされる', () => {
    expect(formatDuration(0)).toMatchObject({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      cs: 0,
    });
    expect(formatDuration(1)).toMatchObject({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      cs: 0,
    });
    expect(formatDuration(9)).toMatchObject({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      cs: 0,
    });
    expect(formatDuration(10)).toMatchObject({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      cs: 1,
    });
  });
});
