import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import Reducers from "./reducers";

const middleware = [thunk];

const store = createStore(Reducers, applyMiddleware(...middleware));

export default store;