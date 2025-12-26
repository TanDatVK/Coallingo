'use client'

import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

const LottieMascot = dynamic(() => import('@/components/LottieMascot'), {
    ssr: false,
    loading: () => <div className="w-24 h-24 bg-gray-100 rounded-full animate-pulse" />
})

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [displayChildren, setDisplayChildren] = useState(children)
    const previousPathname = useRef(pathname)

    useEffect(() => {
        // Only show loading if pathname actually changed
        if (previousPathname.current === pathname) {
            setDisplayChildren(children)
            return
        }

        previousPathname.current = pathname

        // Start loading animation
        setIsLoading(true)
        setProgress(0)

        // Animate progress bar
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) {
                    clearInterval(progressInterval)
                    return 90
                }
                return prev + 15
            })
        }, 50)

        // Complete loading
        const timer = setTimeout(() => {
            setProgress(100)
            setTimeout(() => {
                setDisplayChildren(children)
                setIsLoading(false)
                setProgress(0)
            }, 150)
        }, 400)

        return () => {
            clearTimeout(timer)
            clearInterval(progressInterval)
        }
    }, [pathname, children])

    return (
        <>
            {/* Cute Loading Overlay with Hourglass */}
            <div
                className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-all duration-300 ${isLoading
                    ? 'opacity-100 pointer-events-auto'
                    : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                {/* Hourglass Animation */}
                <div className="relative">
                    <div className="absolute inset-0 bg-cyan-500/30 blur-3xl rounded-full scale-150" />
                    <LottieMascot size={160} animationFile="Sandy Loading.json" />
                </div>

                {/* Loading Text */}
                <div className="mt-4 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">
                        Đang tải...
                    </h3>
                    <p className="text-slate-400 text-sm">
                        Chờ xíu nha! ⏳
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-64 mt-6">
                    <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-150 ease-out rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="mt-2 text-center">
                        <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                            {progress}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Page Content with fade transition */}
            <div className={`transition-opacity duration-200 ${isLoading ? 'opacity-60' : 'opacity-100'}`}>
                {displayChildren}
            </div>
        </>
    )
}
