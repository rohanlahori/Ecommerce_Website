import {React,Fragment,useRef,useEffect} from 'react'
import "./LoginSignUp.css"
import {Link, useNavigate} from "react-router-dom"
import { useState } from 'react'
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import FaceIcon from "@mui/icons-material/Face"
import { clear_Errors, login,register} from '../../actions/userAction'
import {useDispatch,useSelector} from "react-redux"
import Loader from "../layout/Loader/Loader"; 

// use Ref is used to access Dom elements in react
const LoginSignUp = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch();
    const{error,loading,isAuthenticated}=useSelector(state=>state.user)
    const loginTab=useRef(null);
    const registerTab=useRef(null);
    const switcherTab=useRef(null);
    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
    });
    const {name,email,password}=user;
    const [loginEmail,setLoginEmail]=useState("");
    const [loginPassword,setLoginPassword]=useState("");
    const [registerEmail,setregisterEmail]=useState("");
    const [registerPassword,setregisterPassword]=useState("");
    const [registerName,setregisterName]=useState("");
    const [Avatar,setAvatar]=useState("")    
    const [AvatarPreview,setAvatarPreview]=useState("/Profile.png")

    const loginSubmit=(e)=>{
        e.preventDefault();
        dispatch(login(loginEmail,loginPassword))
    }
    
    const registerSubmit=(e)=>{
        e.preventDefault();
        // const myForm=new FormData();
        // myForm.set("name",name);
        // myForm.set("email",email);
        // myForm.set("password",password);
        // myForm.set("Avatar",Avatar);
        // console.log("Sign up Submitted")   
        dispatch(register(registerName,registerEmail,registerPassword))
    }
    
    
    const registerDataChange=(e)=>{
        if(e.target.name=="avatar")
        {
            const reader=new FileReader();
            reader.onload=()=>{
                if(reader.readyState===2)
                {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result)
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }

        else{
            setUser({...user,[e.target.name]:e.target.value})
        }
    }

    useEffect(()=>{
        if(error)
        {
            console.log("error check")
            dispatch(clear_Errors());
        }
        if(isAuthenticated)
        {
            navigate("/account")
        }
    },[dispatch,error,isAuthenticated]);
    
    const switchTabs=(e,tab)=>{
        console.log(switcherTab);
        if(tab ==="login")
        {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");
            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if(tab==="register")
        {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");
            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");    
        }
    };
  return (
    <Fragment>
     {loading ?(
       <Loader/>
     ):
     (
       <Fragment>
          <div className='LoginSignUpContainer'>
            <div className='LoginSignUpBox'>

                <div>
                    <div className='login_signUp_toggle'>
                        <p onClick={(e)=>switchTabs(e,"login")}>LOGIN</p>
                        <p onClick={(e)=>switchTabs(e,"register")}>REGISTER</p>
                    </div>
                    <button ref={switcherTab}></button>
                </div>


                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                    <div className='loginEmail'>
                        <MailOutlineIcon/>
                        <input
                        type="email"
                        placeholder='Email'
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        />
                    </div>
                    <div className='loginPassword'>
                        <LockOpenIcon/>
                        <input
                        type="password"
                        placeholder='Password'
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        />
                    </div>
                    <Link to="/password/forgot">Forgot Password</Link>
                    <input type="submit" value="Login" className='loginBtn'></input>
                </form>

                <form
                    className='signUpForm'
                    ref={registerTab}
                    encType="multipart/form-data"
                    onSubmit={registerSubmit}
                >
                    <div className='signUpName'>
                        <FaceIcon/>
                        <input
                        type="text"
                        placeholder='Name'
                        required
                        name="name"
                        value={registerName}
                        onChange={(e) => setregisterName(e.target.value)}
                        >
                        </input>
                    </div>
                    <div className='signUpEmail'>
                        <MailOutlineIcon/>
                        <input
                        type="email"
                        placeholder='Email'
                        required
                        name="email"
                        value={registerEmail}
                        onChange={(e) => setregisterEmail(e.target.value)}
                        >
                        </input>
                    </div>
                    <div className='signUpPassword'>
                        <MailOutlineIcon/>
                        <input
                        type="password"
                        placeholder='Password'
                        required
                        name="password"
                        value={registerPassword}
                        onChange={(e) => setregisterPassword(e.target.value)}
                        >
                        </input>
                    </div>
                    <div className='registerImage'>
                        <img src={AvatarPreview} alt="Avatar Preview"></img>
                        <input
                        type="file"
                        name="avatar"
                        accept='image/*'
                        // onChange={registerDataChange}
                        >
                        </input>
                    </div>
                    <input type="submit" value="Register" className='signUpBtn'></input>
                </form>
            </div>
            </div>
            </Fragment>
     )}
     </Fragment>
   );
}

export default LoginSignUp