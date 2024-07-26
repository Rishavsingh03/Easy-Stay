import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate ,useLocation,Link} from 'react-router-dom';
import {useSelector,useDispatch} from  'react-redux'
import {serverUrl} from '../assets/assets'
import {login,logout} from '../store/index'
function LoginForm() {
    const dispatch=useDispatch();
    let isAuth=useSelector((state)=>state.auth.isloggedIn);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || "/";
  
    const validate = () => {
        const errors = {};
    
        if (!username) errors.username = "Username is required";
        if (!password) errors.password = "Password is required";
    
        return errors;
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {
          const newUser = {
            username, password
          };
          const url = `${serverUrl}/login`;
          try {
            const result = await fetch(url, {
              method: "POST",
              credentials:'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newUser),
            });
            // console.log("result",result);
            const data=await result.json();
            const token=data.token;
            // console.log(data);
            if(!result.ok){
              throw new Error(`${data.message}`);
            }
            dispatch(login(token));
            localStorage.setItem("token",token);
            toast.success("Logged IN  Successfully");
            if(from=="/"){
              navigate("/Listings");
            }
            else{
              navigate(from, { replace: true });
            }
            
          } catch (err) {
            toast.error(err.message);
            navigate("/login");
          }
        }
      };
  return (
    <div className='flex flex-1 flex-col justify-center items-center -mt-10'>
    <h3 className='w-9/12'>Login</h3>
    <form onSubmit={submitHandler} className='flex flex-col gap-1 w-9/12'>
      <div className='flex flex-col gap-0'>
        <label htmlFor="username">Username</label>
        <input
          className='border-2 w-7/12 -mt-2'
          name='username'
          type='text'
          placeholder='Enter your username'
          onChange={(e) => {
            setUsername(e.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
          }}
        />
        {errors.username && <span className="text-red-500">{errors.username}</span>}
      </div>

      <div className='flex flex-col gap-0'>
        <label htmlFor='password'>password</label>
        <input
          className='border-2 w-7/12 -mt-2'
          name='password'
          type='password'
          placeholder='Password'
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prevErrors) => ({ ...prevErrors,password: "" }));
          }}
        />
        {errors.password && <span className="text-red-500">{errors.password}</span>}
      </div>
      <div>
        <button className='bg-[#fe424d] text-white w-[80px] rounded-sm mt-2 p-1'>Login</button>
      </div>
      </form>
      <Link to='/signup'>Not  registered</Link>
      </div>
  )
}

export default LoginForm