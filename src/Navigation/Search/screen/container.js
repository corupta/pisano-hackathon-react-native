import React from 'react';
import { Searcher } from '../../../Utils';

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
const searchAfterInactiveDuration = 200; // ms duration to wait for user to type more before searching

const resultData = [
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
];

class Search extends React.PureComponent {
  static navigationOptions = {
    title: 'Arama'
  };
  constructor(props) {
    super(props);
    this.searcher = new Searcher(['name']);
  }

  state = {
    loading: false,
    searchValue: '',
    searchResults: [],
    placeholder: {
      value: '',
      id: 0,
      increment: 1
    }
  };

  componentDidMount() {
    this.searcher.updateList(resultData);
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

  loadResults = async() => {
    const { searchValue } = this.state;
    const searchResults = await this.searcher.search(searchValue);
    this.setState({
      loading: false,
      searchResults
    });
  };

  handleSearch = () => {
    this.setState({
      loading: true
    }, this.loadResults);
  };

  maybeSearch = (searchValue) => {
    console.log('maybe search', this.state.searchValue, ',', searchValue);
    if (this.state.searchValue === searchValue) {
      this.handleSearch();
    }
  };

  afterSearchValueChange = (searchValue) => () => {
    this.maybeRecallCyclePlaceholder();
    setTimeout(this.maybeSearch, searchAfterInactiveDuration, searchValue);
  };

  handleSearchValueChange = (value) => {
    this.setState({
      searchValue: value
    }, this.afterSearchValueChange(value));
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
    const { loading, searchValue, searchResults, placeholder: { value: placeholderExample } } = this.state;
    const placeholderValue = strings.placeholder(placeholderExample);
    return (
      <SearchView
        results={ searchResults }
        searchValue={ searchValue }
        placeholderValue={ placeholderValue }
        loading={ loading }
        onSearchValueChange={ this.handleSearchValueChange }
        onSearch={ this.handleSearch }
        onResultPress={ this.handleResultPress }
      />
    );
  }
}

export default Search;
