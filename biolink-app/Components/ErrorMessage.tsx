import { poppins } from '@/font/Poppins'
import React from 'react'

interface Props {
    error: string
}

export const ErrorMessage = ({ error }: Props) => {
  return (
        <p className={`px-3 py-1 bg-white rounded-full w-fit text-sm text-red-500 font-semibold ${poppins.className}`}>
            {error}
        </p>
  )
}
