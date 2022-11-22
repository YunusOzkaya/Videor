import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {AiOutlineLogout} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'
import {IoMdAdd} from 'react-icons/io'
import Logo from '../utils/logo.png'

function Sidebar() {
  return (
    <div>
      <Link href={'./'}>
        <div>
            <Image
                className='cursor-pointer'
                src={Logo}
            />
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
