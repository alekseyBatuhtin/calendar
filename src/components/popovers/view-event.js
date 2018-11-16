import React from 'react';
import PropTypes from 'prop-types';

// import dateFns from 'date-fns/fp';

import { compose } from 'recompose';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core';
import Button from '../ui/button';

import { deleteEvent } from '../../modules/events/actions';
import formatDate from '../../utils/formatDate';

const styles = {
  date: {
    margin: '18px 0',
  },
  label: {
    fontSize: '.9em',
  },
};

const enhance = compose(connect(null, { deleteEvent }), withStyles(styles));

const ViewEvent = ({
  classes,
  eventData: {
    title, date, members, description,
  },
  handleOpenEditForm,
  deleteEvent,
  handlePopoverClose,
}) => (
  <div>
    <h3>{title}</h3>
    <p className={classes.date}>
      {formatDate('d MMMM yyyy')}
    </p>
    {members && (
      <div>
        <span className={classes.label}>{'Участники:'}</span>
        <p>{members}</p>
      </div>
    )}
    {description && (
      <div>
        <span className={classes.label}>{'Описание:'}</span>
        <p>{description}</p>
      </div>
    )}
    <div>
      <Button handleClick={handleOpenEditForm}>{'Изменить'}</Button>
      <Button
        handleClick={() => {
          deleteEvent(date);
          handlePopoverClose();
        }}
      >
        {'Удалить'}
      </Button>
    </div>
  </div>
);

ViewEvent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  deleteEvent: PropTypes.func,
  eventData: PropTypes.object,
  handleOpenEditForm: PropTypes.func,
  handlePopoverClose: PropTypes.func,
};

export default enhance(ViewEvent);
