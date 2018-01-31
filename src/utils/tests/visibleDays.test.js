import visibleDays from '../visibleDays';
import moment from 'moment';

describe('days in Month', () => {
  const JANUARY = new Date(2018, 0);
  const APRIL = new Date(2018, 3);

  test('should be 35 days', () => {
    expect(visibleDays(JANUARY).length).toBe(35);
  });
  test('should be 42 days', () => {
    expect(visibleDays(APRIL).length).toBe(42);
  });
});

describe('visibleDays', () => {
  const JANUARY = new Date(2018, 0);
  const days = visibleDays(JANUARY);

  test('first day of month should be 1th January', () => {
    expect(days[0]).toBe(moment(new Date(2018, 0, 1)).format());
  });

  test('last day of month should be 4th February', () => {
    expect(days[days.length - 1]).toBe(moment(new Date(2018, 1, 4)).format());
  });
});
