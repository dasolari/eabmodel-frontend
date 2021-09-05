import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import { userReducer } from './slices/userSlice';
import { modalReducer } from './slices/modalSlice';
import { catalogueReducer } from './slices/catalogueSlice';
import { companyReducer } from './slices/companySlice';
import { shopReducer } from './slices/shopSlice';
import { connectionReducer } from './slices/connectionSlice';
import { composeWithDevTools } from 'redux-devtools-extension';
import storage from 'redux-persist/lib/storage';

// Parts of the state you want to persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['company', 'user', 'shop', 'catalogue'],
};

// Add new reducers here
const RootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  catalogue: catalogueReducer,
  company: companyReducer,
  shop: shopReducer,
  connection: connectionReducer,
});

const RootReducerPersistor = persistReducer(persistConfig, RootReducer);

// Export the store to use it in the app
export const store = createStore(RootReducerPersistor, composeWithDevTools(applyMiddleware(thunk)));

export const storePersistor = persistStore(store);

export type RootState = ReturnType<typeof RootReducerPersistor>;
