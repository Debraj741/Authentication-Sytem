'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function VerifyEmailPage() {

  // const router = useRouter()     

    // Grab token & keep it first

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    // Send token when user click on verify button
    const verifyUserEmail = async()=>{
      try {
        await axios.post("/api/users/verifyemail",{token})
        setVerified(true)
      } catch (error:any) {
        setError(true)
        console.log("Error ageya vai.."); 
      }
    }

    // How to take token from url (Url format => "http://localhost:3000/verifyemail?token=hfewhudc535" )

    useEffect(() => {
      // window.loaction => url
      const urlToken = window.location.search.split("=")[1]
      setToken(urlToken || "")

      /* 

      // Next Js Approach => RECOMMANDED

      const {query} = router
      const urlToken = query.token

      */
    }, [])
       


  return (
    <div className='flex flex-col gap-3 justify-center items-center py-2 min-h-screen'>

<h1 className='font-semibold text-3xl text-orange-600'>Verify Email..</h1>
      
      <button onClick={verifyUserEmail} className='bg-gray-700 px-4 py-1 rounded-full font-bold mt-3 hover:bg-gray-800 transition-all hover:cursor-pointer'>
        Click to VeriFy
      </button>

      {verified && (
        <div>
          <h2 className='font-semibold text-xl text-blue-500'>Verification SuccessFull</h2>
          <Link href={"/login"} className='bg-gray-700 px-4 py-1 rounded-full font-bold mt-3 hover:bg-gray-800 transition-all hover:cursor-pointer'>Login Now</Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className='font-semibold text-xl text-red-500'>Error Occured</h2>
        </div>
      )}

    </div>
  )
}

