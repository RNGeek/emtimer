/* eslint-disable camelcase */

// 秒が切り替わる瞬間であればtrueを返す
export const canTicktack = (newDuration: number, oldDuration: number) => {
  const newDuration_s = Math.ceil(newDuration / 1000);
  const oldDuration_s = Math.floor(oldDuration / 1000);
  return newDuration_s <= oldDuration_s;
};
