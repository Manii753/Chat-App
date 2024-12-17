import React from 'react'
import useChatStore from '../store/useChatStore'

const ChatContainer = () => {
  const {messages,getMessages,isMessagesLoading,selectedUser} = useChatStore();
  return (
    <div>
      
    </div>
  )
}

export default ChatContainer
