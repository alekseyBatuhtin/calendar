import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui';
import Day from './day';
const styles = {
  week: {
    display: 'flex',
    flex: '1 0 0',
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
    height: '100px',
    '&:last-child': {
      border: 0
    }
  }
};

const enhance = withStyles(styles);

const Week = ({ date, week, isFirstWeek, classes, eventsWeek }) => (
  <div className={classes.week}>
    {week &&
      week.map((day, dayIdx) => (
        <Day key={dayIdx} day={day} eventDay={eventsWeek[dayIdx][day]} isFirstWeek={isFirstWeek} />
      ))}
  </div>
);

export default enhance(Week);
