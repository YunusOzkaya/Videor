import React, { useEffect, useState } from 'react'
import { MdFavorite } from 'react-icons/md'
import userAuthStore from '../store/authStore'


interface IProps{
    handleLike:()=>void
    handleDislike:()=>void
    likes : any[]
}

const LikeButton = ({handleLike,handleDislike,likes}:IProps) => {
    const [liked,SetLiked]=useState(false)
    const {userProfile}:any=userAuthStore()
    const filterLike=likes?.filter((item)=>item._ref===userProfile?._id)

    useEffect(()=>{
        if(filterLike?.length>0){
            SetLiked(true)
        }
        else{
            SetLiked(false)
        }
         
    },[filterLike, likes])
    return (
    <div className='flex gap-6'>
      <div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
        {liked ? (
            <div className='bg-primary rounded-full p-2 md:p-4 text-[#F06553]' onClick={handleDislike}>
                <MdFavorite className='text-lg md:text-2xl '/>
            </div>
        ) : (
            <div className='bg-primary rounded-full p-2 md:p-4 ' onClick={handleLike}>
                <MdFavorite className='text-lg md:text-2xl '/>
            </div>
        )}
        <p className='ml-[1px] text-md font-semibold'> {likes?.length || 0} </p>
      </div>
    </div>
  )
}

export default LikeButton
