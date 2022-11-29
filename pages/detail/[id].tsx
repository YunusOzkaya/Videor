import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import { GiCancel } from 'react-icons/gi'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import axios from 'axios'
import { BASE_URL } from '../../utils'
import { Video } from '../../types'
import useAuthStore from '../../store/authStore'
import LikeButton from '../../components/LikeButton'
import Comments from '../../components/Comments'


interface IProps {
  postDetails: Video
}

const Detail = ({ postDetails }: IProps) => {

  const [post, SetPost] = useState(postDetails)
  const [isPlaying, SetIsPlaying] = useState(false)
  const [isMuted, SetIsMuted] = useState(false)
  const [comment, SetComment] = useState('')
  const [isCommenting, SetIsCommenting] = useState(false)

  const router = useRouter()

  const videoRef = useRef<HTMLVideoElement>(null)

  const { userProfile }: any = useAuthStore()

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause()
      SetIsPlaying(false)
    }
    else {
      videoRef?.current?.play()
      SetIsPlaying(true)
    }
  }
  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isMuted
    }
  }, [post, isMuted])

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const res = await axios.put(`${BASE_URL}/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like
      })
      router.reload()
      SetPost({ ...post, likes: res.data.length })
    }

  }

  const addComment = async (e: { preventDefault: () => void}) => {
    e.preventDefault()
    if (userProfile && comment) {
      SetIsCommenting(true)

      const {data} = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
        userId: userProfile._id,
        comment
      })
      SetPost({...post, comments:data.comments})
      SetComment('')
      SetIsCommenting(false)
    }
  }

  

  if (!post) return null

  return (
    <div className='flex h-full w-full absolute left-0 top-0 bg-white flex-wrapped lg:flex-nowrap'>
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-[#1b1b1b] bg-opacity-40'>
        <div className=' absolute top-6 left-2 lg:left-6 flex gap-6 z-50'>
          <p className='cursor-pointer' onClick={() => router.back()}>
            <GiCancel className='text-white text-[35px]' />
          </p>
        </div>
        <div className='relative'>
          <div className='lg:h-[100vh] h-[60vh]'>
            <video
              ref={videoRef}
              src={post.video.asset.url}
              className='h-full cursor-pointer shadow-md'
              loop
              onClick={onVideoClick}
            >
            </video>
          </div>
          <div className='absolute top-[45%] left-[45%]'>
            {!isPlaying && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className='text-white text-6xl lg:text-8xl ' />
              </button>
            )}
          </div>
        </div>
        <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10'>
          {isMuted ?
            <button onClick={() => SetIsMuted(false)}><HiVolumeOff className='text-white text-2xl lg:text-4xl' /></button> :
            <button onClick={() => SetIsMuted(true)}><HiVolumeUp className='text-white text-2xl lg:text-4xl' /></button>
          }
        </div>
      </div>
      <div className='relative w-[1000px] md:w-[900px] lg:[700px]'>
        <div className='lg:mt-20 mt-10 '>
          <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
            <div className='ml-4 md:w-20 md:h-20 w-16 h-16'>
              <Link href={'/'}>
                <>
                  <Image width={62} height={62} className='rounded-full' src={post.postedBy.image} alt='profile-photo' layout='responsive' />
                </>
              </Link>
            </div>
            <div>
              <Link href={`${BASE_URL}/`}>
                <div className='mt-3 flex flex-col gap-2'>
                  <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                    {post.postedBy.userName}
                    <GoVerified className='text-blue-400 text-md' />
                  </p>
                  <p className='capitalize font-medim text-xs text-gray-500 hidden md:block'>{post.postedBy.userName}</p>
                </div>
              </Link>
            </div>
          </div>
          <p className='mt-10 px-10 text-lg font-semibold text-gray-600'>{post.caption}</p>
          <div className='mt-10 px-10'>
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)} />
            )}
          </div>
          <Comments
          comment={comment}
          SetComment={SetComment}
          addComment={addComment}
          comments={post.comments}
          isCommenting={isCommenting}
          />
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`)
  return {
    props: {
      postDetails: data
    }
  }
}

export default Detail