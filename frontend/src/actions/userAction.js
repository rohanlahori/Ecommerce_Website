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
    CLEAR_ERRORS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST
} from "../constants/userConstant";


// Actions would be login and signup action


export const login=(email,password)=>async(dispatch)=>{
    console.log({email,password})
    try{
        dispatch({type:LOGIN_REQUEST});
        const config={headers: {"Content-Type":"application/json"}}
        const {data}=await axios.post(
            `/api/v1/login`,
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
            `/api/v1/register`,
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


// Load User
export const loadUser=()=>async(dispatch)=>{
    try{
        dispatch({type:LOAD_USER_REQUEST});

        const {data}=await axios.get(`/api/v1/me`)
        dispatch({
            type:LOAD_USER_SUCCESS,
            payload:data.user
        })
    }
    catch(error){
        dispatch({
            type:LOAD_USER_FAIL,
            payload:error.response.data.message
        })
    }
};



// Logout User

export const logout=()=>async(dispatch)=>{
    console.log("Logout Successful");
    try{
        await axios.get(`/api/v1/logout`);
        alert("Logout Successful")
        dispatch({
            type:LOGOUT_SUCCESS,
        })
    }
    catch(error){
        dispatch({
            type:LOGOUT_FAIL,
            payload:error.response.data.message
        })
    }
};



// Update Profile
export const updateprofile=(updateProfileName,updateProfileEmail)=>async(dispatch)=>{
    try{
        dispatch({type:UPDATE_PROFILE_REQUEST});
        const config={headers: {"Content-Type":"multipart/form-data"}}
        console.log({updateProfileName,updateProfileEmail});
        const {data}=await axios.put(
            `/api/v1/me/update`,
            {updateProfileName,updateProfileEmail},
            config
        );
        console.log(data);
        dispatch({
            type:UPDATE_PROFILE_SUCCESS,
            payload:data.success  
        })
    }
    catch(error){
        dispatch({
            type:UPDATE_PROFILE_FAIL,
            payload:error.response.data.message
        })
    }
};




export const updatepassword=(oldPassword,newPassword,confirmPassword)=>async(dispatch)=>{
    try{
        dispatch({type:UPDATE_PASSWORD_REQUEST});
        const config={headers: {"Content-Type":"application/json"}}
        const {data}=await axios.put(
            `/api/v1/password/update`,
            {oldPassword,newPassword,confirmPassword},
            config
        );
        console.log(data);
        dispatch({
            type:UPDATE_PASSWORD_SUCCESS,
            payload:data.success   
        })
    }
    catch(error){
        dispatch({
            type:UPDATE_PASSWORD_FAIL,
            payload:error.response.data.message
        })
    }
};


export const clear_Errors =()=> async(dispatch)=>{
    dispatch({
        type:CLEAR_ERRORS
    })
}

