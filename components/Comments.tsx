import React, { Dispatch, SetStateAction, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'
import userAuthStore from '../store/authStore'
import NoResult from './NoResult'
import { IUser } from '../types'

interface IProps {
  isCommenting: boolean,
  comment: string,
  SetComment: Dispatch<SetStateAction<string>>
  addComment: (e: React.FormEvent) => void,
  comments: IComment[]
}

interface IComment {
  comment: string,
  length?: number,
  _key: string,
  postedBy: { _ref: string, _id: string }

}


const Comments = ({ comment, SetComment, comments, addComment, isCommenting }: IProps) => {


  const { userProfile, allUsers } = userAuthStore()

  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-0 pb-[100px]'>
      <div className='overflow-scroll lg:h-[475px]'>
        {comments?.length ? (
          <div>{comments.map((item, index) => (
            <>
              {allUsers.map((user: IUser) => (
                user._id === (item.postedBy._id || item.postedBy._ref) && (
                  <div className='p-2 items-center' key={index}>
                    <Link href={`/profile/${user._id}`}>
                      <div className='flex items-center gap-3'>
                        <div className='w-8 h-8'>
                          <Image src={user.image} width={34} height={34} className='rounded-full' alt='user profile' layout='responsive' />
                        </div>
                        <div className='hidden xl:block'>
                          <p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
                            {user.userName.replaceAll(' ', '')}
                            <GoVerified className='text-blue-400' />
                          </p>
                          <p className='capitalize text-gray-400 text-xs'>
                            {user.userName}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <div>
                      <p>{item.comment}</p>
                    </div>
                  </div>
                )
              ))}
            </>
          ))}</div>
        ) : (<NoResult text='No comments yet! Be the first one to add a comment' />)

        }
      </div>

      {userProfile && (
        <div className='absolute bottom-0 left-0 pb-6 px-2 md:px-10'>
          <form onSubmit={addComment} className='flex gap-4'>
            <input
              value={comment}
              onChange={(e) => SetComment(e.target.value)}
              onClick={addComment}
              placeholder='Add a comment...'
              className='bg-primary px-6 py-4 text-md font-md border-2 w-[250px] md:w-[700px] lg:w-[450px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-200 flex-1 rounded-lg'
            />
            <button onClick={() => { }} className='text-md text-gray-500 hover:bg-primary px-5 rounded-lg'>
              {isCommenting ? 'Commenting...' : 'Comment'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Comments
