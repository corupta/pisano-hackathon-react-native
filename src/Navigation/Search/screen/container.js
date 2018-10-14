import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  selectDocumentSearchResults,
  selectDocumentSearcherLoading,
  selectDocumentSearcherReady
} from '../../../store/DocumentIndices/reducer';
import * as DocumentIndicesActions from '../../../store/DocumentIndices/action';


import SearchView from './view';

const strings = {
  placeholder: (example) => `Belge giriniz. Örn: ${example}`
};

const placeholderExamples = [
  'öğrenci belgesi',
  'pasaport',
  'tc kimlik kartı'
].map((str) => `${str}  `);

const placeholderAnimationSpeed = 120; // ms duration to insert/remove one letter
const searchAfterInactiveDuration = 200; // ms duration to wait for user to type more before searching

class Search extends React.PureComponent {
  static navigationOptions = {
    title: 'Arama'
  };
  static propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired).isRequired,
    loading: PropTypes.bool.isRequired,
    ready: PropTypes.bool.isRequired,
    search: PropTypes.func.isRequired,
    getSearcherData: PropTypes.func.isRequired
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
    this.maybeFetchSearcherData();
  }

  componentDidUpdate() {
    this.maybeFetchSearcherData();
  }

  maybeFetchSearcherData = () => {
    const { ready, getSearcherData } = this.props;
    if (!ready) {
      getSearcherData();
    }
  };

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

  handleSearch = () => {
    const { search } = this.props;
    const { searchValue } = this.state;
    search({ param: searchValue });
  };

  maybeSearch = (searchValue) => {
    if (this.state.searchValue === searchValue) {
      this.handleSearch();
    }
  };

  afterSearchValueChange = (searchValue) => () => {
    this.maybeRecallCyclePlaceholder();
    setTimeout(this.maybeSearch, searchAfterInactiveDuration, searchValue);
  };

  handleSearchValueChange = (value = '') => {
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
    const { loading, results } = this.props;
    const { searchValue, placeholder: { value: placeholderExample } } = this.state;
    const placeholderValue = strings.placeholder(placeholderExample);
    return (
      <SearchView
        results={ results }
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

const mapStateToProps = (state) => ({
  results: selectDocumentSearchResults(state),
  loading: selectDocumentSearcherLoading(state),
  ready: selectDocumentSearcherReady(state)
});

const mapDispatchToProps = {
  search: DocumentIndicesActions.searchIndex,
  getSearcherData: DocumentIndicesActions.getDocumentIndex
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
