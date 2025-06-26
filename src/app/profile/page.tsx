'use client';
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const ProfilePage = () => {

    const router=useRouter()
    const [data,SetData]=useState("nothing")

    const getUserDetails= async()=>{
       try {
        const response= await axios.post('/api/users/profile')
        console.log(response.data)

        console.log(response.data.data._id)
 
        SetData(response.data.data._id)
       } catch (error:any) {
        console.log(error.message)
        toast.error(error.message)
        
       }
    }

    const logout=async()=>{

        try {
            await axios.get('/api/users/logout')
            toast.success("Logout Success")
            router.push("/login")
            
        } catch (error:any) {

            console.log(error.message)
            toast.error(error.message)
            
        }

    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <hr/>

      <h2>
        {
            data==="nothing"? "No data to display":<Link href={`/profile/${data}`}> {data}</Link>
            
        }
        <hr/>
            <button className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={logout}>Logout</button>
            <button className='bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={getUserDetails}>Get user Details</button>
      </h2>
    </div>
  )
}

export default ProfilePage
