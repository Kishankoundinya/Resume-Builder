
import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloudIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { dummyResumeData } from '../assets/assets'

const Dashboard = () => {

  const color = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"]
  const [allResumes, setAllResumes] = useState([])
  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData)
  }

  useEffect(() => {
    loadAllResumes()
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-black text-white">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-400 to-slate-600 bg-clip-text text-transparent sm:hidden">
          Welcome, Jhon Doe
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
        <button className="w-full sm:w-36 h-48 bg-black flex flex-col items-center justify-center rounded-lg gap-2 text-white border border-dashed border-slate-600 group hover:border-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
          <PlusIcon className="size-11 p-2.5 bg-gradient-to-br from-green-600 to-green-800 text-white rounded-full transition-all duration-300 group-hover:scale-110" />

          <p className="text-sm group-hover:text-green-500 transition-all duration-300">
            Create New Resume
          </p>
        </button>

        <button className="w-full sm:w-36 h-48 bg-black flex flex-col items-center justify-center rounded-lg gap-2 text-white border border-dashed border-slate-600 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
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
            <button key={index} className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer" style={{ background: `linear-gradient(135deg, ${baseColor} 10, ${baseColor} 40)`, borderColor: baseColor + '40' }}>
              <FilePenLineIcon className="size-7 group-hover-scale-105 transition-all" style={{ color: baseColor }} />
              <p className="text-sm group-hover:scale-105 transition-all px-2 text-center" style={{ color: baseColor }}>
                {resume.title}
              </p>
              <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center' style={{ color: baseColor + '90' }}>
                Updated on {new Date(resume.updatedAt).toLocaleDateString()}
              </p>
              <div className="absolute top-1 right-1 group-hover:flex items-center hidden"> 
              <TrashIcon className='size-7 p-1.5 hover:bg-white/50 rounded text-white transition-colors'/>
              <PencilIcon className='size-7 p-1.5 hover:bg-white/50 rounded text-white transition-colors'/>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  )
}

export default Dashboard