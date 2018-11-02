import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose, mapProps, withStateHandlers, withHandlers } from 'recompose';
import { withStyles } from '@material-ui/core';
import { splitEvery, compose as composeR } from 'ramda';

import Week from '../week';
import PopoverEvent from '../popovers/main';

import visibleDays from '../../utils/visibleDays';
import eventsByWeeks from '../../utils/eventsForWeek';

import { selectDay } from '../../modules/selected-day/actions';

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

const mapStateToProps = ({ selectedDay }) => ({ ...selectedDay });
const mapDispatchToProps = { selectDay };

const enhance = compose(
  mapProps(({ date, events, now }) => {
    const weeks = composeR(splitEvery(7), visibleDays)(date);
    return { weeks, date, now, eventsByWeek: eventsByWeeks(events, weeks) };
  }),
  connect(mapStateToProps, mapDispatchToProps),
  withStateHandlers(
    { open: false },
    {
      statePopoverOpen: () => () => ({
        open: true
      }),
      statePopoverClose: () => () => ({ open: false })
    }
  ),
  withHandlers({
    handlePopoverClose: ({ statePopoverClose, selectDay }) => () => {
      statePopoverClose();
      selectDay(); // remove selectedDay
    }
  }),
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
  statePopoverOpen,
  handlePopoverClose,
  selectedDateDay,
  eventData
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
          handlePopoverOpen={statePopoverOpen}
          selectedDay={selectedDateDay}
        />
      ))}
    <PopoverEvent
      open={open}
      anchorEl={anchorEl}
      handlePopoverClose={handlePopoverClose}
      eventData={eventData}
      selectedDay={selectedDateDay}
    />
  </div>
);

Month.propTypes = {
  anchorEl: PropTypes.object,
  classes: PropTypes.object,
  date: PropTypes.string,
  eventData: PropTypes.object,
  eventsByWeek: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  handlePopoverClose: PropTypes.func,
  now: PropTypes.object,
  open: PropTypes.bool,
  selectedDateDay: PropTypes.string,
  statePopoverOpen: PropTypes.func,
  weeks: PropTypes.arrayOf(PropTypes.array)
};

export default enhance(Month);
