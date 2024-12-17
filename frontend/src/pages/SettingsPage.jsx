import { THEMES } from '../constants';
import useThemeStore from '../store/useThemeStore';
import { Send } from 'lucide-react';

const PREVIEW_MESSAGES=[
  {id:1, message:"I'm busy right now, I'll get back to you as soon as possible",isSent:true},
  {id:2, message:"ok buddy",isSent:false},
];

const SettingsPage = () => {
  const {theme, setTheme} = useThemeStore();
 

  return (
    <div className='h-screen pt-20 container mx-auto px-4 max-w-5xl'>
      <div className='spacee-y-6'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-3xl font-semibold text-primary'>Theme</h1>
          <p className='text-sm text-base-content/70'>Customize the theme of the app</p>
        </div>
      </div>
      

      <div className='grid sm:grid-cols-6 md:grid-cols-8 gap-2'>
        {THEMES.map((t)=>{
          return(
            <button
            key={t}
            className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}`}
            onClick={()=>setTheme(t)}
            >
              <div className='relative w-full h-8 rounded-md overflow-hidden data' data-theme={t}>
                <div className='absolute inset-0 grid grid-cols-4 gap-px p-1'>
                  <div className='bg-primary rounded-md'></div>
                  <div className='bg-secondary rounded-md'></div>
                  <div className='bg-accent rounded-md'></div>
                  <div className='bg-neutral rounded-md'></div>
                </div>

              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            

            </button>
          )

        })}

      </div>

    </div>
  )
}

export default SettingsPage