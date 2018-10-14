import React from 'react';
import PropTypes from 'prop-types';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { List, ListItem, SearchBar } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';

import { Colors } from '../../../Utils';

class SearchView extends React.PureComponent {
  static propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })),
    searchValue: PropTypes.string.isRequired,
    placeholderValue: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    onSearchValueChange: PropTypes.func.isRequired,
    onResultPress: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired
  };

  renderSearchBar = () => {
    const { searchValue, placeholderValue, loading, onSearchValueChange, onSearch } = this.props;
    return (
      <SearchBar
        autoFocus={ true }
        lightTheme={ true }
        value={ searchValue }
        placeholder={ placeholderValue }
        onChangeText={ onSearchValueChange }
        onClearText={ onSearchValueChange }
        onEndEditing={ onSearch }
        showLoadingIcon={ loading }
        clearIcon={{ color: '#86939e', name: 'clear' }}
        containerStyle={ styles.searchBarContainer }
        inputStyle={ styles.searchBarInput }
      />
    );
  };

  handleSearchValueChange = (e) => this.props.onSearchValueChange(e.target.value);

  handlePressResult = (node) => {
    if (!this.handler) {
      this.handler = {};
    }
    if (!this.handler[node._id]) {
      this.handler[node._id] = () => this.props.onResultPress(node);
    }
    return this.handler[node._id];
  };

  renderResult = (node) => {
    const { _id, name } = node;
    if (!_id) {
      return null;
    }
    return (
      <ListItem
        key={ _id }
        title={ name }
        onPress={ this.handlePressResult(node) }
      />
    );
  };

  renderResultList = () => {
    const { results } = this.props;
    if (!results.length) {
      return null;
    }
    return (
      <List>
        { results.map(this.renderResult) }
      </List>
    );
  };

  render() {
    return (
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={ 'handled' }
        style={ styles.container }
      >
        { this.renderSearchBar() }
        { this.renderResultList() }
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background
  },
  searchBarContainer: {
    backgroundColor: Colors.background,
    paddingBottom: 2,
    paddingHorizontal: 4
  },
  searchBarInput: {
    backgroundColor: Colors.searchBar
  }
});
SearchView.defaultProps = {
  results: [
    {
      _id: '5bc1f8e618a5d0400a780522',
      name: 'Foto'
    },
    {
      _id: '5bc1f8e618a5d0400a780521',
      name: 'Nüfus Cüzdanı'
    },
    {
      _id: '5bc1f8e618a5d0400a780520',
      name: 'Passport'
    }
  ]
};

export default SearchView;
