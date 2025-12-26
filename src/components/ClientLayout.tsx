'use client'

import PageTransition from '@/components/PageTransition'
import dynamic from 'next/dynamic'

const AIChatbot = dynamic(() => import('@/components/AIChatbot'), {
    ssr: false,
    loading: () => null
})

const GuideMascot = dynamic(() => import('@/components/GuideMascot'), {
    ssr: false,
    loading: () => null
})

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <PageTransition>
                {children}
            </PageTransition>
            <AIChatbot />
            <GuideMascot />
        </>
    )
}
