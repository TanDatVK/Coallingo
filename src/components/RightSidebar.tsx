'use client'

import { mockUser, mockDailyQuests, mockLeaderboard } from '@/data/mockData'
import { Target, Trophy, ChevronRight, Star } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Dynamic import Lottie
const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
})

export default function RightSidebar() {
    return (
        <aside className="fixed right-0 top-16 bottom-0 w-80 bg-white border-l border-gray-100 hidden xl:block overflow-y-auto p-4">
            {/* XP Progress */}
            <div className="bg-primary-blue/5 rounded-2xl p-4 border border-primary-blue/20 mb-4">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-primary-blue" fill="#1e3a5f" />
                        <span className="text-gray-600 font-semibold">Level {mockUser.level}</span>
                    </div>
                    <span className="text-primary-blue font-bold">{mockUser.xp} / {mockUser.xpToNextLevel} ⭐</span>
                </div>
                <div className="h-4 bg-white rounded-full overflow-hidden border border-primary-blue/20">
                    <div
                        className="h-full bg-primary-blue rounded-full transition-all duration-1000"
                        style={{ width: `${(mockUser.xp / mockUser.xpToNextLevel) * 100}%` }}
                    />
                </div>
                <div className="mt-2 text-xs text-gray-500 text-center">
                    Còn <span className="font-bold text-primary-blue">{mockUser.xpToNextLevel - mockUser.xp} ⭐</span> để lên level
                </div>
            </div>

            {/* Streak Highlight with Lottie Animation */}
            <div className="bg-gradient-to-br from-duo-orange/10 to-duo-yellow/10 rounded-2xl p-4 border border-duo-orange/20 mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-duo-orange/20 rounded-2xl flex items-center justify-center">
                        <LottieMascot size={50} animationFile="Fire Streak Orange.json" />
                    </div>
                    <div>
                        <div className="text-3xl font-black text-duo-orange">{mockUser.streak} ngày</div>
                        <div className="text-sm text-gray-600 font-semibold">Chuỗi học tập!</div>
                    </div>
                </div>
                <p className="mt-3 text-sm text-gray-500 bg-white/50 rounded-xl p-2 text-center">
                    Học mỗi ngày để duy trì streak!
                </p>
            </div>

            {/* Stats Row with Lottie */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-duo-red/5 rounded-2xl p-3 border border-duo-red/20 flex items-center gap-2">
                    <LottieMascot size={36} animationFile="Like.json" />
                    <div>
                        <div className="text-xl font-black text-duo-red">{mockUser.hearts}</div>
                        <div className="text-xs text-gray-500">Tim</div>
                    </div>
                </div>
                <div className="bg-accent-blue/5 rounded-2xl p-3 border border-accent-blue/20 flex items-center gap-2">
                    <LottieMascot size={36} animationFile="Stone.json" />
                    <div>
                        <div className="text-xl font-black text-accent-blue">{mockUser.gems}</div>
                        <div className="text-xs text-gray-500">Gems</div>
                    </div>
                </div>
            </div>

            {/* Daily Quests */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200 mb-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <LottieMascot size={24} animationFile="Gift.json" />
                        <span className="font-bold text-gray-800">Nhiệm vụ hôm nay</span>
                    </div>
                    <Link href="/quests" className="text-xs text-primary-blue hover:text-primary-blue-dark font-bold">
                        Xem tất cả
                    </Link>
                </div>

                <div className="space-y-3">
                    {mockDailyQuests.slice(0, 3).map((quest) => (
                        <div
                            key={quest.id}
                            className={`p-3 rounded-xl border ${quest.completed
                                ? 'bg-duo-green/10 border-duo-green/30'
                                : 'bg-white border-gray-200'
                                }`}
                        >
                            <div className="flex items-start gap-3">
                                <span className="text-xl">{quest.completed ? '✅' : quest.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <div className={`font-bold text-sm ${quest.completed ? 'text-duo-green' : 'text-gray-800'}`}>
                                        {quest.title}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-0.5">{quest.description}</div>
                                    {!quest.completed && (
                                        <div className="mt-2">
                                            <div className="flex items-center justify-between text-xs mb-1">
                                                <span className="text-gray-400">{quest.progress}/{quest.maxProgress}</span>
                                                <span className="text-duo-yellow font-bold flex items-center gap-1">+{quest.xpReward} ⭐</span>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary-blue rounded-full"
                                                    style={{ width: `${(quest.progress / quest.maxProgress) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Mini Leaderboard */}
            <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-duo-yellow" fill="#ffc800" />
                        <span className="font-bold text-gray-800">Bảng xếp hạng</span>
                    </div>
                    <Link href="/leaderboard" className="text-xs text-primary-blue hover:text-primary-blue-dark font-bold">
                        Xem tất cả
                    </Link>
                </div>

                <div className="space-y-2">
                    {mockLeaderboard.slice(0, 5).map((user, index) => (
                        <div
                            key={user.id}
                            className={`flex items-center gap-3 p-2 rounded-xl ${index < 3 ? 'bg-white border border-gray-100' : ''
                                }`}
                        >
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${index === 0 ? 'bg-duo-yellow text-white' :
                                index === 1 ? 'bg-gray-300 text-white' :
                                    index === 2 ? 'bg-amber-500 text-white' :
                                        'bg-gray-100 text-gray-500'
                                }`}>
                                {user.rank}
                            </div>
                            <span className="text-xl">{user.avatar}</span>
                            <div className="flex-1 min-w-0">
                                <div className="font-semibold text-gray-700 text-sm truncate">{user.name}</div>
                            </div>
                            <div className="text-xs font-bold text-duo-yellow flex items-center gap-1">{user.xp.toLocaleString()} ⭐</div>
                        </div>
                    ))}
                </div>

                <Link
                    href="/leaderboard"
                    className="flex items-center justify-center gap-1 mt-3 py-2 text-sm text-primary-blue hover:text-primary-blue-dark font-bold transition-colors"
                >
                    <span>Xem bảng xếp hạng</span>
                    <ChevronRight size={16} />
                </Link>
            </div>
        </aside>
    )
}
