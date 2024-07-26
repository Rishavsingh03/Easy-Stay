import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector,useDispatch } from 'react-redux';
import {logout} from '../store/index'
import{serverUrl} from '../assets/assets'
const Logout = () => {
  let isAuth=useSelector((state)=>state.auth.isloggedIn);
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // const token=localStorage.getItem("token");
      localStorage.removeItem("token");
      dispatch(logout());
      toast.success('Logged out successfully');
      navigate('/listings');
      // const response = await fetch(`${serverUrl}/logout`, {
      //   method: 'POST',
      //   credentials: 'include', // Include cookies in the request
      // });
      // if (response.ok) {
      //   toast.success('Logged out successfully');
      //   // dispatch(logout);
      //   navigate('/listings');
      // } else {
      //   toast.error('Failed to log out');
      // }
    } catch (error) {
      toast.error('An error occurred');
    }

  };

  useEffect(()=>{
    handleLogout();
  },[navigate])

  return (
     <div></div>
  );
};

export default Logout;
