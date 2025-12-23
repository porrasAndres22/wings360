import DataUser from '@/components/DataUser'
import { AlertTriangle, Settings, Gift, UserPlus, Plus, X, List, LayoutGrid } from 'lucide-react';
import 'animate.css';
import DataElements from './DataElements';

export default () => {
    return (
        <>
            {/* Main Content */}
            <div className="max-w-1400px mx-auto px-4 lg:px-6 py-6">
                {/* Project Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-700 rounded-full overflow-hidden flex items-center justify-center">
                            {/* <DataUser dataUser="image"></DataUser> */}
                        </div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-semibold">
                                {/* <DataUser dataUser="name"></DataUser> */}
                                porrasandres22's Projects
                            </h1>
                            <span className="mt-2 px-2 py-0.5 bg-theme-text-10 text-theme-text-1 text-xs font-bold rounded border border-theme-text-1">
                                HOBBY
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 overflow-auto">
                        <button className="p-2">
                            <Settings className="w-5 h-5 text-theme-text-0" />
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-theme-text-10 hover:bg-theme-text-30 rounded text-sm font-medium">
                            <Gift className="w-4 h-4" />
                            Conecciones
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-theme-text-30 hover:bg-theme-text-20 rounded text-sm font-medium">
                            <UserPlus className="w-4 h-4" />
                            Usuarios
                        </button>
                        <button className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-theme-text-20 hover:bg-theme-text-10 rounded text-sm font-medium">
                            <Plus className="w-4 h-4" />
                            Esquema
                        </button>
                    </div>
                </div>

                {/* Referral Banner */}
                <div className="rounded-lg p-4 mb-6 flex flex-col text-white sm:flex-row items-start sm:items-center justify-between gap-3 fluenColorBlue">
                    <div className="flex items-center gap-3">
                        <Gift className="w-5 h-5" />
                        <div>
                            <span className="font-semibold">Refer Users & Earn Cash</span>
                            <span>Get paid 15% commission on all Railway revenue from your referrals</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 ml-auto">
                        <button className="text-sm hover:text-purple-200 flex items-center gap-1">
                            Ebzfe1
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </button>
                        <button className="text-sm hover:text-purple-200">Read More</button>
                        <button className="hover:text-white">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <DataElements></DataElements>
            </div>
        </>
    );
}