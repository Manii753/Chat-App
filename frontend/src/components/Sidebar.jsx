import { useEffect } from "react";
import  useChatStore  from "../store/useChatStore";
import  useAuthStore  from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkelton";
import { Users } from "lucide-react";

const Sidebar = () => {
  
  const {onlineUsers} = useAuthStore();


  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  
  

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-21 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-1">
        <div className="flex items-center gap-3 m-6">
          <Users className="size-6" />
          <span className="px-4 font-medium hidden lg:block">Contacts</span>
        </div>
        {/*Online Filter Toggle */}
        <div className="w-full  overflow-y-auto space-y-2">
          {users.map((user)=>(
            <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
            w-full p-3 flex items-center gap-3
            hover:bg-base-300 transition-colors rounded-md
            ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}
          >
            <div className="relative mx-auto lg:mx-0">
              <img src={user.profileImage || "/avatar.png"} alt={user.fullname} className="size-12 object-cover rounded-full" />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span>
              )}
            </div>
            <div className="hidden lg:block text-left min-w-0 transition-transform duration-200 ease-in-out transform translate-x-0 lg:translate-x-2">
              <div className="font-medium truncate ">{user.fullname}</div>
              <div className="text-sm text-zinc-400 truncate">{onlineUsers.includes(user._id)? "Online": "Offline"}</div>
            </div>

          </button>

          ))}
        </div>


      </div>
      
    </aside>
    
  )
};
export default Sidebar;