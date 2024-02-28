import React from 'react'
import Markdown from "react-markdown"

const ChatFull = (full: string, handleGenerateFull: any) => {
    return (
        full == "" ? <p onClick={handleGenerateFull}>Get full sprint plan</p> : <Markdown>{full}</Markdown>
    )
}

export default ChatFull;