'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import RightSidebar from '@/components/RightSidebar'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { mockUnits, mockLanguages, mockUser } from '@/data/mockData'
import { Dumbbell, Zap, Trophy, Target, Clock, Flame, Check, Lock, Star, ChevronRight, Brain, Code, Sparkles, Play } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
})

export default function PracticePage() {
    const [selectedMode, setSelectedMode] = useState<'all' | 'review' | 'mistakes' | 'speed'>('all')

    const practiceModes = [
        {
            id: 'review',
            title: 'Ôn tập',
            description: 'Ôn lại các bài đã học',
            icon: '📖',
            color: 'from-primary-blue to-accent-blue',
            xpReward: 10,
            available: true
        },
        {
            id: 'mistakes',
            title: 'Sửa lỗi sai',
            description: 'Luyện tập các câu bạn đã sai',
            icon: '🔧',
            color: 'from-duo-orange to-duo-red',
            xpReward: 15,
            available: true,
            count: 12
        },
        {
            id: 'speed',
            title: 'Tốc độ',
            description: 'Trả lời nhanh trong thời gian giới hạn',
            icon: '⚡',
            color: 'from-duo-yellow to-duo-orange',
            xpReward: 20,
            available: true
        },
        {
            id: 'listening',
            title: 'Luyện nghe',
            description: 'Nghe và hiểu code',
            icon: '🎧',
            color: 'from-duo-purple to-primary-blue',
            xpReward: 15,
            available: false
        }
    ]

    const practiceTopics = [
        { id: 1, title: 'Biến và kiểu dữ liệu', icon: '📦', mastery: 85, lessons: 5 },
        { id: 2, title: 'Câu lệnh điều kiện', icon: '🔀', mastery: 72, lessons: 4 },
        { id: 3, title: 'Vòng lặp', icon: '🔄', mastery: 60, lessons: 6 },
        { id: 4, title: 'Hàm', icon: '🔧', mastery: 45, lessons: 5 },
        { id: 5, title: 'Lists và Arrays', icon: '📋', mastery: 30, lessons: 4 },
        { id: 6, title: 'Dictionaries', icon: '📖', mastery: 0, lessons: 3, locked: true },
    ]

    const dailyChallenge = {
        title: 'Thử thách hôm nay',
        description: '10 câu hỏi ngẫu nhiên',
        xpReward: 50,
        gemsReward: 10,
        timeLimit: '5 phút',
        completed: false
    }

    const currentLanguage = mockLanguages.find(l => l.progress > 0)

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Sidebar />

            <main className="pt-16 lg:pl-64 xl:pr-80">
                <div className="max-w-3xl mx-auto p-4 sm:p-6">
                    {/* Hero Header */}
                    <div className="relative mb-8 p-6 bg-gradient-to-br from-duo-green/20 via-primary-blue/10 to-accent-blue/10 rounded-3xl border border-duo-green/30 overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-duo-green/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-blue/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                        <div className="relative flex items-center justify-between">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-duo-green/20 rounded-full mb-3">
                                    <Image src="/images/dumbbell.png" alt="Practice" width={24} height={24} />
                                    <span className="text-xs font-bold text-duo-green uppercase tracking-wider">
                                        Luyện tập
                                    </span>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-black text-gray-800 mb-2">
                                    Rèn luyện kỹ năng
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    Củng cố kiến thức với các bài luyện tập được cá nhân hóa
                                </p>
                            </div>
                            <div className="hidden sm:block">
                                <LottieMascot size={120} animationFile="STUDENT.json" />
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-4 grid grid-cols-3 gap-3">
                            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-200/50 text-center">
                                <div className="text-xl font-black text-duo-green">{mockUser.totalLessonsCompleted}</div>
                                <div className="text-xs text-gray-500 font-semibold">Bài đã học</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-200/50 text-center">
                                <div className="text-xl font-black text-duo-yellow">12</div>
                                <div className="text-xs text-gray-500 font-semibold">Cần ôn tập</div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-gray-200/50 text-center">
                                <div className="text-xl font-black text-primary-blue">{currentLanguage?.progress}%</div>
                                <div className="text-xs text-gray-500 font-semibold">Thành thạo</div>
                            </div>
                        </div>
                    </div>

                    {/* Daily Challenge Banner */}
                    <div className="mb-6 p-5 bg-gradient-to-r from-duo-yellow/20 via-duo-orange/20 to-duo-red/20 rounded-3xl border border-duo-yellow/30 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-duo-yellow/30 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center">
                                    <LottieMascot size={64} animationFile="Premium Gold.json" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-bold text-lg text-gray-800">{dailyChallenge.title}</span>
                                        <span className="text-xs bg-duo-red/20 text-duo-red px-2 py-0.5 rounded-full font-bold animate-pulse">
                                            HOT
                                        </span>
                                    </div>
                                    <div className="text-sm text-gray-600">{dailyChallenge.description}</div>
                                    <div className="flex items-center gap-3 mt-2 text-xs">
                                        <span className="flex items-center gap-1 text-duo-yellow font-bold">
                                            <Zap className="w-3 h-3" /> +{dailyChallenge.xpReward} XP
                                        </span>
                                        <span className="flex items-center gap-1 text-accent-blue font-bold">
                                            <LottieMascot size={16} animationFile="Stone.json" /> +{dailyChallenge.gemsReward}
                                        </span>
                                        <span className="flex items-center gap-1 text-gray-500">
                                            <Clock className="w-3 h-3" /> {dailyChallenge.timeLimit}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Link href="/training/challenge">
                                <button className="px-5 py-3 bg-duo-yellow text-white font-bold rounded-xl shadow-[0_4px_0_0_#e5ac00] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all flex items-center gap-2">
                                    <Play className="w-4 h-4" fill="white" />
                                    Bắt đầu
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Practice Modes */}
                    <div className="mb-6">
                        <h2 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
                            <Brain className="w-5 h-5 text-duo-purple" />
                            Chế độ luyện tập
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            {practiceModes.map((mode) => (
                                <Link
                                    key={mode.id}
                                    href={mode.available ? `/training/${mode.id}` : '#'}
                                    className={!mode.available ? 'pointer-events-none' : ''}
                                >
                                    <div
                                        className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer h-full ${mode.available
                                            ? 'bg-white border-gray-200 hover:border-primary-blue/50 hover:shadow-lg'
                                            : 'bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed'
                                            }`}
                                    >
                                        {mode.count && (
                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-duo-red rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                {mode.count}
                                            </div>
                                        )}
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${mode.color} flex items-center justify-center text-2xl mb-3 shadow-md`}>
                                            {mode.icon}
                                        </div>
                                        <div className="font-bold text-gray-800">{mode.title}</div>
                                        <div className="text-xs text-gray-500 mb-2">{mode.description}</div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-duo-yellow flex items-center gap-1">
                                                <Zap className="w-3 h-3" /> +{mode.xpReward} XP
                                            </span>
                                            {!mode.available && (
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Lock className="w-3 h-3" /> Sắp ra mắt
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Practice by Topic */}
                    <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
                                <Code className="w-5 h-5 text-primary-blue" />
                                Luyện theo chủ đề
                            </h2>
                            <span className="text-sm text-gray-500">
                                {currentLanguage?.name || 'Python'}
                            </span>
                        </div>

                        <div className="space-y-3">
                            {practiceTopics.map((topic) => (
                                <div
                                    key={topic.id}
                                    className={`p-4 rounded-2xl border-2 transition-all ${topic.locked
                                        ? 'bg-gray-50 border-gray-200 opacity-60'
                                        : 'bg-white border-gray-200 hover:border-primary-blue/50 hover:shadow-md cursor-pointer'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${topic.locked ? 'bg-gray-200' : 'bg-primary-blue/10'
                                            }`}>
                                            {topic.locked ? <Lock className="w-5 h-5 text-gray-400" /> : topic.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-gray-800 flex items-center gap-2">
                                                {topic.title}
                                                {topic.mastery >= 80 && (
                                                    <Star className="w-4 h-4 text-duo-yellow" fill="#ffc800" />
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-500">{topic.lessons} bài học</div>

                                            {!topic.locked && (
                                                <div className="mt-2">
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-gray-500">Thành thạo</span>
                                                        <span className="font-bold text-primary-blue">{topic.mastery}%</span>
                                                    </div>
                                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all ${topic.mastery >= 80 ? 'bg-duo-green' :
                                                                topic.mastery >= 50 ? 'bg-duo-yellow' :
                                                                    'bg-primary-blue'
                                                                }`}
                                                            style={{ width: `${topic.mastery}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        {!topic.locked && (
                                            <ChevronRight className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Recommendation */}
                    <div className="mt-6 p-5 bg-gradient-to-br from-duo-purple/10 via-primary-blue/10 to-accent-blue/10 rounded-3xl border border-duo-purple/20">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0">
                                <LottieMascot size={48} animationFile="person/Cute astronaut read book on planet cartoon.json" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                                    Đề xuất từ AI
                                    <span className="text-xs bg-duo-purple/20 text-duo-purple px-2 py-0.5 rounded-full font-semibold">
                                        Mới
                                    </span>
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    Dựa trên tiến độ của bạn, AI gợi ý bạn nên ôn tập lại chủ đề <strong>"Vòng lặp"</strong> để củng cố kiến thức.
                                </p>
                                <Link href="/ai-practice?section=sec-3-2&topic=vong-lap">
                                    <button className="px-4 py-2 bg-duo-purple text-white font-bold rounded-xl text-sm hover:brightness-110 shadow-[0_2px_0_0_#9333ea] active:shadow-none active:translate-y-0.5 transition-all flex items-center gap-2">
                                        <Play className="w-4 h-4" fill="white" />
                                        Bắt đầu ôn tập
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <RightSidebar />
        </div>
    )
}
