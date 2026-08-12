
import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const color = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState('')
  const [editResumeId, setEditResumeId] = useState('')
  const navigate = useNavigate()

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData)
  }

  const createResume = async (e) => {
    e.preventDefault()
    setShowCreateResume(false)
    navigate(`/app/builder/res123`)
  }

  const uploadResume = async (e) => {
    e.preventDefault()
    setShowUploadResume(false)
    navigate(`/app/builder/res123`)
  }

  const editTitle =async(event)=>{
    event.preventDefault()
  }

   const deleteResume =async(resumeId)=>{
    const confirm=window.confirm('Are you sure you want to delete this resume?')
    if(confirm){
      setAllResumes(prev=>prev.filter(resume=>resume._id !== resumeId))
    }
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-black text-white">
          <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-400 to-slate-600 bg-clip-text text-transparent sm:hidden">
            Welcome, Jhon Doe
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button onClick={() => setShowCreateResume(true)} className="w-full sm:w-36 h-48 bg-black flex flex-col items-center justify-center rounded-lg gap-2 text-white border border-dashed border-slate-600 group hover:border-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <PlusIcon className="size-11 p-2.5 bg-gradient-to-br from-green-600 to-green-800 text-white rounded-full transition-all duration-300 group-hover:scale-110" />

            <p className="text-sm group-hover:text-green-500 transition-all duration-300">
              Create New Resume
            </p>
          </button>

          <button onClick={()=>setShowUploadResume(true)} className="w-full sm:w-36 h-48 bg-black flex flex-col items-center justify-center rounded-lg gap-2 text-white border border-dashed border-slate-600 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <UploadCloudIcon className="size-11 p-2.5 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-full transition-all duration-300 group-hover:scale-110" />

            <p className="text-sm group-hover:text-purple-500 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-700 my-6 w-full sm:w-[300px]" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = color[index % color.length];
            return (
              <button key={index} onClick={()=>navigate(`/app/builder/${resume._id}`)} className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer" style={{ background: `linear-gradient(135deg, ${baseColor} 10, ${baseColor} 40)`, borderColor: baseColor + '40' }}>
                <FilePenLineIcon className="size-7 group-hover-scale-105 transition-all" style={{ color: baseColor }} />
                <p className="text-sm group-hover:scale-105 transition-all px-2 text-center" style={{ color: baseColor }}>
                  {resume.title}
                </p>
                <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center' style={{ color: baseColor + '90' }}>
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div onClick={e=> e.stopPropagation()} className="absolute top-1 right-1 group-hover:flex items-center hidden">
                  <TrashIcon className='size-7 p-1.5 hover:bg-white/50 rounded text-white transition-colors' onClick={()=>deleteResume(resume._id)} />
                  <PencilIcon className='size-7 p-1.5 hover:bg-white/50 rounded text-white transition-colors' onClick={()=>{setEditResumeId(resume._id); setTitle(resume.title)}} />
                </div>
              </button>
            );
          })}
        </div>



        {/* show create resume */}



        {
          showCreateResume && (
            <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 flex items-center justify-center z-10">
              <div onClick={e => e.stopPropagation()} className="relative bg-black text-white border shadow-md rounded-lg w-full max-w-sm p-6">
                <h2 className='text-xl font-bold mb-4'>Create a Resume</h2>
                <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter Resume Title" className="w-full px-4 py-2 focus:border-green-600 ring-green-600 mb-4 border border-white bg-black" required />
                <button type="submit" className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Create Resume</button>
                <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={() => { setShowCreateResume(false); setTitle('') }} />
              </div>

            </form>
          )
        }


        {/* show Upload Resume */}



        {
          showUploadResume && (
            <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 flex items-center justify-center z-10">
              <div onClick={e => e.stopPropagation()} className="relative bg-black text-white border shadow-md rounded-lg w-full max-w-sm p-6">
                <h2 className='text-xl font-bold mb-4'>Upload a Resume</h2>
                <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Upload Resume" className="w-full px-4 py-2 focus:border-green-600 ring-green-600 mb-4 border border-white bg-black" required />
                <div>
                  <label htmlFor="resume-upload" className="block text-sm text-slate-700">
                    select a file to upload
                    <div className="flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors">
                      {
                        resume ? (
                          <p className='text-green-700'>{resume.name}</p>
                        ) : (
                          <>
                            <UploadCloud className='size-14 stroke-1' />
                            <p className='text-sm'>Drag and drop your resume here or click to select a file</p>
                          </>
                        )
                      }
                    </div>
                  </label>
                  <input type='file' id='resume-upload' accept='.pdf' hidden onChange={(e)=>setResume(e.target.files[0])}/>
                </div>
                <button type="submit" className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Upload Resume</button>
                <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={() => { setShowUploadResume(false); setTitle('') }} />
              </div>
            </form>
          )
        }


         {
          editResumeId && (
            <form onSubmit={editTitle} onClick={() => setEditResumeId('')} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 flex items-center justify-center z-10">
              <div onClick={e => e.stopPropagation()} className="relative bg-black text-white border shadow-md rounded-lg w-full max-w-sm p-6">
                <h2 className='text-xl font-bold mb-4'>Edit Resume Title</h2>
                <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter Resume Title" className="w-full px-4 py-2 focus:border-green-600 ring-green-600 mb-4 border border-white bg-black" required />
                <button type="submit" className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Update</button>
                <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={() => { setEditResumeId(''); setTitle('') }} />
              </div>

            </form>
          )
        }
      </div>
    </div>

  )
}

export default Dashboard