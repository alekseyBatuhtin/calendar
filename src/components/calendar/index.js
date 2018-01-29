import React from 'react';
import PropTypes from 'prop-types';

import { compose, defaultProps } from 'recompose';

import Head from '../head';
import Toolbar from '../toolbar';
import Month from '../month';
import { withStyles } from 'material-ui';

import events from '../../events';

const styles = {
  calendar: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'stretch'
  }
};

const enhance = compose(defaultProps({ now: new Date(), events }), withStyles(styles));

const Calendar = ({ classes, now, events }) => (
  <div className={classes.calendar}>
    <Head />
    <Toolbar />
    <Month date={now} currentDate={now} events={events} />
  </div>
);

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
  events: PropTypes.array,
  now: PropTypes.object.isRequired
};
export default enhance(Calendar);
