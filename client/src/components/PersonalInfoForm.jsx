import React from 'react'

const PersonalInfoForm = ({data,onChange,removeBackground,setRemoveBackground}) => {
  return (
    <div>
      <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
      <p className='text-sm text-gray-600'>Get Started with the personal information</p>
      <div className='flex items-center gap-2'>
        <label>
          {data.image?(
            <img src={typeof data.image=== 'string' ? data.image : URL.createObjectURL(data.image)} alt="User-image" className='w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80' />
          ):}
        </label>
      </div>

    </div>
  )
}

export default PersonalInfoForm