import {React,Fragment,useRef} from 'react'
import "./LoginSignUp.css"
import {Link} from "react-router-dom"
import { useState } from 'react'
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import LockOpenIcon from "@mui/icons-material/LockOpen"
import FaceIcon from "@mui/icons-material/Face"

// use Ref is used to access Dom elements in react
const LoginSignUp = () => {

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
    const [Avatar,setAvatar]=useState("")    
    const [AvatarPreview,setAvatarPreview]=useState("/Profile.png")

    const loginSubmit=()=>{
        console.log("Login Form Submitted")
    }
    
    const registerSubmit=(e)=>{
        e.preventDefault();
        const myForm=new FormData();
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("password",password);
        myForm.set("Avatar",Avatar);
        console.log("Sign up Submitted")   
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
                    value={name}
                    onChange={registerDataChange}
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
                    value={email}
                    onChange={registerDataChange}
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
                    value={password}
                    onChange={registerDataChange}
                    >
                    </input>
                </div>
                <div className='registerImage'>
                    <img src={AvatarPreview} alt="Avatar Preview"></img>
                    <input
                    type="file"
                    name="avatar"
                    accept='image/*'
                    onChange={registerDataChange}
                    >
                    </input>
                </div>
                <input type="submit" value="Register" className='signUpBtn'></input>
            </form>
        </div>
        </div>
    </Fragment>
  )
}

export default LoginSignUp