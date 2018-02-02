import React from 'react';
import PropTypes from 'prop-types';

import { withStyles, Popover } from 'material-ui';

const styles = {
  paper: {
    width: '350px',
    padding: '16px'
  }
};

const enhance = withStyles(styles);

const PopoverWrap = ({ classes, open, handleClose, anchorEl, children, anchorOrigin, transformOrigin }) => (
  <Popover
    classes={{ paper: classes.paper }}
    open={open}
    anchorOrigin={anchorOrigin}
    transformOrigin={transformOrigin}
    onClose={handleClose}
    anchorEl={anchorEl}
  >
    {children}
  </Popover>
);

PopoverWrap.propTypes = {
  anchorEl: PropTypes.object,
  anchorOrigin: PropTypes.object,
  children: PropTypes.node,
  classes: PropTypes.objectOf(PropTypes.string),
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  transformOrigin: PropTypes.object
};

export default enhance(PopoverWrap);
