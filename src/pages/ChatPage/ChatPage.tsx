import React, { useState } from 'react'
import Dialogues from "@components/Dialogues/Dialogues";
import Chat from "@components/Chat/Chat";
import Modal from 'react-modal'
import AddFriendForm from '@components/AddFriendForm/AddFriendForm';
const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: "0"
    },
};
const ChatPage = () => {
    const [showSidebar, setShowSidebar] = useState<boolean>(false)
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function closeModal() {
        setIsOpen(false);
    }


    return (
        <>
            <Dialogues onClickAddFriend={() => setIsOpen(true)} />
            <Chat clickRightSide={(state) => setShowSidebar(state)} />
            <Modal
                isOpen={modalIsOpen}
                style={customStyles}
                overlayClassName={"modal-overlay"}
                appElement={undefined}
                ariaHideApp={false}
                onRequestClose={closeModal}

            >
                <AddFriendForm requestCloseModal={closeModal} onClickClose={closeModal} onClickCancel={closeModal} />
            </Modal>
        </>
    )
}

export default ChatPage