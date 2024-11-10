import { useEffect } from 'react';
import MessageInput from './MessageInput';
import Messages from './Messages';
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/AuthContext';

import { TiMessages } from 'react-icons/ti';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // Reset the selected conversation when the component unmounts
    setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className="bg-slate-200 px-4 py-2 mb-2 ">
            <span className="text-gray-900 label-text">To:</span>{' '}
            <span className="text-gray-900 font-bold">
              {selectedConversation.fullName}
            </span>
          </div>

          {/* Message */}
          <Messages />

          {/* message input */}
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center h-full">
      <div className="px-4 text-center ms:text-lg text-emerald-200 font-semibold flex flex-col items-center gap-2">
        <p>Hello {authUser.fullName} 🙋‍♂️</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
