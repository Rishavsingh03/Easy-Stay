import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate ,useLocation} from 'react-router-dom';
import {serverUrl} from '../assets/assets'
function EditListForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [loc, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const id = location.pathname.split("/").at(-2);
  const locationState = useLocation();

  const getInitialData = async () => {
    try {
      const url = `${serverUrl}/listings/${id}/edit`;
      setLoading(true);
      const token=localStorage.getItem("token");
      const result = await fetch(url,{
        credentials:"include",
        headers: {
            'Authorization': `Bearer ${token}`
        }
      });
      const finalData = await result.json();
      setTitle(finalData.title);
      setDescription(finalData.description);
      setImage(finalData.image.url);
      setCountry(finalData.country);
      setLocation(finalData.location);
      setPrice(finalData.price);
      setLoading(false);
    } catch (err) {
      toast.error("Login Please");
      navigate("/login", { state: { from: locationState.pathname }});
      console.log(err);
    }
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const validate = () => {
    const errors = {};

    if (!title) errors.title = "Title is required";
    if (!description) errors.description = "Description is required";
    if (!price || isNaN(price) || price <= 0) errors.price = "Price must be a positive number";
    if (!loc) errors.location = "Location is required";
    if (!country) errors.country = "Country is required";

    return errors;
  };

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
      formData.append('location', loc);
      formData.append('country', country);
      const url = `${serverUrl}/Listings/${id}`;
      try {
        const token=localStorage.getItem("token");
        const result = await fetch(url, {
          method: "PUT",
          headers: {
            'Authorization': `Bearer ${token}`
          },
          credentials:"include",
          body: formData,
        });
        let data=await result.json();
        if(!result.ok){
          console.log("error",data);
          throw new Error(data.message);
        }
        toast.success("Listing Edited SuccessFully");
        navigate(`/Listings/${id}`);
      } catch (err) {
          console.log(err);
          toast.error(err.message || "Unable to edit");
          navigate(`/Listings/${id}`);
          // toast.error("Unable to edit ,check data");
      }
    }
  };  

  if (loading) {
    return <div>Loading The form..</div>;
  }

  return (
    <div className='flex  flex-col justify-center items-center -mt-6 mb-3'>
      <h3 className='w-9/12'>Edit a listing</h3>
      <form onSubmit={submitHandler} className='flex flex-col gap-1 w-9/12' encType='multipart/form-data'>
        <div className='flex flex-col gap-0'>
          <label htmlFor="title">Title</label>
          <input
            className='border-2 w-7/12 -mt-2'
            name='title'
            type='text'
            value={title}
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
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
            }}
          ></textarea>
          {errors.description && <span className="text-red-500">{errors.description}</span>}
        </div>
        <div>
           <p>Original Image</p>
          <img  className='h-40 w-40' src={`${image}`}></img>
        </div>

        <div className='flex flex-col gap-0'>
          <label htmlFor='img'>Upload New  Image</label>
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
            value={price}
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
            value={country}
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
            value={loc}
            onChange={(e) => {
              setLocation(e.target.value);
              setErrors((prevErrors) => ({ ...prevErrors, location: "" }));
            }}
          />
          {errors.location && <span className="text-red-500">{errors.location}</span>}
        </div>
        <button className='bg-[#fe424d] text-white w-[80px] rounded-sm mt-2 p-1'>Edit</button>
      </form>
    </div>
  );
}

export default EditListForm;
