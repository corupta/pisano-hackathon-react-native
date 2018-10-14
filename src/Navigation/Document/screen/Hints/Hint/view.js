import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from 'react-native-elements';

import { StyleSheet } from 'react-native';

import { Colors } from '../../../../../Utils';

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
        color: Colors.secondary
      };
    }
    return {
      type: 'font-awesome',
      name: 'star-o',
      color: Colors.primary
    };
  };

  render() {
    const { name, onToggleLike } = this.props;
    const leftIcon = this.getLeftIcon();
    return (
      <ListItem
        containerStyle={ styles.listItemContainer }
        wrapperStyle={ styles.listItemWrapper }
        subtitle={ name }
        rightIcon={ leftIcon }
        onPressRightIcon={ onToggleLike }
      />
    );
  }
}

const styles = StyleSheet.create({
  listItemContainer: {
    borderBottomColor: '#e0e0e0',
    marginHorizontal: 10,
    paddingRight: 0
  },
  listItemWrapper: {
    marginLeft: 0
  }
});

export default HintView;
