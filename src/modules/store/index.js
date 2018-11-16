import store from 'store';
import shortid from 'shortid32';
// import formatDate from '../../utils/formatDate';

function createEvent(value) {
  let date;
  let title;
  // let rawDate;

  /*   if (typeof value === 'string') {
    [rawDate, title] = value.split(', ');
    date = formatDate(rawDate, 'DD MM');
  } else {
    date = formatDate(value.date, 'DD MMMM YYYY', 'ru').format();
    title = value.title;
  } */

  return {
    id: shortid.generate(),
    title: title || value.title,
    date,
    members: value.members || '',
    description: value.description || '',
  };
}

export const getEvents = () => store.get('events') || {};

export const writeEvent = ({ value }) => {
  const events = getEvents();

  const event = createEvent(value);

  events[event.date] = event;
  store.set('events', events);

  return { event };
};

export const deleteEvent = (date) => {
  const events = getEvents();
  delete events[date];
  store.set('events', events);
};
