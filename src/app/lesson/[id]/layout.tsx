export function generateStaticParams() {
    // Generate a reasonable range of lesson IDs for static export
    const paths = []
    for (let i = 1; i <= 50; i++) {
        paths.push({ id: i.toString() })
    }
    // Also add some specific string IDs if any are used in mock data
    paths.push({ id: 'python-intro' }, { id: 'variables' }, { id: 'loops' }, { id: '1-1' }, { id: '1-2' }, { id: '1-3' }, { id: '2-1' }, { id: '2-2' })
    return paths
}

export default function LessonLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
