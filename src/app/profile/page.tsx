'use client'

import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function myProfile() {
    const router = useRouter()
    const [data, setData] = useState("Nothing")

    const getUserData = async()=>{
      try {
        const res = await axios.post("api/users/aboutme")
        console.log(res.data.data._id);
        
        setData(res.data.data._id)

      } catch (error:any) {
        console.log(error.message);
      }
    }

    const logOut = async()=>{
      try {
        
        await axios.get("/api/users/logout")
        toast.success("Log Out Success!!")
        router.push("/login")

      } catch (error:any) {
        console.log(error.message);
        toast.error(error.message)
      }
    }

  return (
    <div className='flex flex-col gap-3 justify-center items-center py-2 min-h-screen'>
      
      <h1 className='font-semibold text-2xl text-pink-600'>Profile Page</h1>
      <hr />

      <h1>{data === "Nothing"?"No Data to Display": <Link className='text-blue-800' href={`/profile/${data}`}>{data}</Link>}</h1>

      <button onClick={logOut} className='bg-gray-700 px-4 py-1 rounded-full font-bold mt-3 hover:bg-gray-800 transition-all hover:cursor-pointer'>
        Log Out
      </button>

      <button onClick={getUserData} className='bg-blue-700 px-4 py-1 rounded-full font-bold mt-3 hover:bg-blue-800 transition-all hover:cursor-pointer'>
        Get My Data
      </button>

    </div>
  )
}

