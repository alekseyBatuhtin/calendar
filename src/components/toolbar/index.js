import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, IconButton } from 'material-ui';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import ChevronRight from 'material-ui-icons/ChevronRight';

const styles = {
  toolbar: {
    display: 'flex',
    height: '30px'
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
    alignItems: 'center',
    padding: '0 8px'
  },
  isToday: {}
};
const enhance = withStyles(styles);

const Toolbar = ({ classes }) => (
  <div className={classes.toolbar}>
    <IconButton className={classes.border}>
      <ChevronLeft />
    </IconButton>
    <span className={`${classes.border} ${classes.now}`}>{`${new Date()}`}</span>
    <IconButton className={classes.border}>
      <ChevronRight />
    </IconButton>
    <span className={classes.border}>{'сегодня'}</span>
  </div>
);

export default enhance(Toolbar);
