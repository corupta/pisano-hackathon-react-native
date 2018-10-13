import React from 'react';
import PropTypes from 'prop-types';

import HintsView from './view';

class Hints extends React.PureComponent {
  static propTypes = {
    hints: PropTypes.array.isRequired
  };
  // todo add functions to add hint (comment)

  render() {
    const { hints } = this.props;
    return (
      <HintsView hints={ hints } />
    );
  }
}

export default Hints;
