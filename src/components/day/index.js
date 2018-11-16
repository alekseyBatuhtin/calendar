import React from 'react';
import PropTypes from 'prop-types';

import { isSameDay } from 'date-fns/fp';
import cn from 'classnames';

import { connect } from 'react-redux';
import { compose, withProps, withHandlers } from 'recompose';
import { withStyles } from '@material-ui/core';

import { selectDay } from '../../modules/selected-day/actions';
import formatDate from '../../utils/formatDate';

const styles = {
  day: {
    borderLeft: '1px solid rgba(0, 0, 0, 0.42)',
    flexBasis: '14.2857%',
    fontSize: '1em',
    padding: '6px',
    '&:first-child': {
      border: 0,
    },
  },
  hasEvent: {
    backgroundColor: '#BDE3FD',
  },
  isToday: {
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
  },
  selected: {
    border: '2px solid #7DC8FB',
    backgroundColor: '#E3F1F9',
  },
  event: {
    marginTop: '6px',
  },
  eventTitle: {
    fontWeight: 700,
  },
  members: {
    marginTop: '10px',
  },
};

const mapStateToProps = ({ selectedDay: { selectedDateDay } }) => ({ selectedDateDay });
const mapDisaptchToProps = { selectDay };

const enhance = compose(
  connect(mapStateToProps, mapDisaptchToProps),
  withHandlers({
    handleClick: ({ selectDay, handlePopoverOpen }) => (event,
      {
        anchorEl,
        selectedDateDay,
        eventData,
      }) => {
      selectDay(anchorEl, selectedDateDay, eventData);
      handlePopoverOpen();
      event.preventDefault();
    },
  }),
  withStyles(styles),
  withProps(({
    classes, now, day, selectedDay, eventDay,
  }) => {
    const isToday = isSameDay(now)(day);

    return {
      dayClassname: cn({
        [classes.day]: true,
        [classes.hasEvent]: eventDay && !isToday,
        [classes.isToday]: isToday,
        [classes.selected]: selectedDay === day,
      }),
    };
  }),
);

const Day = ({
  classes, dayClassname, day, eventDay, handleClick,
}) => {
  let dayEl = null;

  return (
    <div
      className={dayClassname}
      ref={(day) => {
        dayEl = day;
      }}
      onClick={(event) => {
        handleClick(event, { anchorEl: dayEl, selectedDateDay: day, eventData: eventDay });
      }}
    >
      <div>
        {formatDate(day, 'd')}
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
  handleClick: PropTypes.func,
};

export default enhance(Day);
