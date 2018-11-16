import React from 'react';
import PropTypes from 'prop-types';

import { isSameMonth } from 'date-fns/fp';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withStyles, IconButton } from '@material-ui/core';

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

import { nextMonth, prevMonth } from '../../modules/date/actions';
import formatDate from '../../utils/formatDate';

const styles = {
  toolbar: {
    display: 'flex',
/*     padding: '0 30px',
    marginTop: '30px', */
    //height: '40px'
  },
  border: {
    border: '1px solid rgba(0, 0, 0, 0.42)',
    borderRadius: '3px',
    boxShadow: 'inset 4px 4px 11px -8px rgba(0,0,0,0.42), inset -4px -4px 11px -8px rgba(0,0,0,0.42)',
    height: '48px'
  },
  now: {
    margin: '0 12px',
    display: 'flex',
    justifyContent: 'center',
    minWidth: '180px',
    alignItems: 'center',
    textTransform: 'capitalize'
  },
  isToday: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '12px',
    padding: '0 8px'
  }
};

const mapDispatchToProps = { nextMonth, prevMonth };

const enhance = compose(connect(null, mapDispatchToProps), withStyles(styles));

const Toolbar = ({ classes, date, now, nextMonth, prevMonth }) => (
  <div className={classes.toolbar}>
    <IconButton className={classes.border} onClick={prevMonth}>
      <ChevronLeft />
    </IconButton>
    <span className={`${classes.border} ${classes.now}`}>
      {formatDate(date, 'LLLL yyyy')}
    </span>
    <IconButton className={classes.border} onClick={nextMonth}>
      <ChevronRight />
    </IconButton>
    {isSameMonth(date)(now) ? (
      <span className={`${classes.border} ${classes.isToday}`}>{'сегодня'}</span>
    ) : null}
  </div>
);

Toolbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  date: PropTypes.string,
  nextMonth: PropTypes.func,
  now: PropTypes.object,
  prevMonth: PropTypes.func
};

export default enhance(Toolbar);
