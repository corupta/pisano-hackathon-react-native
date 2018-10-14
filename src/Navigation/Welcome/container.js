import React from 'react';

import WelcomeView from './view';

class Welcome extends React.PureComponent {
  static navigationOptions = {
    title: 'Evrak İsim'
  };

  handleNavigateToSearch=() => {
    const { navigation } = this.props;
    navigation.navigate('Search');
  };

  render() {
    return (
      <WelcomeView
        onNavigateToSearch={ this.handleNavigateToSearch }
      />
    );
  }
}

export default Welcome;
