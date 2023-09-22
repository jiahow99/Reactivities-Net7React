'use client'
import React from 'react'
import ChatComponent from './ChatComponent';
import { NextFontWithVariable } from 'next/dist/compiled/@next/font';
import ChatReply from './ChatReply';
import { observer } from 'mobx-react-lite';

interface Props {
    font: NextFontWithVariable
}

const ChatSection = observer(({font}: Props) => {

    return (
        <>
            <ChatComponent font={font} />
            <ChatComponent font={font} />
            <ChatComponent font={font} />
            <ChatComponent font={font} />
            <ChatReply />
        </>
    )
})

export default ChatSection