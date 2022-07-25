import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { ProductReducer } from "./reducers/productReducer";

const reudcer=combineReducers({
    products:ProductReducer
});
let initialState={};
const middleware=[thunk];

const store=createStore(
    reudcer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
