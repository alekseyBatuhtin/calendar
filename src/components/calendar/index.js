import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose, defaultProps, withState, lifecycle } from 'recompose';
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
  withState('date', 'handleDate', new Date()),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.getEvents();
    }
  }),
  withStyles(styles)
);

const Calendar = ({ classes, date, events, handleDate, now }) => (
  <div className={classes.calendar}>
    <Head events={events} />
    <Toolbar handleDate={handleDate} date={date} now={now} />
    <Month date={date} now={now} events={events} />
  </div>
);

Calendar.propTypes = {
  classes: PropTypes.object.isRequired,
  date: PropTypes.object.isRequired,
  events: PropTypes.object.isRequired,
  handleDate: PropTypes.func.isRequired,
  now: PropTypes.object.isRequired
};

export default enhance(Calendar);
