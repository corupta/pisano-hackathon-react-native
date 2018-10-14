import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DocumentView from './view';
import { selectDocumentById, selectSubDocumentsByDocument } from '../../../store/Documents/reducer';
import * as DocumentActions from '../../../store/Documents/action';
import {selectDependenciesByDocument} from '../../../store/Dependencies/reducer';

class Document extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Bir Başka Döküman')
    };
  };
  static propTypes = {
    dependenciesLoaded: PropTypes.bool.isRequired,
    document: PropTypes.shape(),
    subDocuments: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
    getDocument: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.documentId = props.navigation.getParam('id', null);
  }
  componentDidMount() {
    this.maybeFetchDocument();
  }
  componentDidUpdate() {
    this.maybeFetchDocument();
  }
  maybeFetchDocument = () => {
    const { dependenciesLoaded, getDocument } = this.props;
    if (!dependenciesLoaded) {
      getDocument({ id: this.documentId });
    }
  };

  render() {
    const { document, subDocuments } = this.props;
    return (
      <DocumentView
        loading={ !document }
        documentId={ this.documentId }
        document={ document }
        subDocuments={ subDocuments }
      />
    );
  }
}

const mapStateToProps = (state, { navigation }) => {
  const documentId = navigation.getParam('id', null);
  return {
    dependenciesLoaded: Boolean(selectDependenciesByDocument(state, documentId, null)),
    document: selectDocumentById(state, documentId, null),
    subDocuments: selectSubDocumentsByDocument(state, documentId)
  };
};

const mapDispatchToProps = {
  getDocument: DocumentActions.getDocument
};

export default connect(mapStateToProps, mapDispatchToProps)(Document);
