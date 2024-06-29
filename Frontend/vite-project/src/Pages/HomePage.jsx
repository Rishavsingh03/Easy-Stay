import React from 'react'
import { useEffect,useState } from 'react'
import toast from 'react-hot-toast';

function HomePage() {
    const [data,setData] =useState(null);

    const getHomeDate=async ()=>{
      const url="http://localhost:8080/Listings";
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
      getHomeDate();
    },[])
  return (
    <div>{data}</div>
  )
}

export default HomePage