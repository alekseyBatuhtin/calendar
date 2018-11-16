import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { compose, withStateHandlers } from 'recompose';
import { withStyles, Button } from '@material-ui/core';

import SearchBar from './search';
import Toolbar from '../toolbar';
import SimpleAddEventPopover from '../popovers/simple-add-event';

const styles = {
  head: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '80px',
    backgroundColor: '#F4F4F4',
    padding: '10px 30px',
    boxShadow: '0px 3px 10px -3px rgba(0,0,0,0.42)',
  },
  button: {
    backgroundColor: '#0071C3',
    color: '#FFF',
    marginRight: '12px',
  },
};

const enhance = compose(
  withStateHandlers(
    { open: false, anchorEl: null },
    {
      handlePopoverOpen: () => el => () => ({ open: true, anchorEl: findDOMNode(el) }),
      handlePopoverClose: () => () => ({ open: false, anchorEl: null }),
    },
  ),
  withStyles(styles),
);

const Head = ({
  date,
  now,
  classes,
  open,
  /*   anchorEl,
  handlePopoverOpen,
  handlePopoverClose, */
  events,
}) => (
    <div className={classes.head}>
      <Toolbar date={date} now={now} />
      <div>
        <Button
          variant='outlined'
          size='large'
          // className={classes.button}
          // onClick={handlePopoverOpen(null)}
        >
          {'Добавить событие'}
        </Button>
        <SimpleAddEventPopover open={open} />
      </div>
      <SearchBar events={events} />
    </div>
);

Head.propTypes = {
  anchorEl: PropTypes.object,
  classes: PropTypes.object.isRequired,
  events: PropTypes.object,
  handlePopoverClose: PropTypes.func,
  handlePopoverOpen: PropTypes.func,
  open: PropTypes.bool,
};

export default enhance(Head);
