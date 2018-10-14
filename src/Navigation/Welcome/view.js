import React from 'react';
import PropTypes from 'prop-types';

import { PricingCard } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

import { Colors } from '../../Utils';

class WelcomeView extends React.PureComponent {
  static propTypes = {
    onNavigateToSearch: PropTypes.func.isRequired
  };
  render() {
    const { onNavigateToSearch } = this.props;
    return (
      <View
        style={ styles.container }
      >
        <PricingCard
          price={ 'Evrak İşim' }
          color={ Colors.primary }
          containerStyle={ styles.card }
          button={{
            title: 'Hemen Evrak Arayın',
            icon: 'work',
            buttonStyle: styles.button
          }}
          onButtonPress={ onNavigateToSearch }
          info={ ['hello', 'nono'] }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: Colors.background
  },
  button: {
    borderRadius: 8
  },
  card: {
    borderRadius: 8
  }
});

export default WelcomeView;
