'use client'

import { Form, Formik, useField, useFormikContext } from 'formik';
import Image from 'next/image';
import React, { useState } from 'react'
import { Loader } from 'react-feather';
import InputEmoji from 'react-input-emoji'

interface Props {
    addingChat: boolean
    addComment: (formValues: any) => void
}

const ChatReply = ({addingChat, addComment}: Props) => {
  return (
    <Formik 
        className="w-full flex gap-3"
        initialValues={{ message: '' }}
        onSubmit={(values) => addComment(values)}
    >
        {({handleSubmit, setFieldValue}) => (
            <Form onSubmit={handleSubmit} className='flex mt-2 sm:mt-0'>
                <div className="w-1/12 flex justify-center">
                    <Image src={'/profile-pic.jpg'} width={40} height={40} loading='lazy' className='rounded-full w-fit h-fit' alt='profile' />
                </div>
                <div className='w-11/12 relative'>
                    <InputEmoji
                        value={''}
                        onChange={(value) => setFieldValue("message", value)}
                        cleanOnEnter
                        onEnter={() => handleSubmit()}
                        placeholder="Type a message"
                        fontSize={17}
                        keepOpened
                        shouldReturn
                        theme='dark'
                    />
                    <div className="absolute right-14 top-1/2 -translate-y-1/2">
                        {addingChat && <Loader className='text-black animate-spin' /> }
                    </div>
                </div>
            </Form>
        )}
    </Formik>
  )
}

export default ChatReply