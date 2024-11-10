import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import useConversation from '../zustand/useConversation';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `/api/messages/${selectedConversation._id}`
        );

        const data = await res.data;
        if (data.error) {
          throw new Error(data.error);
        }

        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    {
      selectedConversation._id && getMessages();
    }
  }, [selectedConversation._id, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
