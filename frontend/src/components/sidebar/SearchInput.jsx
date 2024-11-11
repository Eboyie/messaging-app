import { IoSearchSharp } from 'react-icons/io5';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';

const SearchInput = () => {
  const [search, setSearch] = useState('');
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error('Search must be at least 3 characters');
    }

    const filteredConversations = conversations.find((c) => {
      return c.fullName.toLowerCase().includes(search.toLowerCase());
    });

    if (filteredConversations) {
      setSelectedConversation(filteredConversations);
      setSearch('');
    } else {
      toast.error('No such User found');
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="hidden sm:flex items-center gap-2 "
      >
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered rounded-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-circle bg-cyan-500 text-white">
          <IoSearchSharp className="w-6 h-6 outline-none" />
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
