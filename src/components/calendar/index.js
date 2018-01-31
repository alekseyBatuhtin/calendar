import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose, defaultProps, withProps, lifecycle } from 'recompose';
import { withStyles } from 'material-ui';

import Head from '../head';
import Toolbar from '../toolbar';
import Month from '../month';

import { getEvents } from '../../modules/events/actions';

const styles = {
  calendar: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'stretch'
  }
};
const mapStateToProps = ({ events }) => ({ events });
const mapDispatchToProps = { getEvents };

const enhance = compose(
  defaultProps({ now: new Date() }),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.getEvents();
    }
  }),
  withStyles(styles)
);

const Calendar = ({ classes, now, events }) => (
  <div className={classes.calendar}>
    <Head />
    <Toolbar />
    <Month date={now} currentDate={now} events={events} />
  </div>
);

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
  events: PropTypes.object,
  now: PropTypes.object.isRequired
};

Calendar.defaultProps = {
  events: {}
};

export default enhance(Calendar);
