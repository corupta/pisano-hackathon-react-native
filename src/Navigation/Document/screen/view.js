import React from 'react';
import PropTypes from 'prop-types';
import { Text, FlatList, StyleSheet } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Colors } from '../../../Utils';

import SubDocument from './SubDocument';
import Hints from './Hints';

class DocumentView extends React.PureComponent {
  static propTypes = {
    subDocuments: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      nodeType: PropTypes.string.isRequired,
      institution: PropTypes.shape().isRequired
    }).isRequired).isRequired,
    hints: PropTypes.array
  };

  renderSubDocument = ({ item, index }) => {
    const { _id: id, name, description, nodeType, institution } = item;
    return (
      <SubDocument
        id={ id }
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

  render() {
    const { hints } = this.props;
    return (
      <KeyboardAwareScrollView
        extraScrollHeight={ 100 }
        keyboardShouldPersistTaps={ 'handled' }
        keyboardOpeningTime={ 0 }
        style={ styles.container }
      >
        { this.renderAllSubDocuments() }
        <Hints
          hints={ hints }
        />
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background
  }
});

export default DocumentView;
