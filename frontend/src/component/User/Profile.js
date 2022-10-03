import React,{Fragment,useEffect} from 'react'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader/Loader'
import { Link, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import "./Profile.css"
import { TextField } from '@mui/material'
export const Profile = () => {
    const {user,loading,isAuthenticated}=useSelector(state=>state.user)
    const navigate=useNavigate()
    useEffect(()=>{
        if(isAuthenticated==false)
        {
            navigate('/login')
        }
    },[])
  return (
    <Fragment>
        {
        loading?
        (
            <Loader/>
        )
        :
        (
            <Fragment>
            <MetaData title={`${user.name}'s Profile`}/>
            <div className='profileContainer'>
                <div>
                    <h2>{`My Profile`} </h2>
                    <img 
                    src={'https://cdn.pixabay.com/photo/2022/09/22/16/51/waterfall-7472700__480.jpg'}
                    width="40%" height="40%">
                        
                    </img>
                    <Link to="/me/update">Edit Profile</Link>
                </div>

                <div>
                    <h2>Personal Information : 
                    </h2>
                    
                    <br></br>
                    <h2>Name : {user.name} </h2>
                    {/* <br></br><br></br> */}
                    <h2>Email : {user.email}</h2> 
                    <h2>Mobile No : {user.contact}</h2> 

                </div>
                <div>
                </div>

                <div>
                    <h3>
                    <Link to="/orders">My Orders</Link>
                    </h3>
                    <h3>
                    <Link to="/password/update">Change Password</Link>
                    </h3>
                    <h3>
                    <Link to="/edit/profile">Edit Profile</Link>
                    </h3>
                   
                </div>
            </div>
            </Fragment>
        )
        }
    </Fragment>
  )
}

