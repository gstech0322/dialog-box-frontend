import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { collectionReducer } from './collection';
import { nftReducer } from './nft';
import { articleReducer } from './article';
import { adminReducer } from './admin';

const reducers = combineReducers({
    authReducer,
    collectionReducer,
    nftReducer,
    articleReducer,
    adminReducer,
});

export default reducers;