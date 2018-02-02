import React from 'react';
import PropTypes from 'prop-types';

import { TextField } from 'material-ui';

const Input = ({ classes, autoFocus, value, ref, ...other }) => (
  <TextField
    autoFocus={autoFocus}
    className={classes.textField}
    value={value}
    inputRef={ref}
    InputProps={{
      classes: {
        input: classes.input
      },
      ...other
    }}
  />
);

export default Input;
