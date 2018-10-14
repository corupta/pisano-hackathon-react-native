import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import Welcome from './Welcome/screen/index';
import Search from './Search';
import Document from './Document';

const AppNavigation = createStackNavigator({
  Search: {
    screen: Search
  },
  Document: {
    screen: Document
  }
});

export default createSwitchNavigator({
  Welcome: {
    screen: Welcome
  },
  App: {
    screen: AppNavigation
  }
});
