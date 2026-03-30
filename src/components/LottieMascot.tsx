'use client'

import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import { useState, useEffect, useRef, memo, useCallback } from 'react'

const basePath = process.env.NODE_ENV === 'production' ? '/Coallingo' : ''

interface LottieMascotProps {
    className?: string
    size?: number
    animationFile?: string
    loop?: boolean
}

// Cache for loaded animations to avoid re-fetching
const animationCache = new Map<string, object>()

function LottieMascotComponent({
    className = '',
    size = 300,
    animationFile = '',
    loop = true
}: LottieMascotProps) {
    const [animationData, setAnimationData] = useState<object | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isVisible, setIsVisible] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const lottieRef = useRef<LottieRefCurrentProps>(null)

    // Intersection Observer for lazy loading
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting)
                    // Pause/play based on visibility
                    if (lottieRef.current) {
                        if (entry.isIntersecting) {
                            lottieRef.current.play()
                        } else {
                            lottieRef.current.pause()
                        }
                    }
                })
            },
            { threshold: 0.1, rootMargin: '50px' }
        )

        if (containerRef.current) {
            observer.observe(containerRef.current)
        }

        return () => observer.disconnect()
    }, [])

    // Load animation only when visible or from cache
    useEffect(() => {
        if (!isVisible && !animationCache.has(animationFile)) {
            return // Don't load if not visible and not cached
        }

        if (animationFile) {
            // Check cache first
            if (animationCache.has(animationFile)) {
                setAnimationData(animationCache.get(animationFile)!)
                setIsLoading(false)
                return
            }

            fetch(`${basePath}/animations/${animationFile}`)
                .then(response => response.json())
                .then(data => {
                    animationCache.set(animationFile, data)
                    setAnimationData(data)
                    setIsLoading(false)
                })
                .catch(error => {
                    console.error('Error loading animation:', error)
                    setIsLoading(false)
                })
        } else {
            setAnimationData(defaultAnimation)
            setIsLoading(false)
        }
    }, [animationFile, isVisible])

    // Determine if we should use reduced motion
    const isSmall = size <= 32

    // For very small animations, just show a static icon to save performance
    if (isSmall && animationFile && !isVisible) {
        return (
            <div
                ref={containerRef}
                className={`flex items-center justify-center ${className}`}
                style={{ width: size, height: size }}
            >
                {getStaticFallback(animationFile, size)}
            </div>
        )
    }

    if (isLoading || !animationData) {
        return (
            <div
                ref={containerRef}
                className={`flex items-center justify-center ${className}`}
                style={{ width: size, height: size }}
            >
                {getStaticFallback(animationFile, size)}
            </div>
        )
    }

    return (
        <div ref={containerRef} className={`lottie-container ${className}`}>
            <Lottie
                lottieRef={lottieRef}
                animationData={animationData}
                loop={loop}
                autoplay={isVisible}
                style={{ width: size, height: size }}
                // Reduce render quality for small animations
                rendererSettings={isSmall ? {
                    preserveAspectRatio: 'xMidYMid slice',
                    progressiveLoad: true,
                } : undefined}
            />
        </div>
    )
}

// Static fallbacks for common animations when not visible
function getStaticFallback(animationFile: string, size: number) {
    const iconSize = Math.max(size * 0.6, 12)

    const fallbacks: Record<string, string> = {
        'Star.json': '⭐',
        'Stone.json': '💎',
        'Fire Streak Orange.json': '🔥',
        'Trophy.json': '🏆',
        'Welcome.json': '👋',
        'STUDENT.json': '👨‍🎓',
        'Education Float.json': '📚',
        'Quiz mode.json': '❓',
    }

    const emoji = fallbacks[animationFile] || '✨'

    return (
        <span style={{ fontSize: iconSize }}>{emoji}</span>
    )
}

// Memoize to prevent unnecessary re-renders
const LottieMascot = memo(LottieMascotComponent)
export default LottieMascot

