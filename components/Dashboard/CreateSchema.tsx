'use client';

import { useState } from 'react';

export default function DeploymentForm() {

    const [formData, setFormData] = useState({
        projectName: '',
        repository: '',
        framework: '',
        region: ''
    });

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };




    return (
        <div className="min-h-screen from-gray-900 via-slate-900 to-gray-800 flex flex-col animate__animated animate__backInDown">
            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12">
                {/* Icon */}
                <div className="mb-8 md:mb-12">
                    <div className="w-16 h-16 md:w-20 md:h-20 grid grid-cols-2 gap-1.5">
                        <div className="bg-purple-600 rounded-lg"></div>
                        <div className="bg-purple-600 rounded-lg"></div>
                        <div className="bg-purple-600 rounded-lg"></div>
                        <div className="border-2 border-purple-600 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Title and Subtitle */}
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 md:mb-4 text-center">
                    New project
                </h2>
                <p className="text-gray-400 text-base md:text-lg mb-8 md:mb-12 text-center">
                    Let's deploy your first service to production
                </p>




                <div className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 p-6 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Project Name Input */}
                        <div className="group">
                            <label htmlFor="projectName" className="block text-sm font-medium text-gray-300 mb-2">
                                Project Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="projectName"
                                    name="projectName"
                                    value={formData.projectName}
                                    onChange={handleChange}
                                    placeholder="my-awesome-project"
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Repository URL Input */}
                        <div className="group">
                            <label htmlFor="repository" className="block text-sm font-medium text-gray-300 mb-2">
                                GitHub Repository
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="repository"
                                    name="repository"
                                    value={formData.repository}
                                    onChange={handleChange}
                                    placeholder="username/repository"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Framework Select */}
                        <div className="group">
                            <label htmlFor="framework" className="block text-sm font-medium text-gray-300 mb-2">
                                Framework
                            </label>
                            <select
                                id="framework"
                                name="framework"
                                value={formData.framework}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 0.75rem center',
                                    backgroundSize: '1.5rem'
                                }}
                            >
                                <option value="" className="bg-gray-800">Select a framework</option>
                                <option value="nextjs" className="bg-gray-800">Next.js</option>
                                <option value="react" className="bg-gray-800">React</option>
                                <option value="vue" className="bg-gray-800">Vue</option>
                                <option value="angular" className="bg-gray-800">Angular</option>
                                <option value="svelte" className="bg-gray-800">Svelte</option>
                            </select>
                        </div>

                        {/* Region Select */}
                        <div className="group">
                            <label htmlFor="region" className="block text-sm font-medium text-gray-300 mb-2">
                                Deployment Region
                            </label>
                            <select
                                id="region"
                                name="region"
                                value={formData.region}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 0.75rem center',
                                    backgroundSize: '1.5rem'
                                }}
                            >
                                <option value="" className="bg-gray-800">Select a region</option>
                                <option value="us-east" className="bg-gray-800">US East (N. Virginia)</option>
                                <option value="us-west" className="bg-gray-800">US West (Oregon)</option>
                                <option value="eu-west" className="bg-gray-800">EU West (Ireland)</option>
                                <option value="ap-southeast" className="bg-gray-800">Asia Pacific (Singapore)</option>
                                <option value="sa-east" className="bg-gray-800">South America (São Paulo)</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            Deploy Project
                        </button>
                    </form>
                </div>



            </div>
        </div>
    );
}