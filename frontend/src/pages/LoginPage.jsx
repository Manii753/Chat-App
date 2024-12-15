import { MessageSquare, Lock , User, Eye,EyeClosed,Loader2, Mail} from "lucide-react";
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {

  const {login, isLoggingIn} = useAuthStore();

  const validateForm = () => {
    if(!formData.email.trim())return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if(!formData.password.trim())return toast.error("Password is required");
    
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if(success === true)return await login(formData);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  return (
    <div className="min-h-screen grid lg:grid-cols-1" >
      
      <div className='flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16'>
        
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2 group">          
                <div
                  className="size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                group-hover:bg-primary/20 transition-colors"
                >
                  <MessageSquare className="size-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold mt-2">Login</h1>
                <p className="text-base-content/60">Get started</p>
              </div>
            </div>

        </div>
        <form className='space-y-0 sm:w-auto lg:w-1/3 md:w-auto' onSubmit={handleSubmit}>
            
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10 items-center`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <div className='absolute inset-y-0 right-0 pr-3 flex items-center'>
                  {showPassword ? (
                    <Eye className='size-5 text-base-content/40 cursor-pointer' onClick={() => setShowPassword(false)}/>
                  ) : (
                    <EyeClosed className='size-5 text-base-content/40 cursor-pointer' onClick={() => setShowPassword(true)}/>
                  )}

                  

                  

                </div>
              </div>
            </div>
            <div className='h-6'>

            </div>

            <button type="submit" className="btn btn-primary w-full " disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </button>


        </form>

        <div className="text-center mt-4">
            <p className="text-base-content/60">
              Dont have an account?{" "}
              <Link to="/SignUp" className="link link-primary">
                Sign Up
              </Link>
            </p>
        </div>

      </div>
      
    </div>
  )
}

export default LoginPage