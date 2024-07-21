import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa6";
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <div className='flex flex-col flex-wrap gap-2 bg-[#ebebeb] p-4'>
        <div className='flex w-full gap-4 justify-center align-center'>
        <FaFacebook size={20} />
        <BsInstagram  size={20}  />
        <FaLinkedinIn  size={20}  />
        </div>
        <div className='flex justify-center items-center gap-1'>
        <FaRegCopyright size={15} /> Easy Stay Private Limited
        </div>
        <div className='flex item-center justify-center gap-4'>
          <Link to="/privacy" className='text-[#222222] no-underline hower:underline'>Privacy</Link>
           <Link to ="/terms" className='text-[#222222] no-underline hower:underline'>Terms</Link>
        </div>
    </div>
  )
}

export default Footer