import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from  'react-redux'
import {serverUrl} from '../assets/assets'
import {login,logout} from '../store/index'
function SignUpForm() {
    const dispatch=useDispatch();
    let isAuth=useSelector((state)=>state.auth.isloggedIn);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role,setRole]=useState("customer");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

  
    const validate = () => {
        const errors = {};
    
        if (!username) errors.username = "Username is required";
        if (!email) errors.email = "Email is required";
        if (!password) errors.password = "Password is required";
    
        return errors;
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).length === 0) {
          const newUser = {
            username, email, password,role
          };
          const url = `${serverUrl}/signup`;
          try {
            const result = await fetch(url, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newUser),
            });
            const data=await result.json();
            const token=data.token;
            // console.log(data);
            // console.log("result",result);

            if(!result.ok){
              throw new Error(`${data.message}`);
            }
            console.log("inside signup token = ",token);
            dispatch(login(token));
            localStorage.setItem("token",token);
            toast.success("User Registered  Successfully");
            toast.success("Logged IN  Successfully");
            navigate("/Listings");
          } catch (err) {
            toast.error(err.message);
            navigate("/signup");
          }
        }
      };
      if(isAuth){
        navigate('/Listings');
      }
  return (
    <div className='flex flex-1 flex-col justify-center items-center -mt-10'>
    <h3 className='w-9/12'>Sign Up On Easy Stay</h3>
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
        <label htmlFor='email'>Email</label>
        <input
          className='border-2 w-7/12 -mt-2'
          name='email'
          placeholder='Enter description'
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
          }}
        ></input>
        {errors.email && <span className="text-red-500">{errors.email}</span>}
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
      <div className='flex flex-col gap-0'>
        <label htmlFor='role'>Select your role</label>
        <select
          className='border-2 w-7/12 -mt-2'
          name='role'
          type='drpdown'
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
        >
        <option value="cutomer">customer</option>
        <option value="owner">owner</option>
        </select>
        {errors.password && <span className="text-red-500">{errors.password}</span>}
      </div>
      
      <div>
        <button className='bg-[#fe424d] text-white w-[80px] rounded-sm mt-2 p-1'>Register</button>
      </div>
      </form>
      <Link to='/login'>Already registered</Link>
      </div>
  )
}

export default SignUpForm