import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import userFacebookReducer from './userFacebook/userSlice';
import messageFacebookReducer from './message/messageSlice';
import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import storage from "redux-persist/lib/storage";

// Define IRootState
export type IRootState = ReturnType<typeof rootReducer>;

// Configuration for Redux Persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage: storage,
};

// Combine reducers
const rootReducer = combineReducers({
  // user: userReducer, // You might want to remove or comment out this line if not used
  userFacebook: userFacebookReducer,
  message: messageFacebookReducer,
  auth: userReducer, // Assuming this is where you want to use userReducer
});

// Create persisted reducer
const persistedReducer = persistReducer<IRootState>(
  persistConfig,
  rootReducer
);

// Create Redux store
export const store = configureStore({
  reducer: persistedReducer
});

// Create persisted store
export const persistor = persistStore(store);
