import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui';

const styles = {
  button: {
    width: '100px',
    marginTop: '8px'
  }
};

const enhance = withStyles(styles);

const Button = ({ type, classes, children }) => (
  <button className={classes.button} type={type}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string),
  type: PropTypes.string
};

export default enhance(Button);
