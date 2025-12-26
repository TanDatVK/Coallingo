'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { User, LucideIcon, Check, ChevronRight } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { mockLanguages } from '@/data/mockData'

// Dynamic import Lottie
const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
})

interface NavItem {
    href: string
    label: string
    color: string
    icon?: LucideIcon
    imageSrc?: string
}

export default function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const [selectedLanguageId, setSelectedLanguageId] = useState<string | null>(() => {
        const current = mockLanguages.find(l => l.progress > 0)
        return current?.id || null
    })

    const navItems: NavItem[] = [
        { href: '/learn', imageSrc: '/images/studying.png', label: 'Học', color: 'text-primary-blue' },
        { href: '/reading', imageSrc: '/images/reading.png', label: 'Thư viện', color: 'text-cyan-500' },
        { href: '/practice', imageSrc: '/images/dumbbell.png', label: 'Luyện tập', color: 'text-duo-green' },
        { href: '/leaderboard', imageSrc: '/images/ranking.png', label: 'Xếp hạng', color: 'text-duo-yellow' },
        { href: '/quests', imageSrc: '/images/quest.png', label: 'Nhiệm vụ', color: 'text-duo-purple' },
        { href: '/shop', imageSrc: '/images/shop.png', label: 'Cửa hàng', color: 'text-accent-blue' },
        { href: '/profile', imageSrc: '/images/profile.png', label: 'Hồ sơ', color: 'text-primary-blue' },
    ]

    // Languages with progress (previously learned)
    const learningLanguages = mockLanguages.filter(l => l.progress > 0)
    const currentLanguage = mockLanguages.find(l => l.id === selectedLanguageId) || learningLanguages[0]
    const otherLearningLanguages = learningLanguages.filter(l => l.id !== selectedLanguageId)

    const handleLanguageSwitch = (langId: string) => {
        setSelectedLanguageId(langId)
        router.push('/learn')
    }

    return (
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-100 hidden lg:block overflow-y-auto">
            <div className="p-4">
                {/* Navigation */}
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${isActive
                                    ? 'bg-primary-blue/10 text-primary-blue border-2 border-primary-blue/30'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-2 border-transparent'
                                    }`}
                            >
                                {item.imageSrc ? (
                                    <Image
                                        src={item.imageSrc}
                                        alt={item.label}
                                        width={22}
                                        height={22}
                                        className={isActive ? 'opacity-100' : 'opacity-80'}
                                    />
                                ) : item.icon ? (
                                    <item.icon size={22} className={isActive ? 'text-primary-blue' : item.color} />
                                ) : null}
                                <span>{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>


                {/* Current Course */}
                {currentLanguage && (
                    <div className="mt-8 p-4 bg-primary-blue/5 rounded-2xl border border-primary-blue/20">
                        <div className="text-xs text-primary-blue font-bold uppercase tracking-wider mb-3 flex items-center gap-1">
                            <LottieMascot size={20} animationFile="Fire Streak Orange.json" />
                            Đang học
                        </div>
                        <div className="flex items-center gap-3">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center"
                                style={{ backgroundColor: currentLanguage.bgColor }}
                            >
                                {currentLanguage.iconImage ? (
                                    <Image src={currentLanguage.iconImage} alt={currentLanguage.name} width={32} height={32} />
                                ) : (
                                    <span className="text-2xl">{currentLanguage.icon}</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-gray-800">{currentLanguage.name}</div>
                                <div className="text-xs text-gray-500">{currentLanguage.progress}% hoàn thành</div>
                            </div>
                            <Check className="w-5 h-5 text-duo-green" />
                        </div>
                        <div className="mt-3 h-2 bg-white rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full bg-primary-blue"
                                style={{ width: `${currentLanguage.progress}%` }}
                            />
                        </div>
                        <Link href="/learn">
                            <button className="w-full mt-3 py-2.5 bg-primary-blue text-white font-bold rounded-xl shadow-[0_4px_0_0_#152a45] hover:brightness-110 active:shadow-none active:translate-y-1 transition-all text-sm uppercase tracking-wider">
                                Tiếp tục học
                            </button>
                        </Link>
                    </div>
                )}

                {/* Other Learning Languages (can switch) */}
                {otherLearningLanguages.length > 0 && (
                    <div className="mt-4">
                        <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2 px-2">
                            Đang học
                        </div>
                        <div className="space-y-1">
                            {otherLearningLanguages.map((lang) => (
                                <button
                                    key={lang.id}
                                    onClick={() => handleLanguageSwitch(lang.id)}
                                    className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-primary-blue/5 transition-colors cursor-pointer group"
                                >
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: lang.bgColor }}
                                    >
                                        {lang.iconImage ? (
                                            <Image src={lang.iconImage} alt={lang.name} width={26} height={26} />
                                        ) : (
                                            <span className="text-xl">{lang.icon}</span>
                                        )}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <div className="font-semibold text-gray-700 text-sm">{lang.name}</div>
                                        <div className="text-xs text-gray-400">{lang.progress}% hoàn thành</div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary-blue transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Other Languages */}
                <div className="mt-6">
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3 px-2">
                        Khám phá thêm
                    </div>
                    <div className="space-y-2">
                        {mockLanguages.filter(l => l.progress === 0).slice(0, 3).map((lang) => (
                            <Link key={lang.id} href="/learn">
                                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: lang.bgColor }}
                                    >
                                        {lang.iconImage ? (
                                            <Image src={lang.iconImage} alt={lang.name} width={22} height={22} />
                                        ) : (
                                            <span className="text-lg">{lang.icon}</span>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-semibold text-gray-700 text-sm">{lang.name}</div>
                                        <div className="text-xs text-gray-400 capitalize">{lang.difficulty}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <Link href="/#languages">
                        <button className="w-full mt-2 py-2 text-sm text-primary-blue hover:text-primary-blue-dark font-semibold transition-colors">
                            + Xem tất cả khóa học
                        </button>
                    </Link>
                </div>

                {/* Pro Banner */}
                <div className="mt-6 p-4 bg-gradient-to-br from-duo-purple/10 to-primary-blue/10 rounded-2xl border border-duo-purple/20">
                    <div className="mb-2">
                        <LottieMascot size={40} animationFile="Stone.json" />
                    </div>
                    <div className="text-lg font-bold text-gray-800 mb-1">
                        Coallingo Pro
                    </div>
                    <div className="text-sm text-gray-500 mb-3">
                        Không giới hạn hearts, không quảng cáo
                    </div>
                    <Link href="/payment?package=pro_monthly">
                        <button className="w-full py-2.5 bg-gradient-to-r from-duo-purple to-primary-blue text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-sm uppercase tracking-wider">
                            Nâng cấp ngay
                        </button>
                    </Link>
                </div>
            </div>
        </aside>
    )
}
