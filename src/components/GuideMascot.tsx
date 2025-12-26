'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { ChevronRight, X, ChevronLeft, Sparkles, Heart } from 'lucide-react'

const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-32 h-32 bg-gradient-to-br from-primary-blue/20 to-accent-blue/20 rounded-full animate-pulse" />
})

const GUIDE_KEY = 'coerlingo_guide_completed'

interface GuideStep {
    id: string
    title: string
    message: string
    icon: string // Sidebar image path
    targetSelector?: string
}

const guideSteps: GuideStep[] = [
    {
        id: 'welcome',
        title: 'Chào mừng bạn!',
        message: 'Xin chào! Tôi là Trump, hướng dẫn viên của bạn. Để tôi giới thiệu các tính năng tuyệt vời của Coallingo nhé!',
        icon: '/images/chatbot.png',
    },
    {
        id: 'learn',
        title: 'Trang Học',
        message: 'Đây là nơi bạn bắt đầu hành trình! Hoàn thành bài học để nhận XP và duy trì streak hàng ngày.',
        icon: '/images/studying.png',
        targetSelector: '[href="/learn"]',
    },
    {
        id: 'reading',
        title: 'Thư viện AI',
        message: 'Tạo khóa học riêng với AI! Chỉ cần nhập chủ đề, AI sẽ tạo nội dung học tập phù hợp với bạn.',
        icon: '/images/reading.png',
        targetSelector: '[href="/reading"]',
    },
    {
        id: 'practice',
        title: 'Luyện tập thông minh',
        message: 'Thực hành với AI Assistant! Hỏi đáp, debug code và nhận feedback ngay lập tức.',
        icon: '/images/dumbbell.png',
        targetSelector: '[href="/practice"]',
    },
    {
        id: 'leaderboard',
        title: 'Bảng xếp hạng',
        message: 'Cạnh tranh với học viên khác! Leo rank và trở thành top 1 để nhận phần thưởng.',
        icon: '/images/ranking.png',
        targetSelector: '[href="/leaderboard"]',
    },
    {
        id: 'quests',
        title: 'Nhiệm vụ hàng ngày',
        message: 'Hoàn thành nhiệm vụ để nhận gems! Đừng bỏ lỡ phần thưởng mỗi ngày nhé.',
        icon: '/images/quest.png',
        targetSelector: '[href="/quests"]',
    },
    {
        id: 'shop',
        title: 'Cửa hàng',
        message: 'Mua gems, hearts và các item đặc biệt! Nâng cao trải nghiệm học tập của bạn.',
        icon: '/images/shop.png',
        targetSelector: '[href="/shop"]',
    },
    {
        id: 'profile',
        title: 'Hồ sơ cá nhân',
        message: 'Xem tiến độ, thành tích và tùy chỉnh profile! Theo dõi hành trình học tập của bạn.',
        icon: '/images/profile.png',
        targetSelector: '[href="/profile"]',
    },
    {
        id: 'finish',
        title: 'Sẵn sàng rồi!',
        message: 'Tuyệt vời! Giờ bạn đã biết tất cả rồi. Hãy bắt đầu học và trở thành lập trình viên giỏi nhất nào!',
        icon: '/images/full-stack.png',
    }
]

