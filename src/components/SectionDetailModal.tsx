'use client'

import { X, BookOpen, Code2, Lightbulb, Play, FileText, Clock, CheckCircle } from 'lucide-react'
import { AISection, AIModule } from '@/data/mockData'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SectionDetailModalProps {
    section: AISection
    module: AIModule
    courseId: string
    isOpen: boolean
    onClose: () => void
}

// Generate detailed content for a section (mock)
const generateDetailContent = (section: AISection): { theory: string; codeExamples: { title: string; code: string; explanation: string }[]; keyPoints: string[] } => {
    // Based on section title, generate appropriate content
    const titleLower = section.titleVi.toLowerCase()

    if (titleLower.includes('python là gì')) {
        return {
            theory: `## Python là gì?

Python là một ngôn ngữ lập trình bậc cao, được tạo ra bởi Guido van Rossum và phát hành lần đầu năm 1991.

### Đặc điểm nổi bật:
- **Cú pháp đơn giản**: Python có cú pháp gần với ngôn ngữ tự nhiên, dễ đọc và viết
- **Đa năng**: Dùng được cho web, AI, data science, automation...
- **Cộng đồng lớn**: Hàng triệu developer và thư viện phong phú

### Tại sao học Python?
1. Phổ biến số 1 thế giới (TIOBE Index)
2. Lương cao, nhu cầu tuyển dụng lớn
3. Thích hợp cho người mới bắt đầu`,
            codeExamples: [
                {
                    title: 'Hello World',
                    code: `print("Hello, World!")`,
                    explanation: 'Dòng code đơn giản nhất để in ra màn hình'
                },
                {
                    title: 'Tính toán cơ bản',
                    code: `# Phép cộng
result = 5 + 3
print(result)  # Output: 8

# Phép nhân
product = 4 * 7
print(product)  # Output: 28`,
                    explanation: 'Python có thể làm calculator mạnh mẽ'
                }
            ],
            keyPoints: [
                'Python là ngôn ngữ lập trình bậc cao, dễ học',
                'Được dùng rộng rãi trong AI, Web, Data Science',
                'Cú pháp đơn giản, gần ngôn ngữ tự nhiên',
                'Cộng đồng hỗ trợ lớn với nhiều thư viện'
            ]
        }
    }

    if (titleLower.includes('biến') || titleLower.includes('variable')) {
        return {
            theory: `## Biến trong Python

Biến là "container" để lưu trữ dữ liệu. Trong Python, bạn không cần khai báo kiểu dữ liệu.

### Quy tắc đặt tên biến:
- Bắt đầu bằng chữ cái hoặc dấu gạch dưới (_)
- Không bắt đầu bằng số
- Chỉ chứa chữ cái, số và dấu gạch dưới
- Phân biệt chữ hoa/thường (name ≠ Name)

### Gán giá trị:
Dùng dấu = để gán giá trị cho biến.`,
            codeExamples: [
                {
                    title: 'Khai báo biến',
                    code: `# Không cần khai báo kiểu
name = "Coallingo"
age = 25
is_student = True

print(name)     # Coallingo
print(age)      # 25`,
                    explanation: 'Python tự động nhận diện kiểu dữ liệu'
                },
                {
                    title: 'Gán nhiều biến',
                    code: `# Gán cùng lúc
x, y, z = 1, 2, 3

# Gán cùng giá trị
a = b = c = 0`,
                    explanation: 'Python cho phép gán nhiều biến một lúc'
                }
            ],
            keyPoints: [
                'Biến là nơi lưu trữ dữ liệu',
                'Không cần khai báo kiểu dữ liệu',
                'Tên biến phân biệt chữ hoa/thường',
                'Dùng dấu = để gán giá trị'
            ]
        }
    }

    if (titleLower.includes('chuỗi') || titleLower.includes('string')) {
        return {
            theory: `## Chuỗi (Strings) trong Python

Chuỗi là kiểu dữ liệu lưu trữ văn bản. Có thể dùng dấu nháy đơn ('') hoặc nháy kép ("").

### Các thao tác với chuỗi:
- **Nối chuỗi**: Dùng dấu +
- **Lặp chuỗi**: Dùng dấu *
- **Truy cập ký tự**: Dùng index [i]
- **Cắt chuỗi**: Dùng slicing [start:end]`,
            codeExamples: [
                {
                    title: 'Tạo và nối chuỗi',
                    code: `# Tạo chuỗi
greeting = "Xin chào"
name = 'Coallingo'

# Nối chuỗi
message = greeting + ", " + name + "!"
print(message)  # Xin chào, Coallingo!`,
                    explanation: 'Dùng + để nối các chuỗi với nhau'
                },
                {
                    title: 'Truy cập ký tự',
                    code: `text = "Python"

# Index bắt đầu từ 0
print(text[0])   # P
print(text[1])   # y
print(text[-1])  # n (từ cuối)

# Slicing
print(text[0:3]) # Pyt`,
                    explanation: 'Index âm đếm từ cuối chuỗi'
                }
            ],
            keyPoints: [
                'Chuỗi dùng nháy đơn hoặc nháy kép',
                'Index bắt đầu từ 0',
                'Index âm đếm từ cuối (-1 là ký tự cuối)',
                'Slicing: text[start:end] lấy từ start đến end-1'
            ]
        }
    }

    // Default content
    return {
        theory: `## ${section.titleVi}

${section.content}

### Nội dung bài học:
Trong bài này, bạn sẽ học về ${section.titleVi.toLowerCase()} - một khái niệm quan trọng trong lập trình.

### Tại sao cần học?
Hiểu rõ ${section.titleVi.toLowerCase()} giúp bạn viết code hiệu quả và dễ bảo trì hơn.`,
        codeExamples: [
            {
                title: 'Ví dụ cơ bản',
                code: `# Ví dụ về ${section.title}
print("Hello from ${section.title}!")`,
                explanation: `Đây là ví dụ minh họa cho ${section.titleVi}`
            }
        ],
        keyPoints: [
            `${section.titleVi} là khái niệm quan trọng`,
            'Cần nắm vững trước khi học các bài tiếp theo',
            'Thực hành nhiều để hiểu sâu hơn'
        ]
    }
}

