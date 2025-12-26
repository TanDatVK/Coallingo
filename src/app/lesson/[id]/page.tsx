'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { mockUnits, mockLessonContents, Question } from '@/data/mockData'
import { ArrowLeft, BookOpen, Code2, Check, X, Terminal, Heart, Cpu, Zap, ChevronRight, Play, FileCode, Bug, Puzzle, Lightbulb, AlertCircle, GripVertical } from 'lucide-react'
import dynamic from 'next/dynamic'

const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-24 h-24 bg-slate-800 rounded-lg animate-pulse" />
})

// IT-themed Multiple Choice
function MultipleChoice({
    question,
    onAnswer,
    showResult,
    selectedAnswer
}: {
    question: Question
    onAnswer: (answer: string) => void
    showResult: boolean
    selectedAnswer: string | null
}) {
    return (
        <div className="space-y-5">
            <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                    <Puzzle size={20} className="text-white" />
                </div>
                <div className="flex-1">
                    <p className="text-lg font-semibold text-slate-100">{question.questionVi}</p>
                </div>
            </div>

            {question.code && (
                <div className="relative bg-slate-950 rounded-xl overflow-hidden border border-slate-700">
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border-b border-slate-700">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="text-xs text-slate-400 font-mono">code.py</span>
                    </div>
                    <pre className="p-4 text-sm font-mono text-emerald-400 overflow-x-auto">{question.code}</pre>
                </div>
            )}

            <div className="grid gap-3">
                {question.options?.map((option, index) => {
                    const isSelected = selectedAnswer === option
                    const isCorrectOption = option === question.correctAnswer

                    let buttonStyle = 'bg-slate-800/50 border-slate-600 hover:border-cyan-500 hover:bg-slate-800'
                    let iconBg = 'bg-slate-700'

                    if (showResult) {
                        if (isCorrectOption) {
                            buttonStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                            iconBg = 'bg-emerald-500 text-white'
                        } else if (isSelected && !isCorrectOption) {
                            buttonStyle = 'bg-red-500/20 border-red-500 text-red-400'
                            iconBg = 'bg-red-500 text-white'
                        } else {
                            buttonStyle = 'bg-slate-900/50 border-slate-700 opacity-40'
                        }
                    } else if (isSelected) {
                        buttonStyle = 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                        iconBg = 'bg-cyan-500 text-white'
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => !showResult && onAnswer(option)}
                            disabled={showResult}
                            className={`w-full p-4 rounded-xl text-left font-medium transition-all border-2 ${buttonStyle}`}
                        >
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg mr-3 font-bold text-sm ${iconBg}`}>
                                {String.fromCharCode(65 + index)}
                            </span>
                            <span className="text-slate-200">{option}</span>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

// IT-themed Type Answer
function TypeAnswer({
    question,
    onAnswer,
    showResult,
    selectedAnswer
}: {
    question: Question
    onAnswer: (answer: string) => void
    showResult: boolean
    selectedAnswer: string | null
}) {
    const [inputValue, setInputValue] = useState('')
    const isCorrect = selectedAnswer?.toLowerCase().trim() === (question.correctAnswer as string).toLowerCase().trim()

    return (
        <div className="space-y-5">
            <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <Terminal size={20} className="text-white" />
                </div>
                <div className="flex-1">
                    <p className="text-lg font-semibold text-slate-100">{question.questionVi}</p>
                </div>
            </div>

            {question.code && (
                <div className="relative bg-slate-950 rounded-xl overflow-hidden border border-slate-700">
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border-b border-slate-700">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="text-xs text-slate-400 font-mono">script.py</span>
                    </div>
                    <pre className="p-4 text-sm font-mono text-emerald-400 overflow-x-auto">{question.code}</pre>
                </div>
            )}

            <div className="space-y-3">
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 font-mono text-sm">{'>'}</div>
                    <input
                        type="text"
                        value={showResult ? (selectedAnswer || '') : inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !showResult && inputValue && onAnswer(inputValue)}
                        disabled={showResult}
                        placeholder="Nhập kết quả..."
                        className={`w-full pl-8 pr-4 py-4 rounded-xl border-2 font-mono text-lg bg-slate-900 
                            ${showResult
                                ? isCorrect
                                    ? 'border-emerald-500 text-emerald-400'
                                    : 'border-red-500 text-red-400'
                                : 'border-slate-600 text-slate-100 focus:border-cyan-500'
                            } outline-none transition-all placeholder:text-slate-500`}
                    />
                </div>

                {!showResult && inputValue && (
                    <button
                        onClick={() => onAnswer(inputValue)}
                        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                        <Play size={18} /> Chạy code
                    </button>
                )}

                {showResult && !isCorrect && (
                    <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                        <span className="text-slate-400">Output mong đợi: </span>
                        <code className="font-mono font-bold text-emerald-400">{question.correctAnswer as string}</code>
                    </div>
                )}
            </div>
        </div>
    )
}

// IT-themed Find Bug
function FindBug({
    question,
    onAnswer,
    showResult,
    selectedAnswer
}: {
    question: Question
    onAnswer: (answer: number) => void
    showResult: boolean
    selectedAnswer: number | null
}) {
    const correctLine = question.correctAnswer as number

    return (
        <div className="space-y-5">
            <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg">
                    <Bug size={20} className="text-white" />
                </div>
                <div className="flex-1">
                    <p className="text-lg font-semibold text-slate-100">{question.questionVi}</p>
                    <p className="text-sm text-slate-400 mt-1">Click vào dòng có lỗi</p>
                </div>
            </div>

            <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-700">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 border-b border-slate-700">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-xs text-slate-400 font-mono">buggy_code.py</span>
                    <div className="ml-auto flex items-center gap-1 text-red-400 text-xs">
                        <Bug size={12} /> 1 lỗi được phát hiện
                    </div>
                </div>

                {question.codeLines?.map((line, index) => {
                    const isSelected = selectedAnswer === index
                    const isCorrectLine = index === correctLine

                    let lineStyle = 'hover:bg-slate-800 cursor-pointer'
                    let lineNumStyle = 'text-slate-500'

                    if (showResult) {
                        if (isCorrectLine) {
                            lineStyle = 'bg-red-500/20 border-l-4 border-red-500'
                            lineNumStyle = 'text-red-400'
                        } else if (isSelected && !isCorrectLine) {
                            lineStyle = 'bg-slate-800'
                        } else {
                            lineStyle = 'opacity-40'
                        }
                    } else if (isSelected) {
                        lineStyle = 'bg-cyan-500/20 border-l-4 border-cyan-500'
                        lineNumStyle = 'text-cyan-400'
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => !showResult && onAnswer(index)}
                            disabled={showResult}
                            className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-all ${lineStyle}`}
                        >
                            <span className={`font-mono w-6 text-right text-sm ${lineNumStyle}`}>{index + 1}</span>
                            <code className="text-emerald-400 font-mono text-sm">{line}</code>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

// IT-themed Drag Drop
function DragDrop({
    question,
    onAnswer,
    showResult,
    selectedAnswer
}: {
    question: Question
    onAnswer: (answer: string[]) => void
    showResult: boolean
    selectedAnswer: string[] | null
}) {
    const [filledBlanks, setFilledBlanks] = useState<string[]>([])
    const [availableWords, setAvailableWords] = useState<string[]>(question.blanks || [])
    const [draggedWord, setDraggedWord] = useState<string | null>(null)
    const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null)
    const correctAnswers = question.correctAnswer as string[]

    // HTML5 Drag handlers
    const handleDragStart = (e: React.DragEvent, word: string) => {
        setDraggedWord(word)
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', word)
    }

    const handleDragEnd = () => {
        setDraggedWord(null)
        setDropTargetIndex(null)
    }

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault()
        setDropTargetIndex(index)
    }

    const handleDragLeave = () => {
        setDropTargetIndex(null)
    }

    const handleDrop = (e: React.DragEvent, index: number) => {
        e.preventDefault()
        const word = e.dataTransfer.getData('text/plain')
        if (word && !filledBlanks[index]) {
            const newFilled = [...filledBlanks]
            newFilled[index] = word
            setFilledBlanks(newFilled)
            setAvailableWords(availableWords.filter(w => w !== word))
        }
        setDropTargetIndex(null)
    }

    const handleRemove = (index: number) => {
        if (showResult) return
        const word = filledBlanks[index]
        setAvailableWords([...availableWords, word])
        setFilledBlanks(filledBlanks.filter((_, i) => i !== index))
    }

    const renderTemplate = () => {
        if (!question.template) return null
        const parts = question.template.split('___')

        return (
            <div className="bg-slate-950 p-4 rounded-xl font-mono text-emerald-400 flex flex-wrap items-center gap-1 border border-slate-700">
                {parts.map((part, index) => (
                    <span key={index} className="flex items-center">
                        <span>{part}</span>
                        {index < parts.length - 1 && (
                            filledBlanks[index] ? (
                                <button
                                    onClick={() => handleRemove(index)}
                                    className={`px-3 py-1 mx-1 rounded-lg font-bold transition-all cursor-pointer ${showResult
                                        ? filledBlanks[index] === correctAnswers[index]
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-red-500 text-white'
                                        : 'bg-cyan-500 text-white hover:bg-cyan-600'
                                        }`}
                                >
                                    {filledBlanks[index]}
                                </button>
                            ) : (
                                <span
                                    onDragOver={(e) => handleDragOver(e, index)}
                                    onDragLeave={handleDragLeave}
                                    onDrop={(e) => handleDrop(e, index)}
                                    className={`inline-flex items-center justify-center min-w-[80px] h-8 mx-1 border-2 border-dashed rounded-lg text-xs transition-all ${dropTargetIndex === index
                                        ? 'border-cyan-400 bg-cyan-500/20 text-cyan-400 scale-105'
                                        : 'border-slate-500 text-slate-500'
                                        }`}
                                >
                                    {dropTargetIndex === index ? '↓ thả vào đây' : 'kéo vào đây'}
                                </span>
                            )
                        )}
                    </span>
                ))}
            </div>
        )
    }

    return (
        <div className="space-y-5">
            <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg">
                    <Code2 size={20} className="text-white" />
                </div>
                <div className="flex-1">
                    <p className="text-lg font-semibold text-slate-100">{question.questionVi}</p>
                    <p className="text-sm text-slate-400 mt-1">Kéo từ khóa vào vị trí đúng</p>
                </div>
            </div>

            {renderTemplate()}

            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                <div className="text-xs text-slate-400 mb-3 uppercase tracking-wide flex items-center gap-2">
                    <GripVertical size={14} /> Kéo từ khóa bên dưới
                </div>
                <div className="flex flex-wrap gap-2">
                    {availableWords.map((word, index) => (
                        <div
                            key={index}
                            draggable={!showResult}
                            onDragStart={(e) => handleDragStart(e, word)}
                            onDragEnd={handleDragEnd}
                            className={`px-4 py-2 bg-slate-900 border-2 border-slate-600 rounded-lg font-mono font-bold text-cyan-400 transition-all select-none ${showResult
                                ? 'opacity-50 cursor-not-allowed'
                                : 'cursor-grab active:cursor-grabbing hover:border-cyan-500 hover:bg-slate-800 hover:scale-105'
                                } ${draggedWord === word ? 'opacity-50 scale-95' : ''}`}
                        >
                            <span className="flex items-center gap-2">
                                <GripVertical size={14} className="text-slate-500" />
                                {word}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {!showResult && filledBlanks.length > 0 && (
                <button
                    onClick={() => onAnswer(filledBlanks)}
                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                    <Play size={18} /> Chạy code
                </button>
            )}
        </div>
    )
}

// IT-themed Code Writing (Essay)
function CodeWriting({
    question,
    onAnswer,
    showResult,
    selectedAnswer
}: {
    question: Question
    onAnswer: (answer: string) => void
    showResult: boolean
    selectedAnswer: string | null
}) {
    const [code, setCode] = useState(question.starterCode || '')
    const [showHints, setShowHints] = useState(false)

    // Simple validation - check if code contains print()
    const validateCode = (userCode: string) => {
        const errors: string[] = []

        // Check for common mistakes
        if (!userCode.trim()) {
            errors.push('⚠️ Code trống. Bạn cần viết code để giải bài.')
        }
        if (userCode.includes('Print(') || userCode.includes('PRINT(')) {
            errors.push('❌ Lỗi cú pháp: Python phân biệt chữ hoa/thường. Sử dụng print() thay vì Print() hoặc PRINT().')
        }
        if (userCode.includes('print(') && !userCode.includes('"') && !userCode.includes("'")) {
            errors.push('❌ Thiếu dấu ngoặc kép: Chuỗi phải được đặt trong "" hoặc \'\'.')
        }
        if (userCode.includes('print ') && !userCode.includes('print(')) {
            errors.push('❌ Thiếu dấu ngoặc: print là hàm, cần có () để gọi. Ví dụ: print("Hello")')
        }
        if ((userCode.match(/\(/g) || []).length !== (userCode.match(/\)/g) || []).length) {
            errors.push('❌ Lỗi ngoặc: Số dấu ( và ) không khớp.')
        }
        if ((userCode.match(/"/g) || []).length % 2 !== 0) {
            errors.push('❌ Lỗi chuỗi: Dấu ngoặc kép " không được đóng đúng.')
        }

        return errors
    }

    const errors = showResult ? validateCode(selectedAnswer || '') : []
    const isCorrect = showResult && errors.length === 0 && (selectedAnswer || '').includes('print(')

    return (
        <div className="space-y-5">
            <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg">
                    <FileCode size={20} className="text-white" />
                </div>
                <div className="flex-1">
                    <p className="text-lg font-semibold text-slate-100">{question.questionVi}</p>
                    <p className="text-sm text-slate-400 mt-1">Viết code Python để giải bài</p>
                </div>
            </div>

            {/* Expected Output */}
            {question.expectedOutput && (
                <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                    <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Kết quả mong đợi</div>
                    <code className="text-cyan-400 font-mono">{question.expectedOutput}</code>
                </div>
            )}

            {/* Code Editor */}
            <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-700">
                <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="text-xs text-slate-400 font-mono">solution.py</span>
                    </div>
                    <button
                        onClick={() => setShowHints(!showHints)}
                        className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                    >
                        <Lightbulb size={14} />
                        {showHints ? 'Ẩn gợi ý' : 'Xem gợi ý'}
                    </button>
                </div>

                <div className="flex">
                    {/* Line numbers */}
                    <div className="py-4 px-3 text-slate-500 font-mono text-sm text-right select-none border-r border-slate-800">
                        {(showResult ? (selectedAnswer || '') : code).split('\n').map((_, i) => (
                            <div key={i}>{i + 1}</div>
                        ))}
                    </div>

                    {/* Code area */}
                    <textarea
                        value={showResult ? (selectedAnswer || '') : code}
                        onChange={(e) => setCode(e.target.value)}
                        disabled={showResult}
                        placeholder="# Viết code của bạn ở đây..."
                        className={`flex-1 p-4 bg-transparent text-emerald-400 font-mono text-sm resize-none outline-none min-h-[150px] ${showResult ? (isCorrect ? 'text-emerald-400' : 'text-red-400') : ''
                            }`}
                        spellCheck={false}
                    />
                </div>
            </div>

            {/* Hints */}
            {showHints && question.hints && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                    <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
                        <Lightbulb size={16} /> Gợi ý
                    </div>
                    <ul className="space-y-1">
                        {question.hints.map((hint, i) => (
                            <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                                <span className="text-amber-400">•</span>
                                {hint}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Error Analysis */}
            {showResult && errors.length > 0 && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <div className="flex items-center gap-2 text-red-400 font-bold mb-3">
                        <AlertCircle size={18} /> Phân tích lỗi
                    </div>
                    <ul className="space-y-2">
                        {errors.map((error, i) => (
                            <li key={i} className="text-red-300 text-sm">{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Submit Button */}
            {!showResult && code.trim() && (
                <button
                    onClick={() => onAnswer(code)}
                    className="w-full py-3 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                    <Play size={18} /> Chạy và kiểm tra
                </button>
            )}
        </div>
    )
}

// Main Lesson Page with IT Theme
export default function LessonPage() {
    const params = useParams()
    const router = useRouter()
    const lessonId = params.id as string

    const [activeTab, setActiveTab] = useState<'knowledge' | 'test'>('knowledge')
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<(string | number | string[] | null)[]>([])
    const [showResult, setShowResult] = useState(false)
    const [isCompleted, setIsCompleted] = useState(false)
    const [hearts, setHearts] = useState(5)
    const [xpEarned, setXpEarned] = useState(0)

    // New features
    const [streak, setStreak] = useState(0)
    const [showStreakAnimation, setShowStreakAnimation] = useState(false)
    const [showOutOfHeartsModal, setShowOutOfHeartsModal] = useState(false)
    const [correctCount, setCorrectCount] = useState(0)
    const [hintCount, setHintCount] = useState(5) // Item từ cửa hàng, mua 1 lần = 5 lượt
    const [revealedAnswer, setRevealedAnswer] = useState<string | number | string[] | null>(null)

    const lesson = mockUnits.flatMap(u => u.lessons).find(l => l.id === lessonId)
    const content = mockLessonContents.find(c => c.lessonId === lessonId)

    if (!lesson || !content) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-6 bg-slate-800 rounded-2xl flex items-center justify-center">
                        <FileCode size={40} className="text-slate-500" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-300 mb-2">Bài học đang phát triển</h2>
                    <p className="text-slate-500 mb-6">Nội dung sẽ sớm được cập nhật</p>
                    <button
                        onClick={() => router.push('/learn')}
                        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl"
                    >
                        ← Quay lại
                    </button>
                </div>
            </div>
        )
    }

    const questions = content.exercises
    const currentQ = questions[currentQuestion]
    const progress = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100

    const handleAnswer = (answer: string | number | string[]) => {
        const newAnswers = [...answers]
        newAnswers[currentQuestion] = answer
        setAnswers(newAnswers)
        setShowResult(true)
        setRevealedAnswer(null)

        let isCorrect = false
        if (currentQ.type === 'multiple_choice') {
            isCorrect = answer === currentQ.correctAnswer
        } else if (currentQ.type === 'type_answer') {
            isCorrect = (answer as string).toLowerCase().trim() === (currentQ.correctAnswer as string).toLowerCase().trim()
        } else if (currentQ.type === 'find_bug') {
            isCorrect = answer === currentQ.correctAnswer
        } else if (currentQ.type === 'drag_drop') {
            isCorrect = JSON.stringify(answer) === JSON.stringify(currentQ.correctAnswer)
        }

        if (isCorrect) {
            setXpEarned(prev => prev + Math.floor(lesson.xpReward / questions.length))
            setCorrectCount(prev => prev + 1)
            const newStreak = streak + 1
            setStreak(newStreak)

            // Show streak animation at 2 or 4 consecutive correct
            if (newStreak === 2 || newStreak === 4) {
                setShowStreakAnimation(true)
                setTimeout(() => setShowStreakAnimation(false), 2000)
            }
        } else {
            setStreak(0) // Reset streak on wrong answer
            const newHearts = hearts - 1
            setHearts(Math.max(0, newHearts))

            // Show out of hearts modal
            if (newHearts <= 0) {
                setTimeout(() => setShowOutOfHeartsModal(true), 500)
            }
        }
    }

    const handleSkip = () => {
        // Skip counts as wrong (lose a heart)
        const newHearts = hearts - 1
        setHearts(Math.max(0, newHearts))
        setStreak(0)

        if (newHearts <= 0) {
            setShowOutOfHeartsModal(true)
            return
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1)
            setShowResult(false)
            setRevealedAnswer(null)
        } else {
            setIsCompleted(true)
        }
    }

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1)
            setShowResult(false)
            setRevealedAnswer(null)
        } else {
            setIsCompleted(true)
        }
    }

    const handleUseHint = () => {
        if (hintCount > 0 && !showResult) {
            setHintCount(prev => prev - 1)
            setRevealedAnswer(currentQ.correctAnswer)
        }
    }

    const handleBuyHearts = (method: 'gems' | 'ad') => {
        // Mock: restore hearts
        setHearts(5)
        setShowOutOfHeartsModal(false)
    }

    const handleRestartLesson = () => {
        setCurrentQuestion(0)
        setAnswers([])
        setShowResult(false)
        setIsCompleted(false)
        setHearts(5)
        setXpEarned(0)
        setStreak(0)
        setCorrectCount(0)
        setActiveTab('test')
    }

    // Completion Screen
    if (isCompleted) {
        const finalCorrectCount = answers.filter((a, i) => {
            const q = questions[i]
            if (q.type === 'drag_drop') return JSON.stringify(a) === JSON.stringify(q.correctAnswer)
            if (q.type === 'type_answer') return (a as string)?.toLowerCase().trim() === (q.correctAnswer as string).toLowerCase().trim()
            return a === q.correctAnswer
        }).length

        const percentage = Math.round((finalCorrectCount / questions.length) * 100)
        const isPassed = percentage >= 50

        return (
            <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${isPassed
                ? 'bg-gradient-to-br from-slate-900 via-emerald-900/20 to-slate-900'
                : 'bg-gradient-to-br from-slate-900 via-red-900/20 to-slate-900'
                }`}>

                <div className={`relative max-w-md w-full rounded-3xl border p-8 text-center animate-fade-in ${isPassed
                    ? 'bg-slate-800/80 border-emerald-500/30'
                    : 'bg-slate-800/80 border-red-500/30'
                    }`}>
                    {/* Icon */}
                    <div className="mb-6 relative">
                        {isPassed ? (
                            <div className="mx-auto w-28 h-28">
                                <LottieMascot size={112} animationFile="Trophy.json" />
                            </div>
                        ) : (
                            <div className="relative mx-auto w-32 h-32">
                                {/* Sad emotion at bottom */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                                    <LottieMascot size={96} animationFile="sad emotion.json" />
                                </div>
                                {/* Lose animation on top */}
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                                    <LottieMascot size={80} animationFile="lose animation.json" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Title */}
                    <h1 className={`text-3xl font-black mb-2 ${isPassed ? 'text-emerald-400' : 'text-red-400'}`}>
                        {isPassed ? 'Chiến thắng!' : 'Chưa đạt'}
                    </h1>

                    <p className="text-slate-400 mb-2">{lesson.titleVi}</p>

                    <p className={`text-sm mb-6 ${isPassed ? 'text-emerald-400/80' : 'text-red-400/80'}`}>
                        {isPassed
                            ? 'Xuất sắc! Bạn đã hoàn thành bài học!'
                            : 'Cần đạt trên 50% để qua bài'}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <div className={`p-3 rounded-xl border ${isPassed ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'
                            }`}>
                            <div className={`text-2xl font-black ${isPassed ? 'text-emerald-400' : 'text-red-400'}`}>
                                {percentage}%
                            </div>
                            <div className="text-xs text-slate-500">Chính xác</div>
                        </div>
                        <div className="bg-slate-700/50 p-3 rounded-xl border border-slate-600">
                            <div className="text-2xl font-black text-yellow-400">+{xpEarned}</div>
                            <div className="text-xs text-slate-500">XP</div>
                        </div>
                        <div className="bg-slate-700/50 p-3 rounded-xl border border-slate-600">
                            <div className="text-2xl font-black text-red-400">{hearts}</div>
                            <div className="text-xs text-slate-500">❤️ Tim</div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        {isPassed ? (
                            <>
                                <button
                                    onClick={() => router.push('/learn')}
                                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-lg rounded-2xl hover:brightness-110 transition-all"
                                >
                                    Tiếp tục học →
                                </button>
                                <button
                                    onClick={handleRestartLesson}
                                    className="w-full py-3 bg-slate-700 text-slate-300 font-semibold rounded-xl hover:bg-slate-600 transition-all"
                                >
                                    Làm lại
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={handleRestartLesson}
                                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg rounded-2xl hover:brightness-110 transition-all"
                                >
                                    Học lại
                                </button>
                                <button
                                    onClick={() => router.push('/learn')}
                                    className="w-full py-3 bg-slate-700 text-slate-400 font-semibold rounded-xl hover:bg-slate-600 transition-all"
                                >
                                    Quay lại sau
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Streak Animation Overlay */}
            {showStreakAnimation && (
                <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
                    <div className="animate-fade-in">
                        <LottieMascot size={200} animationFile="clap.json" />
                    </div>
                </div>
            )}

            {/* Out of Hearts Modal */}
            {showOutOfHeartsModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                    <div className="max-w-sm w-full bg-slate-800 rounded-3xl border border-slate-700 p-6 text-center animate-fade-in">
                        <div className="w-20 h-20 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                            <Heart size={40} className="text-red-500" />
                        </div>
                        <h2 className="text-2xl font-black text-white mb-2">Hết tim rồi! 💔</h2>
                        <p className="text-slate-400 text-sm mb-6">Bạn cần tim để tiếp tục học. Chọn cách để lấy thêm tim:</p>

                        <div className="space-y-3">
                            <button
                                onClick={() => handleBuyHearts('gems')}
                                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2"
                            >
                                <LottieMascot size={24} animationFile="Stone.json" />
                                Mua 5 tim (50 gems)
                            </button>
                            <button
                                onClick={() => handleBuyHearts('ad')}
                                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl flex items-center justify-center gap-2"
                            >
                                🎬 Xem quảng cáo (+1 tim)
                            </button>
                            <button
                                onClick={() => router.push('/learn')}
                                className="w-full py-2 text-slate-400 hover:text-white font-semibold transition-colors"
                            >
                                Quay lại sau
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Header */}
            <div className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700">
                <div className="max-w-3xl mx-auto px-4 py-3">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/learn')}
                            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={22} className="text-slate-400" />
                        </button>

                        {/* Progress Bar */}
                        <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* Hearts */}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-lg">
                            <Heart size={18} className="text-red-500" fill="currentColor" />
                            <span className="font-bold text-slate-300">{hearts}</span>
                        </div>

                        {/* Hint Button */}
                        <button
                            onClick={handleUseHint}
                            disabled={hintCount <= 0 || showResult || revealedAnswer !== null}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${hintCount > 0 && !showResult && revealedAnswer === null
                                ? 'bg-amber-500/20 hover:bg-amber-500/30 cursor-pointer'
                                : 'bg-slate-800 opacity-50 cursor-not-allowed'
                                }`}
                        >
                            <div className="w-5 h-5">
                                <LottieMascot size={20} animationFile="Creative Idea.json" />
                            </div>
                            <span className="font-bold text-amber-400">{hintCount}</span>
                        </button>

                        {/* XP */}
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 rounded-lg">
                            <Zap size={18} className="text-yellow-400" fill="currentColor" />
                            <span className="font-bold text-slate-300">+{xpEarned}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-3xl mx-auto px-4 py-4">
                <div className="flex gap-1 bg-slate-800/50 p-1 rounded-xl border border-slate-700">
                    <button
                        onClick={() => setActiveTab('knowledge')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${activeTab === 'knowledge'
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                            : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        <BookOpen size={18} />
                        Kiến thức
                    </button>
                    <button
                        onClick={() => setActiveTab('test')}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${activeTab === 'test'
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                            : 'text-slate-400 hover:text-slate-200'
                            }`}
                    >
                        <Terminal size={18} />
                        Thực hành
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 pb-32">
                {activeTab === 'knowledge' ? (
                    <div className="space-y-6">
                        {/* Title */}
                        <div className="flex items-center gap-4 py-4">
                            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
                                <Code2 size={28} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-white">{content.knowledge.titleVi}</h1>
                                <p className="text-slate-400 text-sm">{content.knowledge.title}</p>
                            </div>
                        </div>

                        {/* Concepts */}
                        {content.knowledge.concepts.map((concept, index) => (
                            <div key={index} className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold">
                                            {index + 1}
                                        </div>
                                        <h3 className="text-lg font-bold text-white">{concept.headingVi}</h3>
                                    </div>
                                    <p className="text-slate-300 leading-relaxed">{concept.contentVi}</p>
                                </div>

                                {concept.codeExample && (
                                    <div className="border-t border-slate-700">
                                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50">
                                            <Terminal size={14} className="text-slate-500" />
                                            <span className="text-xs text-slate-500 font-mono">example.py</span>
                                        </div>
                                        <pre className="p-4 text-sm font-mono text-emerald-400 overflow-x-auto bg-slate-950">
                                            {concept.codeExample}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        ))}

                        <button
                            onClick={() => setActiveTab('test')}
                            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                            <Play size={20} /> Bắt đầu thực hành
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Question Counter with Skip and Hint */}
                        <div className="flex items-center justify-between py-2">
                            <div className="flex items-center gap-2">
                                <span className="px-3 py-1 bg-slate-800 rounded-lg text-sm font-mono text-cyan-400">
                                    {currentQuestion + 1}/{questions.length}
                                </span>
                                <span className="text-slate-500 text-sm">
                                    {currentQ.type === 'multiple_choice' && 'Trắc nghiệm'}
                                    {currentQ.type === 'type_answer' && 'Nhập kết quả'}
                                    {currentQ.type === 'find_bug' && 'Tìm lỗi'}
                                    {currentQ.type === 'drag_drop' && 'Hoàn thành code'}
                                    {currentQ.type === 'code_writing' && 'Viết code'}
                                </span>
                                {/* Streak indicator */}
                                {streak > 0 && (
                                    <span className="px-2 py-1 bg-yellow-500/20 rounded-lg text-xs font-bold text-yellow-400 flex items-center gap-1">
                                        🔥 {streak}
                                    </span>
                                )}
                            </div>
                            {/* Skip Button only - Hint moved to bottom */}
                            {!showResult && (
                                <button
                                    onClick={handleSkip}
                                    className="px-3 py-1.5 bg-slate-800 text-slate-400 hover:text-red-400 rounded-lg text-sm font-semibold flex items-center gap-1 transition-all"
                                >
                                    <ChevronRight size={14} />
                                    Bỏ qua
                                </button>
                            )}
                        </div>

                        {/* Revealed Answer Panel */}
                        {revealedAnswer !== null && (
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl animate-fade-in">
                                <div className="flex items-center gap-2 mb-2">
                                    <Lightbulb size={16} className="text-emerald-400" />
                                    <span className="font-bold text-emerald-400">Đáp án đúng</span>
                                </div>
                                <p className="text-white font-mono text-lg">
                                    {Array.isArray(revealedAnswer) ? revealedAnswer.join(' ') : String(revealedAnswer)}
                                </p>
                            </div>
                        )}

                        {/* Question Card */}
                        <div className="bg-slate-800/50 backdrop-blur rounded-2xl border border-slate-700 p-6">
                            {currentQ.type === 'multiple_choice' && (
                                <MultipleChoice question={currentQ} onAnswer={handleAnswer} showResult={showResult} selectedAnswer={answers[currentQuestion] as string} />
                            )}
                            {currentQ.type === 'type_answer' && (
                                <TypeAnswer question={currentQ} onAnswer={handleAnswer} showResult={showResult} selectedAnswer={answers[currentQuestion] as string} />
                            )}
                            {currentQ.type === 'find_bug' && (
                                <FindBug question={currentQ} onAnswer={handleAnswer} showResult={showResult} selectedAnswer={answers[currentQuestion] as number} />
                            )}
                            {currentQ.type === 'drag_drop' && (
                                <DragDrop question={currentQ} onAnswer={handleAnswer} showResult={showResult} selectedAnswer={answers[currentQuestion] as string[]} />
                            )}
                            {currentQ.type === 'code_writing' && (
                                <CodeWriting question={currentQ} onAnswer={handleAnswer} showResult={showResult} selectedAnswer={answers[currentQuestion] as string} />
                            )}
                        </div>

                        {/* Explanation */}
                        {showResult && (
                            <div className={`p-5 rounded-2xl border ${(() => {
                                const a = answers[currentQuestion]
                                if (currentQ.type === 'drag_drop') return JSON.stringify(a) === JSON.stringify(currentQ.correctAnswer)
                                if (currentQ.type === 'type_answer') return (a as string)?.toLowerCase().trim() === (currentQ.correctAnswer as string).toLowerCase().trim()
                                return a === currentQ.correctAnswer
                            })()
                                ? 'bg-emerald-500/10 border-emerald-500/30'
                                : 'bg-red-500/10 border-red-500/30'
                                }`}>
                                <div className="flex items-center gap-2 mb-2">
                                    {(() => {
                                        const a = answers[currentQuestion]
                                        const isCorrect = currentQ.type === 'drag_drop'
                                            ? JSON.stringify(a) === JSON.stringify(currentQ.correctAnswer)
                                            : currentQ.type === 'type_answer'
                                                ? (a as string)?.toLowerCase().trim() === (currentQ.correctAnswer as string).toLowerCase().trim()
                                                : a === currentQ.correctAnswer

                                        return isCorrect ? (
                                            <>
                                                <Check className="text-emerald-400" size={20} />
                                                <span className="font-bold text-emerald-400">✓ Chính xác!</span>
                                            </>
                                        ) : (
                                            <>
                                                <X className="text-red-400" size={20} />
                                                <span className="font-bold text-red-400">✗ Chưa đúng</span>
                                            </>
                                        )
                                    })()}
                                </div>
                                <p className="text-slate-300">{currentQ.explanationVi}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Bottom Button */}
            {activeTab === 'test' && showResult && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-900/90 backdrop-blur-xl border-t border-slate-700">
                    <div className="max-w-3xl mx-auto">
                        <button
                            onClick={handleNext}
                            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg rounded-2xl hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                            {currentQuestion < questions.length - 1 ? (
                                <>Tiếp theo <ChevronRight size={20} /></>
                            ) : (
                                <>Hoàn thành 🎉</>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
