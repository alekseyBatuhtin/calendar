import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { compose, withHandlers } from 'recompose';
import { withStyles, IconButton } from 'material-ui';

import ChevronLeft from 'material-ui-icons/ChevronLeft';
import ChevronRight from 'material-ui-icons/ChevronRight';

const styles = {
  toolbar: {
    display: 'flex',
    padding: '0 30px',
    marginTop: '30px',
    height: '40px'
  },
  border: {
    border: '1px solid rgba(0, 0, 0, 0.42)',
    borderRadius: '3px',
    boxShadow: 'inset 4px 4px 11px -8px rgba(0,0,0,0.42), inset -4px -4px 11px -8px rgba(0,0,0,0.42)',
    height: 'auto'
  },
  now: {
    margin: '0 12px',
    display: 'flex',
    justifyContent: 'center',
    minWidth: '180px',
    alignItems: 'center'
  },
  isToday: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '12px',
    padding: '0 8px'
  }
};
const enhance = compose(
  withHandlers({
    nextMonth: ({ handleDate, date }) => () =>
      handleDate(
        moment(date)
          .startOf('month')
          .add(1, 'month')
      ),
    prevMonth: ({ handleDate, date }) => () =>
      handleDate(
        moment(date)
          .startOf('month')
          .subtract(1, 'month')
      )
  }),
  withStyles(styles)
);

const Toolbar = ({ classes, date, now, nextMonth, prevMonth }) => (
  <div className={classes.toolbar}>
    <IconButton className={classes.border} onClick={prevMonth}>
      <ChevronLeft />
    </IconButton>
    <span className={`${classes.border} ${classes.now}`}>
      {moment(date)
        .locale('ru')
        .format('MMMM YYYY')}
    </span>
    <IconButton className={classes.border} onClick={nextMonth}>
      <ChevronRight />
    </IconButton>
    {moment(date).isSame(now, 'month') ? (
      <span className={`${classes.border} ${classes.isToday}`}>{'сегодня'}</span>
    ) : null}
  </div>
);

Toolbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  date: PropTypes.object,
  nextMonth: PropTypes.func,
  now: PropTypes.object,
  prevMonth: PropTypes.func
};
export default enhance(Toolbar);
