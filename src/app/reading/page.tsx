'use client'

import { useState } from 'react'
import { Map, List, Sparkles, ArrowLeft, BookOpen, Search, Plus, Clock, MoreVertical, Wand2, Zap, Brain, Code2, Loader2, ChevronRight, X, Check, Cpu, Terminal, Database, Globe } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { mockAICourses, AIGeneratedCourse, AISection, AIModule } from '@/data/mockData'
import CourseOutline from '@/components/CourseOutline'
import CourseMindMap from '@/components/CourseMindMap'
import SectionDetailModal from '@/components/SectionDetailModal'
import ModuleDetailModal from '@/components/ModuleDetailModal'

const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-32 h-32 bg-slate-800 rounded-full animate-pulse" />
})

const programmingLanguages = [
    { id: 'python', name: 'Python', icon: '/images/python.png', color: '#3776ab' },
    { id: 'javascript', name: 'JavaScript', icon: '/images/java-script.png', color: '#f7df1e' },
    { id: 'typescript', name: 'TypeScript', icon: '/images/typescript.png', color: '#3178c6' },
    { id: 'csharp', name: 'C#', icon: '/images/c-sharp.png', color: '#512bd4' },
    { id: 'rust', name: 'Rust', icon: '/images/rust.png', color: '#dea584' },
    { id: 'cpp', name: 'C++', icon: '/images/c-.png', color: '#00599c' },
]

const difficultyLevels = [
    { id: 'beginner', name: 'Người mới', icon: '🌱', description: 'Bắt đầu từ cơ bản' },
    { id: 'intermediate', name: 'Trung cấp', icon: '🌿', description: 'Đã có kiến thức nền' },
    { id: 'advanced', name: 'Nâng cao', icon: '🌳', description: 'Thành thạo và chuyên sâu' },
]

const generationSteps = [
    { id: 1, name: 'Phân tích chủ đề', icon: Brain },
    { id: 2, name: 'Tạo cấu trúc khóa học', icon: Database },
    { id: 3, name: 'Sinh nội dung bài học', icon: Code2 },
    { id: 4, name: 'Tạo bài tập thực hành', icon: Terminal },
    { id: 5, name: 'Hoàn thiện khóa học', icon: Check },
]

