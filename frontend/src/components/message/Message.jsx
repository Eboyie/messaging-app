import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { chatTime } from '../../utils/chatTime';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser._id;
  const formattedTime = chatTime(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePice = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? 'bg-cyan-500' : '';

  const shakeClass = message.shouldShake ? 'shake' : '';

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePice} />
        </div>
      </div>

      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} `}>
        {message.message}
      </div>
      <div className="chat-footer text-xs flex gap-1 pt-2 items-center opacity-50 text-white">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
