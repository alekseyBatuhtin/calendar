import React from 'react';
import PropTypes from 'prop-types';

import { compose, withStateHandlers } from 'recompose';

import EditEvent from './edit-event';
import AddEvent from './add-event';
import ViewEvent from './view-event';
import PopoverWrap from './popover-wrap';

const enhance = compose(
  withStateHandlers(
    {
      openEditForm: false,
    },
    {
      handleOpenEditForm: () => () => ({ openEditForm: true }),
      handleCloseEditForm: () => () => ({ openEditForm: false }),
    },
  ),
);

const PopoverEvent = ({
  open,
  anchorEl,
  handlePopoverClose,
  openEditForm,
  selectedDay,
  eventData,
  handleCloseEditForm,
  handleOpenEditForm,
}) => (
  <PopoverWrap
    open={open}
    anchorEl={anchorEl}
    handleClose={handlePopoverClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
  >
    <OptionEventType
      selectedDay={selectedDay}
      eventData={eventData}
      openEditForm={openEditForm}
      handlePopoverClose={handlePopoverClose}
      handleCloseEditForm={handleCloseEditForm}
      handleOpenEditForm={handleOpenEditForm}
    />
  </PopoverWrap>
);

PopoverEvent.propTypes = {
  anchorEl: PropTypes.object,
  eventData: PropTypes.object,
  handleCloseEditForm: PropTypes.func,
  handleOpenEditForm: PropTypes.func,
  handlePopoverClose: PropTypes.func,
  open: PropTypes.bool,
  openEditForm: PropTypes.bool,
  selectedDay: PropTypes.string,
};

export default enhance(PopoverEvent);

function OptionEventType({
  eventData,
  selectedDay,
  openEditForm,
  handleOpenEditForm,
  handleCloseEditForm,
  handlePopoverClose,
}) {
  if (openEditForm) {
    return (
      <EditEvent
        eventData={eventData}
        handleCloseEditForm={handleCloseEditForm}
        handlePopoverClose={handlePopoverClose}
      />
    );
  } if (eventData) {
    return (
      <ViewEvent
        eventData={eventData}
        handleOpenEditForm={handleOpenEditForm}
        handlePopoverClose={handlePopoverClose}
      />
    );
  }
  return <AddEvent selectedDay={selectedDay} handlePopoverClose={handlePopoverClose} />;
}

OptionEventType.propTypes = {
  eventData: PropTypes.object,
  handleCloseEditForm: PropTypes.func,
  handleOpenEditForm: PropTypes.func,
  handlePopoverClose: PropTypes.func,
  openEditForm: PropTypes.bool,
  selectedDay: PropTypes.string,
};
