import { combineReducers, configureStore } from '@reduxjs/toolkit'
import generalTvMaze from 'redux/generalTvMaze'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const reducers = combineReducers({generalTvMaze: generalTvMaze})
const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})


export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
