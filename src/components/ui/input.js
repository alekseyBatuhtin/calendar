import React from 'react';
import PropTypes from 'prop-types';

import { TextField, withStyles } from 'material-ui';

const styles = {
  root: {
    marginBottom: '6px'
  },
  textFieldInput: {
    borderRadius: 4,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.08rem rgba(0,123,255,.25)'
    }
  },
  helperText: {
    marginLeft: '12px'
  }
};

const enhance = withStyles(styles);

const Input = ({ classes, handleChange, value, placeholderValue, helperText, multiline, name }) => (
  <TextField
    onChange={handleChange}
    className={classes.root}
    multiline={multiline}
    helperTextClassName={classes.helperText}
    rows={8}
    name={name}
    value={value}
    helperText={helperText}
    fullWidth={true}
    InputProps={{
      disableUnderline: true,
      classes: {
        input: classes.textFieldInput
      }
    }}
    placeholder={placeholderValue}
  />
);

Input.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  handleChange: PropTypes.func,
  helperText: PropTypes.string,
  multiline: PropTypes.bool,
  name: PropTypes.string,
  placeholderValue: PropTypes.string,
  value: PropTypes.string
};

export default enhance(Input);
