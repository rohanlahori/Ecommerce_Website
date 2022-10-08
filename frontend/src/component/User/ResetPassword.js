import {React,Fragment,useRef,useEffect} from 'react'
import { clear_Errors, forgot, forgotpassword } from '../../actions/userAction';
import "./UpdateProfile.css"
import {useDispatch,useSelector} from "react-redux"
import {Link, useNavigate,useParams} from "react-router-dom"
import Loader from "../layout/Loader/Loader"; 
import { useState } from 'react'
import { loadUser } from '../../actions/userAction';
import { resetpassword } from '../../actions/userAction';

const ResetPassword = ({match}) => {

    const {token}=useParams();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    // const {loading}=useSelector(state=>state.forgotpassword)

    const {loading,error,success}=useSelector(state=>state.forgotPassword );

    const [password,setpassword]=useState("");
    const [confirmPassword,setconfirmPassword]=useState("");



    const resetPasswordSubmit=(e)=>{
        e.preventDefault();
        console.log(password,confirmPassword);
        console.log(token)
        if(password===confirmPassword)
        {
            dispatch(resetpassword(token,password,confirmPassword))
        }
        else{
            alert("Password and Confirm Password doesn't match");
            window.location.reload(false);
        }
    }

    useEffect(()=>{
        if(error)
        {
            alert((error));
            dispatch(clear_Errors());
            window.location.reload(false);
        }
        if(success)
        {
            alert("Password Updated Successfully");
            dispatch(loadUser())
            navigate("/login")
        }
    },[dispatch,error,success]);



  return (
    <Fragment>
    {loading ?(
      <Loader/>
    ):
    (
      <Fragment>
         <div className='UpdatePasswordContainer'>
           <div className='UpdatePasswordBox'>    
           <h2 text align="center">Reset Password</h2>
               <form
                   className='updatePasswordForm'
                   encType="multipart/form-data"
                   onSubmit={resetPasswordSubmit}
               >

               <div className='updatePassword'>
                       <input
                       type="password"
                       placeholder='New Password'
                       required
                       name="password"
                       value={password}
                       onChange={(e) => setpassword(e.target.value)}
                       >
                       </input>
                   </div>
                   
                   <div className='updatePassword'>
                       <input
                       type="password"
                       placeholder='Confirm Password'
                       required
                       name="password"
                       value={confirmPassword}
                       onChange={(e) => setconfirmPassword(e.target.value)}
                       >
                       </input>
                   </div>
               <input type="submit" 
               value="Reset Password" className='updatePasswordBtn'></input>
               </form>
           </div>
           </div>
           </Fragment>
    )}
    </Fragment>
  )
}

export default ResetPassword