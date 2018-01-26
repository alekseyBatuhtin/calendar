import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, TextField } from 'material-ui';

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

const enhance = withStyles(styles);

const Head = ({ classes }) => (
  <div className={classes.head}>
    <div>
      <Button raised={true} className={classes.button}>
        {'Добавить'}
      </Button>
      <Button raised={true} className={classes.button}>
        {'Обновить'}
      </Button>
    </div>
    <TextField />
  </div>
);

Head.propTypes = {
  classes: PropTypes.object.isRequired
};

export default enhance(Head);
