import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {AiOutlineLogout} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import {IoMdAdd} from 'react-icons/io'
import Logo from '../utils/ishare-logo.png'

function Navbar() {
  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4'>
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
    </div>
  )
}
export default Navbar

