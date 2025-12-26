'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, CheckCircle, Circle, Clock, BookOpen, Code2 } from 'lucide-react'
import { AIGeneratedCourse, AIModule, AISection } from '@/data/mockData'

interface CourseOutlineProps {
    course: AIGeneratedCourse
    onSectionClick?: (section: AISection, module: AIModule) => void
    onModuleClick?: (module: AIModule) => void
}

export default function CourseOutline({ course, onSectionClick, onModuleClick }: CourseOutlineProps) {
    const [expandedModules, setExpandedModules] = useState<string[]>(
        course.modules.filter(m => !m.completed).slice(0, 1).map(m => m.id)
    )

    const toggleModule = (moduleId: string) => {
        setExpandedModules(prev =>
            prev.includes(moduleId)
                ? prev.filter(id => id !== moduleId)
                : [...prev, moduleId]
        )
    }

    const getModuleProgress = (module: AIModule) => {
        const completed = module.sections.filter(s => s.completed).length
        const total = module.sections.length
        return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 }
    }

    const getTotalProgress = () => {
        const allSections = course.modules.flatMap(m => m.sections)
        const completed = allSections.filter(s => s.completed).length
        const total = allSections.length
        return { completed, total, percentage: total > 0 ? (completed / total) * 100 : 0 }
    }

    const totalProgress = getTotalProgress()

    return (
        <div className="space-y-4">
            {/* Course Header */}
            <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-3xl">
                        {course.icon}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded-full">
                                AI Generated
                            </span>
                            <span className="text-xs text-slate-500">{course.createdAt}</span>
                        </div>
                        <h2 className="text-xl font-bold text-white">{course.titleVi}</h2>
                        <p className="text-sm text-slate-400 mt-1">{course.description}</p>
                    </div>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">
                        {totalProgress.completed} / {totalProgress.total} bài học
                    </span>
                    <span className="text-sm font-bold text-cyan-400">
                        {totalProgress.percentage.toFixed(0)}%
                    </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                        style={{ width: `${totalProgress.percentage}%` }}
                    />
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.modules.length} chương</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{course.totalDuration} phút</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <Code2 className="w-4 h-4" />
                        <span>{course.language}</span>
                    </div>
                </div>
            </div>

            {/* Modules List */}
            <div className="space-y-3">
                {course.modules.map((module, moduleIndex) => {
                    const progress = getModuleProgress(module)
                    const isExpanded = expandedModules.includes(module.id)

                    return (
                        <div
                            key={module.id}
                            className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden"
                        >
                            {/* Module Header */}
                            <button
                                onClick={() => toggleModule(module.id)}
                                onDoubleClick={() => onModuleClick?.(module)}
                                className="w-full flex items-center justify-between p-4 hover:bg-slate-800/80 transition-colors"
                                title="Double-click to view details"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${module.completed
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-slate-700 text-slate-300'
                                        }`}>
                                        {moduleIndex + 1}
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-white">{module.titleVi}</h3>
                                        <p className="text-xs text-slate-400">{module.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <div className="text-xs text-slate-400">
                                            {progress.completed}/{progress.total}
                                        </div>
                                        <div className="w-20 h-1.5 bg-slate-700 rounded-full overflow-hidden mt-1">
                                            <div
                                                className={`h-full rounded-full transition-all ${progress.percentage === 100
                                                    ? 'bg-emerald-500'
                                                    : 'bg-cyan-500'
                                                    }`}
                                                style={{ width: `${progress.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                    {isExpanded ? (
                                        <ChevronDown className="w-5 h-5 text-slate-400" />
                                    ) : (
                                        <ChevronRight className="w-5 h-5 text-slate-400" />
                                    )}
                                </div>
                            </button>

                            {/* Sections List */}
                            {isExpanded && (
                                <div className="border-t border-slate-700 bg-slate-900/30">
                                    {module.sections.map((section, sectionIndex) => (
                                        <button
                                            key={section.id}
                                            onClick={() => onSectionClick?.(section, module)}
                                            className="w-full flex items-center gap-3 p-3 pl-14 hover:bg-slate-800/50 transition-colors border-b border-slate-700/50 last:border-b-0"
                                        >
                                            {section.completed ? (
                                                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                            ) : (
                                                <Circle className="w-5 h-5 text-slate-500 flex-shrink-0" />
                                            )}
                                            <div className="flex-1 text-left">
                                                <span className={`text-sm ${section.completed ? 'text-slate-400' : 'text-slate-200'}`}>
                                                    {sectionIndex + 1}. {section.titleVi}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs text-slate-500">
                                                <Clock className="w-3 h-3" />
                                                {section.duration} min
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
