import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {AiOutlineLogout} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import {IoMdAdd} from 'react-icons/io'
import Logo from '../utils/ishare-logo.png'
import {GoogleLogin,googleLogout} from '@react-oauth/google'
import {createOrGetUser} from '../utils/index'
import userAuthStore from '../store/authStore'

function Navbar() {
  const user = false
  const {userProfile, addUser, removeUser} = userAuthStore()
  return (
    <div className='w-full flex justify-between items-center border-b-2 shadow-md border-gray-200 py-2 px-4'>
      <Link href='./'>
        <div className='w-[120px] md:w-[140px]'>
            <Image
                className='cursor-pointer'
                src={Logo}
                alt='iShare'
                layout='responsive'
            />
        </div>
      </Link>
      <div>Search</div>
      <div>
        {userProfile ? 
        (<div className='flex gap-5 md:gap-10'>
            <Link href='/upload'>
              <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2 hover:bg-gray-200'>
                <IoMdAdd className='text-xl ' /> {``}
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            {userProfile.image && ( 
              <Link href='/'>
                        <>
                            <Image 
                            width={40} 
                            height={40} 
                            className='rounded-full cursor-pointer' 
                            src={userProfile.image} 
                            alt='profile-photo' 
                             />
                        </>
                </Link>)}
            <button type='button'
            className='px-2 border-b-4 shadow-md rounded-full active:border-b-2 active:shadow-hidden'
            onClick={()=>{
              googleLogout()
              removeUser()
            }}
            >
              <AiOutlineLogout color='red' fontSize={25}/>
            </button>
          </div>)
        : (<GoogleLogin  onSuccess={(response)=>createOrGetUser(response,addUser)} onError={()=>console.log('Error')} />)}
      </div>
    </div>
  )
}
export default Navbar

