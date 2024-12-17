import { useEffect } from "react";
import  useChatStore  from "../store/useChatStore";
//import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkelton";
import { Users } from "lucide-react";

const Sidebar = () => {
  
  


  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);
  
  

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/*Online Filter Toggle */}
        <div className="w-full py-3 overflow-y-auto space-y-2">
          {users.map((user)=>(
            <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
            w-full p-3 flex items-center gap-3
            hover:bg-base-300 transition-colors rounded-md
            ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}
          >
            <div className="w-10 h-10 rounded-full bg-base-200">
              <img src={user.profileImage || "/avatar.png"} alt="" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="font-medium ">{user.fullname}</div>

          </button>

          ))}
        </div>


      </div>
      
    </aside>
    
  )
};
export default Sidebar;