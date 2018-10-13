import React from 'react';


import SearchView from './view';

class Search extends React.PureComponent {
  handleResultPress = (node) => {
    const { navigation } = this.props;
    const { _id, name } = node;
    navigation.navigate('Document', {
      title: name,
      id: _id
    });
  };

  render() {
    return (
      <SearchView
        onResultPress={ this.handleResultPress }
      />
    );
  }
}

export default Search;
