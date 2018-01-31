import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import { TextField, withStyles, Popover } from 'material-ui';

import { addEvent } from '../../modules/events/actions';

const styles = {
  addForm: {
    display: 'flex',
    flexDirection: 'column'
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
  paper: {
    width: '350px',
    padding: '16px'
  },
  button: {
    width: '100px',
    marginTop: '8px'
  }
};

const mapDispatchToProps = { addEvent };

const enhance = compose(
  connect(null, mapDispatchToProps),
  withState('eventValue', 'handleEventValue', ''),
  withHandlers({
    handleChange: ({ handleEventValue }) => event => handleEventValue(event.target.value),
    handleSubmit: ({ eventValue, handleClose, addEvent }) => event => {
      event.preventDefault();
      handleClose();
      addEvent(eventValue, 'simple');
    }
  }),
  withStyles(styles)
);

const AddForm = ({ classes, open, handleSubmit, handleClose, anchorEl, eventValue, handleChange }) => (
  <Popover
    classes={{ paper: classes.paper }}
    open={open}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    onClose={handleClose}
    anchorEl={anchorEl}
  >
    <form onSubmit={handleSubmit} className={classes.addForm}>
      <TextField
        onChange={handleChange}
        value={eventValue}
        InputProps={{
          disableUnderline: true,
          classes: {
            input: classes.textFieldInput
          }
        }}
        placeholder="5 марта, День рождение"
      />
      <button className={classes.button} type="submit" disabled={!eventValue.trim().length}>
        {'Создать'}
      </button>
    </form>
  </Popover>
);

export default enhance(AddForm);
