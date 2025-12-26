'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { ArrowLeft, Lightbulb, MessageCircle, Sparkles, Brain, Target, ChevronRight, CheckCircle, XCircle, RefreshCw, Home, BookOpen } from 'lucide-react'
import Link from 'next/link'

const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-20 h-20 bg-cyan-500/20 rounded-full animate-pulse" />
})

interface PracticeStep {
    id: number
    type: 'explanation' | 'question' | 'hint' | 'solution'
    content: string
    code?: string
    options?: string[]
    correctAnswer?: number
}

// Generate practice content based on section
const generatePracticeContent = (sectionId: string): PracticeStep[] => {
    // Mock content - in real app, this would come from AI
    if (sectionId.includes('sec-2-3') || sectionId.includes('string')) {
        return [
            {
                id: 1,
                type: 'explanation',
                content: '## Mình hiểu bạn đang gặp khó khăn với **Chuỗi (Strings)** 📚\n\nĐừng lo, mình sẽ giúp bạn hiểu từng bước một nhé!',
            },
            {
                id: 2,
                type: 'explanation',
                content: '### Chuỗi là gì?\n\nChuỗi (String) là kiểu dữ liệu lưu trữ **văn bản** - một dãy các ký tự.\n\nBạn có thể tạo chuỗi bằng dấu nháy đơn hoặc nháy kép',
                code: '# Cả hai đều là chuỗi hợp lệ\nname = "Coallingo"\ngreeting = \'Xin chào\'',
            },
            {
                id: 3,
                type: 'question',
                content: '🧪 **Thử thách nhanh #1:**\n\nCái nào sau đây KHÔNG phải là chuỗi hợp lệ?',
                options: ['"Hello World"', "'Python'", 'Hello', '"123"'],
                correctAnswer: 2,
            },
            {
                id: 4,
                type: 'explanation',
                content: '### Nối chuỗi (Concatenation)\n\nBạn có thể nối các chuỗi với nhau bằng dấu +',
                code: 'first_name = "Nguyễn"\nlast_name = "Văn A"\nfull_name = first_name + " " + last_name\nprint(full_name)  # Nguyễn Văn A',
            },
            {
                id: 5,
                type: 'question',
                content: '🧪 **Thử thách #2:**\n\nKết quả của đoạn code sau là gì?\n```python\na = "Hello"\nb = "World"\nprint(a + b)\n```',
                options: ['Hello World', 'HelloWorld', 'Hello + World', 'Error'],
                correctAnswer: 1,
            },
            {
                id: 6,
                type: 'explanation',
                content: '### Truy cập ký tự trong chuỗi\n\nMỗi ký tự có một **index** (vị trí) bắt đầu từ 0.',
                code: 'text = "Python"\n# Index:  0 1 2 3 4 5\n\nprint(text[0])   # P (ký tự đầu)\nprint(text[1])   # y\nprint(text[-1])  # n (ký tự cuối)',
            },
            {
                id: 7,
                type: 'question',
                content: '🧪 **Thử thách cuối:**\n\nNếu word = "Code", giá trị của word[2] là gì?',
                options: ['C', 'o', 'd', 'e'],
                correctAnswer: 2,
            },
            {
                id: 8,
                type: 'solution',
                content: '## 🎉 Tuyệt vời! Bạn đã nắm được kiến thức về Chuỗi!\n\n### Tóm tắt:\n- Chuỗi tạo bằng "..." hoặc \'...\'\n- Nối chuỗi bằng +\n- Index bắt đầu từ 0\n- Index âm đếm từ cuối (-1 là cuối)',
            }
        ]
    }

    // Default content for any section
    return [
        {
            id: 1,
            type: 'explanation',
            content: '## Mình sẽ giúp bạn ôn tập! 📚\n\nĐây là phần luyện tập theo từng bước.',
        },
        {
            id: 2,
            type: 'explanation',
            content: '### Bước 1: Hiểu khái niệm\n\nHãy đọc kỹ nội dung bài học và ghi nhớ các điểm chính.',
            code: '# Ví dụ code\nprint("Hello World!")',
        },
        {
            id: 3,
            type: 'question',
            content: '🧪 **Kiểm tra kiến thức:**\n\nHàm print() dùng để làm gì?',
            options: ['In ra màn hình', 'Đọc input', 'Tạo biến', 'Xóa biến'],
            correctAnswer: 0,
        },
        {
            id: 4,
            type: 'solution',
            content: '## 🎉 Hoàn thành!\n\nBạn đã hoàn thành phần luyện tập AI.',
        }
    ]
}

