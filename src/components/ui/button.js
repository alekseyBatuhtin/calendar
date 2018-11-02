import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';

const styles = {
  button: {
    width: '100px',
    marginTop: '8px'
  }
};

const enhance = withStyles(styles);

const Button = ({ type, classes, children, handleClick }) => (
  <button onClick={handleClick} className={classes.button} type={type}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string),
  handleClick: PropTypes.func,
  type: PropTypes.string
};

export default enhance(Button);
