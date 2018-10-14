import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';
import RootNavigator from './Navigation';

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
