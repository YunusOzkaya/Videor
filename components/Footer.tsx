import React from 'react'
import {footerList1,footerList2,footerList3} from '../utils/constants'

function Footer() {
  const List=({items, mt}:{items:string[], mt:boolean})=>(
    <div className={`flex flex-wrap gap-2 ${mt&& 'mt-5'}`}>
    {items.map((item)=>(
      <p key={item} className='text-gray-400 text-sm hover:underline cursor-point'>
        {item}
      </p>
    ))}
  </div>  
  )
  return (
    <div className='mt-6 hidden xl:block'>
      <List items={footerList1} mt={false}/>
      <List items={footerList2} mt/>
      <List items={footerList3} mt/>
      <p className='text-gray-400 text-sm italic mt-5'>2022 iShare by Nasuhan Yunus Özkaya </p>
    </div>
  )
}

export default Footer
