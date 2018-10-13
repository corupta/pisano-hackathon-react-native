import React from 'react';
import PropTypes from 'prop-types';

import HintView from './view';

class Hint extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired
  };

  state = {
    liked: false
  };

  handleToggleLike = () => {
    const { liked } = this.state;
    this.setState({
      liked: !liked
    });
  };

  render() {
    const { name } = this.props;
    const { liked } = this.state;
    return (
      <HintView
        name={ name }
        liked={ liked }
        onToggleLike={ this.handleToggleLike }
      />
    );
  }
}

export default Hint;
