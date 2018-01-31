import { compose as composeR, splitEvery } from 'ramda';
import eventsForWeek from '../eventsForWeek';
import visibleDays from '../visibleDays';

import events from './__fixture__/events';

describe('sort events by weeks', () => {
  const JANUARY = new Date(2018, 0);
  const APRIL = new Date(2018, 3);

  const weeks = composeR(splitEvery(7), visibleDays);
  test('events array length should be equel to weeks array length', () => {
    expect(eventsForWeek(events, weeks(JANUARY)).length).toBe(weeks(JANUARY).length);
    expect(eventsForWeek(events, weeks(APRIL)).length).toBe(weeks(APRIL).length);
  });

  test('should be null', () => {
    expect(eventsForWeek(events, weeks(APRIL))[0][0]['2018-03-26T00:00:00+07:00']).toBe(null);
    expect(eventsForWeek(events, weeks(APRIL))[0][1]['2018-03-27T00:00:00+07:00']).toBe(null);
  });
});
