import React from 'react';

interface Props {
    text: string;
}

export default function Loading({text}: Props) {
    return (
        <div className="fixed top-0 left-0 w-screen h-screen flex flex-col justify-center items-center bg-black/50 z-40 backdrop-blur-sm ">
            <i className="fa-solid fa-circle-notch animate-spin mb-2 text-2xl"></i>
            <p>{ text }</p>
        </div>
    )
}