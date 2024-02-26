import React from "react"
import Markdown from "react-markdown"

export default function ChatResponse(props: any) {
    const { message, title } = props
    return(
    <div>
        <h3>{title}</h3>
        <Markdown>{message}</Markdown>
    </div>
    )
}