// Simple default animation (kept for backwards compatibility)
const defaultAnimation = {
    "v": "5.7.4",
    "fr": 30,
    "ip": 0,
    "op": 60,
    "w": 400,
    "h": 400,
    "nm": "Coding Mascot",
    "ddd": 0,
    "assets": [],
    "layers": [
        {
            "ddd": 0,
            "ind": 1,
            "ty": 4,
            "nm": "Mascot",
            "sr": 1,
            "ks": {
                "o": { "a": 0, "k": 100 },
                "r": {
                    "a": 1,
                    "k": [
                        { "t": 0, "s": [-5], "e": [5] },
                        { "t": 30, "s": [5], "e": [-5] },
                        { "t": 60, "s": [-5] }
                    ]
                },
                "p": {
                    "a": 1,
                    "k": [
                        { "t": 0, "s": [200, 200, 0], "e": [200, 185, 0] },
                        { "t": 30, "s": [200, 185, 0], "e": [200, 200, 0] },
                        { "t": 60, "s": [200, 200, 0] }
                    ]
                },
                "a": { "a": 0, "k": [0, 0, 0] },
                "s": { "a": 0, "k": [100, 100, 100] }
            },
            "ao": 0,
            "shapes": [
                {
                    "ty": "gr",
                    "it": [
                        {
                            "ty": "el",
                            "s": { "a": 0, "k": [180, 180] },
                            "p": { "a": 0, "k": [0, 0] },
                            "nm": "Body"
                        },
                        {
                            "ty": "fl",
                            "c": { "a": 0, "k": [0.345, 0.8, 0.008, 1] },
                            "o": { "a": 0, "k": 100 },
                            "r": 1
                        },
                        {
                            "ty": "tr",
                            "p": { "a": 0, "k": [0, 0] },
                            "a": { "a": 0, "k": [0, 0] },
                            "s": { "a": 0, "k": [100, 100] },
                            "r": { "a": 0, "k": 0 },
                            "o": { "a": 0, "k": 100 }
                        }
                    ],
                    "nm": "Body Group"
                },
                {
                    "ty": "gr",
                    "it": [
                        {
                            "ty": "el",
                            "s": { "a": 0, "k": [40, 40] },
                            "p": { "a": 0, "k": [-35, -20] },
                            "nm": "Left Eye"
                        },
                        {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1] },
                            "o": { "a": 0, "k": 100 },
                            "r": 1
                        },
                        {
                            "ty": "tr",
                            "p": { "a": 0, "k": [0, 0] },
                            "a": { "a": 0, "k": [0, 0] },
                            "s": { "a": 0, "k": [100, 100] },
                            "r": { "a": 0, "k": 0 },
                            "o": { "a": 0, "k": 100 }
                        }
                    ],
                    "nm": "Left Eye Group"
                },
                {
                    "ty": "gr",
                    "it": [
                        {
                            "ty": "el",
                            "s": { "a": 0, "k": [40, 40] },
                            "p": { "a": 0, "k": [35, -20] },
                            "nm": "Right Eye"
                        },
                        {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1] },
                            "o": { "a": 0, "k": 100 },
                            "r": 1
                        },
                        {
                            "ty": "tr",
                            "p": { "a": 0, "k": [0, 0] },
                            "a": { "a": 0, "k": [0, 0] },
                            "s": { "a": 0, "k": [100, 100] },
                            "r": { "a": 0, "k": 0 },
                            "o": { "a": 0, "k": 100 }
                        }
                    ],
                    "nm": "Right Eye Group"
                },
                {
                    "ty": "gr",
                    "it": [
                        {
                            "ty": "el",
                            "s": { "a": 0, "k": [15, 15] },
                            "p": { "a": 0, "k": [-35, -20] },
                            "nm": "Left Pupil"
                        },
                        {
                            "ty": "fl",
                            "c": { "a": 0, "k": [0.1, 0.1, 0.1, 1] },
                            "o": { "a": 0, "k": 100 },
                            "r": 1
                        },
                        {
                            "ty": "tr",
                            "p": { "a": 0, "k": [0, 0] },
                            "a": { "a": 0, "k": [0, 0] },
                            "s": { "a": 0, "k": [100, 100] },
                            "r": { "a": 0, "k": 0 },
                            "o": { "a": 0, "k": 100 }
                        }
                    ],
                    "nm": "Left Pupil Group"
                },
                {
                    "ty": "gr",
                    "it": [
                        {
                            "ty": "el",
                            "s": { "a": 0, "k": [15, 15] },
                            "p": { "a": 0, "k": [35, -20] },
                            "nm": "Right Pupil"
                        },
                        {
                            "ty": "fl",
                            "c": { "a": 0, "k": [0.1, 0.1, 0.1, 1] },
                            "o": { "a": 0, "k": 100 },
                            "r": 1
                        },
                        {
                            "ty": "tr",
                            "p": { "a": 0, "k": [0, 0] },
                            "a": { "a": 0, "k": [0, 0] },
                            "s": { "a": 0, "k": [100, 100] },
                            "r": { "a": 0, "k": 0 },
                            "o": { "a": 0, "k": 100 }
                        }
                    ],
                    "nm": "Right Pupil Group"
                },
                {
                    "ty": "gr",
                    "it": [
                        {
                            "ty": "rc",
                            "d": 1,
                            "s": { "a": 0, "k": [50, 20] },
                            "p": { "a": 0, "k": [0, 25] },
                            "r": { "a": 0, "k": 20 },
                            "nm": "Smile"
                        },
                        {
                            "ty": "fl",
                            "c": { "a": 0, "k": [1, 1, 1, 1] },
                            "o": { "a": 0, "k": 100 },
                            "r": 1
                        },
                        {
                            "ty": "tr",
                            "p": { "a": 0, "k": [0, 0] },
                            "a": { "a": 0, "k": [0, 0] },
                            "s": { "a": 0, "k": [100, 100] },
                            "r": { "a": 0, "k": 0 },
                            "o": { "a": 0, "k": 100 }
                        }
                    ],
                    "nm": "Smile Group"
                }
            ],
            "ip": 0,
            "op": 60,
            "st": 0,
            "bm": 0
        }
    ],
    "markers": []
}
