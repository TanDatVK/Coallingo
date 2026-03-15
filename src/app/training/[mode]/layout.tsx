export function generateStaticParams() {
    return [
        { mode: 'review' },
        { mode: 'mistakes' },
        { mode: 'speed' },
        { mode: 'challenge' },
        { mode: 'listening' }
    ]
}

export default function TrainingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
