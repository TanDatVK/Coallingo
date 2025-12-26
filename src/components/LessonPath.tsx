'use client'

import { mockUnits, Lesson, Unit } from '@/data/mockData'
import { Lock, Check, Star, BookOpen, Trophy } from 'lucide-react'
import { useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamic import Lottie for mascot and animations
const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse" />
})

// Mascot animations from person folder - randomly pick one for each unit
// Size: 1.5x of node (72px * 1.5 = 108px)
const mascotAnimations = [
    'person/Delivery Guy.json',
    'person/Eid Ornaments.json',
    'person/Muslim Sweets.json',
    'person/President Trump 01.json',
    'person/Shrug.json',
    'person/Tenor.json',
    'person/The man carrying the purchases. Shopping.json',
    'person/touch the universe.json',
]

interface ChestRewardModalProps {
    isOpen: boolean
    onClose: () => void
    gems: number
    isOpened: boolean
}

function ChestRewardModal({ isOpen, onClose, gems, isOpened }: ChestRewardModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
                {isOpened ? (
                    <>
                        <div className="text-6xl mb-4">🗃️</div>
                        <h2 className="text-2xl font-black text-gray-400 mb-2">Rương đã mở</h2>
                        <p className="text-gray-400 mb-6">Bạn đã nhận phần thưởng này rồi!</p>
                    </>
                ) : (
                    <>
                        <div className="w-32 h-32 mx-auto mb-4">
                            <LottieMascot size={128} animationFile="GoldCoinBox02.json" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-800 mb-2">🎉 Chúc mừng!</h2>
                        <p className="text-gray-500 mb-6">Bạn đã mở được rương kho báu!</p>

                        <div className="flex justify-center gap-4 mb-6">
                            <div className="bg-accent-blue/10 px-6 py-4 rounded-2xl">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <LottieMascot size={32} animationFile="Stone.json" />
                                    <span className="text-3xl font-black text-accent-blue">+{gems}</span>
                                </div>
                                <div className="text-sm text-gray-500 font-semibold">Gems</div>
                            </div>
                        </div>

                        <div className="w-40 h-40 mx-auto mb-4">
                            <LottieMascot size={160} animationFile="Gift.json" />
                        </div>
                    </>
                )}

                <button
                    onClick={onClose}
                    className="w-full py-4 bg-[#58cc02] text-white font-bold text-lg rounded-2xl uppercase tracking-wider shadow-[0_4px_0_0_#46a302] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all"
                >
                    {isOpened ? 'Đóng' : 'Nhận thưởng'}
                </button>
            </div>
        </div>
    )
}

interface LessonNodeProps {
    lesson: Lesson
    unitColor: string
    index: number
    totalLessons: number
    unitIndex: number
    onClick: () => void
    onChestClick: (isOpened: boolean) => void
}

