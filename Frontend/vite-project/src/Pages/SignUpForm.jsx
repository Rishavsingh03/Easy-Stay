import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

function SignUpForm() {
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
        if (!password) errors.password = "Password a valid URL";
    
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
          const url = "http://localhost:8080/signup";
          try {
            const result = await fetch(url, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newUser),
            });
            const data=await result.json();
            console.log(data);
            console.log("result",result);
            if(!result.ok){
              throw new Error(`${data.message}`);
            }
            toast.success("User Registered  Successfully");
            navigate("/login");
          } catch (err) {
            toast.error(err.message);
            navigate("/signup");
          }
        }
      };
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
          placeholder='Enter image URL/LINK'
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