import React from 'react';
import PropTypes from 'prop-types';

import {
  compose, withStateHandlers, withHandlers, lifecycle,
} from 'recompose';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core';
import Input from '../ui/input';
import Button from '../ui/button';

import { addEvent } from '../../modules/events/actions';
import formatDate from '../../utils/formatDate';
import styles from './styles';

const enhance = compose(
  connect(null, { addEvent }),
  withStateHandlers(
    {
      title: '',
      date: '',
      members: '',
      description: '',
    },
    {
      handleChange: () => (event) => {
        const { name } = event.target;
        return { [name]: event.target.value };
      },
      initForm: () => value => value,
    },
  ),
  withHandlers({
    handleSubmit: ({
      title, date, members, description, handlePopoverClose, addEvent,
    }) => (event) => {
      event.preventDefault();
      handlePopoverClose();
      addEvent({
        title, date, members, description,
      });
    },
  }),
  lifecycle({
    componentDidMount() {
      const { initForm, selectedDay } = this.props;
      if (selectedDay) {
        const initDate = {
          date: formatDate(selectedDay, 'd MMMM yyyy'),
        };
        initForm(initDate);
      }
    },
  }),
  withStyles(styles),
);

const AddForm = ({
  classes, handleSubmit, handleChange, title, date, members, description,
}) => (
  <form onSubmit={handleSubmit} className={classes.form}>
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
      <Button type="submit">{'Готово'}</Button>
    </div>
  </form>
);

AddForm.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  date: PropTypes.string,
  description: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  members: PropTypes.string,
  title: PropTypes.string,
};

export default enhance(AddForm);
