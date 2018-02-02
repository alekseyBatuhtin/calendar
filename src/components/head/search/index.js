import React from 'react';
import PropTypes from 'prop-types';

import { compose, withState, mapProps, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import Autosuggest from 'react-autosuggest';

import { withStyles } from 'material-ui';
import Search from 'material-ui-icons/Search';
import Input from './input';

import { Suggestion, SuggestionContainer } from './suggestion';

const styles = {
  wrap: {
    display: 'flex',
    alignItems: 'center'
  },
  container: {
    position: 'relative',
    height: 'auto'
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    maxHeight: '300px',
    overflowY: 'auto',
    zIndex: 100,
    left: 0,
    right: 0
  },
  suggestion: {
    display: 'block',
    borderBottom: '1px solid black'
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  },
  input: {
    borderRadius: 4,
    width: '250px',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '8px 12px',
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.08rem rgba(0,123,255,.25)'
    }
  },
  icon: {
    color: 'grey',
    marginRight: '8px'
  }
};

const mapDispatchToProps = {};

const enhance = compose(
  connect(null, mapDispatchToProps),
  mapProps(({ events }) => ({
    eventsArray: Object.keys(events).reduce((acc, event) => {
      acc.push(events[event]);
      return acc;
    }, [])
  })),
  withState('value', 'setValue', ''),
  withState('suggestions', 'setSuggestions', []),
  withHandlers({
    handleSuggestionsFetchRequested: ({ eventsArray, setSuggestions }) => ({ value }) => {
      const sorted = getSuggestions(value, eventsArray);
      setSuggestions(sorted);
    },
    handleSuggestionsClearRequested: ({ setSuggestions }) => () => {
      setSuggestions([]);
    }
  }),
  withHandlers({
    handleChange: ({ setValue }) => (event, { newValue }) => {
      setValue(newValue);
    } /* ,
    handleSuggestionSelected: ({ getBookList }) => (event, { suggestionValue }) => {
      // getBookList(suggestionValue);
    }
    }*/
  }),
  withStyles(styles)
);

const SearchBar = props => {
  const {
    classes,
    handleChange,
    value,
    suggestions,
    handleSuggestionsFetchRequested,
    handleSuggestionsClearRequested,
    handleSuggestionSelected
  } = props;

  return (
    <div className={classes.wrap}>
      <Search className={classes.icon} />
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion
        }}
        renderInputComponent={Input}
        suggestions={suggestions}
        onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
        onSuggestionsClearRequested={handleSuggestionsClearRequested}
        onSuggestionSelected={() => {}}
        renderSuggestion={Suggestion}
        renderSuggestionsContainer={SuggestionContainer}
        getSuggestionValue={getSuggestionValue}
        inputProps={{
          autoFocus: false,
          classes,
          placeholder: 'Событие дата или участник',
          type: 'search',
          value,
          onChange: handleChange,
          disableUnderline: true
        }}
      />
    </div>
  );
};

SearchBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string),
  handleChange: PropTypes.func,
  handleSuggestionsClearRequested: PropTypes.func,
  handleSuggestionSelected: PropTypes.func,
  handleSuggestionsFetchRequested: PropTypes.func,
  suggestions: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string
};
export default enhance(SearchBar);

function getSuggestions(value, events) {
  const inputValue = value.trim();
  const regex = new RegExp(`^${inputValue}`, 'i');

  return inputValue.length === 0 ? [] : events.filter(({ title }) => regex.test(title));
}

function getSuggestionValue(suggestion) {
  return suggestion.title;
}
