import {createStore,combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { authReducer } from './auth-reducer';
import userReducer from './user-reducer';
import { groupReducer } from './group-reducer';
import { channelReducer } from './channel-reducer';
import { chatReducer } from './chat-reducer';

let reducers=combineReducers({
    auth:authReducer,
    user:userReducer,
    group:groupReducer,
    channel:channelReducer,
    chat:chatReducer
});

let store=createStore(reducers,applyMiddleware(thunkMiddleware));
export default store;