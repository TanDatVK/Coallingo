'use client'

import { X, BookOpen, Clock, CheckCircle, ChevronRight, Play, FileText } from 'lucide-react'
import { AIModule, AIGeneratedCourse, AISection } from '@/data/mockData'
import { useRouter } from 'next/navigation'

interface ModuleDetailModalProps {
    module: AIModule
    course: AIGeneratedCourse
    isOpen: boolean
    onClose: () => void
    onSectionClick: (section: AISection) => void
}

export default function ModuleDetailModal({ module, course, isOpen, onClose, onSectionClick }: ModuleDetailModalProps) {
    const router = useRouter()

    if (!isOpen) return null

    const completedSections = module.sections.filter(s => s.completed).length
    const totalDuration = module.sections.reduce((sum, s) => sum + s.duration, 0)
    const progress = (completedSections / module.sections.length) * 100

    const handlePracticeAll = () => {
        onClose()
        router.push(`/training/practice?module=${module.id}`)
    }

    const handleTestAll = () => {
        onClose()
        router.push(`/training/test?module=${module.id}`)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in">
                {/* Header */}
                <div className="bg-gradient-to-r from-violet-500 to-purple-600 p-6 text-white">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                        <span>{course.icon} {course.titleVi}</span>
                        <span>•</span>
                        <span>Chương {module.order}</span>
                    </div>

                    <h2 className="text-2xl font-black">{module.titleVi}</h2>
                    <p className="text-white/90 text-sm mt-1">{module.title}</p>

                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{totalDuration} phút</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                            <BookOpen className="w-4 h-4" />
                            <span>{module.sections.length} bài học</span>
                        </div>
                        {module.completed && (
                            <div className="flex items-center gap-2 text-green-300 text-sm">
                                <CheckCircle className="w-4 h-4" />
                                <span>Đã hoàn thành</span>
                            </div>
                        )}
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4">
                        <div className="flex justify-between text-sm text-white/80 mb-1">
                            <span>Tiến độ</span>
                            <span>{completedSections}/{module.sections.length} bài</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="p-4 bg-violet-50 border-b border-violet-100">
                    <p className="text-gray-700">{module.description}</p>
                </div>

                {/* Sections List */}
                <div className="overflow-y-auto max-h-[40vh]">
                    <div className="p-4">
                        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-violet-500" />
                            Danh sách bài học
                        </h3>

                        <div className="space-y-2">
                            {module.sections.map((section, index) => (
                                <button
                                    key={section.id}
                                    onClick={() => onSectionClick(section)}
                                    className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all hover:shadow-md ${section.completed
                                            ? 'bg-green-50 border-green-200 hover:border-green-300'
                                            : 'bg-white border-gray-200 hover:border-violet-300'
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${section.completed
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                        }`}>
                                        {section.completed ? <CheckCircle className="w-5 h-5" /> : index + 1}
                                    </div>

                                    <div className="flex-1 text-left">
                                        <div className="font-semibold text-gray-800">{section.titleVi}</div>
                                        <div className="text-sm text-gray-500 flex items-center gap-2">
                                            <Clock className="w-3 h-3" />
                                            <span>{section.duration} phút</span>
                                        </div>
                                    </div>

                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-gray-200 p-4 bg-gray-50 flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={handlePracticeAll}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:brightness-105 transition-all shadow-lg shadow-green-500/30"
                    >
                        <Play className="w-5 h-5" />
                        Luyện tập cả chương
                    </button>
                    <button
                        onClick={handleTestAll}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-xl hover:brightness-105 transition-all shadow-lg shadow-violet-500/30"
                    >
                        <FileText className="w-5 h-5" />
                        Kiểm tra chương
                    </button>
                </div>
            </div>
        </div>
    )
}
