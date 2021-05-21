import * as dayjs from 'dayjs';

export const getCountDown = () => {
  let toDate = new Date();
  let tomorrow = new Date();

  tomorrow.setHours(24, 0, 0, 0);

  let diffMS = tomorrow.valueOf() / 1000 - toDate.valueOf() / 1000;
  const diffHr = Math.floor(diffMS / 3600);
  diffMS = diffMS - diffHr * 3600;
  const diffMi = Math.floor(diffMS / 60);
  diffMS = diffMS - diffMi * 60;

  const diffS = Math.floor(diffMS);
  let result = diffHr < 10 ? '0' + diffHr : diffHr;
  result += ':' + (diffMi < 10 ? '0' + diffMi : diffMi);
  result += ':' + (diffS < 10 ? '0' + diffS : diffS);

  return `00:${result}`;
};

/**
 * Convert seconds into a min:seconds string
 */
export function secondsToMinutesAndSeconds(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const FIVE_MINUTES_IN_SECONDS = 300;

/**
 * Get a Date 5 min from now
 */
export const getFiveMinInFuture = () => {
  if (!dayjs || typeof dayjs !== 'function') return new Date();
  const now = dayjs();
  return now.add(FIVE_MINUTES_IN_SECONDS, 'second').format();
};

/**
 * Diff futureDate to now
 */
export const getSecsLeft = (futureDateString) => {
  if (!futureDateString || !dayjs || typeof dayjs !== 'function')
    return FIVE_MINUTES_IN_SECONDS;
  const dateNow = dayjs();
  const futureDate = dayjs(futureDateString);
  const timeLeftInSec = futureDate.diff(dateNow, 'second');
  return timeLeftInSec >= 0 ? timeLeftInSec : 0;
};