function LessonNode({ lesson, unitColor, index, totalLessons, unitIndex, onClick, onChestClick }: LessonNodeProps) {
    // Calculate zigzag position - alternate direction per unit
    // Odd units: start left, Even units: start right
    const direction = unitIndex % 2 === 0 ? 1 : -1
    const xOffset = Math.sin(index * 0.9) * 80 * direction

    // Trophy at end (last lesson)
    const isTrophy = index === totalLessons - 1

    // Chest appears in the middle of the unit (around position 2-3)
    const isChest = index === Math.floor(totalLessons / 2) && !isTrophy
    const chestOpened = lesson.status === 'completed' || lesson.status === 'current'

    const getNodeContent = () => {
        // Trophy at the end
        if (isTrophy) {
            const isCompleted = lesson.status === 'completed'
            return (
                <div className={isCompleted ? 'animate-trophy-bounce' : ''}>
                    <Trophy
                        size={32}
                        className={isCompleted ? 'text-white' : 'text-gray-400'}
                        fill={isCompleted ? 'white' : 'transparent'}
                    />
                </div>
            )
        }
        // Chest uses Lottie animation
        if (isChest) {
            return null
        }
        // Regular lessons
        if (lesson.status === 'locked') {
            return <Star size={28} className="text-gray-400" />
        }
        if (lesson.status === 'completed') {
            return (
                <div className="animate-check-pop">
                    <Check size={32} className="text-white" strokeWidth={3} />
                </div>
            )
        }
        // Current lesson - pulsing star
        return (
            <div className="animate-pulse">
                <Star size={28} className="text-white" fill="white" />
            </div>
        )
    }

    const getNodeStyle = () => {
        // Trophy styling - only green when completed
        if (isTrophy) {
            if (lesson.status === 'completed') {
                return 'bg-[#58cc02] border-[#46a302] shadow-[0_6px_0_0_#46a302] animate-glow'
            }
            // Locked trophy - gray
            return 'bg-gray-200 border-gray-300 shadow-[0_4px_0_0_#d1d5db]'
        }
        // Chest styling
        if (isChest) {
            if (chestOpened) {
                return 'bg-gray-200 border-gray-300 shadow-[0_4px_0_0_#d1d5db] grayscale'
            }
            return 'bg-amber-100 border-amber-300 shadow-[0_6px_0_0_#fbbf24]'
        }
        // Regular lessons
        if (lesson.status === 'completed') {
            return 'bg-[#58cc02] border-[#46a302] shadow-[0_6px_0_0_#46a302]'
        }
        if (lesson.status === 'current') {
            return 'bg-[#58cc02] border-[#46a302] shadow-[0_6px_0_0_#46a302] ring-4 ring-[#58cc02]/30 animate-glow'
        }
        return 'bg-gray-200 border-gray-300 shadow-[0_4px_0_0_#d1d5db]'
    }

    const handleClick = () => {
        if (isChest) {
            onChestClick(chestOpened)
        } else {
            onClick()
        }
    }

    // Node size: 72px, Chest size: larger
    const nodeSize = isChest ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-16 h-16 sm:w-[72px] sm:h-[72px]'

    return (
        <div
            className="relative flex flex-col items-center group"
            style={{ transform: `translateX(${xOffset}px)` }}
        >
            {/* Speech bubble for current lesson (not for chests) */}
            {lesson.status === 'current' && !isChest && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-white px-4 py-2 rounded-xl shadow-lg font-bold text-[#58cc02] uppercase tracking-wide text-sm whitespace-nowrap border-2 border-gray-100">
                        {lesson.progress > 0 ? 'Tiếp tục' : 'Bắt đầu'}
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-white border-r-2 border-b-2 border-gray-100 transform rotate-45" />
                </div>
            )}

            {/* Speech bubble for completed lesson */}
            {lesson.status === 'completed' && !isChest && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white px-4 py-2 rounded-xl shadow-lg font-bold text-primary-blue uppercase tracking-wide text-sm whitespace-nowrap border-2 border-gray-100">
                        Học lại
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-4 h-4 bg-white border-r-2 border-b-2 border-gray-100 transform rotate-45" />
                </div>
            )}

            {/* Node Button */}
            <button
                onClick={handleClick}
                disabled={lesson.status === 'locked' && !isChest}
                className={`
                    relative ${nodeSize} rounded-full border-4
                    flex items-center justify-center transition-all duration-200
                    ${getNodeStyle()}
                    ${(lesson.status !== 'locked' || isChest) ? 'hover:scale-105 active:scale-95 cursor-pointer' : 'cursor-not-allowed'}
                `}
            >
                {isChest ? (
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 ${chestOpened ? 'opacity-50' : ''}`}>
                        <LottieMascot
                            size={80}
                            animationFile="GoldCoinBox02.json"
                            loop={!chestOpened}
                        />
                    </div>
                ) : (
                    getNodeContent()
                )}
            </button>
        </div>
    )
}

// Unit Guide Modal - Shows unit summary and lesson details
interface UnitGuideModalProps {
    unit: Unit
    isOpen: boolean
    onClose: () => void
}

function UnitGuideModal({ unit, isOpen, onClose }: UnitGuideModalProps) {
    if (!isOpen) return null

    const completedCount = unit.lessons.filter(l => l.status === 'completed').length
    const totalXp = unit.lessons.reduce((sum, l) => sum + l.xpReward, 0)

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-3xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl animate-fade-in">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-xl"
                >
                    ✕
                </button>

                {/* Header */}
                <div
                    className="p-4 rounded-2xl mb-6 text-white"
                    style={{ backgroundColor: unit.color }}
                >
                    <div className="text-sm opacity-80">Hướng dẫn chương học</div>
                    <h2 className="text-2xl font-black">{unit.title}</h2>
                    <p className="text-sm opacity-90">{unit.titleVi}</p>
                </div>

                {/* Summary */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <h3 className="font-bold text-gray-800 mb-3">📚 Tổng quan</h3>
                    <p className="text-gray-600 mb-4">{unit.description}</p>

                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-white rounded-xl p-3">
                            <div className="text-2xl font-black text-[#58cc02]">{completedCount}/{unit.lessons.length}</div>
                            <div className="text-xs text-gray-500">Hoàn thành</div>
                        </div>
                        <div className="bg-white rounded-xl p-3">
                            <div className="text-2xl font-black text-[#ffc800]">{totalXp}</div>
                            <div className="text-xs text-gray-500">Tổng ⭐</div>
                        </div>
                        <div className="bg-white rounded-xl p-3">
                            <div className="text-2xl font-black text-gray-700">{unit.lessons.length}</div>
                            <div className="text-xs text-gray-500">Bài học</div>
                        </div>
                    </div>
                </div>

                {/* Lesson List */}
                <div>
                    <h3 className="font-bold text-gray-800 mb-3">📋 Chi tiết các bài học</h3>
                    <div className="space-y-3">
                        {unit.lessons.map((lesson, index) => (
                            <div
                                key={lesson.id}
                                className={`flex items-center gap-3 p-3 rounded-xl border ${lesson.status === 'completed'
                                    ? 'bg-[#58cc02]/10 border-[#58cc02]/30'
                                    : lesson.status === 'current'
                                        ? 'bg-[#58cc02]/5 border-[#58cc02]/50 ring-2 ring-[#58cc02]/30'
                                        : 'bg-gray-50 border-gray-200'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${lesson.status === 'completed'
                                    ? 'bg-[#58cc02]'
                                    : lesson.status === 'current'
                                        ? 'bg-[#58cc02]'
                                        : 'bg-gray-300'
                                    }`}>
                                    {lesson.status === 'completed' ? '✓' : index + 1}
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-gray-800 text-sm">{lesson.title}</div>
                                    <div className="text-xs text-gray-500">{lesson.titleVi}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-[#ffc800]">+{lesson.xpReward} ⭐</div>
                                    <div className="text-xs text-gray-400">{lesson.exercises} bài tập</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
                >
                    Đóng
                </button>
            </div>
        </div>
    )
}

interface UnitSectionProps {
    unit: Unit
    unitIndex: number
    onLessonClick: (lesson: Lesson) => void
    onChestClick: (isOpened: boolean) => void
}

function UnitSection({ unit, unitIndex, onLessonClick, onChestClick }: UnitSectionProps) {
    const [showGuide, setShowGuide] = useState(false)

    // Mascot position: always in the middle of the unit
    const middleLessonIndex = Math.floor(unit.lessons.length / 2)
    // Pick a mascot animation for this unit - each unit gets a different one
    const mascotAnimation = mascotAnimations[unitIndex % mascotAnimations.length]

    return (
        <div className="mb-8 relative">
            {/* Unit Header - Duolingo Style */}
            <div
                className="sticky top-16 z-20 mb-6 p-4 rounded-2xl"
                style={{ backgroundColor: unit.color }}
            >
                <div className="flex items-center justify-between">
                    <div className="text-white">
                        <div className="text-sm font-semibold opacity-90">
                            ← PHẦN {unitIndex + 1}, CỬA {unit.lessons.filter(l => l.status === 'completed').length + 1}
                        </div>
                        <div className="text-xl font-black">{unit.titleVi}</div>
                    </div>
                    <button
                        onClick={() => setShowGuide(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-white font-bold transition-colors"
                    >
                        <BookOpen size={18} />
                        <span className="hidden sm:inline">HƯỚNG DẪN</span>
                    </button>
                </div>
            </div>

            {/* Lessons Path - Zigzag Style */}
            <div className="relative py-8">
                {/* Lesson Nodes */}
                <div className="flex flex-col items-center gap-8">
                    {unit.lessons.map((lesson, index) => {
                        // Calculate zigzag offset - alternate direction per unit
                        const direction = unitIndex % 2 === 0 ? 1 : -1
                        const xOffset = Math.sin(index * 0.9) * 80 * direction
                        // Mascot appears on OPPOSITE side of curve
                        const mascotOnLeft = xOffset > 0  // if node goes right, mascot on left

                        return (
                            <div key={lesson.id} className="relative w-full flex justify-center">
                                <LessonNode
                                    lesson={lesson}
                                    unitColor={unit.color}
                                    index={index}
                                    totalLessons={unit.lessons.length}
                                    unitIndex={unitIndex}
                                    onClick={() => onLessonClick(lesson)}
                                    onChestClick={onChestClick}
                                />

                                {/* Mascot appears at middle lesson - size 300px */}
                                {index === middleLessonIndex && (
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2"
                                        style={{
                                            left: mascotOnLeft ? '-10%' : 'auto',
                                            right: mascotOnLeft ? 'auto' : '-10%'
                                        }}
                                    >
                                        <LottieMascot size={300} animationFile={mascotAnimation} />
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Unit Guide Modal */}
            <UnitGuideModal
                unit={unit}
                isOpen={showGuide}
                onClose={() => setShowGuide(false)}
            />
        </div>
    )
}

interface LessonModalProps {
    lesson: Lesson | null
    onClose: () => void
}

function LessonModal({ lesson, onClose }: LessonModalProps) {
    if (!lesson) return null

    const handleStart = () => {
        window.location.href = `/lesson/${lesson.id}`
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-xl transition-colors"
                >
                    ✕
                </button>

                <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#58cc02] flex items-center justify-center shadow-[0_6px_0_0_#46a302]">
                        <Star size={36} className="text-white" fill="white" />
                    </div>
                    <h2 className="text-2xl font-black text-gray-800 mb-1">{lesson.title}</h2>
                    <p className="text-gray-500 mb-6">{lesson.titleVi}</p>

                    <div className="flex items-center justify-center gap-6 mb-6">
                        <div className="text-center">
                            <div className="text-2xl font-black text-[#ffc800]">+{lesson.xpReward}</div>
                            <div className="text-xs text-gray-400 font-bold uppercase">⭐</div>
                        </div>
                        <div className="w-px h-12 bg-gray-200" />
                        <div className="text-center">
                            <div className="text-2xl font-black text-gray-800">{lesson.exercises}</div>
                            <div className="text-xs text-gray-400 font-bold uppercase">Bài tập</div>
                        </div>
                    </div>

                    <p className="text-gray-500 mb-6 bg-gray-50 p-3 rounded-xl text-sm">{lesson.description}</p>

                    {lesson.status === 'current' && lesson.progress > 0 && (
                        <div className="mb-6">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-500 font-semibold">Tiến độ</span>
                                <span className="text-[#58cc02] font-bold">{lesson.progress}%</span>
                            </div>
                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#58cc02] rounded-full"
                                    style={{ width: `${lesson.progress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleStart}
                        className="w-full py-4 bg-[#58cc02] text-white font-bold text-lg rounded-2xl uppercase tracking-wider shadow-[0_4px_0_0_#46a302] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all"
                    >
                        {lesson.status === 'completed'
                            ? 'Học lại'
                            : lesson.status === 'current' && lesson.progress > 0
                                ? 'Tiếp tục'
                                : 'Bắt đầu'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function LessonPath() {
    const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
    const [chestModal, setChestModal] = useState<{ isOpen: boolean; isOpened: boolean }>({ isOpen: false, isOpened: false })

    const handleChestClick = (isOpened: boolean) => {
        setChestModal({ isOpen: true, isOpened })
    }

    return (
        <div className="py-4 px-4 bg-gray-50 min-h-screen">
            <div className="max-w-md mx-auto">
                {/* Units */}
                {mockUnits.map((unit, index) => (
                    <UnitSection
                        key={unit.id}
                        unit={unit}
                        unitIndex={index}
                        onLessonClick={setSelectedLesson}
                        onChestClick={handleChestClick}
                    />
                ))}
            </div>

            {/* Lesson Modal */}
            <LessonModal
                lesson={selectedLesson}
                onClose={() => setSelectedLesson(null)}
            />

            {/* Chest Reward Modal */}
            <ChestRewardModal
                isOpen={chestModal.isOpen}
                onClose={() => setChestModal({ isOpen: false, isOpened: false })}
                gems={Math.floor(Math.random() * 20) + 10}
                isOpened={chestModal.isOpened}
            />
        </div>
    )
}
