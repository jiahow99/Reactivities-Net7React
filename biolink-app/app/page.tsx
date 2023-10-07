'use client'
import Spline from '@splinetool/react-spline'
import Link from 'next/link'

export default function page() {
  return (
    <>
      <Spline scene="https://prod.spline.design/jwkB9X0DsasKMI7u/scene.splinecode" />
      
      <div className='absolute top-[70vh] left-1/2 -translate-x-1/2 flex flex-col justify-center items-center'>
          <div className='flex gap-2 text-2xl'>
              <h1>Welcome to</h1>
              <h1 className='font-bold'>Reactivities</h1>
          </div>
          <Link href='/activity' className='btn-secondary checked flex items-center px-5 py-1 text-xl mt-5 '>
            Take me to Activities
          </Link>
      </div>
    </>
  )
}

