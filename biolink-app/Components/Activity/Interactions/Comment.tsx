'use client'

import React from 'react'
import { MessageCircle } from 'react-feather'

interface Props {
  toggleComment: () => void
}

const Comment = ({toggleComment}: Props) => {

  return (
    <div onClick={toggleComment} className="flex gap-2 text-sm tracking-widest text-gray-400 hover:text-white cursor-pointer">
        <MessageCircle className="w-5 h-5" />
        <p>87</p>
    </div>
  )
}

export default Comment