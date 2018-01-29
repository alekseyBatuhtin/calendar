import moment from 'moment';

const firstVisibleDay = date =>
  moment(date)
    .startOf('month')
    .startOf('isoWeek');

const lastVisibleDay = date =>
  moment(date)
    .endOf('month')
    .endOf('isoWeek');

const visibleDays = date => {
  const current = firstVisibleDay(date);
  const last = lastVisibleDay(date);
  const diffirence = last.diff(current, 'days') + 1;

  return [...new Array(diffirence)].reduce(acc => {
    if (!acc.length) {
      acc.push(current.format());
    } else {
      acc.push(
        moment(acc[acc.length - 1])
          .add(1, 'd')
          .format()
      );
    }
    return acc;
  }, []);
};

export default visibleDays;
