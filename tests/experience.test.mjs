import test from 'node:test';
import assert from 'node:assert/strict';
import { getExperience, nextExperienceMonth } from '../src/lib/experience.mjs';
test('uses the supplied start date and inclusive LinkedIn-style calendar months', () => {
  assert.equal(getExperience(new Date('2021-01-17T18:29:59Z')).months, 0);
  assert.equal(getExperience(new Date('2021-01-17T18:30:00Z')).duration, '1 month');
  assert.equal(getExperience(new Date('2026-10-30T06:00:00Z')).duration, '5 years, 10 months');
});
test('rolls over at the India calendar-month boundary, without daily count changes', () => {
  const before = getExperience(new Date('2026-10-31T18:29:59Z'));
  const after = getExperience(new Date('2026-10-31T18:30:00Z'));
  assert.equal(before.asOf, 'October 2026');
  assert.equal(before.months, 70);
  assert.equal(after.asOf, 'November 2026');
  assert.equal(after.duration, '5 years, 11 months');
  assert.equal(getExperience(new Date('2026-11-18T06:00:00Z')).duration, after.duration);
});
test('handles year rollover and singular labels', () => {
  assert.equal(getExperience(new Date('2021-12-01T00:00:00Z')).duration, '1 year');
  assert.equal(getExperience(new Date('2027-01-01T00:00:00Z')).duration, '6 years, 1 month');
  assert.equal(
    nextExperienceMonth(new Date('2026-12-15T00:00:00Z')),
    Date.parse('2026-12-31T18:30:00Z'),
  );
});
