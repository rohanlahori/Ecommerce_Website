import { ADDTOCART } from "../constants/cartConstant";


export const cartReducer=(state={cartItem:[]},action)=>{
    switch (action.type) 
    {
        case ADDTOCART:
            const item=action.payload;

            const isItemexists=state.cartItems.find(
                (i)=>i.product===item.product
            )

            if(isItemexists)
            {
                return{
                    ...state,
                    cartItems:state.cartItems.map((i)=>
                        i.product===isItemexists.product ? item :i 
                        
                    )
                }
            }
            else{
                return {
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
            }
    


        default:
            return state;
    }
}