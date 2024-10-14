//provider
//store
//reducer
//action
import {configureStore,combineReducers} from '@reduxjs/toolkit';
import userReducer from './user'
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import adminReducer from './admin'


const rootReducer = combineReducers({user : userReducer, admin : adminReducer})

const persistConfig = {
    key : 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({   
    reducer: persistedReducer
})

const persistor = persistStore(store);

export { store , persistor };
