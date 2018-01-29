import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui';
import moment from 'moment';

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
  selected: {
    border: '2px solid #7DC8FB',
    backgroundColor: '#E3F1F9'
  },
  date: {},
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

const enhance = withStyles(styles);

const Day = ({ classes, day, isFirstWeek, eventDay }) => (
  <div className={`${classes.day}`}>
    <div className={classes.date}>
      {moment(day)
        .locale('ru')
        .format(isFirstWeek ? 'dddd, D' : 'D')}
    </div>
    {eventDay && (
      <div className={classes.event}>
        <div className={classes.eventTitle}>{eventDay.title}</div>
        {eventDay.members.length > 0 && <div className={classes.members}>{eventDay.members.join(', ')}</div>}
      </div>
    )}
  </div>
);

export default enhance(Day);
