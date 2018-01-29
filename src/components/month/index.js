import React from 'react';
import PropTypes from 'prop-types';

import { compose, mapProps } from 'recompose';
import { withStyles } from 'material-ui';
import { splitEvery, compose as composeR } from 'ramda';

import Week from '../week';

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
  mapProps(({ date, events }) => {
    const weeks = composeR(splitEvery(7), visibleDays)(date);

    return { weeks, date, events: eventsByWeeks(events, weeks) };
  }),
  withStyles(styles)
);

const Month = ({ classes, weeks, date, events }) => (
  <div className={classes.monthView}>
    {weeks &&
      weeks.map((week, weekIdx) => (
        <Week key={weekIdx} eventsWeek={events[weekIdx]} date={date} week={week} isFirstWeek={weekIdx === 0} />
      ))}
  </div>
);

Month.propTypes = {
  classes: PropTypes.object,
  date: PropTypes.object,
  events: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  weeks: PropTypes.arrayOf(PropTypes.array)
};

export default enhance(Month);
