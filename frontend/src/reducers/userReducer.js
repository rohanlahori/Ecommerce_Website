import { LOGIN_FAIL, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS,
    CLEAR_ERRORS, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS, 
    REGISTER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS
}
from "../constants/userConstant"


export const userReducer=(state={user:[]},action)=>
{
    switch(action.type){
        case LOGIN_REQUEST:
            case REGISTER_REQUEST:
                case LOAD_USER_REQUEST:
        return{
            loading:true,
            isAuthenticated:false
        }
        case LOGIN_SUCCESS:
            case REGISTER_SUCCESS:
                case LOAD_USER_SUCCESS:
        return{
            ...state,
            loading:false,
            isAuthenticated:true,
            user:action.payload
        }

        case LOGOUT_SUCCESS:
            return{
                isAuthenticated:false,
                user:null,
                loading:false
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
            return{
                ...state,
                loading:false, 
                isAuthenticated:false,
                user:null,
                error:action.payload
            }
        case LOAD_USER_FAIL:
            return{
                loading:false, 
                isAuthenticated:false,
                user:null,
                error:action.payload
            }
        case LOGOUT_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
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


export const profileReducer=(state={},action)=>
{
    switch(action.type){
        case UPDATE_PROFILE_REQUEST:
            case UPDATE_PASSWORD_REQUEST:
            return{
                ...state,
                loading:true,
            };
        case UPDATE_PROFILE_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                isUpdated_Profile:true

            };
            case UPDATE_PASSWORD_SUCCESS:
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                isUpdated_Password:true
            };
        case UPDATE_PROFILE_FAIL:
            return{
                ...state,
                loading:false,
                error: action.payload,
                isUpdated_Profile:false
            };
            case UPDATE_PASSWORD_FAIL:
                return{
                    ...state,
                    loading:false,
                    error:action.payload,
                    isUpdated_Password:false
                }
        case UPDATE_PROFILE_RESET:
            case UPDATE_PASSWORD_RESET:
            return{
                ...state,
                isUpdated_Profile:false,
                isUpdated_Password:false
            };
        case CLEAR_ERRORS:
        return{
            ...state,
            error:null,
        };
        default:
            return state;
    }
}


export const forgotPasswordReducer=(state={},action)=>
{
    switch(action.type){
        case FORGOT_PASSWORD_REQUEST:
            case RESET_PASSWORD_REQUEST:
        return{
            ...state,
            loading:true,
            error:null
        };
        case FORGOT_PASSWORD_SUCCESS:
        return{
            ...state,
            loading:false,
            message:action.payload,
            emailsent:true,
        };
        case RESET_PASSWORD_SUCCESS:
        return{
            ...state,
            loading:false,
            success:action.payload,
        };
        case FORGOT_PASSWORD_FAIL:
            case RESET_PASSWORD_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload,
            }
        case CLEAR_ERRORS:
        return{
            ...state,
            error:null,
        };
        default:
            return state;
    }
}



