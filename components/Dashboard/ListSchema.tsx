import { List, LayoutGrid } from 'lucide-react';

export default () => {
    const projects = [
        { name: 'glistening-laughter', services: 2 },
        { name: 'compassionate-vitality', services: null, url: 'profutbol-production.up.railway.app' },
        { name: 'wonderful-communication', services: 2 },
        { name: 'hopeful-learning', services: 2 },
        { name: 'surprising-rejoicing', services: 1 },
        { name: 'secure-insight', services: 1 },
    ]
    return (
        <>

            {/* Projects Section */}
            <div className="flex items-center justify-between mb-6 text-black">
                <div className="flex items-center gap-4">
                    <span className="cursor-pointer p-1 hover:text-[#9DD5F5] transition-all">6 Projects</span>
                    <button className="cursor-pointer flex items-center p-2 gap-2 text-sm hover:text-white hover:bg-black">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                        Recent Activity
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>

                <div className="flex items-center gap-2 rounded p-1">
                    <button className="p-1.5 hover:bg-gray-700 rounded">
                        <List className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-gray-700 rounded">
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                </div>
            </div>
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="bg-white transition-all duration-500 ease-in-out hover:shadow-xl rounded-lg p-6 cursor-pointer group animate__animated animate__fadeIn"
                    >
                        <div className="flex flex-col h-full">
                            <h3 className="text-lg font-medium mb-auto">{project.name}</h3>

                            <div className="mt-16">
                                {project.url ? (
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                        <span className="truncate">{project.url}</span>
                                    </div>
                                ) : (
                                    <div className="text-sm text-gray-500">
                                        {project.services}
                                        {/* service{project.services > 1 ? 's' : ''} */}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

