import React from 'react'

const PaddedCover = ({children}: {children:React.ReactNode}) => {
  return (
    <div className='w-full'>
        <div className='md:px-[8rem] px-[2rem] pb-[8rem] w-full'>

      {children}
        </div>
    </div>
  )
}

export default PaddedCover
