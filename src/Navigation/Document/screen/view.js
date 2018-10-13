import React from 'react';
import PropTypes from 'prop-types';
import { Text, FlatList } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import SubDocument from './SubDocument';
import Hints from './Hints';

class DocumentView extends React.PureComponent {
  static propTypes = {
    subDocuments: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      nodeType: PropTypes.string.isRequired,
      institution: PropTypes.shape().isRequired
    }).isRequired).isRequired,
    hints: PropTypes.array
  };

  renderSubDocument = ({ item }) => {
    const { _id: id, name, nodeType, institution } = item;
    return (
      <SubDocument
        id={ id }
        name={ name }
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
      <KeyboardAwareScrollView>
        { this.renderAllSubDocuments() }
        <Hints
          hints={ hints }
        />
      </KeyboardAwareScrollView>
    );
  }
}

export default DocumentView;
