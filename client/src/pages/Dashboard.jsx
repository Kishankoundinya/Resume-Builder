import { FilePenLineIcon, LoaderCircleIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import api from '../configs/api'

import pdfToText from 'react-pdftotext'

const Dashboard = () => {

  const { user, token } = useSelector(state => state.auth)

  const color = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false)
  const [showUploadResume, setShowUploadResume] = useState(false)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState('')
  const [editResumeId, setEditResumeId] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get('/api/users/resumes', { headers: { Authorization: token } })
      setAllResumes(data.resumes)
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
  }

  const createResume = async (e) => {
    try {
      e.preventDefault()
      const { data } = await api.post('/api/resumes/create', { title }, { headers: { Authorization: token } })
      setAllResumes([...allResumes, data.resume])
      setTitle('')
      setShowCreateResume(false)
      navigate(`/app/builder/${data.resume._id}`)

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)

    }
  }

  const uploadResume = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const resumeText = await pdfToText(resume)
      const { data } = await api.post('/api/ai/upload-resume', { title, resumeText }, { headers: { Authorization: token } })
      setTitle('')
      setResume(null)
      setShowUploadResume(false)
      navigate(`/app/builder/${data.resumeId}`)

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    }
    setIsLoading(false)

  }

  const editTitle = async (event) => {
   try {
     event.preventDefault()
      const { data } = await api.put(`/api/resumes/update`,{resumeId:editResumeId,resumeData:{title}}, { headers: { Authorization: token } })
      setAllResumes(allResumes.map(resume=>resume._id===editResumeId?{...resume,title}:resume))
      setTitle('')
      setEditResumeId('')
      toast.success(data.message)

   } catch (error) {
    toast.error(error?.response?.data?.message || error.message)
   }

  }

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this resume?')
      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, { headers: { Authorization: token } })
        setAllResumes(allResumes.filter(resume => resume._id !== resumeId))
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
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
            Welcome, {user?.name || 'User'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <button onClick={() => setShowCreateResume(true)} className="w-full h-48 bg-gradient-to-br from-black to-gray-900 flex flex-col items-center justify-center rounded-xl gap-3 text-white border-2 border-dashed border-slate-700 group hover:border-green-500 hover:from-green-950/30 hover:to-green-900/20 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] transition-all duration-500 cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/0 group-hover:from-green-500/5 group-hover:to-green-500/10 transition-all duration-500"></div>
            <PlusIcon className="size-12 p-2.5 bg-gradient-to-br from-green-500 to-emerald-700 text-white rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(34,197,94,0.4)]" />
            <p className="text-base font-medium group-hover:text-green-400 transition-all duration-300">
              Create New Resume
            </p>
            <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-all duration-300">Start from scratch</p>
          </button>

          <button onClick={() => setShowUploadResume(true)} className="w-full h-48 bg-gradient-to-br from-black to-gray-900 flex flex-col items-center justify-center rounded-xl gap-3 text-white border-2 border-dashed border-slate-700 group hover:border-purple-500 hover:from-purple-950/30 hover:to-purple-900/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-500 cursor-pointer relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-purple-500/10 transition-all duration-500"></div>
            <UploadCloudIcon className="size-12 p-2.5 bg-gradient-to-br from-purple-400 to-purple-600 text-white rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]" />
            <p className="text-base font-medium group-hover:text-purple-400 transition-all duration-300">
              Upload Existing
            </p>
            <p className="text-xs text-slate-500 group-hover:text-slate-400 transition-all duration-300">Import your PDF resume</p>
          </button>
        </div>

        <hr className="border-slate-700 my-6 w-full" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = color[index % color.length];
            return (
              <button key={index} onClick={() => navigate(`/app/builder/${resume._id}`)} className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer" style={{ background: `linear-gradient(135deg, ${baseColor} 10, ${baseColor} 40)`, borderColor: baseColor + '40' }}>
                <FilePenLineIcon className="size-7 group-hover-scale-105 transition-all" style={{ color: baseColor }} />
                <p className="text-sm group-hover:scale-105 transition-all px-2 text-center" style={{ color: baseColor }}>
                  {resume.title}
                </p>
                <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center' style={{ color: baseColor + '90' }}>
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div onClick={e => e.stopPropagation()} className="absolute top-1 right-1 group-hover:flex items-center hidden">
                  <TrashIcon className='size-7 p-1.5 hover:bg-white/50 rounded text-white transition-colors' onClick={() => deleteResume(resume._id)} />
                  <PencilIcon className='size-7 p-1.5 hover:bg-white/50 rounded text-white transition-colors' onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }} />
                </div>
              </button>
            );
          })}
        </div>

        {/* show create resume */}
        {
          showCreateResume && (
            <form onSubmit={createResume} onClick={() => setShowCreateResume(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
              <div onClick={e => e.stopPropagation()} className="relative bg-gradient-to-br from-gray-900 to-black border border-slate-700 shadow-2xl rounded-2xl w-full max-w-md p-8 transform transition-all duration-300 scale-100">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-t-2xl"></div>
                <h2 className='text-2xl font-bold mb-6 text-white'>Create a Resume</h2>
                <input 
                  onChange={(e) => setTitle(e.target.value)} 
                  value={title} 
                  type="text" 
                  placeholder="Enter Resume Title" 
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-700 bg-black/50 text-white placeholder-slate-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/30 focus:outline-none transition-all duration-300 mb-6" 
                  required 
                />
                <button type="submit" className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-green-500/20 hover:shadow-green-500/40">
                  Create Resume
                </button>
                <button 
                  type="button"
                  onClick={() => { setShowCreateResume(false); setTitle('') }} 
                  className="absolute top-4 right-4 text-slate-400 hover:text-white hover:rotate-90 transition-all duration-300"
                >
                  <XIcon className="size-6" />
                </button>
              </div>
            </form>
          )
        }

        {/* show Upload Resume */}
        {
          showUploadResume && (
            <form onSubmit={uploadResume} onClick={() => setShowUploadResume(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
              <div onClick={e => e.stopPropagation()} className="relative bg-gradient-to-br from-gray-900 to-black border border-slate-700 shadow-2xl rounded-2xl w-full max-w-md p-8 transform transition-all duration-300 scale-100">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-t-2xl"></div>
                <h2 className='text-2xl font-bold mb-6 text-white'>Upload a Resume</h2>
                <input 
                  onChange={(e) => setTitle(e.target.value)} 
                  value={title} 
                  type="text" 
                  placeholder="Enter Resume Title" 
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-700 bg-black/50 text-white placeholder-slate-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 focus:outline-none transition-all duration-300 mb-4" 
                  required 
                />
                <div>
                  <label htmlFor="resume-upload" className="block text-sm text-slate-400 mb-2">
                    Select a PDF file to upload
                  </label>
                  <div className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-700 rounded-xl p-6 py-8 hover:border-purple-500 hover:bg-purple-500/5 cursor-pointer transition-all duration-300 group">
                    <input 
                      type='file' 
                      id='resume-upload' 
                      accept='.pdf' 
                      hidden 
                      onChange={(e) => setResume(e.target.files[0])} 
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer w-full flex flex-col items-center gap-3">
                      {resume ? (
                        <div className="flex items-center gap-3 text-green-400">
                          <FilePenLineIcon className="size-8" />
                          <p className="text-sm font-medium">{resume.name}</p>
                        </div>
                      ) : (
                        <>
                          <UploadCloud className="size-16 stroke-1 text-slate-500 group-hover:text-purple-400 transition-all duration-300" />
                          <p className="text-sm text-slate-500 group-hover:text-purple-400 transition-all duration-300 text-center">
                            Drag and drop your resume here<br />
                            <span className="text-xs text-slate-600">or click to select a file</span>
                          </p>
                        </>
                      )}
                    </label>
                  </div>
                </div>
                <button 
                  disabled={isLoading} 
                  type="submit" 
                  className="w-full py-3 mt-4 bg-gradient-to-r from-purple-400 to-purple-600 text-white font-medium rounded-lg hover:from-purple-500 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading && <LoaderCircleIcon className='animate-spin size-5 text-white' />}
                  {isLoading ? 'Uploading...' : 'Upload Resume'}
                </button>
                <button 
                  type="button"
                  onClick={() => { setShowUploadResume(false); setTitle(''); setResume(null) }} 
                  className="absolute top-4 right-4 text-slate-400 hover:text-white hover:rotate-90 transition-all duration-300"
                >
                  <XIcon className="size-6" />
                </button>
              </div>
            </form>
          )
        }

        {
          editResumeId && (
            <form onSubmit={editTitle} onClick={() => setEditResumeId('')} className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
              <div onClick={e => e.stopPropagation()} className="relative bg-gradient-to-br from-gray-900 to-black border border-slate-700 shadow-2xl rounded-2xl w-full max-w-md p-8 transform transition-all duration-300 scale-100">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-t-2xl"></div>
                <h2 className='text-2xl font-bold mb-6 text-white'>Edit Resume Title</h2>
                <input 
                  onChange={(e) => setTitle(e.target.value)} 
                  value={title} 
                  type="text" 
                  placeholder="Enter Resume Title" 
                  className="w-full px-4 py-3 rounded-lg border-2 border-slate-700 bg-black/50 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-300 mb-6" 
                  required 
                />
                <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40">
                  Update Title
                </button>
                <button 
                  type="button"
                  onClick={() => { setEditResumeId(''); setTitle('') }} 
                  className="absolute top-4 right-4 text-slate-400 hover:text-white hover:rotate-90 transition-all duration-300"
                >
                  <XIcon className="size-6" />
                </button>
              </div>
            </form>
          )
        }
      </div>
    </div>
  )
}

export default Dashboard