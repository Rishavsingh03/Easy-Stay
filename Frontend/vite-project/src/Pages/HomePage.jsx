import React from 'react'
import { useEffect,useState } from 'react'
import toast from 'react-hot-toast';
import { Link,useNavigate,useNavigation } from 'react-router-dom';
import {serverUrl} from '../assets/assets'
function HomePage() {
    const [data,setData] =useState(null);
    const navigate=useNavigate();
    const getHomeDate=async ()=>{
      const url=`${serverUrl}/Listings`;

      try{
          let result=await fetch(url,{
            method:"GET",
            headers: {
            "Content-Type": "application/json",
          },
          });

          console.log("result",result);
          const finalData=await result.json();
          console.log("data", finalData.data);
          setData(finalData.data);
      }
      catch(err){
          toast.error("Error in Loading Data");
      }
    }

    useEffect(()=>{
      navigate('/Listings');
      // getHomeDate();
    },[])
  return (
    <div>{data}</div>
  )
}

export default HomePage