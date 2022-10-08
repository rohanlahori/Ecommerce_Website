import { ADDTOCART } from "../constants/cartConstant";
import axios from 'axios'


export const addItemstoCart=(id,quantity)=>async(dispatch,getState)=>{
   
        const {data}= await axios.get(`/api/v1/product/${id}`)

        dispatch({
            type:ADDTOCART,
            payload:{
                product:data.product._id,
                name:data.product.name,
                price:data.product.price,
                image:data.product.images[0].url,
                stock:data.product.Stock,
                quantity
            }
        });

    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}