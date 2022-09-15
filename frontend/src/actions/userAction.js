import axios from "axios";
// import { config } from "dotenv";
// import { application } from "express";

import{
    LOGIN_FAIL, 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    CLEAR_ERRORS
} from "../constants/userConstant";


// Actions would be login and signup action


export const login=(email,password)=>async(dispatch)=>{
    try{
        dispatch({type:LOGIN_REQUEST});
        const config={headers: {"Content-Type":"application/json"}}
        const data=await axios.post(
            '/api/v1/login',
            {email,password},
            config
        );
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data
        })
    }
    catch(error){
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.message
        })
    }
};

export const clear_Errors =()=> async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}

// 7 56