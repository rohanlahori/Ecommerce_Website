import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { ProductReducer } from "./reducers/productReducer";
import { ProductDetailsReducer } from "./reducers/productReducer";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cardReducer";

const reudcer=combineReducers({
    products:ProductReducer,
    productdetails:ProductDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer
    // producctdetails:ProductReducer,
    // productDetails:ProductDetailsReducer
});

let initialState={
    cart:{
        cartItems:localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : []
    }
};

const middleware=[thunk];
const store=createStore(
    reudcer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
