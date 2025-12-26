'use client'

import { useMemo, useCallback } from 'react'
import ReactFlow, {
    Background,
    Controls,
    MiniMap,
    Node,
    Edge,
    useNodesState,
    useEdgesState,
    MarkerType,
} from 'reactflow'
import 'reactflow/dist/style.css'

import CourseNode from './mindmap/CourseNode'
import ModuleNode from './mindmap/ModuleNode'
import SectionNode from './mindmap/SectionNode'
import { AIGeneratedCourse, AIModule, AISection } from '@/data/mockData'

// Define nodeTypes outside component to prevent re-creation
const nodeTypes = {
    courseNode: CourseNode,
    moduleNode: ModuleNode,
    sectionNode: SectionNode,
}

interface CourseMindMapProps {
    course: AIGeneratedCourse
    onSectionClick?: (section: AISection, module: AIModule) => void
    onModuleClick?: (module: AIModule) => void
}

export default function CourseMindMap({ course, onSectionClick, onModuleClick }: CourseMindMapProps) {
    const initialNodes: Node[] = useMemo(() => {
        const nodes: Node[] = []

        // Course node at CENTER
        const centerX = 400
        const courseWidth = 224 // w-56 = 224px
        nodes.push({
            id: 'course',
            type: 'courseNode',
            position: { x: centerX - (courseWidth / 2), y: 40 },
            data: {
                label: course.titleVi,
                description: course.description,
                icon: course.icon,
                language: course.language,
            },
        })

        // Layout: Modules alternate left and right
        const leftX = 30
        const rightX = centerX + 380
        let leftY = 200
        let rightY = 200
        const moduleSectionSpacing = 120
        const sectionSpacing = 70
        const moduleGroupSpacing = 60

        course.modules.forEach((module, moduleIndex) => {
            const moduleNumber = moduleIndex + 1
            const isOdd = moduleNumber % 2 === 1
            const moduleX = isOdd ? leftX : rightX

            // Calculate completion
            const completedCount = module.sections.filter(s => s.completed).length
            const completionPercentage = module.sections.length > 0
                ? Math.round((completedCount / module.sections.length) * 100)
                : 0

            const currentY = isOdd ? leftY : rightY

            // Module node
            nodes.push({
                id: module.id,
                type: 'moduleNode',
                position: { x: moduleX, y: currentY },
                data: {
                    label: module.titleVi,
                    description: module.description,
                    completed: module.completed,
                    lessonCount: module.sections.length,
                    completedCount: completedCount,
                    completionPercentage: completionPercentage,
                    moduleNumber: moduleNumber,
                    onClick: () => onModuleClick?.(module),
                },
            })

            // Section nodes under module
            let sectionY = currentY + moduleSectionSpacing

            module.sections.forEach((section, sectionIndex) => {
                nodes.push({
                    id: section.id,
                    type: 'sectionNode',
                    position: { x: moduleX, y: sectionY },
                    data: {
                        label: section.titleVi,
                        duration: section.duration,
                        completed: section.completed,
                        order: sectionIndex + 1,
                        onClick: () => onSectionClick?.(section, module),
                    },
                })

                sectionY += sectionSpacing
            })

            // Update Y for respective column
            if (isOdd) {
                leftY = sectionY + moduleGroupSpacing
            } else {
                rightY = sectionY + moduleGroupSpacing
            }
        })

        return nodes
    }, [course, onSectionClick])

    const initialEdges: Edge[] = useMemo(() => {
        const edges: Edge[] = []

        course.modules.forEach((module) => {
            // Course → Module (animated pink)
            edges.push({
                id: `course-${module.id}`,
                source: 'course',
                target: module.id,
                type: 'smoothstep',
                animated: true,
                style: { stroke: '#06b6d4', strokeWidth: 2.5 },
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    color: '#06b6d4',
                },
            })

            // Module → Sections
            module.sections.forEach((section) => {
                const isCompleted = section.completed
                const edgeColor = isCompleted ? '#22c55e' : '#64748b'
                const strokeWidth = isCompleted ? 2.5 : 2

                edges.push({
                    id: `${module.id}-${section.id}`,
                    source: module.id,
                    target: section.id,
                    type: 'smoothstep',
                    animated: isCompleted,
                    style: {
                        stroke: edgeColor,
                        strokeWidth: strokeWidth,
                        strokeDasharray: isCompleted ? '0' : '5 5'
                    },
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                        color: edgeColor,
                    },
                })
            })
        })

        return edges
    }, [course])

    const [nodes, , onNodesChange] = useNodesState(initialNodes)
    const [edges, , onEdgesChange] = useEdgesState(initialEdges)

    return (
        <div className="w-full h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                nodeTypes={nodeTypes}
                fitView
                fitViewOptions={{ padding: 0.15, maxZoom: 0.85 }}
                minZoom={0.1}
                maxZoom={1.5}
                defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
                className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl"
            >
                <Background
                    color="#94a3b8"
                    gap={24}
                    size={1}
                    style={{ opacity: 0.15 }}
                />
                <Controls
                    className="bg-slate-800 border-2 border-slate-700 rounded-lg"
                    showInteractive={false}
                />
                <MiniMap
                    className="bg-slate-800 border-2 border-slate-700 rounded-lg"
                    maskColor="rgba(0, 0, 0, 0.3)"
                    nodeColor={(node) => {
                        if (node.type === 'courseNode') return '#06b6d4'
                        if (node.type === 'moduleNode') {
                            const data = node.data as any
                            if (data?.completionPercentage === 100) return '#22c55e'
                            if (data?.completionPercentage >= 50) return '#a855f7'
                            return '#8b5cf6'
                        }
                        // Section nodes
                        const data = node.data as any
                        return data?.completed ? '#22c55e' : '#64748b'
                    }}
                />
            </ReactFlow>
        </div>
    )
}
