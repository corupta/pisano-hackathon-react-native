import React from 'react';
import PropTypes from 'prop-types';

import InstitutionView from './view';

class Institution extends React.PureComponent {
  static propTypes = {
    institution: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }).isRequired
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

  render() {
    const { institution } = this.props;
    const { name, description } = institution;
    const { showDetails } = this.state;
    return (
      <InstitutionView
        name={ name }
        s={ true }
        description={ description }
        showDetails={ showDetails }
        onToggleShowDetails={ this.handleToggleShowDetails }
      />
    );
  }
}

export default Institution;
