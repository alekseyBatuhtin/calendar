import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from '@material-ui/core';

const Input = ({
  classes, autoFocus, value, ref, ...other
}) => (
  <TextField
    autoFocus={autoFocus}
    className={classes.textField}
    value={value}
    inputRef={ref}
    InputProps={{
      classes: {
        input: classes.input,
      },
      ...other,
    }}
  />
);

Input.propTypes = {
  autoFocus: PropTypes.bool,
  classes: PropTypes.objectOf(PropTypes.string),
  ref: PropTypes.object,
  value: PropTypes.string,
};

export default Input;
