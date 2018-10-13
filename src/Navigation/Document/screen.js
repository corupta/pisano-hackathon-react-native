import React from 'react';
import { View, Text } from 'react-native';

class Document extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Bir Başka Döküman')
    };
  };
  render() {
    return (
      <View>
        <Text>
          document page
        </Text>
      </View>
    );
  }
}

export default Document;
