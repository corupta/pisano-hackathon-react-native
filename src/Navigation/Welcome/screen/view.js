import React from 'react';
import PropTypes from 'prop-types';

import { Card, Avatar, Button } from 'react-native-elements';
import { View, StyleSheet, Image } from 'react-native';

import { Colors } from '../../../Utils/index';
const image = require('../../../../img/squareBig.png');

const strings = {
  title: 'Evrak İşim\'e Hoş Geldiniz',
  buttonTitle: 'Hemen Evrak Arayın'
};

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
        <Card
          containerStyle={ styles.card }
          wrapperStyle={ styles.innerCard }
          dividerStyle={ styles.cardDivider }
        >
          <Image
            size='large'
            style={ styles.image }
            source={ image }
            resizeMethod={ 'scale' }
          />
          <Button
            buttonStyle={ styles.button }
            icon={{ type: 'material', name: 'work' }}
            onPress={ onNavigateToSearch }
            title={ strings.buttonTitle }
          />
        </Card>
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
  image: {
    alignSelf: 'center',
    width: 180,
    height: 144
  },
  button: {
    marginTop: 36,
    borderRadius: 8,
    backgroundColor: Colors.primary
  },
  card: {
    borderRadius: 8,
    marginHorizontal: 32,
    paddingVertical: 36,
    paddingHorizontal: 20,
    marginBottom: 24
  }
});

export default WelcomeView;