export default function AIPracticePage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const sectionId = searchParams.get('section') || 'default'
    const moduleId = searchParams.get('module')

    const [currentStep, setCurrentStep] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [score, setScore] = useState(0)
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [showHint, setShowHint] = useState(false)
    const [isTyping, setIsTyping] = useState(true)

    const practiceSteps = generatePracticeContent(sectionId)
    const currentContent = practiceSteps[currentStep]

    // Typing animation effect
    useEffect(() => {
        setIsTyping(true)
        const timer = setTimeout(() => setIsTyping(false), 1000)
        return () => clearTimeout(timer)
    }, [currentStep])

    // Count total questions
    useEffect(() => {
        const questions = practiceSteps.filter(s => s.type === 'question').length
        setTotalQuestions(questions)
    }, [practiceSteps])

    const handleAnswer = (index: number) => {
        if (selectedAnswer !== null) return

        setSelectedAnswer(index)
        const correct = index === currentContent.correctAnswer
        setIsCorrect(correct)

        if (correct) {
            setScore(prev => prev + 1)
        }
    }

    const handleNext = () => {
        if (currentStep < practiceSteps.length - 1) {
            setCurrentStep(prev => prev + 1)
            setSelectedAnswer(null)
            setIsCorrect(null)
            setShowHint(false)
        }
    }

    const handleRestart = () => {
        setCurrentStep(0)
        setSelectedAnswer(null)
        setIsCorrect(null)
        setScore(0)
        setShowHint(false)
    }

    const progressPercentage = ((currentStep + 1) / practiceSteps.length) * 100
    const isLastStep = currentStep === practiceSteps.length - 1

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-lg border-b border-slate-700 z-50">
                <div className="max-w-4xl mx-auto h-full px-4 flex items-center justify-between">
                    <Link href="/reading" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">Quay lại</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 rounded-full">
                            <Brain className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm font-semibold text-cyan-400">AI Tutor</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <Target className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-bold">{score}/{totalQuestions}</span>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700">
                    <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-24 pb-32 px-4">
                <div className="max-w-2xl mx-auto">
                    {/* AI Mascot */}
                    <div className="flex items-start gap-4 mb-6">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 p-1">
                                <LottieMascot size={56} animationFile="chatbot.json" />
                            </div>
                        </div>

                        <div className="flex-1 bg-slate-800 rounded-2xl rounded-tl-md border border-slate-700 overflow-hidden">
                            {/* Typing indicator or content */}
                            {isTyping ? (
                                <div className="p-6">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                        <span className="text-slate-400 text-sm">AI đang soạn...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-6">
                                    {/* Content */}
                                    <div className="prose prose-invert max-w-none">
                                        {currentContent.content.split('\n').map((line, i) => {
                                            if (line.startsWith('## ')) {
                                                return <h2 key={i} className="text-xl font-bold text-white mt-0 mb-3">{line.replace('## ', '')}</h2>
                                            }
                                            if (line.startsWith('### ')) {
                                                return <h3 key={i} className="text-lg font-semibold text-cyan-400 mt-4 mb-2">{line.replace('### ', '')}</h3>
                                            }
                                            if (line.startsWith('- ')) {
                                                return <p key={i} className="text-slate-300 ml-4 my-1">• {line.replace('- ', '')}</p>
                                            }
                                            if (line.trim() === '') return null
                                            return <p key={i} className="text-slate-300 my-2" dangerouslySetInnerHTML={{
                                                __html: line
                                                    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
                                            }} />
                                        })}
                                    </div>

                                    {/* Code block */}
                                    {currentContent.code && (
                                        <div className="mt-4 rounded-xl overflow-hidden border border-slate-600">
                                            <div className="bg-slate-700 px-4 py-2 text-xs text-slate-400 font-mono">
                                                Python
                                            </div>
                                            <pre className="bg-slate-900 p-4 overflow-x-auto text-sm">
                                                <code className="text-green-400 font-mono">{currentContent.code}</code>
                                            </pre>
                                        </div>
                                    )}

                                    {/* Question options */}
                                    {currentContent.type === 'question' && currentContent.options && (
                                        <div className="mt-6 space-y-3">
                                            {currentContent.options.map((option, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleAnswer(index)}
                                                    disabled={selectedAnswer !== null}
                                                    className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${selectedAnswer === null
                                                            ? 'border-slate-600 hover:border-cyan-500 hover:bg-slate-700/50'
                                                            : selectedAnswer === index
                                                                ? isCorrect
                                                                    ? 'border-green-500 bg-green-500/20'
                                                                    : 'border-red-500 bg-red-500/20'
                                                                : index === currentContent.correctAnswer && selectedAnswer !== null
                                                                    ? 'border-green-500 bg-green-500/10'
                                                                    : 'border-slate-700 opacity-50'
                                                        }`}
                                                >
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${selectedAnswer === null
                                                            ? 'bg-slate-700 text-slate-300'
                                                            : selectedAnswer === index
                                                                ? isCorrect
                                                                    ? 'bg-green-500 text-white'
                                                                    : 'bg-red-500 text-white'
                                                                : index === currentContent.correctAnswer
                                                                    ? 'bg-green-500 text-white'
                                                                    : 'bg-slate-700 text-slate-500'
                                                        }`}>
                                                        {selectedAnswer !== null && selectedAnswer === index ? (
                                                            isCorrect ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />
                                                        ) : (
                                                            String.fromCharCode(65 + index)
                                                        )}
                                                    </div>
                                                    <span className={`${selectedAnswer !== null && (selectedAnswer === index || index === currentContent.correctAnswer)
                                                            ? 'text-white'
                                                            : 'text-slate-300'
                                                        }`}>
                                                        {option}
                                                    </span>
                                                </button>
                                            ))}

                                            {/* Feedback */}
                                            {selectedAnswer !== null && (
                                                <div className={`mt-4 p-4 rounded-xl ${isCorrect
                                                        ? 'bg-green-500/20 border border-green-500/30'
                                                        : 'bg-red-500/20 border border-red-500/30'
                                                    }`}>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        {isCorrect ? (
                                                            <>
                                                                <CheckCircle className="w-5 h-5 text-green-400" />
                                                                <span className="font-bold text-green-400">Chính xác! 🎉</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <XCircle className="w-5 h-5 text-red-400" />
                                                                <span className="font-bold text-red-400">Chưa đúng rồi 😅</span>
                                                            </>
                                                        )}
                                                    </div>
                                                    <p className="text-slate-300 text-sm">
                                                        Đáp án đúng: <strong className="text-white">{currentContent.options?.[currentContent.correctAnswer as number]}</strong>
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Hint button for questions */}
                                    {currentContent.type === 'question' && selectedAnswer === null && (
                                        <button
                                            onClick={() => setShowHint(true)}
                                            className="mt-4 flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                                        >
                                            <Lightbulb className="w-4 h-4" />
                                            Cần gợi ý?
                                        </button>
                                    )}

                                    {showHint && (
                                        <div className="mt-4 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Lightbulb className="w-4 h-4 text-cyan-400" />
                                                <span className="font-semibold text-cyan-400">Gợi ý:</span>
                                            </div>
                                            <p className="text-slate-300 text-sm">
                                                Hãy nhớ lại kiến thức về cách tạo và sử dụng chuỗi trong Python!
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-700 p-4">
                <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
                    {isLastStep ? (
                        <>
                            <button
                                onClick={handleRestart}
                                className="flex items-center gap-2 px-6 py-3 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-colors"
                            >
                                <RefreshCw className="w-5 h-5" />
                                Làm lại
                            </button>
                            <Link
                                href="/reading"
                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:brightness-105 transition-all"
                            >
                                <Home className="w-5 h-5" />
                                Về Thư viện
                            </Link>
                        </>
                    ) : (
                        <>
                            <div className="text-sm text-slate-400">
                                Bước {currentStep + 1} / {practiceSteps.length}
                            </div>
                            <button
                                onClick={handleNext}
                                disabled={currentContent.type === 'question' && selectedAnswer === null}
                                className={`flex items-center gap-2 px-6 py-3 font-bold rounded-xl transition-all ${currentContent.type === 'question' && selectedAnswer === null
                                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:brightness-105'
                                    }`}
                            >
                                Tiếp tục
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
