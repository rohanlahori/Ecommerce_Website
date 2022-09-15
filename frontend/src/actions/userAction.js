import axios from "axios";
// import { config } from "dotenv";
// import { application } from "express";

import{
    LOGIN_FAIL, 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    CLEAR_ERRORS
} from "../constants/userConstant";


// Actions would be login and signup action


export const login=(email,password)=>async(dispatch)=>{
    console.log({email,password})
    try{
        dispatch({type:LOGIN_REQUEST});
        const config={headers: {"Content-Type":"application/json"}}
        const {data}=await axios.post(
            '/api/v1/login',
            {email,password},
            config
        );
        console.log(10111)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user   
        })
    }
    catch(error){
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.message
        })
    }
};


export const register=(name,email,password)=>async(dispatch)=>{
    console.log({name,email,password})
    try{
        dispatch({type:REGISTER_REQUEST});
        const config={headers: {"Content-Type":"application/json"}}
        console.log({name,email,password})
        const {data}=await axios.post(
            '/api/v1/register',
            {name,email,password},
            config
        );
        dispatch({
            type:REGISTER_SUCCESS,
            payload:data.user   
        })
    }
    catch(error){
        dispatch({
            type:REGISTER_FAIL,
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