'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import {
    ArrowLeft,
    CreditCard,
    Building2,
    Smartphone,
    Shield,
    Check,
    ChevronRight,
    Copy,
    Clock,
    AlertCircle,
    Code2,
    Sparkles
} from 'lucide-react'
import dynamic from 'next/dynamic'

const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-16 h-16 bg-gray-700 rounded-full animate-pulse" />
})

// Package type definition
interface PaymentPackage {
    name: string
    price: number
    icon: string
    gems?: number
    hearts?: number | string
    duration?: string
    features?: string[]
    popular?: boolean
}

// Payment packages data
const packages: Record<string, PaymentPackage> = {
    gems_100: { name: '100 Gems', price: 29000, gems: 100, icon: '💎' },
    gems_300: { name: '300 Gems', price: 49000, gems: 300, icon: '💎' },
    gems_500: { name: '500 Gems', price: 99000, gems: 500, icon: '💎', popular: true },
    gems_750: { name: '750 Gems', price: 99000, gems: 750, icon: '💎' },
    gems_1000: { name: '1000 Gems', price: 179000, gems: 1000, icon: '💎' },
    gems_1500: { name: '1500 Gems', price: 179000, gems: 1500, icon: '💎' },
    gems_2500: { name: '2500 Gems', price: 399000, gems: 2500, icon: '💎' },
    gems_3500: { name: '3500 Gems', price: 349000, gems: 3500, icon: '💎' },
    hearts_5: { name: '5 Hearts', price: 19000, hearts: 5, icon: '❤️' },
    hearts_unlimited: { name: 'Unlimited Hearts', price: 49000, hearts: 'unlimited', icon: '❤️‍🔥', duration: '1 tuần' },
    pro_monthly: { name: 'Coallingo Pro', price: 149000, icon: '👑', duration: '1 tháng', features: ['Không quảng cáo', 'Hearts vô hạn', 'Luyện tập nâng cao'] },
    pro_yearly: { name: 'Coallingo Pro', price: 999000, icon: '👑', duration: '1 năm', features: ['Không quảng cáo', 'Hearts vô hạn', 'Luyện tập nâng cao', 'Tiết kiệm 44%'] },
}

// Payment methods
const paymentMethods = [
    {
        id: 'momo',
        name: 'MoMo',
        icon: '/images/momo.png',
        color: 'from-pink-500 to-pink-600',
        description: 'Thanh toán nhanh qua ví MoMo'
    },
    {
        id: 'vnpay',
        name: 'VNPay',
        icon: '/images/vnpay.png',
        color: 'from-blue-500 to-blue-600',
        description: 'Quét mã QR hoặc thẻ ATM'
    },
    {
        id: 'bank',
        name: 'Chuyển khoản',
        icon: null,
        iconComponent: Building2,
        color: 'from-green-500 to-green-600',
        description: 'Chuyển khoản ngân hàng nội địa'
    },
    {
        id: 'card',
        name: 'Thẻ quốc tế',
        icon: null,
        iconComponent: CreditCard,
        color: 'from-purple-500 to-purple-600',
        description: 'Visa, Mastercard, JCB'
    },
]

// Bank info for transfer
const bankInfo = {
    bankName: 'MB Bank',
    accountNumber: '0123456789',
    accountName: 'COALLINGO EDUCATION',
    branch: 'Hà Nội'
}

