import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import { withStyles } from 'material-ui';

import PopoverWrap from './popover-wrap';
import Input from '../ui/input';
import { addEvent } from '../../modules/events/actions';

import styles from './styles';

const mapDispatchToProps = { addEvent };

const enhance = compose(
  connect(null, mapDispatchToProps),
  withState('eventValue', 'handleEventValue', ''),
  withHandlers({
    handleChange: ({ handleEventValue }) => event => handleEventValue(event.target.value),
    handleSubmit: ({ eventValue, handleClose, addEvent }) => event => {
      event.preventDefault();
      handleClose();
      addEvent(eventValue);
    }
  }),
  withStyles(styles)
);

const SimpleAddForm = ({ classes, open, handleSubmit, handleClose, anchorEl, eventValue, handleChange }) => (
  <PopoverWrap
    open={open}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    handleClose={handleClose}
    anchorEl={anchorEl}
  >
    <form onSubmit={handleSubmit} className={classes.addForm}>
      <Input handleChange={handleChange} value={eventValue} placeholderValue="5 марта, День рождение" />
      <button className={classes.button} type="submit" disabled={!eventValue.trim().length}>
        {'Создать'}
      </button>
    </form>
  </PopoverWrap>
);

SimpleAddForm.propTypes = {
  anchorEl: PropTypes.object,
  classes: PropTypes.objectOf(PropTypes.string),
  eventValue: PropTypes.string,
  handleChange: PropTypes.func,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  open: PropTypes.bool
};
export default enhance(SimpleAddForm);
