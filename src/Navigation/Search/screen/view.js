import React from 'react';
import PropTypes from 'prop-types';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { List, ListItem, SearchBar } from 'react-native-elements';
import { View, Text } from 'react-native';

class SearchView extends React.PureComponent {
  static navigationOptions = {
    title: 'Arama'
  };
  static propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })),
    loading: PropTypes.bool,
    onResultPress: PropTypes.func.isRequired
  };

  renderSearchBar = () => {
    return (
      <SearchBar />
    );
  };

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
    return (
      <List>
        { results.map(this.renderResult) }
      </List>
    );
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        { this.renderSearchBar() }
        { this.renderResultList() }
      </KeyboardAwareScrollView>
    );
  }
}
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
