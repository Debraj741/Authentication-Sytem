'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignUpPage() {

  const router = useRouter()

  // Form state
  const [user, setUser] = useState({
    username: "",
    email : "",
    password: ""

  })

  // Disable button till all field is not fill
  const [buttonDisabled, setButtonDisabled] = useState(false)

  // Loading time show
  const [loading, setLoading] = useState(false)

  // Send all data when click on Sign Up Button
  const onSignup = async()=>{
    try {
      setLoading(true)
      setButtonDisabled(true)
      // Send data to backend
      const response = await axios.post("/api/users/signup",user)
      console.log("SignUp Success!!",response.data);
      
      // Navigate to Login Page
      router.push("/login")

    } catch (error:any) {
      console.log("SIGN UP Failed!!");
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false)
    }
    else{
      setButtonDisabled(true)
    }
  },[user])

  return (
    <div className='flex flex-col gap-3 justify-center items-center py-2 min-h-screen'>
      <h1 className='font-semibold text-2xl text-green-500'>{loading?"Processing":"Sign Up"}</h1>
      <hr />

      <input
      className='rounded-lg p-2 text-black font-semibold'
      id='username'
      value={user.username}
      onChange={(e)=>{setUser({...user,username:e.target.value})}}
      placeholder='Enter Username..'
      type="text" />

      <input
      className='rounded-lg p-2 text-black font-semibold'
      id='email'
      value={user.email}
      onChange={(e)=>{setUser({...user,email:e.target.value})}}
      placeholder='Enter Email..'
      type="text" />

      <input
      className='rounded-lg p-2 text-black font-semibold'
      id='password'
      value={user.password}
      onChange={(e)=>{setUser({...user,password:e.target.value})}}
      placeholder='Enter Password..'
      type="text" />

      <button onClick={onSignup} className='bg-gray-700 px-4 py-1 rounded-full font-bold mt-3 hover:bg-gray-800 transition-all hover:cursor-pointer'>
        {buttonDisabled?"No Sign Up":"Sign Up"}
      </button>

      <h2>OR</h2>

      <Link href={"/login"} className='bg-gray-700 px-4 py-1 rounded-full font-bold hover:bg-gray-800 transition-all hover:cursor-pointer'>Login Now</Link>
    </div>
  )
}

