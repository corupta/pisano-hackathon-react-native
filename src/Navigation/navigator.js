import { createStackNavigator } from 'react-navigation';

import Search from './Search';
import Document from './Document';

export default createStackNavigator({
  Search: {
    screen: Search
  },
  Document: {
    screen: Document
  }
});
