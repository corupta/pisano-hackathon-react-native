import React from 'react';
import { View, Text } from 'react-native';

class Search extends React.PureComponent {
  static navigationOptions = {
    title: 'Arama'
  };
  render() {
    return (
      <View>
        <Text>
          search page
        </Text>
      </View>
    );
  }
}

export default Search;