import Image from 'next/image'
import { useChangeOption } from '@/store'
import { AlertTriangle, Settings, Gift, UserPlus, Plus, X } from 'lucide-react';


export default ({ user }: { user?: any }) => {

    const { handler }: { handler: (setHandler: String) => void } = useChangeOption();

    return (
        <>
            {/* Project Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-full overflow-hidden flex items-center justify-center">
                        {!user ? <></> : <Image
                            src={user.imageUrl}
                            width={100}
                            height={100}
                            alt="Picture of the author"
                        />}
                    </div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-semibold">
                            {!user ? "porrasandres22's Projects" : user.firstName}
                        </h1>
                        <span className="mt-2 px-3 py-0.5 bg-theme-text-10 text-theme-text-1 text-xs font-bold rounded border border-theme-text-1">
                            SUPERADMIN
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 overflow-auto">
                    <button className="cursor-pointer p-2" onClick={() => { handler("#2e73936b82174696f261a4bbb4ee8be5f1b41672"); (() => { location.hash = "2e73936b82174696f261a4bbb4ee8be5f1b41672" })() }}>
                        <Settings className="w-5 h-5 text-theme-text-0" />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-theme-text-10 hover:bg-theme-text-30 rounded text-sm font-medium" onClick={() => { handler("#e4af5e2fef8ecc5e62164f586c33cda921f7eb28"); (() => { location.hash = "e4af5e2fef8ecc5e62164f586c33cda921f7eb28" })() }}>
                        <Gift className="w-4 h-4" />
                        Conecciones
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-theme-text-30 hover:bg-theme-text-20 rounded text-sm font-medium" onClick={() => { handler("#b6aa6ab9f34e8f9cfbd19358d156cd4884f07a75"); (() => { location.hash = "b6aa6ab9f34e8f9cfbd19358d156cd4884f07a75" })() }}>
                        <UserPlus className="w-4 h-4" />
                        Usuarios
                    </button>
                    <button className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-theme-text-20 hover:bg-theme-text-10 rounded text-sm font-medium" onClick={() => { handler("#7cc7714c6789e85385afa3773e584a38a4b6ce77"); (() => { location.hash = "7cc7714c6789e85385afa3773e584a38a4b6ce77" })() }} >
                        <Plus className="w-4 h-4" />
                        Esquema
                    </button>
                </div>
            </div>
        </>
    )
}