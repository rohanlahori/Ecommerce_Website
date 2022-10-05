import {React,Fragment,useRef,useEffect} from 'react'
import "./UpdateProfile.css"
import {Link, useNavigate} from "react-router-dom"
import { useState } from 'react'
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import FaceIcon from "@mui/icons-material/Face"
import { clear_Errors, loadUser, login,register, updateprofile} from '../../actions/userAction'
import {useDispatch,useSelector} from "react-redux"
import Loader from "../layout/Loader/Loader"; 
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant'


// use Ref is used to access Dom elements in react
export default function UpdateProfile (){
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const{error,isUpdated,loading}=useSelector(state=>state.profile)
    const {user,isAuthenticated}=useSelector((state)=>state.user)
    

    const [updateProfileName,setUpdateProfileName]=useState("");
    const [updateProfileEmail,setUpdateProfileEmail]=useState("");


    const updateProfileSubmit=(e)=>{
        e.preventDefault();
        console.log({updateProfileName,updateProfileEmail});
        dispatch(updateprofile(updateProfileName,updateProfileEmail))
    }


    useEffect(()=>{
        if(error)
        {
            alert((error));
            dispatch(clear_Errors());
        }
        if(isUpdated)
        {
            alert("Profile Updated Successfully");
            dispatch(loadUser())
            navigate("/account")

            dispatch({
                type:UPDATE_PROFILE_RESET
            });
        }
    },[dispatch,error,isUpdated,user]);

  return (
    <Fragment>
     {loading ?(
       <Loader/>
     ):
     (
       <Fragment>
          <div className='UpdateProfileContainer'>
            <div className='UpdateProfileBox'>    
            <h2 text align="center">Update Profile</h2>
                <form
                    className='updateProfileForm'
                    encType="multipart/form-data"
                    onSubmit={updateProfileSubmit}
                >
                <div className='updateProfileName'>
                    <FaceIcon/>
                    <input
                    type="text"
                    placeholder='Name'
                    required
                    name="name"
                    value={updateProfileName}
                    onChange={(e) => setUpdateProfileName(e.target.value)}
                    >
                    </input>
                </div>
                <div className='updateProfileEmail'>
                    <input
                    type="email"
                    placeholder='Email'
                    required
                    name="email"
                    value={updateProfileEmail}
                    onChange={(e) => setUpdateProfileEmail(e.target.value)}
                    >
                    </input>
                </div>
                <input type="submit" value="Update Profile" className='updateProfileBtn'></input>
                </form>
            </div>
            </div>
            </Fragment>
     )}
     </Fragment>
   );
}
