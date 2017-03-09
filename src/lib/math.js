export function isHex(str) {
  return /^0x\d+$/.test(str);
}

export function isDec(str) {
  return /^\d+$/.test(str);
}

export function parseDuration(value, unit) {
  let num;
  if (isDec(value)) num = parseInt(value, 10);
  else if (isHex(value)) num = parseInt(value, 16);
  else return NaN;

  if (unit === 's') return num * 1000;
  if (unit === 'f') return (num / 60) * 1000;
  return NaN;
}
