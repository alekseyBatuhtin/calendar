import React from 'react';
import PropTypes from 'prop-types';

import { compose, withProps } from 'recompose';
import { withStyles } from 'material-ui';

import moment from 'moment';
import cn from 'classnames';

const styles = {
  day: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.42)',
    flexBasis: '14.2857%',
    fontSize: '.85em',
    padding: '6px',
    '&:first-child': {
      border: 0
    }
  },
  hasEvent: {
    backgroundColor: '#BDE3FD'
  },
  isToday: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)'
  },
  selected: {
    border: '2px solid #7DC8FB',
    backgroundColor: '#E3F1F9'
  },
  event: {
    marginTop: '6px'
  },
  eventTitle: {
    fontWeight: 700
  },
  members: {
    marginTop: '10px'
  }
};

const enhance = compose(
  withStyles(styles),
  withProps(({ classes, now, day, selectedDay, eventDay }) => {
    const isToday = moment(now).isSame(day, 'day');

    return {
      dayClassname: cn({
        [classes.day]: true,
        [classes.hasEvent]: eventDay && !isToday,
        [classes.isToday]: isToday,
        [classes.selected]: selectedDay === day
      })
    };
  })
);

const Day = ({ classes, dayClassname, day, isFirstWeek, eventDay, handlePopoverOpen }) => {
  let dayEl = null;
  return (
    <div
      className={dayClassname}
      ref={day => {
        dayEl = day;
      }}
      onClick={() => {
        handlePopoverOpen(dayEl, day, eventDay);
      }}
    >
      <div>
        {moment(day)
          .locale('ru')
          .format(isFirstWeek ? 'dddd, D' : 'D')}
      </div>
      {eventDay && (
        <div className={classes.event}>
          <div className={classes.eventTitle}>{eventDay.title}</div>
          {eventDay.members.length > 0 && <div className={classes.members}>{eventDay.members}</div>}
        </div>
      )}
    </div>
  );
};

Day.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  day: PropTypes.string.isRequired,
  dayClassname: PropTypes.string,
  eventDay: PropTypes.object,
  handlePopoverOpen: PropTypes.func,
  isFirstWeek: PropTypes.bool
};
export default enhance(Day);
