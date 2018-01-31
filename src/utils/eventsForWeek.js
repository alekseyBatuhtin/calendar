import { filter, map } from 'ramda';
import moment from 'moment';

const fiterByMonth = weeks => {
  const start = weeks[0][0];
  const end = weeks[weeks.length - 1][weeks[0].length - 1];
  return event => moment(event.date).isBetween(start, end, null, '[]');
};

const formEventsByWeek = events => week => map(day => ({ [day]: events[day] || null }))(week);

const eventsForWeek = (events, weeks) => {
  const sortEventsByMonth = filter(fiterByMonth(weeks), events);
  const sortEventsByWeek = map(formEventsByWeek(sortEventsByMonth), weeks);
  return sortEventsByWeek;
};

export default eventsForWeek;