export default function ReadingPage() {
    const [viewMode, setViewMode] = useState<'mindmap' | 'outline'>('outline')
    const [selectedCourse, setSelectedCourse] = useState<AIGeneratedCourse | null>(null)
    const [selectedSection, setSelectedSection] = useState<{ section: AISection, module: AIModule } | null>(null)
    const [selectedModule, setSelectedModule] = useState<AIModule | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    // Course creation states
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [createStep, setCreateStep] = useState<'input' | 'generating' | 'complete'>('input')
    const [newCourse, setNewCourse] = useState({
        topic: '',
        language: '',
        difficulty: 'beginner',
        description: ''
    })
    const [generationProgress, setGenerationProgress] = useState(0)
    const [currentGenStep, setCurrentGenStep] = useState(0)

    const filteredCourses = mockAICourses.filter(course =>
        course.titleVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.language.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleSectionClick = (section: AISection, module: AIModule) => {
        setSelectedSection({ section, module })
    }

    const handleModuleClick = (module: AIModule) => {
        setSelectedModule(module)
    }

    const closeSectionModal = () => {
        setSelectedSection(null)
    }

    const closeModuleModal = () => {
        setSelectedModule(null)
    }

    const handleSectionFromModule = (section: AISection) => {
        if (selectedModule) {
            setSelectedSection({ section, module: selectedModule })
            setSelectedModule(null)
        }
    }

    const getTotalProgress = (course: AIGeneratedCourse) => {
        const allSections = course.modules.flatMap(m => m.sections)
        const completed = allSections.filter(s => s.completed).length
        const total = allSections.length
        return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 }
    }

    const handleStartGeneration = async () => {
        if (!newCourse.topic || !newCourse.language) return

        setCreateStep('generating')
        setGenerationProgress(0)
        setCurrentGenStep(0)

        // Simulate AI generation
        for (let i = 0; i < generationSteps.length; i++) {
            setCurrentGenStep(i)
            await new Promise(resolve => setTimeout(resolve, 1500))
            setGenerationProgress((i + 1) / generationSteps.length * 100)
        }

        setCreateStep('complete')
    }

    const resetCreateModal = () => {
        setShowCreateModal(false)
        setCreateStep('input')
        setNewCourse({ topic: '', language: '', difficulty: 'beginner', description: '' })
        setGenerationProgress(0)
        setCurrentGenStep(0)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
                <div className="absolute top-20 right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Header */}
            <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700 px-4 py-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Link href="/learn">
                                <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                                    <ArrowLeft className="w-5 h-5 text-slate-400" />
                                </button>
                            </Link>
                            <div className="flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-cyan-500" />
                                <h1 className="text-xl font-bold text-white">Thư viện bài học</h1>
                            </div>
                        </div>

                        {selectedCourse && (
                            <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl p-1">
                                <button
                                    onClick={() => setViewMode('mindmap')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${viewMode === 'mindmap'
                                        ? 'bg-cyan-500 text-white'
                                        : 'text-slate-400 hover:text-white'
                                        }`}
                                >
                                    <Map className="w-4 h-4" />
                                    <span className="text-sm font-medium">Mind Map</span>
                                </button>
                                <button
                                    onClick={() => setViewMode('outline')}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${viewMode === 'outline'
                                        ? 'bg-cyan-500 text-white'
                                        : 'text-slate-400 hover:text-white'
                                        }`}
                                >
                                    <List className="w-4 h-4" />
                                    <span className="text-sm font-medium">Outline</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Search */}
                    {!selectedCourse && (
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm khóa học..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-cyan-500 outline-none transition-colors"
                            />
                        </div>
                    )}
                </div>
            </header>

            {/* Content */}
            <main className="max-w-6xl mx-auto px-4 py-6 relative z-10">
                {selectedCourse ? (
                    <>
                        {/* Back to courses */}
                        <button
                            onClick={() => setSelectedCourse(null)}
                            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm">Quay lại danh sách</span>
                        </button>

                        {/* Course Content */}
                        <div className="bg-slate-800/30 rounded-2xl border border-slate-700 overflow-hidden">
                            {viewMode === 'mindmap' ? (
                                <div className="h-[700px]">
                                    <CourseMindMap
                                        course={selectedCourse}
                                        onSectionClick={handleSectionClick}
                                        onModuleClick={handleModuleClick}
                                    />
                                </div>
                            ) : (
                                <div className="p-6">
                                    <CourseOutline
                                        course={selectedCourse}
                                        onSectionClick={handleSectionClick}
                                        onModuleClick={handleModuleClick}
                                    />
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        {/* AI Course Generator Hero */}
                        <div className="mb-8 relative overflow-hidden">
                            <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl border border-cyan-500/20 p-6 md:p-8">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl" />
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-2xl" />

                                <div className="relative flex flex-col md:flex-row items-center gap-6">
                                    {/* Left - Icon & Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                                                <Wand2 className="w-7 h-7 text-white" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-black text-white">Tạo Khóa Học với AI</h2>
                                                <p className="text-cyan-400 text-sm font-medium">Powered by Coallingo AI ✨</p>
                                            </div>
                                        </div>
                                        <p className="text-slate-300 mb-6 max-w-lg">
                                            Nhập chủ đề bạn muốn học và AI sẽ tự động tạo ra một khóa học hoàn chỉnh với
                                            nội dung chi tiết, bài tập thực hành và mind map trực quan.
                                        </p>

                                        {/* Features */}
                                        <div className="flex flex-wrap gap-3">
                                            {[
                                                { icon: Brain, text: 'Nội dung thông minh' },
                                                { icon: Zap, text: 'Tạo trong 30 giây' },
                                                { icon: Code2, text: 'Bài tập thực hành' },
                                            ].map((feature, i) => (
                                                <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-full">
                                                    <feature.icon className="w-4 h-4 text-cyan-400" />
                                                    <span className="text-sm text-slate-300">{feature.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right - Create Button */}
                                    <div className="flex-shrink-0">
                                        <button
                                            onClick={() => setShowCreateModal(true)}
                                            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all hover:scale-105"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                                            <div className="relative flex items-center gap-3">
                                                <Plus className="w-6 h-6" />
                                                <span>Tạo Khóa Học Mới</span>
                                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Courses List Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-cyan-400" />
                                <span className="text-slate-300 font-medium">
                                    {filteredCourses.length} khóa học AI đã tạo
                                </span>
                            </div>
                        </div>

                        {/* Courses Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredCourses.map((course) => {
                                const progress = getTotalProgress(course)
                                return (
                                    <button
                                        key={course.id}
                                        onClick={() => setSelectedCourse(course)}
                                        className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 rounded-2xl p-5 text-left transition-all group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                                {course.icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded-full">
                                                        {course.language}
                                                    </span>
                                                </div>
                                                <h3 className="font-bold text-white text-lg truncate">{course.titleVi}</h3>
                                                <p className="text-sm text-slate-400 line-clamp-1 mt-1">{course.description}</p>
                                            </div>
                                            <button className="p-2 hover:bg-slate-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoreVertical className="w-4 h-4 text-slate-400" />
                                            </button>
                                        </div>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <BookOpen className="w-3.5 h-3.5" />
                                                    {course.modules.length} chương
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {course.totalDuration} phút
                                                </span>
                                            </div>
                                            <span className="text-sm font-bold text-cyan-400">
                                                {progress.percentage.toFixed(0)}%
                                            </span>
                                        </div>

                                        <div className="mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                                                style={{ width: `${progress.percentage}%` }}
                                            />
                                        </div>
                                    </button>
                                )
                            })}
                        </div>

                        {filteredCourses.length === 0 && (
                            <div className="text-center py-16">
                                <div className="w-20 h-20 mx-auto mb-4 bg-slate-800 rounded-2xl flex items-center justify-center">
                                    <Search className="w-8 h-8 text-slate-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-slate-300 mb-2">Không tìm thấy khóa học</h3>
                                <p className="text-slate-500">Thử tìm kiếm với từ khóa khác</p>
                            </div>
                        )}
                    </>
                )}
            </main>

            {/* Create Course Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-900 rounded-3xl border border-slate-700 max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                                    <Wand2 className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        {createStep === 'input' && 'Tạo Khóa Học Mới'}
                                        {createStep === 'generating' && 'AI đang tạo khóa học...'}
                                        {createStep === 'complete' && 'Hoàn thành! 🎉'}
                                    </h2>
                                    <p className="text-sm text-slate-400">
                                        {createStep === 'input' && 'Nhập thông tin để AI tạo khóa học'}
                                        {createStep === 'generating' && 'Vui lòng đợi trong giây lát'}
                                        {createStep === 'complete' && 'Khóa học đã sẵn sàng'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={resetCreateModal}
                                className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {createStep === 'input' && (
                                <div className="space-y-6">
                                    {/* Topic Input */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-2">
                                            Chủ đề bạn muốn học *
                                        </label>
                                        <div className="relative">
                                            <Brain className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                            <input
                                                type="text"
                                                value={newCourse.topic}
                                                onChange={(e) => setNewCourse({ ...newCourse, topic: e.target.value })}
                                                placeholder="VD: Machine Learning cơ bản, Web Scraping, API Development..."
                                                className="w-full pl-12 pr-4 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-cyan-500 outline-none transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Language Selection */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-3">
                                            Ngôn ngữ lập trình *
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {programmingLanguages.map((lang) => (
                                                <button
                                                    key={lang.id}
                                                    onClick={() => setNewCourse({ ...newCourse, language: lang.id })}
                                                    className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${newCourse.language === lang.id
                                                        ? 'border-cyan-500 bg-cyan-500/10'
                                                        : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                                                        }`}
                                                >
                                                    <Image src={lang.icon} alt={lang.name} width={32} height={32} />
                                                    <span className={`text-sm font-medium ${newCourse.language === lang.id ? 'text-cyan-400' : 'text-slate-300'
                                                        }`}>
                                                        {lang.name}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Difficulty */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-3">
                                            Trình độ
                                        </label>
                                        <div className="flex gap-3">
                                            {difficultyLevels.map((level) => (
                                                <button
                                                    key={level.id}
                                                    onClick={() => setNewCourse({ ...newCourse, difficulty: level.id })}
                                                    className={`flex-1 p-4 rounded-xl border-2 transition-all text-center ${newCourse.difficulty === level.id
                                                        ? 'border-cyan-500 bg-cyan-500/10'
                                                        : 'border-slate-700 hover:border-slate-600 bg-slate-800/50'
                                                        }`}
                                                >
                                                    <div className="text-2xl mb-1">{level.icon}</div>
                                                    <div className={`font-bold ${newCourse.difficulty === level.id ? 'text-cyan-400' : 'text-white'
                                                        }`}>
                                                        {level.name}
                                                    </div>
                                                    <div className="text-xs text-slate-500">{level.description}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-2">
                                            Mô tả thêm (không bắt buộc)
                                        </label>
                                        <textarea
                                            value={newCourse.description}
                                            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                                            placeholder="Bạn muốn tập trung vào phần nào? Có yêu cầu đặc biệt gì không?"
                                            rows={3}
                                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder:text-slate-500 focus:border-cyan-500 outline-none transition-colors resize-none"
                                        />
                                    </div>

                                    {/* Generate Button */}
                                    <button
                                        onClick={handleStartGeneration}
                                        disabled={!newCourse.topic || !newCourse.language}
                                        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                                    >
                                        <Sparkles className="w-6 h-6" />
                                        <span>Tạo Khóa Học với AI</span>
                                    </button>
                                </div>
                            )}

                            {createStep === 'generating' && (
                                <div className="py-8">
                                    {/* Hourglass Animation */}
                                    <div className="flex flex-col items-center justify-center py-8">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />
                                            <LottieMascot size={180} animationFile="Sandy Loading.json" />
                                        </div>

                                        <div className="mt-6 text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 tracking-tight">
                                            {Math.round(generationProgress)}%
                                        </div>

                                        {/* Dynamic Current Step */}
                                        <div className="mt-4 flex flex-col items-center gap-2 h-16">
                                            <h3 className="text-xl font-bold text-white animate-pulse">
                                                {generationSteps[currentGenStep]?.name || 'Đang xử lý...'}
                                            </h3>
                                            <p className="text-slate-400 text-sm">
                                                AI đang làm việc chăm chỉ để tạo khóa học cho bạn
                                            </p>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-64 h-2 bg-slate-800 rounded-full mt-6 overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ease-out"
                                                style={{ width: `${generationProgress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {createStep === 'complete' && (
                                <div className="py-8 text-center">
                                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                                        <Check className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">
                                        Khóa học đã sẵn sàng!
                                    </h3>
                                    <p className="text-slate-400 mb-6">
                                        AI đã tạo xong khóa học "{newCourse.topic}" cho bạn.
                                        Bắt đầu học ngay thôi!
                                    </p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={resetCreateModal}
                                            className="flex-1 py-3 border border-slate-600 text-slate-300 font-semibold rounded-xl hover:bg-slate-800 transition-colors"
                                        >
                                            Đóng
                                        </button>
                                        <button
                                            onClick={resetCreateModal}
                                            className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:opacity-90 transition-all"
                                        >
                                            Xem khóa học
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Section Detail Modal */}
            {selectedSection && selectedCourse && (
                <SectionDetailModal
                    section={selectedSection.section}
                    module={selectedSection.module}
                    courseId={selectedCourse.id}
                    isOpen={true}
                    onClose={closeSectionModal}
                />
            )}

            {/* Module Detail Modal */}
            {selectedModule && selectedCourse && (
                <ModuleDetailModal
                    module={selectedModule}
                    course={selectedCourse}
                    isOpen={true}
                    onClose={closeModuleModal}
                    onSectionClick={handleSectionFromModule}
                />
            )}
        </div>
    )
}
