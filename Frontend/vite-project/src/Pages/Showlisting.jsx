import React,{useEffect,useState} from 'react'  
import toast from 'react-hot-toast';
import {useNavigate } from 'react-router-dom';

function Showlisting() {
    const id=location.pathname.split("/").at(-1);
    const[loading,setLoading]=useState(false);
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    const[image,setImage]=useState({});
    const[price,setPrice]=useState();
    const[loc,setLocation]=useState("");
    const[country,setCountry]=useState("");
    const[rating,setRating]=useState(0);
    const[comment,setComment]=useState("");
    const[reviews,setReviews]=useState([]);
    const navigate=useNavigate();
    const getData=async ()=>{
      try{
          const url=`http://localhost:8080/listings/${id}/edit`;
          setLoading(true);
          const result=await fetch(url);
          const finalData=await result.json();
          if(!result.ok){
            toast.error("Listing does not exists");
            navigate("/listings");
          }
          setTitle(finalData.title);
          setDescription(finalData.description);
          setImage(finalData.image.url);
          setCountry(finalData.country);
          setLocation(finalData.location);
          setPrice(finalData.price);
          setReviews(finalData.reviews);
          setLoading(false);
      }
      catch(err){
          console.log(err);
      }
      
    }
    const handleEdit=()=>{
      navigate(`/Listings/${id}/edit`);
    }
    const handleDelete=async()=>{
      const url=`http://localhost:8080/Listings/${id}`;
      try{
        const result=await fetch(url,{
          method:"DELETE",      
            headers: {
                    'Content-Type': 'application/json',
            },
        });
        setLoading(true);
        toast.success("Listing Deleted Successfully",{
          style:{
            color:"red",
          }
        })
        navigate("/Listings");
      }
      catch(err){
        console.log("Error in deleting")
      }
    }

    const formSunmitHandler=async(e)=>{
      e.preventDefault();
      const review={comment,rating};
      try{
        const url=`http://localhost:8080/listings/${id}/review`
        const result= await fetch(url,{
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(review),
        })
        if(result.ok){
          toast.success("Review Added");
          getData();
        }
      }
      catch(e){
        console.log("Error in sending review");
      }
    }
    const deleteReviewHandler=async(rid)=>{
      let url=`http://localhost:8080/listings/${id}/review/${rid}`;
      try{
        let result=await fetch(url,{
          method:"DELETE",
          headers: {
                    'Content-Type': 'application/json',
            },
        });
       
        toast.success("Review Deleted",{
          style:{
            color:"red",
          }
        });
        getData();
      }
      catch(e){
        console.log("can not delete review");
      }
    }
  useEffect(()=>{
    getData();
  },[]);
  if(loading){
    return (
      <h1>Loading Data</h1>
    )
  }
  console.log(reviews);
  return (
    <div className='flex flex-1 flex-col justify-center items-center  mb-2'>
      <h3 className='w-7/12 sm:w-4/12 '>{title}</h3>
      <div className='flex flex-col w-7/12 sm:w-4/12'>
        <div className='w-full'>
          <img src={image} className='h-[230px] w-full object-cover rounded-md'></img>
        </div>
        <div>
          <p className='mb-0'>{description}</p>
          <p className='mb-0'>&#8377;{price}</p>
          <p className='mb-0'>{loc}</p>
          <p className='mb-0'>{country}</p>
        </div>
        <div className='flex gap-8 mt-2'>
          <button className='p-2 w-24 bg-[#fe424d] text-white hover:opacity-85 rounded-lg' onClick={handleEdit}>Edit</button>
          <button  className='p-2 w-24 bg-[#222222] text-white hover:opacity-85 rounded-lg' onClick={handleDelete}>Delete</button>
        </div>
        <div>
          <hr/>
           <label htmlFor='rating' className='mr-3 font-serif'>Rating</label><br/>
           <input name='rating' className='cursor-pointer w-full' type='range' min={1} max={5} defaultValue={1} onChange={(e)=>{
            setRating(e.target.value);
           }}/>
           <form onSubmit={formSunmitHandler}>
            <label htmlFor='comment' className='place-content-start'>Comments</label><br/>
            <textarea name='comment' className='border-2 w-full' rows={4} placeholder='Write a review' onChange={(e)=>{
              setComment(e.target.value);
            }} required></textarea><br/>
            <button className='border-2 px-2 rounded-md hover:bg-[#fe424d] hover:text-white mt-2'>Submit</button>
           </form>
        </div>
        <div>
          <hr/>
          <h3> All reviews</h3>
           <div className='flex flex-wrap gap-3'>
            {
            reviews.map((review,index)=>{
              return(
                <div className='border-2 w-5/12 ' key={index}>
                <h4 className='m-1'>John Rude</h4>
                <p className='m-1'>{review.comment} </p>
                <p className='m-1'>{review.rating} star</p>
                <button onClick={()=>{
                  deleteReviewHandler(review._id);
                }} className='px-2 border-2 rounded-md w-1/2 m-1  hover:bg-[#fe424d] hover:text-white '>Delete</button>
                </div>
              )
            })
          }

           </div>
          
        </div>
      </div>
    </div>
  )
}

export default Showlisting