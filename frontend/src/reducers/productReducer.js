import { 
    ALL_PRODUCT_FAIL, 
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    CLEAR_ERRORS
} from "../constants/productConstants";

export const ProductReducer=(state=
{products:[]},action)=>{

    switch(action.type){
        case ALL_PRODUCT_REQUEST:
        return{
            loading:true,
            products:[]
        }
        case ALL_PRODUCT_SUCCESS:
        return{
            loading:true,
            products:action.payload.products,
            productsCount:action.payload.productsCount
        }
        case ALL_PRODUCT_FAIL:
        return{
            loading:true, 
            product :action.payload
        }
        case CLEAR_ERRORS:
        return{
            ...state,
            error:null,
        }
        default:
            return state;
    }
}



export const ProductDetailsReducer =(state=
    {product:[]},action)=>{
    
        switch(action.type){
            case PRODUCT_DETAILS_REQUEST:
            return{
                loading:true,
                ...state
            }
            case ALL_PRODUCT_SUCCESS:
            return{
                loading:true,
                product:action.payload,
            }
            case ALL_PRODUCT_FAIL:
            return{
                loading:true, 
                product :action.payload
            }
            case CLEAR_ERRORS:
            return{
                ...state,
                error:null,
            }
            default:
                return state;
        }
    }
    