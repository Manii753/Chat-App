import useChatStore from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const {isUserSelected} = useChatStore();
  return (
    <div className="h-screen bg-base-100">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="w-full shadow-slate-900 rounded-3xl h-[calc(100vh-7rem)] bg-base-200">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar/>

            {!isUserSelected? <NoChatSelected/>: <ChatContainer/>}

          </div>
          
        </div> 
        
      </div>

    </div>
  )
}

export default HomePage