import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'
import userAuthStore from '../store/authStore'
import { client } from '../utils/client'
import { SanityAssetDocument } from '@sanity/client'
import { topics } from '../utils/constants'
import { BASE_URL } from '../utils'

const Upload = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [videoAsset, setVideoAsset] = useState<SanityAssetDocument | undefined>();
  const [wrongFileType, setWrongFileType] = useState<Boolean>(false);
  const [caption, SetCaption] = useState('')
  const [category, SetCategory] = useState(topics?.[0].name)
  const [saving, SetSaving] = useState(false)

  const router = useRouter()

  const {userProfile}:{userProfile:any} = userAuthStore()

  const handlePost = async () => {
    if(caption&&videoAsset?._id&&category){
      SetSaving(true)

      const document = {
        _type:'post',
        caption,
        video:{
          _type:'file',
          asset:{
            _type:'reference',
            _ref : videoAsset?._id
          }
        },
        userId: userProfile?._id,
        postedBy:{
          _type:'postedBy',
          _ref:userProfile?._id
        },
        topic:category
      }
      await axios.post(`${BASE_URL}/api/post`,document)
      router.push('/')
    }
  }

  const uploadVideo = async (e: any) => {
    const selectedFile = e.target.files[0];
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    if (fileTypes.includes(selectedFile.type)) {
      setWrongFileType(false);
      setLoading(true);

      client.assets
        .upload('file', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((data) => {
          setVideoAsset(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setWrongFileType(true);
    }
  };

  return (
    <div className='flex w-full h-full absolute left-0 top-[83px] bg-white mb-10 pt-20 justify-center'>
      <div className='bg-white rounded-xl lg:h-[80vh] gap-6 flex flex-wrap justify-center items-center p-14 pt-6'>
        <div>
          <div>
            <p className='text-2xl text-[#1b1b1b] font-bold'>Upload Video</p>
            <p className='text:md text-gray-400 mt-1'>Post a Video</p>
          </div>
          <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[290px] h-[458px] p-10 cursor-pointer hover:border-[#F06553] hover:bg-gray-100'>
            {loading ? (
              <p>Uploading...</p>
            ) : (
              <div>
                {videoAsset ? (
                  <div>
                    <video
                      src={videoAsset.url}
                      loop
                      controls
                      className='rounded-xl h-[450] mt-16 bg-black'
                    >
                    </video>
                  </div>
                ) : (
                  <label className='cursor-pointer'>
                    <div className='flex flex-col items-center justify-center h-full'>
                      <div className='flex flex-col items-center justify-center'>
                        <p className='font-bold text-xl'>
                          <FaCloudUploadAlt className='text-blue-300 text-6xl'/>
                        </p>
                        <p className='text-l text-[#1b1b1b] mt-3 font-semibold'>
                          Select a video to upload
                        </p>
                        <p className='text-gray-400 text-center mt-5 text-sm leading-10'>
                        MP4 or WebM or ogg <br />
                        720x1280 resolution or higher <br />
                        Up to 10 minutes <br />
                        Less than 2 GB
                      </p>
                      <p className='bg-gradient-to-r from-red-300 to-blue-300 text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none'>
                        Select File
                      </p>
                      </div>
                    </div>
                    <input
                      type='file'
                      name='upload-video'
                      className='w-0 h-0'
                      onChange={uploadVideo}
                    />
                  </label>
                )}
              </div>
            )}
            {wrongFileType && (
              <p className='text-center text-xl font-semibold mt-4 w-[250]'>
                Please select a video file.
              </p>
            )}
          </div>
        </div>
          <div className='flex flex-col gap-3 pb-10 '>
              <label className='text-md text-[#1b1b1b] font-medium'>Caption</label>
              <input 
                type='text'
                value={caption}
                onChange={(e)=>{SetCaption(e.target.value)}}
                className='rounded outline-none text-md border-2 border-gray-200 p-2'
              />
              <label className='text-md text-[#1b1b1b] font-medium text'>Category</label>
              <select 
              onChange={(e)=>{SetCategory(e.target.value)}}
              className='outline-none border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer'
              >
                {topics.map((topic)=>(
                  <option key={topic.name} value={topic.name} className='outline-none capitalize bg-white text-gray-700 text-md p-2 hover:bg-slate-200'>
                    {topic.name}
                  </option>
                ))}
              </select>
              <div className='flex gap-6 mt-10'>
                  <button 
                    className='border-gray-300 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none'
                    type='button'
                    onClick={()=>{}}
                  >
                    Discard
                  </button>
                  <button 
                    className='bg-gradient-to-r from-pink-500 to-yellow-500 text-md text-white hover:shadow-xl hover:bg-[#a2a2a2] font-medium p-2 rounded w-28 lg:w-44 outline-none'
                    type='button'
                    onClick={handlePost}
                  >
                    Post
                  </button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Upload