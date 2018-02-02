import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { connect } from 'react-redux';
import { compose, lifecycle, withStateHandlers, withHandlers } from 'recompose';

import { withStyles } from 'material-ui';
import Input from '../ui/input';
import Button from '../ui/button';

import { addEvent } from '../../modules/events/actions';

import styles from './styles';

const enhance = compose(
  connect(null, { addEvent }),
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
      },
      initForm: () => value => value
    }
  ),
  withHandlers({
    handleSubmit: ({ title, date, members, description, handlePopoverClose, addEvent }) => event => {
      event.preventDefault();
      handlePopoverClose();
      addEvent({ title, date, members, description });
    }
  }),
  lifecycle({
    componentDidMount() {
      const { initForm, eventData } = this.props;
      if (eventData) {
        const { title, date, members, description } = eventData;
        const initDate = {
          title,
          date: moment(date)
            .locale('ru')
            .format('D MMMM YYYY'),
          members,
          description
        };
        initForm(initDate);
      }
    },
    componentWillUnmount() {
      this.props.handleCloseEditForm();
    }
  }),
  withStyles(styles)
);

const EditForm = ({ classes, handleSubmit, handleCloseEditForm, handleChange, title, date, members, description }) => (
  <form className={classes.form} onSubmit={handleSubmit}>
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
      <Button type="submit">{'Сохранить'}</Button>
      <Button handleClick={handleCloseEditForm}>{'Назад'}</Button>
    </div>
  </form>
);

EditForm.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  date: PropTypes.string,
  description: PropTypes.string,
  handleChange: PropTypes.func,
  handleCloseEditForm: PropTypes.func,
  handleSubmit: PropTypes.func,
  members: PropTypes.string,
  title: PropTypes.string
};

export default enhance(EditForm);
