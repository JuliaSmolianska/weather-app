// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//import languageReducer from './language/languageReducer.js';
import settingsReducer from './settings/settingsReducer.js';
import weatherReducer from './weather/weatherReducer.js';

const settingsPersistConfig = {
  key: 'settings',
  storage,
  whitelist: ['temperatureUnit', 'globalLanguage', 'cities'],
};

export const store = configureStore({
  reducer: {
    settings: persistReducer(settingsPersistConfig, settingsReducer),
    weather: weatherReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV === 'development',
});

persistStore(store).subscribe(() => {
  console.log('persistStore updated', store.getState());
});

export const persistor = persistStore(store);

