import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { ProductReducer } from "./reducers/productReducer";
import { ProductDetailsReducer } from "./reducers/productReducer";

const reudcer=combineReducers({
    products:ProductReducer,
    productdetails:ProductDetailsReducer,
    // producctdetails:ProductReducer,
    // productDetails:ProductDetailsReducer
});

let initialState={};
const middleware=[thunk];
const store=createStore(
    reudcer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
