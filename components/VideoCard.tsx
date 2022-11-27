import { NextPage } from 'next'
import React,{useState,useEffect,useRef} from 'react'
import { Video } from '../types'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'


interface IProps {
    post: Video
}


const VideoCard: NextPage<IProps> = ({ post }) => {
    const [isHover, SetIsHover]=useState(false)
    const [isPlaying, SetIsPlaying]=useState(false)
    const [isMuted, SetIsMuted]=useState(false)
    
    const videoRef = useRef<HTMLVideoElement>(null)

    const videoPressed = () =>{
        if(isPlaying){
            videoRef?.current?.pause()
            SetIsPlaying(false)
        }
        else{
            videoRef?.current?.play()
            SetIsPlaying(true)
        }
    }
    useEffect(()=>{
        if(videoRef?.current){
        videoRef.current.muted = isMuted
        }
    },[isMuted])
    return (
        <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
            <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
                <div className='md:w-16 md:h-16 w-10 h-10'>
                    <Link href={'/'}>
                        <>
                            <Image width={62} height={62} className='rounded-full' src={post.postedBy.image} alt='profile-photo' layout='responsive' />
                        </>
                    </Link>
                </div>
                <div>
                    <Link href={'/'}>
                        <div className='flex items-center gap-2'>
                            <p className='flex gap-2 items-center md:text-md font-bold text-primary'>
                                {post.postedBy.userName}
                                <GoVerified className='text-blue-400 text-md' />
                            </p>
                            <p className='capitalize font-medim text-xs text-gray-500 hidden md:block'>{post.postedBy.userName}</p>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='lg:m-12 flex gap-4 relative'>
                <div onMouseEnter={()=>SetIsHover(true)} onMouseLeave={()=>SetIsHover(false)} className='rounded-3xl'>
                    <Link href={`/detail/${post._id}`}>
                        <video 
                            src={post.video.asset.url}
                            ref={videoRef}
                            loop 
                            className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900'>

                        </video>
                    </Link>
                    {isHover&&(
                        <div className='absolute bottom-6 cursor-pointer left-11 md:left-12 lg:left-0 gap-10 flex lg:justify-between w-[100px] md:w-[50px] p-3'>
                            {isPlaying ? 
                            <button onClick={videoPressed}><BsFillPauseFill className='text-[#1b1b1b] text-2xl lg:text-4xl'/></button> : 
                            <button onClick={videoPressed}><BsFillPlayFill className='text-[#1b1b1b] text-2xl lg:text-4xl'/></button>
                            }
                            {isMuted ? 
                            <button onClick={()=>SetIsMuted(false)}><HiVolumeOff className='text-[#1b1b1b] text-2xl lg:text-4xl'/></button> : 
                            <button onClick={()=>SetIsMuted(true)}><HiVolumeUp className='text-[#1b1b1b] text-2xl lg:text-4xl'/></button>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoCard
