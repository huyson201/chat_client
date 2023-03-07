import React, { useState } from 'react'
import Dialogues from "@components/Dialogues/Dialogues";
import Chat from "@components/Chat/Chat";
import About from "@components/About/About";
import { useLoaderData } from 'react-router-dom';
import { useAppDispatch } from "@hooks/redux";
import { setConversation, setPendingConversation } from "@redux/slices/Conversation.slice";
const ChatPage = () => {
    const [showSidebar, setShowSidebar] = useState<boolean>(false)
    let data = useLoaderData()

    return (
        <>
            <Dialogues />
            <Chat clickRightSide={(state) => setShowSidebar(state)} />
            {showSidebar && <About />}
        </>
    )
}

export default ChatPage