export default function GuideMascot() {
    const [isVisible, setIsVisible] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null)
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        // Check if user is logged in
        const userStr = localStorage.getItem('user')
        if (!userStr) return // Not logged in, don't show guide

        try {
            const user = JSON.parse(userStr)
            if (!user.isLoggedIn) return // Not logged in
        } catch {
            return // Invalid user data
        }

        // Check if user has already seen the guide
        const hasSeenGuide = localStorage.getItem(GUIDE_KEY)
        if (!hasSeenGuide) {
            setTimeout(() => setIsVisible(true), 800)
        }
    }, [])

    useEffect(() => {
        if (!isVisible) return

        const step = guideSteps[currentStep]
        if (step.targetSelector) {
            const element = document.querySelector(step.targetSelector)
            if (element) {
                // Scroll first, then get rect after a small delay to ensure scroll is complete
                element.scrollIntoView({ behavior: 'smooth', block: 'center' })

                // Wait for scroll to complete before getting position
                setTimeout(() => {
                    const rect = element.getBoundingClientRect()
                    setHighlightRect(rect)
                }, 300)
            }
        } else {
            setHighlightRect(null)
        }
    }, [currentStep, isVisible])

    const handleNext = () => {
        if (isAnimating) return
        setIsAnimating(true)

        setTimeout(() => {
            if (currentStep < guideSteps.length - 1) {
                setCurrentStep(prev => prev + 1)
            } else {
                completeGuide()
            }
            setIsAnimating(false)
        }, 200)
    }

    const handlePrev = () => {
        if (isAnimating || currentStep === 0) return
        setIsAnimating(true)
        setTimeout(() => {
            setCurrentStep(prev => prev - 1)
            setIsAnimating(false)
        }, 200)
    }

    const handleSkip = () => {
        completeGuide()
    }

    const completeGuide = () => {
        localStorage.setItem(GUIDE_KEY, 'true')
        setIsVisible(false)
    }

    if (!isVisible) return null

    const step = guideSteps[currentStep]
    const isFirstStep = currentStep === 0
    const isLastStep = currentStep === guideSteps.length - 1
    const isCenterStep = !step.targetSelector

    return (
        <>
            {/* Animated Overlay */}
            <div className="fixed inset-0 z-[9998] transition-all duration-500 pointer-events-none">
                {/* Floating decorations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${4 + Math.random() * 3}s`
                            }}
                        >
                            {i % 3 === 0 ? (
                                <Sparkles size={16} className="text-duo-yellow/40" />
                            ) : i % 3 === 1 ? (
                                <Heart size={12} className="text-pink-400/40" />
                            ) : (
                                <div className="w-2 h-2 bg-accent-blue/40 rounded-full" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Spotlight effect - dark overlay with bright cutout */}
                {highlightRect ? (
                    <div
                        className="absolute rounded-xl transition-all duration-500 ease-out border-4 border-duo-green bg-transparent"
                        style={{
                            left: highlightRect.left - 6,
                            top: highlightRect.top - 6,
                            width: highlightRect.width + 12,
                            height: highlightRect.height + 12,
                            boxShadow: `0 0 0 9999px rgba(0, 0, 0, 0.7)`,
                        }}
                    />
                ) : (
                    /* Full dark overlay when no highlight */
                    <div className="absolute inset-0 bg-black/50" />
                )}
            </div>

            {/* Guide Card */}
            <div
                className={`fixed z-[9999] transition-all duration-500 ease-out ${isAnimating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'} ${isCenterStep
                    ? 'inset-0 flex items-center justify-center p-4'
                    : 'bottom-6 right-6'
                    }`}
            >
                <div className={`
                    bg-white rounded-3xl shadow-xl overflow-hidden
                    border-2 border-primary-blue/20
                    ${isCenterStep ? 'max-w-md w-full' : 'max-w-sm w-full'}
                `}>
                    {/* Header with gradient background */}
                    <div className="bg-gradient-to-r from-primary-blue to-accent-blue px-5 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                                <img src={step.icon} alt={step.title} className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                                {/* Progress bar */}
                                <div className="flex items-center gap-0.5 mt-1">
                                    {guideSteps.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`h-1 rounded-full transition-all duration-300 ${index === currentStep
                                                ? 'w-5 bg-duo-yellow'
                                                : index < currentStep
                                                    ? 'w-3 bg-duo-green'
                                                    : 'w-3 bg-white/30'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleSkip}
                            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        {/* Mascot Animation */}
                        <div className="flex justify-center mb-4">
                            <div className={`${isCenterStep ? 'w-28 h-28' : 'w-20 h-20'} transition-all duration-300`}>
                                <LottieMascot
                                    size={isCenterStep ? 112 : 80}
                                    animationFile="person/President Trump 01.json"
                                />
                            </div>
                        </div>

                        {/* Speech bubble */}
                        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-2xl p-4 mb-5 border border-gray-100">
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-gray-50 to-gray-100 rotate-45 border-l border-t border-gray-100" />
                            <p className="text-gray-600 leading-relaxed text-center text-sm">
                                {step.message}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2">
                            {!isFirstStep && (
                                <button
                                    onClick={handlePrev}
                                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-1 text-sm"
                                >
                                    <ChevronLeft size={16} />
                                    Quay lại
                                </button>
                            )}

                            <button
                                onClick={handleNext}
                                className={`flex-1 py-3.5 px-5 bg-gradient-to-r from-primary-blue via-accent-blue to-primary-blue bg-[length:200%_100%] text-white font-bold rounded-2xl shadow-lg shadow-primary-blue/25 hover:shadow-xl hover:shadow-primary-blue/30 hover:bg-right active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 text-sm ${isFirstStep ? 'animate-pulse-soft' : ''}`}
                            >
                                {isLastStep ? (
                                    <>
                                        <Sparkles size={16} />
                                        Bắt đầu học ngay!
                                    </>
                                ) : isFirstStep ? (
                                    <>
                                        Bắt đầu tour
                                        <ChevronRight size={16} />
                                    </>
                                ) : (
                                    <>
                                        Tiếp theo
                                        <ChevronRight size={16} />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Skip text for middle steps */}
                        {!isFirstStep && !isLastStep && (
                            <button
                                onClick={handleSkip}
                                className="w-full mt-3 py-2 text-gray-400 hover:text-gray-600 text-xs font-medium transition-colors"
                            >
                                Bỏ qua hướng dẫn
                            </button>
                        )}
                    </div>
                </div>
            </div>                {/* Custom animations */}
            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
                    50% { transform: translateY(-15px) rotate(180deg); opacity: 0.8; }
                }
                @keyframes bounce-horizontal {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(-8px); }
                }
                @keyframes pulse-soft {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.85; }
                }
                .animate-float {
                    animation: float 5s ease-in-out infinite;
                }
                .animate-bounce-horizontal {
                    animation: bounce-horizontal 1s ease-in-out infinite;
                }
                .animate-pulse-soft {
                    animation: pulse-soft 2s ease-in-out infinite;
                }
            `}</style>
        </>
    )
}
