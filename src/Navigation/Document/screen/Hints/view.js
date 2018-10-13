import React from 'react';
import PropTypes from 'prop-types';

import { List } from 'react-native-elements';

import Hint from './Hint/index';

class HintsView extends React.PureComponent {
  static propTypes = {
    hints: PropTypes.array.isRequired
  };

  // todo add view for adding new hint

  renderHint = (hint) => {
    return (
      <Hint
        key={ hint }
        name={ hint }
      />
    );
  };

  render() {
    const { hints } = this.props;
    return (
      <List>
        { hints.map(this.renderHint) }
      </List>
    );
  }
}

export default HintsView;
