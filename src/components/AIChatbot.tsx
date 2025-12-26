'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { X, Send, Sparkles, MessageCircle, GripVertical } from 'lucide-react'
import dynamic from 'next/dynamic'

const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-16 h-16 bg-cyan-500/20 rounded-full animate-pulse" />
})

interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
}

// Random greeting messages
const greetingMessages = [
    'Cần giúp gì không? 🤔',
    'Hôm nay học vui không? 😊',
    'Có thắc mắc gì không? 💡',
    'Mình ở đây nè! 👋',
    'Cùng học code nào! 🚀',
    'Bạn giỏi lắm! ⭐',
]

// Mock AI responses about the website
const getAIResponse = (question: string): string => {
    const q = question.toLowerCase()

    if (q.includes('coallingo') || q.includes('coalingo') || q.includes('là gì')) {
        return 'Coallingo là nền tảng học lập trình trực tuyến với phong cách gamification! Bạn có thể học Python, JavaScript, C# và nhiều ngôn ngữ khác thông qua các bài học tương tác và thử thách thú vị. 🚀'
    }
    if (q.includes('học') || q.includes('bài học') || q.includes('khóa học')) {
        return 'Để bắt đầu học, hãy vào trang "Học" từ sidebar bên trái. Chọn ngôn ngữ bạn muốn học và bắt đầu với các bài học cơ bản. Mỗi bài học hoàn thành sẽ cho bạn XP và gems! 📚'
    }
    if (q.includes('xp') || q.includes('điểm') || q.includes('kinh nghiệm')) {
        return 'XP (Experience Points) là điểm kinh nghiệm bạn nhận được khi hoàn thành bài học, thử thách hoặc nhiệm vụ hàng ngày. XP giúp bạn lên level và mở khóa thành tích mới! ⭐'
    }
    if (q.includes('gem') || q.includes('đá quý') || q.includes('tiền')) {
        return 'Gems là tiền tệ trong game. Bạn có thể dùng gems để mua vật phẩm ở Cửa hàng như streak freeze, double XP, hoặc các avatar mới. Kiếm gems bằng cách hoàn thành nhiệm vụ và thử thách! 💎'
    }
    if (q.includes('streak') || q.includes('chuỗi')) {
        return 'Streak là chuỗi ngày học liên tiếp của bạn. Mỗi ngày bạn hoàn thành ít nhất 1 bài học, streak sẽ tăng lên. Giữ streak cao để nhận thêm XP bonus! 🔥'
    }
    if (q.includes('thư viện') || q.includes('reading') || q.includes('ai tạo')) {
        return 'Thư viện là nơi chứa các khóa học do AI tạo ra. Bạn có thể yêu cầu AI tạo khóa học về bất kỳ chủ đề lập trình nào bạn muốn học! Rất tiện lợi phải không? 📖'
    }
    if (q.includes('profile') || q.includes('hồ sơ')) {
        return 'Trang Hồ sơ hiển thị thông tin cá nhân, thống kê học tập, thành tích và hoạt động 7 ngày qua của bạn. Bạn cũng có thể thay đổi avatar và cài đặt tại đây! 👤'
    }
    if (q.includes('xin chào') || q.includes('hello') || q.includes('hi')) {
        return 'Xin chào! Mình là trợ lý AI của Coallingo. Bạn có thể hỏi mình về cách sử dụng trang web, các tính năng, hoặc bất cứ điều gì bạn thắc mắc nhé! 👋'
    }

    return 'Mình hiểu câu hỏi của bạn! Đây là một số gợi ý:\n\n• Vào trang "Học" để bắt đầu học code\n• Trang "Thư viện" để xem khóa học AI\n• Trang "Luyện tập" để ôn lại kiến thức\n• Trang "Xếp hạng" để xem thứ hạng\n\nBạn cần giúp gì thêm không? 😊'
}

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Xin chào! Mình là trợ lý AI của Coallingo. Bạn cần giúp gì không? 🤖',
            timestamp: new Date()
        }
    ])
    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState(false)

    // Greeting bubble
    const [greetingBubble, setGreetingBubble] = useState<string | null>(null)

    // Draggable state
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [hasDragged, setHasDragged] = useState(false) // Track if actually dragged
    const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number } | null>(null)

    // Text selection state
    const [selectedText, setSelectedText] = useState('')
    const [selectionPopup, setSelectionPopup] = useState<{ x: number; y: number } | null>(null)

    // Animation state for flying to selection
    const [isFlying, setIsFlying] = useState(false)
    const [flyTarget, setFlyTarget] = useState<{ x: number; y: number } | null>(null)

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const chatContainerRef = useRef<HTMLDivElement>(null)

    // Show random greeting bubbles periodically
    useEffect(() => {
        if (isOpen) return // Don't show if chat is open

        const showGreeting = () => {
            const randomMessage = greetingMessages[Math.floor(Math.random() * greetingMessages.length)]
            setGreetingBubble(randomMessage)

            // Hide after 4 seconds
            setTimeout(() => {
                setGreetingBubble(null)
            }, 4000)
        }

        // Show first greeting after 5 seconds
        const initialTimeout = setTimeout(showGreeting, 5000)

        // Then show every 30 seconds
        const interval = setInterval(showGreeting, 30000)

        return () => {
            clearTimeout(initialTimeout)
            clearInterval(interval)
        }
    }, [isOpen])

    // Scroll to bottom when new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Text selection listener - show popup immediately when selecting
    useEffect(() => {
        let selectionTimeout: NodeJS.Timeout | null = null

        const handleSelectionChange = () => {
            // Clear previous timeout
            if (selectionTimeout) {
                clearTimeout(selectionTimeout)
            }

            // Small delay to avoid flickering during active selection
            selectionTimeout = setTimeout(() => {
                const selection = window.getSelection()
                const text = selection?.toString().trim()

                if (text && text.length > 2) {
                    try {
                        const range = selection?.getRangeAt(0)
                        const rect = range?.getBoundingClientRect()

                        if (rect && rect.width > 0) {
                            setSelectedText(text)
                            setSelectionPopup({
                                x: rect.left + rect.width / 2,
                                y: rect.top - 10
                            })
                        }
                    } catch (e) {
                        // Selection might be invalid
                        setSelectionPopup(null)
                    }
                } else {
                    setSelectionPopup(null)
                }
            }, 100)
        }

        const handleMouseDown = (e: MouseEvent) => {
            // Hide popup when clicking elsewhere
            const target = e.target as HTMLElement
            if (!target.closest('.ask-ai-popup')) {
                setSelectionPopup(null)
            }
        }

        document.addEventListener('selectionchange', handleSelectionChange)
        document.addEventListener('mousedown', handleMouseDown)

        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange)
            document.removeEventListener('mousedown', handleMouseDown)
            if (selectionTimeout) clearTimeout(selectionTimeout)
        }
    }, [])

    // Dragging handlers
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('.chat-panel')) return

        setIsDragging(true)
        setHasDragged(false) // Reset drag tracking
        dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            initialX: position.x,
            initialY: position.y
        }
    }, [position])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !dragRef.current) return

            const deltaX = e.clientX - dragRef.current.startX
            const deltaY = e.clientY - dragRef.current.startY

            // Only mark as dragged if moved more than 5px
            if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                setHasDragged(true)
            }

            setPosition({
                x: dragRef.current.initialX + deltaX,
                y: dragRef.current.initialY + deltaY
            })
        }

        const handleMouseUp = () => {
            setIsDragging(false)
            dragRef.current = null
        }

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging])

    const handleButtonClick = () => {
        // Only toggle chat if we didn't drag
        if (!hasDragged) {
            setIsOpen(!isOpen)
            setGreetingBubble(null)
        }
    }

    const handleSend = () => {
        if (!input.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date()
        }

        setMessages(prev => [...prev, userMessage])
        setInput('')
        setIsTyping(true)

        // Simulate AI response
        setTimeout(() => {
            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: getAIResponse(input),
                timestamp: new Date()
            }
            setMessages(prev => [...prev, aiMessage])
            setIsTyping(false)
        }, 1000)
    }

    const handleAskAI = () => {
        // Reset position to original (bottom right)
        setPosition({ x: 0, y: 0 })
        setSelectionPopup(null)
        setIsFlying(true)
        setGreetingBubble(null)

        // After flying animation, open chat
        setTimeout(() => {
            setIsFlying(false)
            setIsOpen(true)

            const userMessage: Message = {
                id: Date.now().toString(),
                role: 'user',
                content: `"${selectedText}" - Giải thích cho mình về điều này?`,
                timestamp: new Date()
            }

            setMessages(prev => [...prev, userMessage])
            setIsTyping(true)

            setTimeout(() => {
                const aiMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: getAIResponse(selectedText),
                    timestamp: new Date()
                }
                setMessages(prev => [...prev, aiMessage])
                setIsTyping(false)
            }, 1000)
        }, 500)
    }

    // Calculate flying position
    const getFlyingStyle = () => {
        if (!isFlying || !flyTarget) return {}

        const targetX = window.innerWidth - flyTarget.x - 40
        const targetY = window.innerHeight - flyTarget.y - 40

        return {
            transform: `translate(${targetX - position.x}px, ${targetY - position.y}px) scale(0.5)`,
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }
    }

    return (
        <>
            {/* Text Selection Popup */}
            {selectionPopup && (
                <div
                    className="ask-ai-popup fixed z-[10001] flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold rounded-2xl shadow-xl hover:scale-105 transition-all cursor-pointer animate-bounce-in"
                    style={{
                        left: selectionPopup.x,
                        top: selectionPopup.y,
                        transform: 'translate(-50%, -100%)'
                    }}
                    onClick={handleAskAI}
                >
                    <Sparkles className="w-4 h-4" />
                    <span>Tư vấn AI</span>
                    <span className="text-xs opacity-80">✨</span>
                </div>
            )}

            {/* Floating Chatbot Button */}
            <div
                className={`fixed z-[10000] ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'} ${isFlying ? 'transition-all duration-500 ease-out' : ''}`}
                style={{
                    right: 24 - position.x,
                    bottom: 24 - position.y,
                }}
                onMouseDown={handleMouseDown}
            >
                {/* Greeting Bubble */}
                {greetingBubble && !isOpen && (
                    <div className="absolute bottom-full right-0 mb-2 whitespace-nowrap animate-bounce-in">
                        <div className="bg-white px-4 py-2 rounded-2xl rounded-br-md shadow-lg border border-gray-200">
                            <p className="text-sm font-medium text-gray-700">{greetingBubble}</p>
                        </div>
                        {/* Speech bubble tail */}
                        <div className="absolute bottom-0 right-4 w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45 translate-y-1.5" />
                    </div>
                )}

                {/* Drag Handle Indicator */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                </div>

                {/* Chat Panel */}
                {isOpen && (
                    <div
                        className="chat-panel absolute bottom-20 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-slide-up"
                        onClick={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">Coallingo AI</h3>
                                    <p className="text-xs text-white/80">Trợ lý thông minh</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div
                            ref={chatContainerRef}
                            className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50"
                        >
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl ${message.role === 'user'
                                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-br-md'
                                            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm'
                                            }`}
                                    >
                                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-md shadow-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-gray-200">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Nhập câu hỏi..."
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-cyan-500 text-sm"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className="p-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Chatbot Button */}
                <div
                    role="button"
                    tabIndex={0}
                    onClick={handleButtonClick}
                    onKeyDown={(e) => e.key === 'Enter' && handleButtonClick()}
                    className={`relative group ${isOpen ? 'scale-90' : 'hover:scale-110'} transition-transform`}
                >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-cyan-500/30 rounded-full blur-xl group-hover:blur-2xl transition-all" />

                    {/* Animation */}
                    <div className="relative">
                        <LottieMascot size={80} animationFile="chatbot.json" />
                    </div>

                    {/* Pulse indicator when closed */}
                    {!isOpen && (
                        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
                    )}
                </div>
            </div>

            {/* CSS for animations */}
            <style jsx global>{`
                @keyframes bounce-in {
                    0% {
                        opacity: 0;
                        transform: translate(-50%, -100%) scale(0.5);
                    }
                    50% {
                        transform: translate(-50%, -100%) scale(1.1);
                    }
                    100% {
                        opacity: 1;
                        transform: translate(-50%, -100%) scale(1);
                    }
                }
                .animate-bounce-in {
                    animation: bounce-in 0.3s ease-out;
                }
                
                @keyframes slide-up {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out;
                }
            `}</style>
        </>
    )
}
