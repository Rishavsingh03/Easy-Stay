import React from 'react'
import { useState,useEffect} from 'react';
import {useNavigate} from  'react-router-dom'
import Pcards from '../components/Pcards';
import toast from 'react-hot-toast';
import {serverUrl} from '../assets/assets'
import {useSelector,useDispatch} from  'react-redux'
import {login,logout} from '../store/index'
function Listing() {
    const dispatch=useDispatch();
    let isAuth=useSelector((state)=>state.auth.isloggedIn);
    let token=useSelector((state)=>state.auth.token);
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();

    const showListing=async() =>{
        const url=`${serverUrl}/listings`;
      try{
          setLoading(true);
          let result=await fetch(url,{
            method:"GET",
            headers: {
            "Content-Type": "application/json",
          },
          });

          if(!result.ok){
            throw new Error(result.statusText);
          }
          const finalData=await result.json();
          setData(finalData);
          setLoading(false);
      }
      catch(err){
          toast.error(err.message||"Unable to fetch data");
      }
    }
    useEffect(()=>{
        if(localStorage.getItem("token")){
         dispatch(login(localStorage.getItem("token")));
        }
        showListing();
    },[])
    if(loading){
        return (
            <h1> Loading Data</h1>
        )
    }
    return (
    <div>
    {
        loading?"<h1>Loading DATA</h1>":
        <div className='flex flex-wrap justify-center sm:gap-3 overflow-x-hidden'>
        {
        data.map((d)=>{
            return(
            <Pcards key={d._id} {...d}/>
            )
        })
        }
        </div>
      
    }
    </div>
  )
}

export default Listing