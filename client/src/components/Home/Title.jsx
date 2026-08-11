import React from 'react'

const Title = ({ title, description }) => {
    return (
        <div className="text-center mt-6 text-slate-700">

            <h2 className="text-3xl font-semibold text-center mx-auto text-white">{title}</h2>
            <p class="mt-2 text-slate-300 max-w-xl mx-auto">
                {description}
            </p>
        </div>
    )
}

export default Title