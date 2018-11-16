import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import Day from '../day';

const styles = {
  week: {
    display: 'flex',
    flex: '1 0 0',
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
    height: '100px',
    '&:last-child': {
      border: 0,
    },
  },
};

const enhance = withStyles(styles);

const Week = ({
  now, week, classes, eventsWeek, handlePopoverOpen, selectedDay,
}) => (
  <div className={classes.week}>
    {week
      && week.map((day, dayIdx) => (
        <Day
          key={dayIdx}
          day={day}
          now={now}
          eventDay={eventsWeek[dayIdx][day]}
          handlePopoverOpen={handlePopoverOpen}
          selectedDay={selectedDay}
        />
      ))}
  </div>
);

Week.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  eventsWeek: PropTypes.arrayOf(PropTypes.object),
  handlePopoverOpen: PropTypes.func,
  now: PropTypes.object,
  selectedDay: PropTypes.string,
  week: PropTypes.arrayOf(PropTypes.string),
};

export default enhance(Week);
