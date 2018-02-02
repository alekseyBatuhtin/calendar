import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { compose, withStateHandlers } from 'recompose';
import { withStyles, Button } from 'material-ui';

import SearchBar from './search';

import SimpleAddEventPopover from '../popovers/simple-add-event';

const styles = {
  head: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '80px',
    backgroundColor: '#F4F4F4',
    padding: '10px 30px',
    boxShadow: '0px 3px 10px -3px rgba(0,0,0,0.42)'
  },
  button: {
    backgroundColor: '#0071C3',
    color: '#FFF'
  }
};

const enhance = compose(
  withStateHandlers(
    { open: false, anchorEl: null },
    {
      handlePopoverOpen: () => el => ({ open: true, anchorEl: findDOMNode(el) }),
      handlePopoverClose: () => () => ({ open: false, anchorEl: null })
    }
  ),
  withStyles(styles)
);

function Head({ classes, open, anchorEl, handlePopoverOpen, handlePopoverClose, events }) {
  let addButton = null; // https://reactjs.org/docs/refs-and-the-dom.html#refs-and-functional-components

  return (
    <div className={classes.head}>
      <div>
        <Button
          raised={true}
          className={classes.button}
          ref={button => {
            addButton = button;
          }}
          onClick={() => handlePopoverOpen(addButton)}
        >
          {'Добавить'}
        </Button>
        <Button raised={true} className={classes.button}>
          {'Обновить'}
        </Button>
        <SimpleAddEventPopover open={open} handleClose={handlePopoverClose} anchorEl={anchorEl} />
      </div>
      <SearchBar events={events} />
    </div>
  );
}

Head.propTypes = {
  anchorEl: PropTypes.object,
  classes: PropTypes.object.isRequired,
  events: PropTypes.object,
  handlePopoverClose: PropTypes.func,
  handlePopoverOpen: PropTypes.func,
  open: PropTypes.bool
};

export default enhance(Head);
