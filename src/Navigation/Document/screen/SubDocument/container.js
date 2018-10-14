import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';

import SubDocumentView from './view';

class SubDocument extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    nodeType: PropTypes.string.isRequired,
    institution: PropTypes.shape()
  };
  state = {
    showDetails: false
  };

  handleToggleShowDetails = () => {
    const { showDetails } = this.state;
    this.setState({
      showDetails: !showDetails
    });
  };

  handleNavigateToDocument = () => {
    const { id, name, navigation } = this.props;
    navigation.push('Document', {
      title: name,
      id
    });
  };


  render() {
    const { index, name, description, nodeType, institution } = this.props;
    const { showDetails } = this.state;
    return (
      <SubDocumentView
        name={ name }
        prefix={ `${index + 1}.  ` }
        description={ description }
        nodeType={ nodeType }
        institution={ institution }
        showDetails={ showDetails }
        onToggleShowDetails={ this.handleToggleShowDetails }
        onNavigateToDocument={ this.handleNavigateToDocument }
      />
    );
  }
}

export default withNavigation(SubDocument);
