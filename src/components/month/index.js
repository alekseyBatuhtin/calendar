import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';

import { compose, mapProps, withStateHandlers } from 'recompose';
import { withStyles } from 'material-ui';
import { splitEvery, compose as composeR } from 'ramda';

import Week from '../week';
import AddEventPopover from '../popovers/add-event';

import visibleDays from '../../utils/visibleDays';
import eventsByWeeks from '../../utils/eventsForWeek';

const styles = {
  monthView: {
    border: '1px solid rgba(0, 0, 0, 0.42)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 0',
    position: 'relative',
    margin: '30px'
  }
};

const enhance = compose(
  mapProps(({ date, events, now }) => {
    const weeks = composeR(splitEvery(7), visibleDays)(date);
    return { weeks, date, now, eventsByWeek: eventsByWeeks(events, weeks) };
  }),
  withStateHandlers(
    { open: false, anchorEl: null, selectedDay: null },
    {
      handlePopoverOpen: () => (el, day) => ({ open: true, anchorEl: findDOMNode(el), selectedDay: day }),
      handlePopoverClose: () => () => ({ open: false, anchorEl: null, selectedDay: null })
    }
  ),
  withStyles(styles)
);

const Month = ({
  classes,
  weeks,
  date,
  now,
  eventsByWeek,
  open,
  anchorEl,
  handlePopoverOpen,
  handlePopoverClose,
  selectedDay
}) => (
  <div className={classes.monthView}>
    {weeks &&
      weeks.map((week, weekIdx) => (
        <Week
          key={weekIdx}
          eventsWeek={eventsByWeek[weekIdx]}
          date={date}
          now={now}
          week={week}
          isFirstWeek={weekIdx === 0}
          handlePopoverOpen={handlePopoverOpen}
          selectedDay={selectedDay}
        />
      ))}
    <AddEventPopover open={open} anchorEl={anchorEl} handleClose={handlePopoverClose} selectedDay={selectedDay} />
  </div>
);

Month.propTypes = {
  anchorEl: PropTypes.object,
  classes: PropTypes.object,
  date: PropTypes.object,
  eventsByWeek: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  handlePopoverClose: PropTypes.func,
  handlePopoverOpen: PropTypes.func,
  now: PropTypes.object,
  open: PropTypes.bool,
  selectedDay: PropTypes.string,
  weeks: PropTypes.arrayOf(PropTypes.array)
};

export default enhance(Month);
