import { create } from "zustand";
import { axiosInstance } from "../lib/axios";


const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLogingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {

    try{
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    }catch(err){
      console.log("Error in checkAuth", err);
      set({ authUser: null });
    }finally{
      set({ isCheckingAuth: false });
    }
  }
}));

export default useAuthStore;