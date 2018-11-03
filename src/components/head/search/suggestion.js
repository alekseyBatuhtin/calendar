import React from 'react';
import PropTypes from 'prop-types';

import dateFns from 'date-fns/fp';

import { MenuItem, Paper, withStyles } from '@material-ui/core';
import formatDate from '../../../utils/formatDate';

const styles = {
  wrap: { display: 'flex', flexDirection: 'column' },
  date: { fontSize: '.8em' }
};

const SuggestionItemBase = ({ isHighlighted, suggestion, classes }) => (
  <MenuItem selected={isHighlighted} component="div">
    <div className={classes.wrap}>
      <div>
        <strong>{suggestion.title}</strong>
      </div>
      <span className={classes.date}>
        {formatDate(suggestion.date, 'd MMMM')}
      </span>
    </div>
  </MenuItem>
);

SuggestionItemBase.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  isHighlighted: PropTypes.bool,
  suggestion: PropTypes.object
};

const SuggestionItem = withStyles(styles)(SuggestionItemBase);

export const Suggestion = (suggestion, { isHighlighted }) => (
  <SuggestionItem suggestion={suggestion} isHighlighted={isHighlighted} />
);

export const SuggestionContainer = options => {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} style={{ background: 'white' }}>
      {children}
    </Paper>
  );
};
