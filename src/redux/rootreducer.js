import { combineReducers, compose, createStore } from "redux";
import WatchListReducer from "./reducers/watchListReducer";
import AppReducer from "./reducers/appReducer";

const appReducers = combineReducers({
    WatchListReducer,
    AppReducer,
})
const rootReducers = (state, action) => {
    return appReducers(state, action)
}

const store = createStore(rootReducers, {});

export default store;