'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Image from 'next/image'
import {
    mockUser,
    mockLanguages,
    mockAchievements,
    mockWeeklyStats,
    mockLearningStats,
} from '@/data/mockData'
import {
    Flame, BookOpen, Calendar, Trophy, Lock,
    Camera, ChevronRight, Clock, Target, TrendingUp,
    Award, Users, ChevronLeft, Settings, Edit3, Save,
    X, Bell, Moon, Globe, Shield, LogOut, Volume2,
    Eye, EyeOff, Mail, User, Phone, Check
} from 'lucide-react'
import dynamic from 'next/dynamic'

const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-6 h-6 bg-gray-200 rounded animate-pulse" />
})

const AvatarEditorModal = dynamic(() => import('@/components/AvatarEditorModal'), {
    ssr: false
})

type TabType = 'overview' | 'edit' | 'settings'

export default function ProfilePage() {
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false)
    const [userAvatar, setUserAvatar] = useState(mockUser.avatar)
    const [customImage, setCustomImage] = useState<string | undefined>()
    const [selectedDayIndex, setSelectedDayIndex] = useState(mockWeeklyStats.length - 1)
    const [activeTab, setActiveTab] = useState<TabType>('overview')
    const [isSaving, setIsSaving] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    // Editable user info
    const [userInfo, setUserInfo] = useState({
        name: mockUser.name,
        email: 'user@example.com',
        phone: '0901234567',
        bio: 'Đang học lập trình với Coallingo! 🚀'
    })

    // Settings
    const [settings, setSettings] = useState({
        notifications: true,
        emailNotifications: true,
        soundEffects: true,
        darkMode: false,
        language: 'vi',
        backgroundTheme: 'default',
        showProfile: true,
        showProgress: true
    })

    const learningLanguages = mockLanguages.filter(l => l.progress > 0)
    const maxXp = Math.max(...mockWeeklyStats.map(s => s.xp))
    const totalWeeklyXp = mockWeeklyStats.reduce((sum, s) => sum + s.xp, 0)
    const totalWeeklyLessons = mockWeeklyStats.reduce((sum, s) => sum + s.lessons, 0)
    const selectedDay = mockWeeklyStats[selectedDayIndex]

    const handleAvatarSave = (avatar: string, image?: string) => {
        if (avatar === 'custom' && image) {
            setCustomImage(image)
            setUserAvatar('custom')
        } else {
            setUserAvatar(avatar)
            setCustomImage(undefined)
        }
    }

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return `${hours}h ${mins}m`
    }

    const handlePrevDay = () => {
        if (selectedDayIndex > 0) setSelectedDayIndex(selectedDayIndex - 1)
    }

    const handleNextDay = () => {
        if (selectedDayIndex < mockWeeklyStats.length - 1) setSelectedDayIndex(selectedDayIndex + 1)
    }

    const handleSaveProfile = async () => {
        setIsSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsSaving(false)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
    }

    const handleSaveSettings = async () => {
        setIsSaving(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsSaving(false)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
    }

    const tabs = [
        { id: 'overview' as TabType, label: 'Tổng quan', icon: User },
        { id: 'edit' as TabType, label: 'Chỉnh sửa', icon: Edit3 },
        { id: 'settings' as TabType, label: 'Cài đặt', icon: Settings },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Sidebar />

            <main className="pt-16 lg:pl-64">
                <div className="max-w-4xl mx-auto p-4 sm:p-6">
                    {/* Hero Profile Card */}
                    <div className="relative bg-gradient-to-br from-primary-blue via-primary-blue/90 to-accent-blue rounded-3xl p-6 sm:p-8 mb-6 overflow-hidden">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                                backgroundSize: '20px 20px'
                            }} />
                        </div>

                        <div className="relative flex flex-col sm:flex-row items-center gap-6">
                            {/* Avatar with Edit Button */}
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-6xl shadow-2xl border-4 border-white/30">
                                    {customImage ? (
                                        <Image src={customImage} alt="Avatar" width={128} height={128} className="rounded-full object-cover" />
                                    ) : (
                                        userAvatar
                                    )}
                                </div>
                                <button
                                    onClick={() => setIsAvatarModalOpen(true)}
                                    className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-primary-blue hover:scale-110 transition-transform"
                                >
                                    <Camera size={18} className="text-primary-blue" />
                                </button>
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-duo-yellow text-white font-black px-4 py-1 rounded-full text-sm shadow-lg">
                                    Lv.{mockUser.level}
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="flex-1 text-center sm:text-left text-white">
                                <h1 className="text-3xl sm:text-4xl font-black mb-2">{userInfo.name}</h1>
                                <p className="text-white/70 flex items-center justify-center sm:justify-start gap-2 mb-4">
                                    <Calendar size={16} />
                                    Tham gia từ tháng {mockUser.joinDate}
                                </p>

                                {/* XP Progress */}
                                <div className="max-w-md">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-white/70">Level {mockUser.level}</span>
                                        <span className="font-bold">{mockUser.xp}/{mockUser.xpToNextLevel} XP</span>
                                    </div>
                                    <div className="h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                                        <div
                                            className="h-full bg-duo-yellow rounded-full transition-all relative"
                                            style={{ width: `${(mockUser.xp / mockUser.xpToNextLevel) * 100}%` }}
                                        >
                                            <div className="absolute inset-0 bg-white/20 animate-pulse" />
                                        </div>
                                    </div>
                                </div>

                                {/* Quick Stats Row */}
                                <div className="flex justify-center sm:justify-start gap-6 mt-4">
                                    <div className="flex items-center gap-2">
                                        <LottieMascot size={24} animationFile="Fire Streak Orange.json" />
                                        <span className="font-bold">{mockUser.streak} ngày</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Trophy size={20} className="text-duo-yellow" />
                                        <span className="font-bold">Top {mockLearningStats.currentRank}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex gap-2 mb-6 bg-white rounded-2xl p-2 border border-gray-200 shadow-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === tab.id
                                    ? 'bg-primary-blue text-white shadow-lg'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Success Message */}
                    {showSuccess && (
                        <div className="mb-6 p-4 bg-duo-green/10 border border-duo-green/30 rounded-2xl flex items-center gap-3">
                            <div className="w-8 h-8 bg-duo-green rounded-full flex items-center justify-center">
                                <Save size={16} className="text-white" />
                            </div>
                            <span className="text-duo-green font-bold">Đã lưu thay đổi thành công!</span>
                        </div>
                    )}

                    {activeTab === 'overview' && (
                        <>
                            {/* Stats Overview Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                                {[
                                    { icon: <LottieMascot size={32} animationFile="Fire Streak Orange.json" />, value: mockUser.streak, label: 'Ngày streak', color: 'duo-orange' },
                                    { icon: <LottieMascot size={32} animationFile="Star.json" />, value: mockUser.totalXp.toLocaleString(), label: 'Tổng XP', color: 'primary-blue' },
                                    { icon: <Image src="/images/reading.png" alt="Reading" width={32} height={32} />, value: mockUser.completedLessons, label: 'Bài học', color: 'duo-green' },
                                    { icon: <LottieMascot size={32} animationFile="Stone.json" />, value: mockUser.gems, label: 'Stones', color: 'accent-blue' },
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white rounded-2xl border border-gray-200 p-4 text-center shadow-md hover:shadow-lg transition-shadow">
                                        <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                                            {stat.icon}
                                        </div>
                                        <div className="text-2xl font-black text-gray-800">{stat.value}</div>
                                        <div className="text-sm text-gray-500">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Weekly Progress Chart with Calendar Slider */}
                            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg mb-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-black text-gray-800">Hoạt động 7 ngày qua</h2>
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <LottieMascot size={16} animationFile="Star.json" />
                                            <span className="text-gray-600">XP</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Summary Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-primary-blue/5 rounded-2xl p-4 border border-primary-blue/20 flex items-center gap-3">
                                        <LottieMascot size={32} animationFile="Star.json" />
                                        <div>
                                            <div className="text-sm text-gray-500">Tổng XP tuần này</div>
                                            <div className="text-2xl font-black text-primary-blue">{totalWeeklyXp.toLocaleString()} XP</div>
                                        </div>
                                    </div>
                                    <div className="bg-duo-green/5 rounded-2xl p-4 border border-duo-green/20 flex items-center gap-3">
                                        <Image src="/images/reading.png" alt="Reading" width={32} height={32} />
                                        <div>
                                            <div className="text-sm text-gray-500">Bài học hoàn thành</div>
                                            <div className="text-2xl font-black text-duo-green">{totalWeeklyLessons} bài</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bar Chart - Fixed */}
                                <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-4 border border-gray-100">
                                    <div className="flex items-end justify-between gap-3 h-48">
                                        {mockWeeklyStats.map((stat, i) => {
                                            const heightPercent = maxXp > 0 ? (stat.xp / maxXp) * 100 : 0
                                            const minHeight = 20 // minimum bar height in pixels
                                            const isSelected = i === selectedDayIndex
                                            const isToday = i === mockWeeklyStats.length - 1

                                            return (
                                                <button
                                                    key={stat.day}
                                                    onClick={() => setSelectedDayIndex(i)}
                                                    className="flex-1 flex flex-col items-center gap-1 cursor-pointer group"
                                                >
                                                    {/* XP Value */}
                                                    <div className={`text-xs font-bold flex items-center gap-0.5 ${isSelected ? 'hidden' : 'text-gray-600'}`}>
                                                        <span className="text-duo-yellow">★</span>
                                                        {stat.xp}
                                                    </div>

                                                    <div className="flex-1 w-full flex items-end justify-center relative">
                                                        {isSelected ? (
                                                            <div className="w-20 h-20 -mb-2 z-10">
                                                                <LottieMascot size={80} animationFile="Calendar Animation.json" />
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className={`w-full max-w-[40px] rounded-t-xl transition-all duration-300 ${isToday
                                                                    ? 'bg-gradient-to-t from-duo-green to-duo-green/60 group-hover:scale-105'
                                                                    : 'bg-gradient-to-t from-primary-blue to-accent-blue group-hover:scale-105 group-hover:shadow-md'
                                                                    }`}
                                                                style={{
                                                                    height: `${Math.max(heightPercent, 15)}%`,
                                                                    minHeight: `${minHeight}px`
                                                                }}
                                                            />
                                                        )}
                                                    </div>

                                                    {/* Day Label */}
                                                    <div className={`mt-1 text-xs font-bold px-2 py-1 rounded-lg transition-all ${isSelected
                                                        ? 'bg-duo-orange text-white'
                                                        : isToday
                                                            ? 'bg-duo-green/20 text-duo-green'
                                                            : 'text-gray-500 group-hover:bg-gray-100'
                                                        }`}>
                                                        {stat.dayShort}
                                                    </div>
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>

                                {/* Day Slider / Calendar Detail */}
                                <div className="border-t border-gray-100 pt-4">
                                    {/* Day Navigation */}
                                    <div className="flex items-center justify-between mb-4">
                                        <button
                                            onClick={handlePrevDay}
                                            disabled={selectedDayIndex === 0}
                                            className={`p-2 rounded-full transition-all ${selectedDayIndex === 0
                                                ? 'text-gray-300 cursor-not-allowed'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-primary-blue'
                                                }`}
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <div className="text-center">
                                            <div className="text-lg font-black text-gray-800">{selectedDay.day}</div>
                                            <div className="text-sm text-gray-500">{selectedDay.fullDate}</div>
                                        </div>
                                        <button
                                            onClick={handleNextDay}
                                            disabled={selectedDayIndex === mockWeeklyStats.length - 1}
                                            className={`p-2 rounded-full transition-all ${selectedDayIndex === mockWeeklyStats.length - 1
                                                ? 'text-gray-300 cursor-not-allowed'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-primary-blue'
                                                }`}
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                    </div>

                                    {/* Day Summary */}
                                    <div className="flex justify-center gap-6 mb-4 text-sm">
                                        <div className="flex items-center gap-2 bg-primary-blue/10 px-3 py-1.5 rounded-full">
                                            <LottieMascot size={16} animationFile="Star.json" />
                                            <span className="font-bold text-primary-blue">{selectedDay.xp} XP</span>
                                        </div>
                                        <div className="flex items-center gap-2 bg-duo-green/10 px-3 py-1.5 rounded-full">
                                            <Image src="/images/reading.png" alt="Reading" width={16} height={16} />
                                            <span className="font-bold text-duo-green">{selectedDay.lessons} bài học</span>
                                        </div>
                                    </div>

                                    {/* Lessons List */}
                                    <div className="space-y-2 max-h-48 overflow-y-auto">
                                        {selectedDay.lessonDetails.map((lesson, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm">
                                                    {lesson.language === 'Python' ? (
                                                        <Image src="/images/python.png" alt="Python" width={28} height={28} />
                                                    ) : (
                                                        <Image src="/images/java-script.png" alt="JavaScript" width={28} height={28} />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-bold text-gray-800 text-sm">{lesson.name}</div>
                                                    <div className="text-xs text-gray-500">{lesson.language}</div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Clock size={12} />
                                                        {lesson.time}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs font-bold text-primary-blue bg-primary-blue/10 px-2 py-1 rounded-full">
                                                        <LottieMascot size={12} animationFile="Star.json" />
                                                        +{lesson.xp}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Achievements - Full Section */}
                            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Trophy className="w-6 h-6 text-duo-yellow" fill="#ffc800" />
                                        <h2 className="text-xl font-black text-gray-800">Thành tích</h2>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        {mockAchievements.filter(a => a.unlocked).length}/{mockAchievements.length} đã mở
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {mockAchievements.map((achievement) => {
                                        const rarityColors: Record<string, string> = {
                                            common: 'bg-gray-100 border-gray-300',
                                            rare: 'bg-accent-blue/10 border-accent-blue',
                                            epic: 'bg-duo-purple/10 border-duo-purple',
                                            legendary: 'bg-duo-yellow/10 border-duo-yellow'
                                        }

                                        return (
                                            <div
                                                key={achievement.id}
                                                className={`p-4 rounded-2xl border-2 text-center transition-all ${achievement.unlocked
                                                    ? `${rarityColors[achievement.rarity]} hover:scale-105 cursor-pointer shadow-sm`
                                                    : 'bg-gray-100 border-gray-200 opacity-50'
                                                    }`}
                                            >
                                                <div className="text-4xl mb-2">
                                                    {achievement.unlocked ? achievement.icon : <Lock className="w-8 h-8 mx-auto text-gray-400" />}
                                                </div>
                                                <div className="font-bold text-gray-800 text-sm">{achievement.title}</div>
                                                <div className="text-xs text-gray-500 mt-1 line-clamp-2">{achievement.description}</div>
                                                {achievement.unlocked && achievement.unlockedDate && (
                                                    <div className="text-xs text-primary-blue mt-2 font-semibold">
                                                        {achievement.unlockedDate}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'edit' && (
                        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg">
                            <div className="flex items-center gap-2 mb-6">
                                <Edit3 className="w-6 h-6 text-primary-blue" />
                                <h2 className="text-xl font-black text-gray-800">Chỉnh sửa thông tin</h2>
                            </div>

                            <div className="space-y-6">
                                {/* Name */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                                        <User size={16} />
                                        Tên hiển thị
                                    </label>
                                    <input
                                        type="text"
                                        value={userInfo.name}
                                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold text-gray-800 focus:border-primary-blue focus:outline-none transition-all"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                                        <Mail size={16} />
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={userInfo.email}
                                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold text-gray-800 focus:border-primary-blue focus:outline-none transition-all"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                                        <Phone size={16} />
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="tel"
                                        value={userInfo.phone}
                                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold text-gray-800 focus:border-primary-blue focus:outline-none transition-all"
                                    />
                                </div>

                                {/* Bio */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                                        <Edit3 size={16} />
                                        Giới thiệu bản thân
                                    </label>
                                    <textarea
                                        value={userInfo.bio}
                                        onChange={(e) => setUserInfo({ ...userInfo, bio: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl font-semibold text-gray-800 focus:border-primary-blue focus:outline-none transition-all resize-none"
                                    />
                                </div>

                                {/* Save Button */}
                                <button
                                    onClick={handleSaveProfile}
                                    disabled={isSaving}
                                    className="w-full py-4 bg-duo-green text-white font-black text-lg rounded-xl shadow-[0_4px_0_0_#46a302] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isSaving ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Đang lưu...
                                        </>
                                    ) : (
                                        <>
                                            <Save size={20} />
                                            Lưu thay đổi
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="space-y-6">
                            {/* Notifications */}
                            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg">
                                <div className="flex items-center gap-2 mb-6">
                                    <Bell className="w-6 h-6 text-primary-blue" />
                                    <h2 className="text-xl font-black text-gray-800">Thông báo</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Bell size={20} className="text-gray-600" />
                                            <div>
                                                <div className="font-bold text-gray-800">Thông báo đẩy</div>
                                                <div className="text-sm text-gray-500">Nhận nhắc nhở học tập hàng ngày</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
                                            className={`w-14 h-8 rounded-full transition-all ${settings.notifications ? 'bg-duo-green' : 'bg-gray-300'}`}
                                        >
                                            <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all ${settings.notifications ? 'translate-x-7' : 'translate-x-1'}`} />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Mail size={20} className="text-gray-600" />
                                            <div>
                                                <div className="font-bold text-gray-800">Thông báo email</div>
                                                <div className="text-sm text-gray-500">Nhận email cập nhật và ưu đãi</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })}
                                            className={`w-14 h-8 rounded-full transition-all ${settings.emailNotifications ? 'bg-duo-green' : 'bg-gray-300'}`}
                                        >
                                            <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all ${settings.emailNotifications ? 'translate-x-7' : 'translate-x-1'}`} />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Volume2 size={20} className="text-gray-600" />
                                            <div>
                                                <div className="font-bold text-gray-800">Âm thanh</div>
                                                <div className="text-sm text-gray-500">Bật/tắt hiệu ứng âm thanh</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSettings({ ...settings, soundEffects: !settings.soundEffects })}
                                            className={`w-14 h-8 rounded-full transition-all ${settings.soundEffects ? 'bg-duo-green' : 'bg-gray-300'}`}
                                        >
                                            <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all ${settings.soundEffects ? 'translate-x-7' : 'translate-x-1'}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Display Settings */}
                            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg">
                                <div className="flex items-center gap-2 mb-6">
                                    <Eye className="w-6 h-6 text-primary-blue" />
                                    <h2 className="text-xl font-black text-gray-800">Hiển thị</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Moon size={20} className="text-gray-600" />
                                            <div>
                                                <div className="font-bold text-gray-800">Chế độ tối</div>
                                                <div className="text-sm text-gray-500">Giảm mỏi mắt khi học ban đêm</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
                                            className={`w-14 h-8 rounded-full transition-all ${settings.darkMode ? 'bg-duo-green' : 'bg-gray-300'}`}
                                        >
                                            <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all ${settings.darkMode ? 'translate-x-7' : 'translate-x-1'}`} />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Globe size={20} className="text-gray-600" />
                                            <div>
                                                <div className="font-bold text-gray-800">Ngôn ngữ</div>
                                                <div className="text-sm text-gray-500">Ngôn ngữ giao diện</div>
                                            </div>
                                        </div>
                                        <select
                                            value={settings.language}
                                            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                                            className="px-4 py-2 bg-white border-2 border-gray-200 rounded-xl font-bold text-gray-800 focus:border-primary-blue focus:outline-none"
                                        >
                                            <option value="vi">Tiếng Việt</option>
                                            <option value="en">English</option>
                                        </select>
                                    </div>

                                    {/* Background Theme Selector */}
                                    <div className="p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 bg-gradient-to-br from-primary-blue to-accent-blue rounded-xl flex items-center justify-center">
                                                <LottieMascot size={24} animationFile="Star.json" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800">Chọn nền</div>
                                                <div className="text-sm text-gray-500">Tùy chỉnh hình nền ứng dụng</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-5 gap-3">
                                            {[
                                                { id: 'default', name: 'Mặc định', gradient: 'from-gray-100 to-gray-200' },
                                                { id: 'galaxy', name: 'Galaxy', gradient: 'from-purple-900 via-blue-900 to-black' },
                                                { id: 'forest', name: 'Forest', gradient: 'from-green-800 via-green-600 to-emerald-500' },
                                                { id: 'ocean', name: 'Ocean', gradient: 'from-blue-900 via-cyan-700 to-teal-500' },
                                                { id: 'sunset', name: 'Sunset', gradient: 'from-orange-500 via-pink-500 to-purple-600' },
                                            ].map((theme) => (
                                                <button
                                                    key={theme.id}
                                                    onClick={() => setSettings({ ...settings, backgroundTheme: theme.id })}
                                                    className={`relative p-1 rounded-xl transition-all ${settings.backgroundTheme === theme.id
                                                        ? 'ring-4 ring-duo-green ring-offset-2 scale-105'
                                                        : 'hover:scale-105'
                                                        }`}
                                                >
                                                    <div className={`w-full aspect-square rounded-lg bg-gradient-to-br ${theme.gradient}`} />
                                                    <div className="text-xs font-semibold text-gray-700 mt-1 text-center">{theme.name}</div>
                                                    {settings.backgroundTheme === theme.id && (
                                                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-duo-green rounded-full flex items-center justify-center">
                                                            <Check size={12} className="text-white" />
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Privacy Settings */}
                            <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-lg">
                                <div className="flex items-center gap-2 mb-6">
                                    <Shield className="w-6 h-6 text-primary-blue" />
                                    <h2 className="text-xl font-black text-gray-800">Quyền riêng tư</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <Eye size={20} className="text-gray-600" />
                                            <div>
                                                <div className="font-bold text-gray-800">Hiển thị hồ sơ</div>
                                                <div className="text-sm text-gray-500">Cho phép người khác xem hồ sơ của bạn</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSettings({ ...settings, showProfile: !settings.showProfile })}
                                            className={`w-14 h-8 rounded-full transition-all ${settings.showProfile ? 'bg-duo-green' : 'bg-gray-300'}`}
                                        >
                                            <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all ${settings.showProfile ? 'translate-x-7' : 'translate-x-1'}`} />
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            <TrendingUp size={20} className="text-gray-600" />
                                            <div>
                                                <div className="font-bold text-gray-800">Hiển thị tiến độ</div>
                                                <div className="text-sm text-gray-500">Cho phép người khác xem tiến độ học tập</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSettings({ ...settings, showProgress: !settings.showProgress })}
                                            className={`w-14 h-8 rounded-full transition-all ${settings.showProgress ? 'bg-duo-green' : 'bg-gray-300'}`}
                                        >
                                            <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all ${settings.showProgress ? 'translate-x-7' : 'translate-x-1'}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Save Button */}
                            <button
                                onClick={handleSaveSettings}
                                disabled={isSaving}
                                className="w-full py-4 bg-duo-green text-white font-black text-lg rounded-xl shadow-[0_4px_0_0_#46a302] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {isSaving ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Đang lưu...
                                    </>
                                ) : (
                                    <>
                                        <Save size={20} />
                                        Lưu cài đặt
                                    </>
                                )}
                            </button>

                            {/* Logout */}
                            <button className="w-full py-4 bg-white text-duo-red font-bold text-lg rounded-xl border-2 border-duo-red/30 hover:bg-duo-red/5 transition-all flex items-center justify-center gap-2">
                                <LogOut size={20} />
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* Avatar Editor Modal */}
            <AvatarEditorModal
                isOpen={isAvatarModalOpen}
                onClose={() => setIsAvatarModalOpen(false)}
                currentAvatar={userAvatar}
                customImage={customImage}
                onSave={handleAvatarSave}
                userGems={mockUser.gems}
            />
        </div>
    )
}
