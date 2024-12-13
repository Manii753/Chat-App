import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";


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
      console.log("authUser checked");
    }catch(err){
      console.log("Error in checkAuth asd", err);
      set({ authUser: null });
    }finally{
      set({ isCheckingAuth: false });
    }
  },

  signup:async (data)=>{
    
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      set({ isSigningUp: false });
      toast.success("Signup successful");
      
      
    } catch (error) {
      toast.error("Signup failed");
      console.log("Error in signup", error);
      
      
    }finally{
      set({ isSigningUp: false });
    }

  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout successful");
      
    } catch (error) {
      toast.error("Logout failed");
      console.log("Error in logout", error);
      
    }
  },

  login: async (data) => {
    set({ isLogingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      set({ isLogingIn: false });
      toast.success("Login successful");

    } catch (error) {
      toast.error(error.response.data.message);
      console.log("Error in login", error);

    }finally{
      set({ isLogingIn: false });
    }
  }
}));

export default useAuthStore;