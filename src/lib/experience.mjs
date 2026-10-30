export const EXPERIENCE_START = '2021-01-18';
const formatter = new Intl.DateTimeFormat('en-IN', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
/** Inclusive calendar months, matching LinkedIn-style month-based experience. */
export function getExperience(date = new Date()) {
  const parts = Object.fromEntries(
    formatter.formatToParts(date).map(({ type, value }) => [type, value]),
  );
  const year = Number(parts.year);
  const month = new Intl.DateTimeFormat('en', {
    timeZone: 'Asia/Kolkata',
    month: 'numeric',
  }).format(date);
  const monthNumber = Number(month);
  const started = date.getTime() >= Date.UTC(2021, 0, 17, 18, 30);
  const months = started ? Math.max(0, (year - 2021) * 12 + monthNumber) : 0;
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  const duration =
    [
      years ? `${years} ${years === 1 ? 'year' : 'years'}` : '',
      remainder ? `${remainder} ${remainder === 1 ? 'month' : 'months'}` : '',
    ]
      .filter(Boolean)
      .join(', ') || '0 months';
  return {
    months,
    years,
    remainingMonths: remainder,
    duration,
    asOf: `${parts.month} ${year}`,
    monthKey: `${year}-${String(monthNumber).padStart(2, '0')}`,
    startDate: EXPERIENCE_START,
  };
}
export function nextExperienceMonth(date = new Date()) {
  const { monthKey } = getExperience(date);
  const [year, month] = monthKey.split('-').map(Number);
  return Date.UTC(year, month, 1) - 330 * 60 * 1000;
}
