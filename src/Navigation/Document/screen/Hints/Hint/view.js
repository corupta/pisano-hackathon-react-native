import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';

class HintView extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    liked: PropTypes.bool.isRequired,
    onToggleLike: PropTypes.func.isRequired
  };

  getLeftIcon = () => {
    const { liked } = this.props;
    if (liked) {
      return {
        type: 'font-awesome',
        name: 'star',
        color: '#ed2'
      };
    }
    return {
      type: 'font-awesome',
      name: 'star-o',
      color: '#ccb'
    };
  };

  render() {
    const { name, onToggleLike } = this.props;
    const leftIcon = this.getLeftIcon();
    return (
      <ListItem
        title={ name }
        rightIcon={ leftIcon }
        onPressRightIcon={ onToggleLike }
      />
    );
  }
}

export default HintView;
