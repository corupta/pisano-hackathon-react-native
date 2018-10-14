import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Colors } from '../../../Utils';

import SubDocument from './SubDocument';
import Hints from './Hints';

class DocumentView extends React.PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    documentId: PropTypes.string.isRequired,
    document: PropTypes.shape({
      hints: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
    }),
    subDocuments: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired
  };

  renderSubDocument = ({ item, index }) => {
    const { documentId } = this.props;
    const { _id: id, name, description, nodeType, institution } = item;
    return (
      <SubDocument
        id={ id }
        parentId={ documentId }
        index={ index }
        name={ name }
        description={ description }
        nodeType={ nodeType }
        institution={ institution }
      />
    );
  };

  keyExtractor = ({ _id }) => _id;

  renderAllSubDocuments = () => {
    const { subDocuments } = this.props;
    return (
      <FlatList
        renderItem={ this.renderSubDocument }
        data={ subDocuments }
        keyExtractor={ this.keyExtractor }
      />
    );
  };

  renderDetails = () => {
    const { document } = this.props;
    return (
      null
    );
  };

  renderHints = () => {
    const { document: { hints }, documentId } = this.props;
    return (
      <Hints
        documentId={ documentId }
        hints={ hints }
      />
    );
  };

  render() {
    const { loading } = this.props;
    if (loading) {
      return (
        <View
          style={ styles.loadingContainer }
        >
          <ActivityIndicator
            size={ 'large' }
          />
        </View>
      );
    }
    return (
      <KeyboardAwareScrollView
        extraScrollHeight={ 100 }
        keyboardShouldPersistTaps={ 'handled' }
        keyboardOpeningTime={ 0 }
        style={ styles.container }
      >
        { this.renderAllSubDocuments() }
        { this.renderDetails() }
        { this.renderHints()}
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default DocumentView;
