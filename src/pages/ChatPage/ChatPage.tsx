import React, { useState } from 'react'
import Dialogues from "@components/Dialogues/Dialogues";
import Chat from "@components/Chat/Chat";
const ChatPage = () => {
    const [showSidebar, setShowSidebar] = useState<boolean>(false)
    return (
        <>
            <Dialogues />
            <Chat clickRightSide={(state) => setShowSidebar(state)} />
        </>
    )
}

export default ChatPage