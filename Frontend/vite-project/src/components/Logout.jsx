import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector,useDispatch } from 'react-redux';
import {logout} from '../store/index'

const Logout = () => {
  let isAuth=useSelector((state)=>state.auth.isloggedIn);
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });
      if (response.ok) {
        toast.success('Logged out successfully');
        dispatch(logout);
        navigate('/listings');
      } else {
        toast.error('Failed to log out');
      }
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
