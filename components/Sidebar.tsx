import React, { useState } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {AiOutlineMenu,AiFillHome} from 'react-icons/ai'
import {NextPage} from 'next'
import {ImCancelCircle} from 'react-icons/im'
import Discover from './Discover'
import SuggestedAccs from './SuggestedAccs'
import Footer from './Footer'


function Sidebar() {
  const [showSidebar, SetShowSidebar] = useState(true)
  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F06553] rounded'
  const userProfile= false
  return (
   <div>
    <div className='block xl:hidden m-2 ml-3 mt-3 text-xl ' onClick={()=>SetShowSidebar((prev)=> !prev)}>
      {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
    </div>
    {showSidebar && (
      <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3'>
          <div className='xl:border-b-2 border-gray-200 xl:pb-3'>
            <Link href='/'>
              <div className={normalLink}>
                <p className='text-2xl'><AiFillHome /></p>
                <span className='hidden xl:block text-xl'>You Might Like</span>
              </div>
            </Link>
          </div>
          {!userProfile && (
          <div className='px-2 py-4 hidden xl:block'>
            <p className='text-gray-400'> Log In to Get Full Experience! </p>
          </div>
          )}
          <Discover />
          <SuggestedAccs />
          <Footer />
      </div>
    )}
   </div>
  )
}

export default Sidebar
