import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import { withStyles } from 'material-ui';
import PopoverWrap from './popover-wrap';
import Input from '../ui/input';
import { addEvent } from '../../modules/events/actions';

import styles from './styles';

const mapDispatchToProps = { addEvent };

const enhance = compose(
  connect(null, mapDispatchToProps),
  withStateHandlers(
    {
      title: '',
      date: '',
      members: '',
      description: ''
    },
    {
      handleChange: () => event => {
        const name = event.target.name;
        return { [name]: event.target.value };
      }
    }
  ),
  withHandlers({
    handleSubmit: ({ handleClose, addEvent, title, date, members, description }) => event => {
      event.preventDefault();
      handleClose();
      addEvent({ title, date, members, description });
    }
  }),
  withStyles(styles)
);

const AddForm = ({
  classes,
  open,
  anchorEl,
  handleClose,
  handleSubmit,
  handleChange,
  title,
  date,
  members,
  description
}) => (
  <PopoverWrap
    open={open}
    anchorEl={anchorEl}
    handleClose={handleClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
  >
    <form onSubmit={handleSubmit} className={classes.addForm}>
      <Input placeholderValue="Событие" name="title" handleChange={handleChange} value={title} />
      <Input
        placeholderValue="День месяц год"
        helperText="3 января 2018"
        name="date"
        handleChange={handleChange}
        value={date}
      />
      <Input
        placeholderValue="Имена участников"
        helperText="Павел Дуров, Марк Цукерберг"
        name="members"
        handleChange={handleChange}
        value={members}
      />
      <Input
        placeholderValue="Описание"
        multiline={true}
        name="description"
        handleChange={handleChange}
        value={description}
      />
      <div>
        <button className={classes.button} type="submit">
          {'Готово'}
        </button>
        <button className={classes.button}>{'Удалить'}</button>
      </div>
    </form>
  </PopoverWrap>
);

AddForm.propTypes = {
  anchorEl: PropTypes.object,
  classes: PropTypes.objectOf(PropTypes.string),
  date: PropTypes.string,
  description: PropTypes.string,
  handleChange: PropTypes.func,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  members: PropTypes.string,
  open: PropTypes.bool,
  title: PropTypes.string
};

export default enhance(AddForm);
