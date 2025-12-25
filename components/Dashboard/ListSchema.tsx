'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Project {
    id: string
    name: string
    url?: string
    count: number
}

interface NewProjectForm {
    name: string
    description: string
    category: string
    isPublic: boolean
    startDate: string
    tags: string[]
    budget: string
}

const ProjectsGrid = () => {
    const [projects] = useState<Project[]>([
        { id: '1', name: 'glistening-laughter', count: 2 },
        { id: '2', name: 'compassionate-vitality', url: 'profutbol-production.up.railway.app', count: 0 },
        { id: '3', name: 'wonderful-communication', count: 2 },
        { id: '4', name: 'hopeful-learning', count: 2 },
        { id: '5', name: 'surprising-rejoicing', count: 1 },
        { id: '6', name: 'secure-insight', count: 1 },
    ])

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [sortBy, setSortBy] = useState('recent')
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [showNewProjectForm, setShowNewProjectForm] = useState(false)

    const [newProjectForm, setNewProjectForm] = useState<NewProjectForm>({
        name: '',
        description: '',
        category: '',
        isPublic: false,
        startDate: '',
        tags: [],
        budget: ''
    })

    const [currentTag, setCurrentTag] = useState('')

    const handleCreateProject = () => {
        setShowNewProjectForm(true)
    }

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project)
    }

    const handleBackToProjects = () => {
        setSelectedProject(null)
    }

    const handleCancelNewProject = () => {
        setShowNewProjectForm(false)
        setNewProjectForm({
            name: '',
            description: '',
            category: '',
            isPublic: false,
            startDate: '',
            tags: [],
            budget: ''
        })
        setCurrentTag('')
    }

    const handleSubmitNewProject = (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí puedes agregar la lógica para crear el proyecto
        handleCancelNewProject()
    }

    const handleAddTag = () => {
        if (currentTag.trim() && !newProjectForm.tags.includes(currentTag.trim())) {
            setNewProjectForm({
                ...newProjectForm,
                tags: [...newProjectForm.tags, currentTag.trim()]
            })
            setCurrentTag('')
        }
    }

    const handleRemoveTag = (tagToRemove: string) => {
        setNewProjectForm({
            ...newProjectForm,
            tags: newProjectForm.tags.filter(tag => tag !== tagToRemove)
        })
    }

    // Vista del formulario de nuevo proyecto
    if (showNewProjectForm) {
        return (
            <div className="from-blue-50 via-purple-50 to-pink-50">
                <div className="animate__animated animate__fadeIn">
                    <div className="mb-6">
                        <button
                            onClick={handleCancelNewProject}
                            className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-lg shadow-sm transition-all border border-gray-200 text-gray-700 font-medium mb-4"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Projects
                        </button>

                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Create New Project</h1>
                        <p className="text-gray-600">Fill in the details below to create your new project</p>
                    </div>

                    <form onSubmit={handleSubmitNewProject} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
                        {/* Input 1: Text Input - Project Name */}
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                Project Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={newProjectForm.name}
                                onChange={(e) => setNewProjectForm({ ...newProjectForm, name: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                                placeholder="Enter project name"
                            />
                            <p className="mt-1 text-sm text-gray-500">Choose a unique name for your project</p>
                        </div>

                        {/* Input 2: Textarea - Description */}
                        <div className="mb-6">
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                                Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                required
                                rows={4}
                                value={newProjectForm.description}
                                onChange={(e) => setNewProjectForm({ ...newProjectForm, description: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none resize-none"
                                placeholder="Describe your project..."
                            />
                            <p className="mt-1 text-sm text-gray-500">Provide a detailed description of your project</p>
                        </div>

                        {/* Input 3: Select Dropdown - Category */}
                        <div className="mb-6">
                            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                                Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="category"
                                required
                                value={newProjectForm.category}
                                onChange={(e) => setNewProjectForm({ ...newProjectForm, category: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none bg-white"
                            >
                                <option value="">Select a category</option>
                                <option value="web-development">Web Development</option>
                                <option value="mobile-app">Mobile App</option>
                                <option value="design">Design</option>
                                <option value="marketing">Marketing</option>
                                <option value="research">Research</option>
                                <option value="other">Other</option>
                            </select>
                            <p className="mt-1 text-sm text-gray-500">Select the category that best fits your project</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Input 4: Date Input */}
                            <div>
                                <label htmlFor="startDate" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Start Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="startDate"
                                    required
                                    value={newProjectForm.startDate}
                                    onChange={(e) => setNewProjectForm({ ...newProjectForm, startDate: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                                />
                                <p className="mt-1 text-sm text-gray-500">When will you start?</p>
                            </div>

                            {/* Input 5: Number Input - Budget */}
                            <div>
                                <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Budget (USD)
                                </label>
                                <input
                                    type="number"
                                    id="budget"
                                    min="0"
                                    step="100"
                                    value={newProjectForm.budget}
                                    onChange={(e) => setNewProjectForm({ ...newProjectForm, budget: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                                    placeholder="0.00"
                                />
                                <p className="mt-1 text-sm text-gray-500">Optional budget allocation</p>
                            </div>
                        </div>

                        {/* Input 6: Checkbox - Public/Private */}
                        <div className="mb-6">
                            <div className="flex items-start">
                                <div className="flex items-center h-6">
                                    <input
                                        type="checkbox"
                                        id="isPublic"
                                        checked={newProjectForm.isPublic}
                                        onChange={(e) => setNewProjectForm({ ...newProjectForm, isPublic: e.target.checked })}
                                        className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-2 focus:ring-purple-500 cursor-pointer"
                                    />
                                </div>
                                <div className="ml-3">
                                    <label htmlFor="isPublic" className="text-sm font-semibold text-gray-700 cursor-pointer">
                                        Make this project public
                                    </label>
                                    <p className="text-sm text-gray-500">Allow others to view and collaborate on this project</p>
                                </div>
                            </div>
                        </div>

                        {/* Input 7: Tags (Multiple inputs) */}
                        <div className="mb-8">
                            <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-2">
                                Tags
                            </label>
                            <div className="flex gap-2 mb-3">
                                <input
                                    type="text"
                                    id="tags"
                                    value={currentTag}
                                    onChange={(e) => setCurrentTag(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault()
                                            handleAddTag()
                                        }
                                    }}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none"
                                    placeholder="Add a tag and press Enter"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTag}
                                    className="px-6 py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors font-medium"
                                >
                                    Add
                                </button>
                            </div>

                            {newProjectForm.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {newProjectForm.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(tag)}
                                                className="hover:bg-purple-200 rounded-full p-0.5 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                            <p className="mt-2 text-sm text-gray-500">Add tags to help organize and categorize your project</p>
                        </div>

                        {/* Form Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleCancelNewProject}
                                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium flex-1 sm:flex-initial"
                            >
                                Create Project
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    // Si hay un proyecto seleccionado, mostrar la vista de detalles
    if (selectedProject) {
        return (
            <div className="from-blue-50 via-purple-50 to-pink-50 animate__animated animate__fadeIn">
                <div className="max-w-7xl mx-auto">
                    {/* Header de detalles del proyecto */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
                        <div className="flex-1">
                            <button
                                onClick={handleBackToProjects}
                                className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-lg shadow-sm transition-all border border-gray-200 text-gray-700 font-medium mb-4"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Projects
                            </button>

                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">{selectedProject.name}</h1>

                            {selectedProject.url && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                    </svg>
                                    <a
                                        href={`https://${selectedProject.url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-purple-600 transition-colors hover:underline"
                                    >
                                        {selectedProject.url}
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 rounded-lg shadow-sm transition-all border border-gray-200 text-gray-700 font-medium">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Settings
                            </button>

                            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-sm transition-all font-medium">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                New Item
                            </button>
                        </div>
                    </div>

                    {/* Contenido del proyecto */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Stats Cards */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-purple-100 rounded-lg">
                                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Total Items</h3>
                            </div>
                            <p className="text-4xl font-bold text-gray-900">{selectedProject.count}</p>
                            <p className="text-sm text-gray-500 mt-1">items in this project</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Last Updated</h3>
                            </div>
                            <p className="text-xl font-semibold text-gray-900">2 hours ago</p>
                            <p className="text-sm text-gray-500 mt-1">last activity</p>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-semibold text-gray-800">Status</h3>
                            </div>
                            <p className="text-xl font-semibold text-green-600">Active</p>
                            <p className="text-sm text-gray-500 mt-1">project status</p>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Project Items</h2>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700">
                                    Filter
                                </button>
                                <button className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-700">
                                    Sort
                                </button>
                            </div>
                        </div>

                        {selectedProject.count > 0 ? (
                            <div className="space-y-3">
                                {Array.from({ length: selectedProject.count }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                                <span className="text-purple-600 font-semibold">{index + 1}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-800">Item {index + 1}</h4>
                                                <p className="text-sm text-gray-500">Created recently</p>
                                            </div>
                                        </div>
                                        <button className="px-3 py-1.5 text-sm bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors text-gray-700">
                                            View
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">No items yet</h3>
                                <p className="text-gray-500 mb-4">Get started by creating your first item</p>
                                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                                    Create First Item
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // Vista de lista de proyectos (por defecto)
    return (
        <div className="from-blue-50 via-purple-50 to-pink-50">
            <div className="max-w-7xl mx-auto animate__animated animate__fadeIn">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">

                        <div className="flex items-center gap-2">
                            {/* Back to Button */}
                            <button
                                onClick={() => window.history.back()}
                                className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium text-sm border border-gray-200"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Regresar</span>
                            </button>

                            {/* Create Project Button */}
                            <button
                                onClick={handleCreateProject}
                                className="cursor-pointer flex items-center justify-center gap-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 font-medium text-sm group"
                            >
                                <svg
                                    className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Nuevo Esquema</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Sort Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 text-sm font-medium text-gray-700"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                                </svg>
                                {sortBy === 'recent' && 'Recent Activity'}
                                {sortBy === 'name' && 'Name (A-Z)'}
                                {sortBy === 'name-desc' && 'Name (Z-A)'}
                                {sortBy === 'count' && 'Most Items'}
                                {sortBy === 'count-desc' && 'Least Items'}
                                <svg
                                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setIsDropdownOpen(false)}
                                    />

                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                                        <button
                                            onClick={() => {
                                                setSortBy('recent')
                                                setIsDropdownOpen(false)
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-3 ${sortBy === 'recent' ? 'text-purple-600 bg-purple-50' : 'text-gray-700'
                                                }`}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Recent Activity
                                            {sortBy === 'recent' && (
                                                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>

                                        <button
                                            onClick={() => {
                                                setSortBy('name')
                                                setIsDropdownOpen(false)
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-3 ${sortBy === 'name' ? 'text-purple-600 bg-purple-50' : 'text-gray-700'
                                                }`}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                                            </svg>
                                            Name (A-Z)
                                            {sortBy === 'name' && (
                                                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>

                                        <button
                                            onClick={() => {
                                                setSortBy('name-desc')
                                                setIsDropdownOpen(false)
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-3 ${sortBy === 'name-desc' ? 'text-purple-600 bg-purple-50' : 'text-gray-700'
                                                }`}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                                            </svg>
                                            Name (Z-A)
                                            {sortBy === 'name-desc' && (
                                                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>

                                        <div className="border-t border-gray-200 my-1"></div>

                                        <button
                                            onClick={() => {
                                                setSortBy('count')
                                                setIsDropdownOpen(false)
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-3 ${sortBy === 'count' ? 'text-purple-600 bg-purple-50' : 'text-gray-700'
                                                }`}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                            </svg>
                                            Most Items
                                            {sortBy === 'count' && (
                                                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>

                                        <button
                                            onClick={() => {
                                                setSortBy('count-desc')
                                                setIsDropdownOpen(false)
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center gap-3 ${sortBy === 'count-desc' ? 'text-purple-600 bg-purple-50' : 'text-gray-700'
                                                }`}
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                            </svg>
                                            Least Items
                                            {sortBy === 'count-desc' && (
                                                <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* View Toggle */}
                        <div className="flex items-center gap-1 bg-white rounded-lg shadow-sm p-1 border border-gray-200">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded transition-colors ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'
                                    }`}
                                aria-label="List view"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded transition-colors ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'
                                    }`}
                                aria-label="Grid view"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Projects Grid */}
                <div className={`grid gap-4 ${viewMode === 'grid'
                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-1'
                    }`}>
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => handleProjectClick(project)}
                            className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200 cursor-pointer"
                        >
                            <div className="p-6 h-full flex flex-col justify-between min-h-[180px]">
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors">
                                        {project.name}
                                    </h3>

                                    {project.url && (
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                            <span className="truncate">{project.url}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-2xl font-light text-gray-400">
                                        {project.count}
                                    </span>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleProjectClick(project)
                                        }}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600"
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {projects.length === 0 && (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No projects yet</h3>
                        <p className="text-gray-500">Get started by creating your first project</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProjectsGrid