import React from 'react'
import { MessageCircle } from 'react-feather'

const Comment = () => {
  return (
    <div className="flex gap-2 text-sm tracking-widest text-gray-400 hover:text-white">
        <MessageCircle className="w-5 h-5" />
        <p>87</p>
    </div>
  )
}

export default Comment