export default function SectionDetailModal({ section, module, courseId, isOpen, onClose }: SectionDetailModalProps) {
    const [activeTab, setActiveTab] = useState<'theory' | 'code' | 'keypoints'>('theory')
    const router = useRouter()

    if (!isOpen) return null

    const detail = section.detail || generateDetailContent(section)

    const tabs = [
        { id: 'theory', label: 'Lý thuyết', icon: BookOpen },
        { id: 'code', label: 'Ví dụ code', icon: Code2 },
        { id: 'keypoints', label: 'Điểm chính', icon: Lightbulb },
    ]

    const handlePractice = () => {
        onClose()
        router.push(`/ai-practice?section=${section.id}`)
    }

    const handleTest = () => {
        onClose()
        // Navigate to the lesson page for this section
        router.push(`/lesson/${section.id}?course=${courseId}&module=${module.id}`)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in">
                {/* Header */}
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-white">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                        <span>{module.titleVi}</span>
                        <span>•</span>
                        <span>Bài {section.order}</span>
                    </div>

                    <h2 className="text-2xl font-black">{section.titleVi}</h2>
                    <p className="text-white/90 text-sm mt-1">{section.title}</p>

                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2 text-white/80 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{section.duration} phút</span>
                        </div>
                        {section.completed && (
                            <div className="flex items-center gap-2 text-green-300 text-sm">
                                <CheckCircle className="w-4 h-4" />
                                <span>Đã hoàn thành</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 bg-gray-50">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as typeof activeTab)}
                            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 font-semibold transition-colors ${activeTab === tab.id
                                ? 'text-cyan-600 border-b-2 border-cyan-600 bg-white'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[50vh] p-6">
                    {activeTab === 'theory' && (
                        <div className="prose prose-slate max-w-none">
                            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                                {detail.theory.split('\n').map((line, i) => {
                                    if (line.startsWith('## ')) {
                                        return <h2 key={i} className="text-xl font-bold text-gray-800 mt-4 mb-2">{line.replace('## ', '')}</h2>
                                    }
                                    if (line.startsWith('### ')) {
                                        return <h3 key={i} className="text-lg font-semibold text-gray-700 mt-3 mb-2">{line.replace('### ', '')}</h3>
                                    }
                                    if (line.startsWith('- **')) {
                                        const match = line.match(/- \*\*(.+?)\*\*: (.+)/)
                                        if (match) {
                                            return <p key={i} className="ml-4 my-1">• <strong>{match[1]}</strong>: {match[2]}</p>
                                        }
                                    }
                                    if (line.match(/^\d\. /)) {
                                        return <p key={i} className="ml-4 my-1">{line}</p>
                                    }
                                    return <p key={i} className="my-1">{line}</p>
                                })}
                            </div>
                        </div>
                    )}

                    {activeTab === 'code' && (
                        <div className="space-y-6">
                            {detail.codeExamples.map((example, index) => (
                                <div key={index} className="rounded-xl overflow-hidden border border-gray-200">
                                    <div className="bg-gray-100 px-4 py-2 font-semibold text-gray-700 flex items-center gap-2">
                                        <Code2 className="w-4 h-4 text-cyan-600" />
                                        {example.title}
                                    </div>
                                    <pre className="bg-slate-900 text-green-400 p-4 overflow-x-auto text-sm font-mono">
                                        <code>{example.code}</code>
                                    </pre>
                                    <div className="bg-cyan-50 px-4 py-3 text-sm text-cyan-800">
                                        💡 {example.explanation}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'keypoints' && (
                        <div className="space-y-3">
                            <h3 className="font-bold text-gray-800 mb-4">📌 Điểm chính cần nhớ:</h3>
                            {detail.keyPoints.map((point, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border border-cyan-200"
                                >
                                    <div className="w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                                        {index + 1}
                                    </div>
                                    <p className="text-gray-700 pt-1">{point}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="border-t border-gray-200 p-4 bg-gray-50 flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={handlePractice}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:brightness-105 transition-all shadow-lg shadow-green-500/30"
                    >
                        <Play className="w-5 h-5" />
                        Luyện tập
                    </button>
                    <button
                        onClick={handleTest}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:brightness-105 transition-all shadow-lg shadow-cyan-500/30"
                    >
                        <FileText className="w-5 h-5" />
                        Làm bài test
                    </button>
                </div>
            </div>
        </div>
    )
}
