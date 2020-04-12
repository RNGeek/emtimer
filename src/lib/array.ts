export function range(begin: number, end: number): number[] {
  const length = end - begin;
  return Array.from(Array(length).keys()).map((i) => i + begin);
}
