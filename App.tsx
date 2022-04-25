import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import GlobalStack from './src/navigation'
import store from './src/redux/store'
import { PinLock } from './src/utils/components'

const App = () => {
  let persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PinLock />
        <NavigationContainer>
          <GlobalStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

