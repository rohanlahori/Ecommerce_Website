import {React,Fragment,useRef,useEffect} from 'react'
import { clear_Errors, forgot, forgotpassword } from '../../actions/userAction';
import "./UpdateProfile.css"
import {useDispatch,useSelector} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import Loader from "../layout/Loader/Loader"; 
import { useState } from 'react'
import { loadUser } from '../../actions/userAction';


const ForgotPassword=()=>{
    const navigate=useNavigate()
    const dispatch=useDispatch();

    const {error,loading,emailsent}=useSelector(state=>state.forgotPassword);
    const [forgotPasswordEmail,setforgotPasswordEmail]=useState("");
    const emailsubmit=(e)=>{
        e.preventDefault();
        dispatch(forgotpassword(forgotPasswordEmail))
    }
    console.log(emailsent)
    useEffect(()=>{
        if(error)
        {
            alert(error);
            dispatch(clear_Errors())
            window.location.reload(false);
        }
        if(emailsent)
        {
            alert("Email Sent Successfully");
            navigate("/account")
        }
    },[dispatch,error,emailsent]);

    return (
        <Fragment>
         {loading ?(
           <Loader/>
         ):
         (
           <Fragment>
             <div className='UpdateProfileContainer'>
            <div className='UpdateProfileBox'>    
            <h2 text align="center">Forgot Password</h2>
                <form
                    className='updateProfileForm'
                    encType="multipart/form-data"
                    onSubmit={emailsubmit}
                >
                <div className='updateProfileEmail'>
                    <input
                    type="email"
                    placeholder='Email'
                    required
                    name="email"
                    value={forgotPasswordEmail}
                    onChange={(e) => setforgotPasswordEmail(e.target.value)}
                    >
                    </input>
                </div>
                <input type="submit" value="Reset Password" className='updateProfileBtn'></input>
                </form>
            </div>
            </div>
           </Fragment>
         )
         }
         </Fragment>
         
    )
}


     
export default ForgotPassword;