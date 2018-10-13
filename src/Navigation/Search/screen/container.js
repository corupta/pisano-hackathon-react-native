import React from 'react';


import SearchView from './view';

const strings = {
  placeholder: (example) => `Belge giriniz. Örn: ${example}`
};

const placeholderExamples = [
  'öğrenci belgesi',
  'pasaport',
  'tc kimlik kartı'
];

const placeholderAnimationSpeed = 120; // ms duration to insert/remove one letter

class Search extends React.PureComponent {
  static navigationOptions = {
    title: 'Arama'
  };
  state = {
    searchValue: '',
    placeholder: {
      value: '',
      id: 0,
      increment: 1
    }
  };

  componentDidMount() {
    this.maybeRecallCyclePlaceholder();
  }

  cyclePlaceholder = () => {
    const { placeholder } = this.state;
    let { value, id, increment } = placeholder;
    if (value === '' && increment === - 1) {
      id = (id + 1) % placeholderExamples.length;
      increment = 1;
    }
    const current = placeholderExamples[id];
    if (value.length === current.length) {
      increment = - 1;
    }
    value = current.substr(0, value.length + increment);
    this.setState({
      placeholder: {
        value,
        id,
        increment
      }
    }, this.maybeRecallCyclePlaceholder);
  };
  maybeRecallCyclePlaceholder = () => {
    const { searchValue } = this.state;
    if (searchValue === '') {
      setTimeout(this.cyclePlaceholder, placeholderAnimationSpeed);
    }
  };

  handleSearchValueChange = (value) => {
    this.setState({
      searchValue: value
    }, this.maybeRecallCyclePlaceholder);
  };

  handleResultPress = (node) => {
    const { navigation } = this.props;
    const { _id, name } = node;
    navigation.navigate('Document', {
      title: name,
      id: _id
    });
  };

  render() {
    const { searchValue, placeholder: { value: placeholderExample } } = this.state;
    const placeholderValue = strings.placeholder(placeholderExample);
    return (
      <SearchView
        searchValue={ searchValue }
        placeholderValue={ placeholderValue }
        loading={ false }
        onSearchValueChange={ this.handleSearchValueChange }
        onResultPress={ this.handleResultPress }
      />
    );
  }
}

export default Search;