function PaymentContent() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const packageId = searchParams.get('package') || 'gems_500'
    const selectedPackage = packages[packageId] || packages.gems_500

    const [paymentMethod, setPaymentMethod] = useState<string>('')
    const [step, setStep] = useState<'select' | 'info' | 'confirm' | 'success'>('select')
    const [isProcessing, setIsProcessing] = useState(false)
    const [copied, setCopied] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    // Load user info from localStorage
    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            const userData = JSON.parse(user)
            setFormData(prev => ({
                ...prev,
                name: userData.name || '',
                email: userData.email || ''
            }))
        }
    }, [])

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price)
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ tên'
        if (!formData.email.trim()) newErrors.email = 'Vui lòng nhập email'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Email không hợp lệ'
        if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại'
        else if (!/^[0-9]{10,11}$/.test(formData.phone)) newErrors.phone = 'Số điện thoại không hợp lệ'
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleContinue = () => {
        if (step === 'select' && paymentMethod) {
            setStep('info')
        } else if (step === 'info' && validateForm()) {
            setStep('confirm')
        }
    }

    const handlePayment = async () => {
        setIsProcessing(true)
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsProcessing(false)
        setStep('success')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#1a2744] to-[#0d1f3c]">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `linear-gradient(rgba(88, 204, 2, 0.3) 1px, transparent 1px),
                                          linear-gradient(90deg, rgba(88, 204, 2, 0.3) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />

                {/* Gradient orbs */}
                <div className="absolute top-20 right-20 w-72 h-72 bg-duo-green/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-accent-blue/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-duo-purple/15 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: '2s' }} />

                {/* Floating elements */}
                <div className="absolute top-16 left-16 text-duo-green/30 animate-float">
                    <Code2 size={40} />
                </div>
                <div className="absolute bottom-20 right-20 text-accent-blue/30 animate-float" style={{ animationDelay: '1s' }}>
                    <Sparkles size={36} />
                </div>
            </div>

            {/* Header */}
            <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
                <div className="container max-w-5xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <button
                            onClick={() => step === 'select' ? router.back() : setStep('select')}
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                        >
                            <ArrowLeft size={20} />
                            <span className="font-semibold">Quay lại</span>
                        </button>
                        <div className="flex items-center gap-2">
                            <Shield className="text-duo-green" size={20} />
                            <span className="text-sm text-gray-400">Thanh toán an toàn</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container max-w-5xl mx-auto px-4 py-8 relative z-10">
                {step === 'success' ? (
                    /* Success State */
                    <div className="text-center py-12">
                        <div className="w-32 h-32 mx-auto mb-6">
                            <LottieMascot size={128} animationFile="Trophy.json" />
                        </div>
                        <h1 className="text-3xl font-black text-white mb-4">Thanh toán thành công! 🎉</h1>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Cảm ơn bạn đã mua {selectedPackage.name}!
                            {selectedPackage.gems && ` ${selectedPackage.gems} gems đã được cộng vào tài khoản.`}
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="/learn">
                                <button className="px-8 py-3 bg-duo-green text-white font-bold rounded-xl shadow-[0_4px_0_0_#46a302] hover:brightness-105 active:shadow-none active:translate-y-1 transition-all">
                                    Tiếp tục học
                                </button>
                            </Link>
                            <Link href="/shop">
                                <button className="px-8 py-3 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                                    Về cửa hàng
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left - Payment Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Progress Steps */}
                            <div className="flex items-center justify-center gap-2 mb-8">
                                {['Phương thức', 'Thông tin', 'Xác nhận'].map((label, i) => {
                                    const stepIndex = ['select', 'info', 'confirm'].indexOf(step)
                                    const isActive = i <= stepIndex
                                    const isCurrent = i === stepIndex
                                    return (
                                        <div key={label} className="flex items-center gap-2">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${isCurrent ? 'bg-duo-green text-white scale-110 ring-4 ring-duo-green/30' :
                                                isActive ? 'bg-duo-green/80 text-white' : 'bg-white/10 text-gray-500'
                                                }`}>
                                                {isActive && i < stepIndex ? <Check size={16} /> : i + 1}
                                            </div>
                                            <span className={`text-sm font-semibold hidden sm:block ${isCurrent ? 'text-white' : 'text-gray-500'}`}>
                                                {label}
                                            </span>
                                            {i < 2 && <ChevronRight size={16} className="text-gray-600 mx-2" />}
                                        </div>
                                    )
                                })}
                            </div>

                            {step === 'select' && (
                                /* Step 1: Select Payment Method */
                                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                                    <h2 className="text-xl font-black text-white mb-6">Chọn phương thức thanh toán</h2>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {paymentMethods.map((method) => (
                                            <button
                                                key={method.id}
                                                onClick={() => setPaymentMethod(method.id)}
                                                className={`p-4 rounded-xl border-2 text-left transition-all ${paymentMethod === method.id
                                                    ? 'border-duo-green bg-duo-green/10'
                                                    : 'border-white/10 hover:border-white/30 bg-white/5'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3 mb-2">
                                                    {method.icon ? (
                                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center p-2`}>
                                                            <Image src={method.icon} alt={method.name} width={32} height={32} className="object-contain" />
                                                        </div>
                                                    ) : method.iconComponent && (
                                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center`}>
                                                            <method.iconComponent className="text-white" size={24} />
                                                        </div>
                                                    )}
                                                    <span className="font-bold text-white">{method.name}</span>
                                                    {paymentMethod === method.id && (
                                                        <Check className="ml-auto text-duo-green" size={20} />
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-400">{method.description}</p>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {step === 'info' && (
                                /* Step 2: Customer Info */
                                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                                    <h2 className="text-xl font-black text-white mb-6">Thông tin thanh toán</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-300 mb-2">Họ và tên *</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Nguyễn Văn A"
                                                className={`w-full px-4 py-3.5 bg-white/5 border-2 rounded-xl font-semibold text-white placeholder-gray-500 transition-all focus:outline-none ${errors.name ? 'border-red-400' : 'border-white/10 focus:border-duo-green'
                                                    }`}
                                            />
                                            {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-300 mb-2">Email *</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="email@example.com"
                                                className={`w-full px-4 py-3.5 bg-white/5 border-2 rounded-xl font-semibold text-white placeholder-gray-500 transition-all focus:outline-none ${errors.email ? 'border-red-400' : 'border-white/10 focus:border-duo-green'
                                                    }`}
                                            />
                                            {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-300 mb-2">Số điện thoại *</label>
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="0901234567"
                                                className={`w-full px-4 py-3.5 bg-white/5 border-2 rounded-xl font-semibold text-white placeholder-gray-500 transition-all focus:outline-none ${errors.phone ? 'border-red-400' : 'border-white/10 focus:border-duo-green'
                                                    }`}
                                            />
                                            {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 'confirm' && (
                                /* Step 3: Confirm & Pay */
                                <div className="space-y-6">
                                    {/* Bank Transfer Info */}
                                    {paymentMethod === 'bank' && (
                                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                                            <h2 className="text-xl font-black text-white mb-4">Thông tin chuyển khoản</h2>
                                            <div className="bg-white/5 rounded-xl p-4 space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-400">Ngân hàng:</span>
                                                    <span className="font-bold text-white">{bankInfo.bankName}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-400">Số tài khoản:</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-white">{bankInfo.accountNumber}</span>
                                                        <button
                                                            onClick={() => copyToClipboard(bankInfo.accountNumber)}
                                                            className="text-duo-green hover:bg-duo-green/20 p-1 rounded"
                                                        >
                                                            <Copy size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-400">Chủ tài khoản:</span>
                                                    <span className="font-bold text-white">{bankInfo.accountName}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-400">Nội dung CK:</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-bold text-duo-green">{formData.phone} {packageId}</span>
                                                        <button
                                                            onClick={() => copyToClipboard(`${formData.phone} ${packageId}`)}
                                                            className="text-duo-green hover:bg-duo-green/20 p-1 rounded"
                                                        >
                                                            <Copy size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="flex justify-between items-center pt-2 border-t border-white/10">
                                                    <span className="text-gray-400">Số tiền:</span>
                                                    <span className="font-black text-duo-green text-xl">{formatPrice(selectedPackage.price)}</span>
                                                </div>
                                            </div>
                                            {copied && (
                                                <p className="text-center text-duo-green text-sm mt-2">✓ Đã sao chép!</p>
                                            )}
                                            <div className="mt-4 p-3 bg-duo-yellow/10 border border-duo-yellow/30 rounded-xl flex items-start gap-2">
                                                <AlertCircle className="text-duo-yellow shrink-0 mt-0.5" size={18} />
                                                <p className="text-sm text-gray-300">
                                                    Sau khi chuyển khoản, vui lòng đợi 1-5 phút để hệ thống xác nhận giao dịch.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* QR Code for MoMo/VNPay */}
                                    {(paymentMethod === 'momo' || paymentMethod === 'vnpay') && (
                                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center">
                                            <h2 className="text-xl font-black text-white mb-4">Quét mã QR để thanh toán</h2>
                                            <div className="w-48 h-48 mx-auto bg-white rounded-xl flex items-center justify-center mb-4">
                                                <div className="text-center">
                                                    <Smartphone className="text-gray-400 mx-auto mb-2" size={48} />
                                                    <p className="text-sm text-gray-500">Mã QR sẽ xuất hiện ở đây</p>
                                                </div>
                                            </div>
                                            <p className="text-gray-400 mb-4">
                                                Mở ứng dụng <strong className="text-white">{paymentMethod === 'momo' ? 'MoMo' : 'Ngân hàng/VNPay'}</strong> và quét mã QR
                                            </p>
                                            <div className="flex items-center justify-center gap-2 text-gray-500">
                                                <Clock size={16} />
                                                <span className="text-sm">Mã có hiệu lực trong 15:00</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Card Payment */}
                                    {paymentMethod === 'card' && (
                                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                                            <h2 className="text-xl font-black text-white mb-4">Thông tin thẻ</h2>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-300 mb-2">Số thẻ</label>
                                                    <input
                                                        type="text"
                                                        placeholder="1234 5678 9012 3456"
                                                        className="w-full px-4 py-3.5 bg-white/5 border-2 border-white/10 rounded-xl font-semibold text-white placeholder-gray-500 focus:border-duo-green focus:outline-none"
                                                    />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-300 mb-2">Ngày hết hạn</label>
                                                        <input
                                                            type="text"
                                                            placeholder="MM/YY"
                                                            className="w-full px-4 py-3.5 bg-white/5 border-2 border-white/10 rounded-xl font-semibold text-white placeholder-gray-500 focus:border-duo-green focus:outline-none"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-300 mb-2">CVV</label>
                                                        <input
                                                            type="text"
                                                            placeholder="123"
                                                            className="w-full px-4 py-3.5 bg-white/5 border-2 border-white/10 rounded-xl font-semibold text-white placeholder-gray-500 focus:border-duo-green focus:outline-none"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Order Summary */}
                                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                                        <h2 className="text-xl font-black text-white mb-4">Thông tin đơn hàng</h2>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Họ tên:</span>
                                                <span className="font-semibold text-white">{formData.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Email:</span>
                                                <span className="font-semibold text-white">{formData.email}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Số điện thoại:</span>
                                                <span className="font-semibold text-white">{formData.phone}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Phương thức:</span>
                                                <span className="font-semibold text-white">{paymentMethods.find(m => m.id === paymentMethod)?.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Continue Button */}
                            {['select', 'info', 'confirm'].includes(step) && (
                                <button
                                    onClick={step === 'confirm' ? handlePayment : handleContinue}
                                    disabled={(step === 'select' && !paymentMethod) || isProcessing}
                                    className="w-full py-4 bg-gradient-to-r from-duo-green to-accent-cyan text-white font-black text-lg rounded-xl shadow-lg shadow-duo-green/30 hover:shadow-duo-green/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Đang xử lý...
                                        </>
                                    ) : step === 'confirm' ? (
                                        <>
                                            <Shield size={20} />
                                            Xác nhận thanh toán
                                        </>
                                    ) : (
                                        <>
                                            Tiếp tục
                                            <ChevronRight size={20} />
                                        </>
                                    )}
                                </button>
                            )}
                        </div>

                        {/* Right - Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 sticky top-24">
                                <h3 className="text-lg font-black text-white mb-4">Đơn hàng của bạn</h3>

                                {/* Package Info */}
                                <div className="flex items-center gap-4 p-4 bg-gradient-to-br from-duo-green/20 to-accent-blue/20 rounded-xl mb-4 border border-white/10">
                                    <div className="w-14 h-14 bg-gradient-to-br from-duo-green to-accent-cyan rounded-xl flex items-center justify-center">
                                        {selectedPackage.gems ? (
                                            <LottieMascot size={48} animationFile="Stone.json" />
                                        ) : (
                                            <span className="text-2xl">{selectedPackage.icon}</span>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">{selectedPackage.name}</div>
                                        {selectedPackage.duration && (
                                            <div className="text-sm text-gray-400">{selectedPackage.duration}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Features */}
                                {selectedPackage.features && (
                                    <div className="mb-4 space-y-2">
                                        {selectedPackage.features.map((feature: string, i: number) => (
                                            <div key={i} className="flex items-center gap-2 text-sm">
                                                <Check className="text-duo-green" size={16} />
                                                <span className="text-gray-300">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Price */}
                                <div className="border-t border-white/10 pt-4 mt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-400">Tạm tính:</span>
                                        <span className="font-semibold text-white">{formatPrice(selectedPackage.price)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-400">Giảm giá:</span>
                                        <span className="font-semibold text-gray-500">-{formatPrice(0)}</span>
                                    </div>
                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                                        <span className="font-bold text-white">Tổng cộng:</span>
                                        <span className="text-2xl font-black text-duo-green">{formatPrice(selectedPackage.price)}</span>
                                    </div>
                                </div>

                                {/* Security Badge */}
                                <div className="mt-6 p-3 bg-duo-green/10 border border-duo-green/30 rounded-xl flex items-center gap-2">
                                    <Shield className="text-duo-green" size={20} />
                                    <span className="text-sm text-gray-300">Giao dịch được bảo mật 100%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default function PaymentPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-duo-green border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <PaymentContent />
        </Suspense>
    )
}
