import React from 'react';
import { Provider } from 'mobx-react';

import RootNavigator from './Navigation';
import store from './api/store';

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={ store }>
        <RootNavigator />
      </Provider>
    );
  }
}

export default App;
