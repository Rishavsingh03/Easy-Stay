import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate ,useLocation} from 'react-router-dom';
import {serverUrl} from '../assets/assets'
import {useSelector,useDispatch} from  'react-redux'
function NewListingForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState({});
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const[isauthenticated,setAuthenticated]=useState(false);
  const locationState = useLocation();
  let isAuth=useSelector((state)=>state.auth.isloggedIn);
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};

    if (!title) errors.title = "Title is required";
    if (!description) errors.description = "Description is required";
    if (!image) errors.image = "Select an image";
    if (!price || isNaN(price) || price <= 0) errors.price = "Price must be a positive number";
    
    if (!country) errors.country = "Country is required";

    return errors;
  };
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token=localStorage.getItem("token");
        const response = await fetch(`${serverUrl}/checkAuth`, {method:"POST", headers: {
                        'Authorization': `Bearer ${token}`
                    },credentials: 'include' });
        if (response.ok) {
          setAuthenticated(true);
        } 
        else {
          toast.error("You need to login");
          navigate("/login", { state: { from: locationState.pathname } });

        }
      } catch (error) {
        toast.error(error.message);
        navigate("/login", { state: { from: locationState.pathname } });
      }
    };
    checkAuthStatus();
  }, [navigate]); 

  const submitHandler = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('price', price);
      formData.append('location', location);
      formData.append('country', country);
      const url =  `${serverUrl}/Listings`;
      try {
        let token=localStorage.getItem("token");
        const result = await fetch(url, {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${token}`
          },
          credentials:'include',
          body:formData,
        });
        let data=await result.json();
        if(!result.ok){
          throw new Error(result.statusText);
        }
        toast.success("Listing created Successfully");
        navigate("/Listings");
      } catch (err) {
        toast.error(err.message||"Error in sending data");
        toast.error("invalid data");
      }
    }
  };
  if (!isauthenticated) {
    return <div>Loading...</div>;
  }
  console.log("image",image);
  return (
    <div className='flex flex-1 flex-col justify-center items-center -mt-10'>
      <h3 className='w-9/12'>Create a new listing</h3>
      <form onSubmit={submitHandler} className='flex flex-col gap-1 w-9/12' encType='multipart/form-data'>
        <div className='flex flex-col gap-0'>
          <label htmlFor="title">Title</label>
          <input
            className='border-2 w-7/12 -mt-2'
            name='title'
            type='text'
            placeholder='Enter the Title'
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, title: "" }));
            }}
          />
          {errors.title && <span className="text-red-500">{errors.title}</span>}
        </div>

        <div className='flex flex-col gap-0'>
          <label htmlFor='description'>Description</label>
          <textarea
            className='border-2 w-7/12 -mt-2'
            name='description'
            placeholder='Enter description'
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
            }}
          ></textarea>
          {errors.description && <span className="text-red-500">{errors.description}</span>}
        </div>
        
        <div className='flex flex-col gap-0'>
          <label htmlFor='img'>Upload Image</label>
          <input
            id='img'
            className='border-2 w-7/12 -mt-2'
            name='image'
            type='file'
            onChange={(e) => {
              setImage(e.target.files[0]);
              setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
            }}
          />
          {errors.image && <span className="text-red-500">{errors.image}</span>}
        </div>

        <div className='flex flex-col gap-0'>
          <label htmlFor='price'>Price</label>
          <input
            className='border-2 w-7/12 -mt-2'
            name='price'
            type='number'
            placeholder='Enter the Price'
            onChange={(e) => {
              setPrice(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, price: "" }));
            }}
          />
          {errors.price && <span className="text-red-500">{errors.price}</span>}
        </div>

        <div className='flex flex-col gap-0'>
          <label htmlFor='country'>Country</label>
          <input
            className='border-2 w-7/12 -mt-2'
            name='country'
            type='text'
            placeholder='Enter the country'
            onChange={(e) => {
              setCountry(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, country: "" }));
            }}
          />
          {errors.country && <span className="text-red-500">{errors.country}</span>}
        </div>

        <div className='flex flex-col gap-0'>
          <label htmlFor='location'>Location</label>
          <input
            className='border-2 w-7/12 -mt-2'
            name='location'
            type='text'
            placeholder='Enter the location'
            onChange={(e) => {
              setLocation(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, location: "" }));
            }}
          />
          {errors.location && <span className="text-red-500">{errors.location}</span>}
        </div>
        <button className='bg-[#fe424d] text-white w-[80px] rounded-sm mt-2 p-1'>Add</button>
      </form>
    </div>
  );
}

export default NewListingForm;
