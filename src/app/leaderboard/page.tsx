'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import RightSidebar from '@/components/RightSidebar'
import dynamic from 'next/dynamic'
import { mockLeaderboard, mockUser } from '@/data/mockData'
import { Trophy, ChevronUp, ChevronDown, Minus, Crown, Flame, Zap, Medal, Star, TrendingUp, Users, Calendar } from 'lucide-react'
import { useState } from 'react'

const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
})

export default function LeaderboardPage() {
    const [selectedLeague, setSelectedLeague] = useState(2) // Gold
    const [timeFilter, setTimeFilter] = useState<'week' | 'month' | 'all'>('week')

    const leagues = [
        { name: 'Bronze', color: '#cd7f32', icon: '🥉', minXp: 0 },
        { name: 'Silver', color: '#c0c0c0', icon: '🥈', minXp: 1000 },
        { name: 'Gold', color: '#ffd700', icon: '🥇', minXp: 3000 },
        { name: 'Platinum', color: '#e5e4e2', icon: '💠', minXp: 5000 },
        { name: 'Diamond', color: '#b9f2ff', icon: <LottieMascot size={24} animationFile="Stone.json" />, minXp: 10000 },
    ]

    const currentLeague = leagues[selectedLeague]

    // Simulate user's position in leaderboard
    const userRank = 8
    const userInTop10 = userRank <= 10

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Sidebar />

            <main className="pt-16 lg:pl-64 xl:pr-80">
                <div className="max-w-3xl mx-auto p-4 sm:p-6">
                    {/* Hero Section */}
                    <div className="relative mb-8 p-6 bg-gradient-to-br from-duo-yellow/20 via-amber-100/30 to-orange-100/20 rounded-3xl border border-duo-yellow/30 overflow-hidden">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-duo-yellow/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-300/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                        <div className="relative flex items-center justify-between">
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-duo-yellow/20 rounded-full mb-3">
                                    <Trophy className="w-4 h-4 text-duo-yellow" fill="#ffc800" />
                                    <span className="text-xs font-bold text-duo-yellow uppercase tracking-wider">
                                        Bảng xếp hạng
                                    </span>
                                </div>
                                <h1 className="text-2xl sm:text-3xl font-black text-gray-800 mb-2">
                                    {currentLeague.icon} Giải {currentLeague.name}
                                </h1>
                                <p className="text-gray-600 text-sm">
                                    Top 10 sẽ thăng hạng · 3 cuối cùng sẽ xuống hạng
                                </p>
                            </div>
                            <div className="hidden sm:block">
                                <LottieMascot size={100} animationFile="Trophy.json" />
                            </div>
                        </div>

                        {/* Your Rank Card */}
                        <div className="mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary-blue/10 flex items-center justify-center text-2xl border-2 border-primary-blue/30">
                                        {mockUser.avatar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-gray-800">{mockUser.name}</div>
                                        <div className="text-xs text-gray-500">Hạng #{userRank} trong giải</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-primary-blue text-lg">{mockUser.totalXp.toLocaleString()} ⭐</div>
                                    {userInTop10 && (
                                        <div className="flex items-center gap-1 text-xs text-duo-green font-semibold">
                                            <TrendingUp className="w-3 h-3" />
                                            Đang thăng hạng!
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Time Filter Tabs */}
                    <div className="flex justify-center gap-2 mb-6">
                        {[
                            { key: 'week', label: 'Tuần này', icon: Calendar },
                            { key: 'month', label: 'Tháng này', icon: Calendar },
                            { key: 'all', label: 'Tất cả', icon: Users },
                        ].map((filter) => (
                            <button
                                key={filter.key}
                                onClick={() => setTimeFilter(filter.key as 'week' | 'month' | 'all')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${timeFilter === filter.key
                                    ? 'bg-primary-blue text-white shadow-lg shadow-primary-blue/20'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                <filter.icon className="w-4 h-4" />
                                {filter.label}
                            </button>
                        ))}
                    </div>

                    {/* League Tabs */}
                    <div className="flex justify-center gap-2 sm:gap-3 mb-8 flex-wrap">
                        {leagues.map((league, index) => (
                            <button
                                key={league.name}
                                onClick={() => setSelectedLeague(index)}
                                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center transition-all ${index === selectedLeague
                                    ? 'ring-4 ring-duo-yellow/40 shadow-xl scale-110 bg-white'
                                    : 'opacity-60 hover:opacity-90 bg-white/50'
                                    }`}
                                style={{
                                    borderColor: index === selectedLeague ? league.color : 'transparent',
                                    borderWidth: index === selectedLeague ? 3 : 0
                                }}
                            >
                                <span className="text-2xl">{league.icon}</span>
                                <span className="text-[10px] font-bold text-gray-500 mt-0.5">{league.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Top 3 Podium - Premium Design */}
                    <div className="relative mb-8">
                        {/* Spotlight effect */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-gradient-to-b from-duo-yellow/20 to-transparent rounded-full blur-3xl" />

                        <div className="relative flex justify-center items-end gap-3 sm:gap-6">
                            {/* 2nd Place */}
                            <div className="text-center relative animate-fade-in" style={{ animationDelay: '0.1s' }}>
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                                    <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg">
                                        2
                                    </div>
                                </div>
                                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-3xl sm:text-4xl border-4 border-gray-400 shadow-xl relative">
                                    {mockLeaderboard[1]?.avatar}
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                                        <Medal className="w-3 h-3 text-white" />
                                    </div>
                                </div>
                                <div className="font-bold text-gray-700 text-sm truncate max-w-[80px]">{mockLeaderboard[1]?.name}</div>
                                <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                                    <Zap className="w-3 h-3 text-gray-400" />
                                    {mockLeaderboard[1]?.xp.toLocaleString()}
                                </div>
                                <div className="mt-2 w-20 sm:w-24 h-20 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-2xl flex items-center justify-center shadow-inner mx-auto">
                                    <span className="text-3xl font-black text-white drop-shadow-lg">2</span>
                                </div>
                            </div>

                            {/* 1st Place */}
                            <div className="text-center relative -mt-4 animate-fade-in">
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                    <Crown className="w-8 h-8 text-duo-yellow drop-shadow-lg animate-trophy-bounce" fill="#ffc800" />
                                </div>
                                <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto mb-2 rounded-full bg-gradient-to-br from-duo-yellow/40 to-amber-300 flex items-center justify-center text-4xl sm:text-5xl border-4 border-duo-yellow shadow-2xl relative animate-glow">
                                    {mockLeaderboard[0]?.avatar}
                                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-duo-yellow rounded-full flex items-center justify-center shadow-lg">
                                        <Star className="w-4 h-4 text-white" fill="white" />
                                    </div>
                                </div>
                                <div className="font-bold text-gray-800 text-base">{mockLeaderboard[0]?.name}</div>
                                <div className="text-sm text-duo-yellow font-bold flex items-center justify-center gap-1">
                                    <Flame className="w-4 h-4" />
                                    {mockLeaderboard[0]?.xp.toLocaleString()} ⭐
                                </div>
                                <div className="mt-2 w-24 sm:w-32 h-28 bg-gradient-to-t from-duo-yellow to-amber-400 rounded-t-2xl flex items-center justify-center shadow-lg mx-auto">
                                    <div className="text-center">
                                        <span className="text-4xl">👑</span>
                                        <div className="text-xs font-bold text-white/80 mt-1">Champion</div>
                                    </div>
                                </div>
                            </div>

                            {/* 3rd Place */}
                            <div className="text-center relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                                    <div className="w-6 h-6 bg-amber-600 rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg">
                                        3
                                    </div>
                                </div>
                                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-amber-200 to-amber-400 flex items-center justify-center text-3xl sm:text-4xl border-4 border-amber-500 shadow-xl relative">
                                    {mockLeaderboard[2]?.avatar}
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                                        <Medal className="w-3 h-3 text-white" />
                                    </div>
                                </div>
                                <div className="font-bold text-gray-700 text-sm truncate max-w-[80px]">{mockLeaderboard[2]?.name}</div>
                                <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                                    <Zap className="w-3 h-3 text-amber-500" />
                                    {mockLeaderboard[2]?.xp.toLocaleString()}
                                </div>
                                <div className="mt-2 w-20 sm:w-24 h-16 bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-2xl flex items-center justify-center shadow-inner mx-auto">
                                    <span className="text-3xl font-black text-white drop-shadow-lg">3</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Summary */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className="bg-white p-4 rounded-2xl border border-gray-200 text-center shadow-sm">
                            <div className="text-2xl font-black text-primary-blue">{mockLeaderboard.length}</div>
                            <div className="text-xs text-gray-500 font-semibold">Người chơi</div>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-gray-200 text-center shadow-sm">
                            <div className="text-2xl font-black text-duo-yellow">{mockLeaderboard[0]?.xp.toLocaleString()}</div>
                            <div className="text-xs text-gray-500 font-semibold">⭐ cao nhất</div>
                        </div>
                        <div className="bg-white p-4 rounded-2xl border border-gray-200 text-center shadow-sm">
                            <div className="text-2xl font-black text-duo-green">72h</div>
                            <div className="text-xs text-gray-500 font-semibold">Còn lại</div>
                        </div>
                    </div>

                    {/* Full Ranking List */}
                    <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-lg">
                        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-gray-700">Bảng xếp hạng đầy đủ</span>
                                <span className="text-xs text-gray-500">{mockLeaderboard.length} người chơi</span>
                            </div>
                        </div>

                        {mockLeaderboard.map((user, index) => {
                            const isPromotion = index < 3
                            const isDemotion = index >= mockLeaderboard.length - 3
                            const isCurrentUser = user.name === mockUser.name || index === userRank - 1

                            return (
                                <div
                                    key={user.id}
                                    className={`flex items-center gap-3 p-4 border-b border-gray-50 last:border-b-0 transition-all ${isCurrentUser
                                        ? 'bg-primary-blue/5 border-l-4 border-l-primary-blue'
                                        : isPromotion
                                            ? 'bg-duo-green/5 hover:bg-duo-green/10'
                                            : isDemotion
                                                ? 'bg-duo-red/5 hover:bg-duo-red/10'
                                                : 'hover:bg-gray-50'
                                        }`}
                                >
                                    {/* Rank */}
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${index === 0 ? 'bg-gradient-to-br from-duo-yellow to-amber-500 text-white shadow-lg' :
                                        index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-white shadow-md' :
                                            index === 2 ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-md' :
                                                isCurrentUser ? 'bg-primary-blue text-white' :
                                                    'bg-gray-100 text-gray-600'
                                        }`}>
                                        {index < 3 ? ['🥇', '🥈', '🥉'][index] : user.rank}
                                    </div>

                                    {/* Avatar & Name */}
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${isCurrentUser ? 'ring-2 ring-primary-blue ring-offset-2' : ''
                                            }`} style={{ backgroundColor: `${leagues[selectedLeague].color}20` }}>
                                            {user.avatar}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="font-bold text-gray-800 truncate flex items-center gap-2">
                                                {user.name}
                                                {isCurrentUser && (
                                                    <span className="text-xs bg-primary-blue/10 text-primary-blue px-2 py-0.5 rounded-full font-semibold">
                                                        Bạn
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-xs text-gray-500 flex items-center gap-2">
                                                <span>Level {user.level}</span>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                <span>{user.league}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* XP */}
                                    <div className="text-right">
                                        <div className="font-bold text-primary-blue flex items-center gap-1">
                                            <Zap className="w-4 h-4" />
                                            {user.xp.toLocaleString()}
                                        </div>
                                        <div className="text-xs text-gray-400">⭐</div>
                                    </div>

                                    {/* Movement indicator */}
                                    <div className="w-8 flex justify-center">
                                        {isPromotion ? (
                                            <div className="w-6 h-6 rounded-full bg-duo-green/20 flex items-center justify-center">
                                                <ChevronUp className="w-4 h-4 text-duo-green" />
                                            </div>
                                        ) : isDemotion ? (
                                            <div className="w-6 h-6 rounded-full bg-duo-red/20 flex items-center justify-center">
                                                <ChevronDown className="w-4 h-4 text-duo-red" />
                                            </div>
                                        ) : (
                                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                                <Minus className="w-4 h-4 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-6 text-sm text-gray-500">
                        <div className="flex items-center gap-2 bg-duo-green/10 px-3 py-1.5 rounded-full">
                            <div className="w-5 h-5 rounded-full bg-duo-green/20 flex items-center justify-center">
                                <ChevronUp className="w-3 h-3 text-duo-green" />
                            </div>
                            <span className="font-semibold text-duo-green">Thăng hạng</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                            <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                                <Minus className="w-3 h-3 text-gray-500" />
                            </div>
                            <span className="font-semibold text-gray-600">Giữ nguyên</span>
                        </div>
                        <div className="flex items-center gap-2 bg-duo-red/10 px-3 py-1.5 rounded-full">
                            <div className="w-5 h-5 rounded-full bg-duo-red/20 flex items-center justify-center">
                                <ChevronDown className="w-3 h-3 text-duo-red" />
                            </div>
                            <span className="font-semibold text-duo-red">Xuống hạng</span>
                        </div>
                    </div>

                    {/* Weekly Prize Info */}
                    <div className="mt-8 p-5 bg-gradient-to-br from-duo-purple/10 via-primary-blue/10 to-accent-blue/10 rounded-3xl border border-duo-purple/20">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-duo-purple/20 flex items-center justify-center text-2xl shrink-0">
                                🎁
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 mb-1">Phần thưởng tuần này</h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    Lọt vào top 3 để nhận gems và các phần thưởng đặc biệt!
                                </p>
                                <div className="flex gap-3">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl text-sm font-semibold">
                                        <span>🥇</span>
                                        <span className="text-duo-yellow">100 gems</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl text-sm font-semibold">
                                        <span>🥈</span>
                                        <span className="text-gray-500">50 gems</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl text-sm font-semibold">
                                        <span>🥉</span>
                                        <span className="text-amber-600">25 gems</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <RightSidebar />
        </div>
    )
}
