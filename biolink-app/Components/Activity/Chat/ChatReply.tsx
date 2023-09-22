'use client'

import chatStore from '@/stores/ChatStore';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import Image from 'next/image';
import React, { useState } from 'react'
import InputEmoji from 'react-input-emoji'

const ChatReply = () => {

    const [ text, setText ] = useState('')

    function handleOnEnter (text: string) {
        setText(text);
    }

  return (
    <div className="w-full flex gap-3">
        <div className="w-1/12 flex justify-center">
            <Image src={'/profile-pic.jpg'} width={40} height={40} loading='lazy' className='rounded-full w-fit h-fit' alt='profile' />
        </div>
        <div className='w-11/12'>
            <InputEmoji
                value={text}
                onChange={setText}
                cleanOnEnter
                onEnter={handleOnEnter}
                placeholder="Type a message"
                fontSize={17}
                keepOpened={true}
                shouldReturn
                theme='dark'
            />
        </div>
    </div>
  )
}

export default ChatReply