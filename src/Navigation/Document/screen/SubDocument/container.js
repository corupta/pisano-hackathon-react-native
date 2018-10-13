import React from 'react';
import PropTypes from 'prop-types';

import SubDocumentView from './view';

class SubDocument extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    nodeType: PropTypes.string.isRequired,
    institution: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  };



  render() {
    return (
      <SubDocumentView
      />
    );
  }
}

export default SubDocument;
