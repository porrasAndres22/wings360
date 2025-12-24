import { AlertTriangle, Gift, X } from 'lucide-react';


export default () => {
    return (
        <>
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
        </>
    )
}