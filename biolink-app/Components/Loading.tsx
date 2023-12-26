'use client'
import React from 'react'
import {observer} from 'mobx-react-lite'
import commonStore from '@/stores/CommonStore'

interface Props {
    show?: boolean
}

const Loading = ({ show }: Props) => {
    const { loading } = commonStore;

    return loading || show && (
        <div className="fixed top-0 left-0 w-full h-screen z-50 flex flex-col justify-center items-center bg-black/30 backdrop-blur-md hover:pointer-events-none">
            <div className="loader"></div>
            <p className='mt-7 text-xl'>Loading</p>
        </div>
    )
}

export default observer(Loading)