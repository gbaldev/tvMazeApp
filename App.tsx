import { NavigationContainer } from '@react-navigation/native'
import React, { useState } from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import GlobalStack from './src/navigation'
import store from './src/redux/store'
import { PinLock } from './src/utils/components'
import Fingerprint from './src/utils/components/Fingerprint'

const App = () => {
  const persistor = persistStore(store)
  const [showAskForTouch, setShowAskForTouch] = useState<boolean>(false)
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Fingerprint showAskForTouch={showAskForTouch} setShowAskForTouch={setShowAskForTouch}/>
        {!showAskForTouch && <PinLock />}
        <NavigationContainer>
          <GlobalStack />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};


export default App;

