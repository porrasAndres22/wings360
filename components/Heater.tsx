import UserClerk from '@/components/UserClerk'

import { Bell } from 'lucide-react';


export default () => {
    return (
        <header className="px-5 lg:px-6">
            <div className="flex items-center justify-between max-w-1400px mx-auto">
                {/* Logo */}
                <div className="flex items-center gap-4">
                    <svg className='w-30 h-20'>
                        <use href="./sprite.svg#wings360"></use>
                    </svg>
                </div>

                {/* Right side icons */}
                <div className="flex items-center gap-3 ">
                    <button className="cursor-pointer font-semibold hover:text-theme-text1 text-sm">Help</button>
                    <button className="cursor-pointer relative p-2">
                        <Bell className="w-5 h-5 text-theme-text0" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
                    </button>
                    <button className="p-2">
                        {/* <UserClerk /> */}
                    </button>
                </div>
            </div>
        </header>
    )
}

