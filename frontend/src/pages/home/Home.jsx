import Sidebar from '../../components/sidebar/Sidebar';
import MessageContainer from '../../components/message/MessageContainer';

const Home = () => {
  return (
    <div>
      <div className="flex h-[95vh]  sm:h-[800px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-blur-xl backdrop-filter bg-opacity-0">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default Home;
