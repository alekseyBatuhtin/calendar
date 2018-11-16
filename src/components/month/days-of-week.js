import React from 'react';
import { withStyles } from '@material-ui/core';

const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

const styles = {
  days: {
    display: 'flex',
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
  },
  day: {
    textAlign: 'center',
    borderLeft: '1px solid rgba(0, 0, 0, 0.42)',
    flexBasis: '14.2857%',
    fontSize: '.85em',
    padding: '6px',
    '&:first-child': {
      border: 0
    }
  }
};

const enhance = withStyles(styles);

const DaysOfWeek = ({ classes }) =>
  (<div className={classes.days}>
    {days.map(day => <div key={day} className={classes.day}>{day}</div>)}
  </div>);

export default enhance(DaysOfWeek);