import React, { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import Header from '../layout/Header/Header.jsx'


export const Profile = ({  }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate=useNavigate();


  useEffect(() => 
  {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Header/>
          <MetaData title={`${user.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <img src={'https://cdn.pixabay.com/photo/2022/09/20/10/11/street-7467503__480.jpg'} 
              width="40%" height="40%" alt={user.name} />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              {/* <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div> */}

              <div>
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;