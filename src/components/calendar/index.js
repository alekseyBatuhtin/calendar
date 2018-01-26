import React from 'react';
import PropTypes from 'prop-types';

import Head from '../head';
import Toolbar from '../toolbar';
// import Month from '../month';
import { withStyles } from 'material-ui';

const styles = {
  calendar: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'stretch'
  },
  month: {
    padding: '15px 30px'
  }
};

const enhance = withStyles(styles);

const Calendar = ({ classes }) => (
  <div className={classes.calendar}>
    <Head />
    <div className={classes.month}>
      <Toolbar />
      {/* <Month /> */}
    </div>
  </div>
);

Calendar.propTypes = {
  classes: PropTypes.object.isRequired
};
export default enhance(Calendar);
