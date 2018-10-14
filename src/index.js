import React from 'react';
import { Provider } from 'react-redux';

import RootNavigator from './Navigation';
import { store } from './store';

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
