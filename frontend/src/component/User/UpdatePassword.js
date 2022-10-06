import {React,Fragment,useRef,useEffect} from 'react'
import "./UpdatePassword.css"
import {Link, useNavigate} from "react-router-dom"
import { useState } from 'react'
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import FaceIcon from "@mui/icons-material/Face"
import { clear_Errors,loadUser,updatepassword, updateprofile} from '../../actions/userAction'
import {useDispatch,useSelector} from "react-redux"
import Loader from "../layout/Loader/Loader"; 
import LockIcon from "@mui/icons-material/Lock"
import VpnKeyIcon from "@mui/icons-material/VpnKey"
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant'


export default function UpdatePassword() {

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {loading,isAuthenticated}=useSelector(state=>state.user)
    let {error,isUpdated_Password}=useSelector(state=>state.profile);
    const [oldPassword,setoldPassword]=useState("");
    const [newPassword,setnewPassword]=useState("");
    const [confirmPassword,setconfirmPassword]=useState("");



    const updatePasswordSubmit=(e)=>{
        e.preventDefault();
        console.log(newPassword,confirmPassword);
        if(newPassword===confirmPassword)
        {
            dispatch(updatepassword(oldPassword,newPassword,confirmPassword))
            console.log(error);
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
        if(isUpdated_Password)
        {
            alert("Password Updated Successfully");
            dispatch(loadUser())
            navigate("/account")
            dispatch({
                type:UPDATE_PASSWORD_RESET
            })
        }
    },[dispatch,error,isUpdated_Password]);



  return (
    <Fragment>
     {loading ?(
       <Loader/>
     ):
     (
       <Fragment>
          <div className='UpdatePasswordContainer'>
            <div className='UpdatePasswordBox'>    
            <h2 text align="center">Update Password</h2>
                <form
                    className='updatePasswordForm'
                    encType="multipart/form-data"
                    onSubmit={updatePasswordSubmit}
                >
                    
                <div className='updatePassword '>
                <VpnKeyIcon/>
                    <input
                    type="password"
                    placeholder=' Old Password'
                    required
                    name="password"
                    value={oldPassword}
                    onChange={(e) => setoldPassword(e.target.value)}
                    >
                    </input>
                </div>

                <div className='updatePassword'>
                        <LockOpenIcon/>
                        <input
                        type="password"
                        placeholder='New Password'
                        required
                        name="password"
                        value={newPassword}
                        onChange={(e) => setnewPassword(e.target.value)}
                        >
                        </input>
                    </div>
                    
                    <div className='updatePassword'>
                        <LockIcon/>
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
                value="Change Password" className='updatePasswordBtn'></input>
                </form>
            </div>
            </div>
            </Fragment>
     )}
     </Fragment>
  )
}
