// Mock data for CoerLingo - Learn Coding with AI

export interface User {
    id: string;
    name: string;
    avatar: string;
    level: number;
    xp: number;
    xpToNextLevel: number;
    streak: number;
    hearts: number;
    gems: number;
    totalLessonsCompleted: number;
    currentLanguage: string;
    joinDate: string;
    totalXp: number;
    completedLessons: number;
}

export interface ProgrammingLanguage {
    id: string;
    name: string;
    description: string;
    icon: string;
    iconImage?: string;
    color: string;
    bgColor: string;
    totalLessons: number;
    completedLessons: number;
    progress: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    popular: boolean;
}

export interface Lesson {
    id: string;
    title: string;
    titleVi: string;
    description: string;
    icon: string;
    type: 'concept' | 'practice' | 'project' | 'quiz' | 'challenge';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    xpReward: number;
    status: 'completed' | 'current' | 'locked';
    progress: number;
    exercises: number;
    completedExercises: number;
}

export interface Unit {
    id: string;
    title: string;
    titleVi: string;
    description: string;
    color: string;
    lessons: Lesson[];
    status: 'completed' | 'current' | 'locked';
}

export interface LeaderboardUser {
    id: string;
    name: string;
    avatar: string;
    xp: number;
    league: string;
    rank: number;
    level: number;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlocked: boolean;
    progress: number;
    maxProgress: number;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    unlockedDate?: string;
}

// Question Types for Exercises
export type QuestionType = 'multiple_choice' | 'type_answer' | 'find_bug' | 'drag_drop' | 'code_writing';

export interface Question {
    id: string;
    type: QuestionType;
    question: string;
    questionVi: string;
    code?: string;
    codeLines?: string[]; // For find_bug type
    options?: string[];
    blanks?: string[]; // For drag_drop - words to fill
    template?: string; // For drag_drop - code template with ___ placeholders
    // For code_writing type
    starterCode?: string; // Initial code template
    expectedOutput?: string; // Expected output/result
    hints?: string[]; // Hints for the student
    testCases?: { input: string; expectedOutput: string }[]; // Test cases to validate
    correctAnswer: string | number | string[];
    explanation: string;
    explanationVi: string;
}

export interface LessonContent {
    lessonId: string;
    knowledge: {
        title: string;
        titleVi: string;
        concepts: {
            heading: string;
            headingVi: string;
            content: string;
            contentVi: string;
            codeExample?: string;
        }[];
    };
    exercises: Question[];
}

// Mock User Data
export const mockUser: User = {
    id: '1',
    name: 'Code Learner',
    avatar: '🧑‍💻',
    level: 12,
    xp: 2450,
    xpToNextLevel: 3000,
    streak: 15,
    hearts: 5,
    gems: 850,
    totalLessonsCompleted: 48,
    currentLanguage: 'python',
    joinDate: '01/2024',
    totalXp: 12450,
    completedLessons: 48
};

// Programming Languages
export const mockLanguages: ProgrammingLanguage[] = [
    {
        id: 'python',
        name: 'Python',
        description: 'Ngôn ngữ dễ học, mạnh mẽ cho AI và Data Science',
        icon: '🐍',
        iconImage: '/images/python.png',
        color: '#3776ab',
        bgColor: '#fff3cd',
        totalLessons: 80,
        completedLessons: 32,
        progress: 40,
        difficulty: 'beginner',
        popular: true
    },
    {
        id: 'javascript',
        name: 'JavaScript',
        description: 'Ngôn ngữ của Web, tạo website và ứng dụng',
        icon: '⚡',
        iconImage: '/images/java-script.png',
        color: '#f7df1e',
        bgColor: '#fff9e6',
        totalLessons: 90,
        completedLessons: 18,
        progress: 20,
        difficulty: 'beginner',
        popular: true
    },
    {
        id: 'java',
        name: 'Java',
        description: 'Ngôn ngữ phổ biến cho Android và Enterprise',
        icon: '☕',
        color: '#007396',
        bgColor: '#e6f7ff',
        totalLessons: 100,
        completedLessons: 10,
        progress: 10,
        difficulty: 'intermediate',
        popular: true
    },
    {
        id: 'cpp',
        name: 'C++',
        description: 'Ngôn ngữ nền tảng cho game và hệ thống',
        icon: '🔷',
        iconImage: '/images/c-.png',
        color: '#00599c',
        bgColor: '#e6f0ff',
        totalLessons: 120,
        completedLessons: 5,
        progress: 4,
        difficulty: 'advanced',
        popular: false
    },
    {
        id: 'csharp',
        name: 'C#',
        description: 'Ngôn ngữ của Microsoft cho Unity và .NET',
        icon: '💜',
        iconImage: '/images/c-sharp.png',
        color: '#512bd4',
        bgColor: '#f3e8ff',
        totalLessons: 85,
        completedLessons: 0,
        progress: 0,
        difficulty: 'intermediate',
        popular: false
    },
    {
        id: 'go',
        name: 'Go',
        description: 'Ngôn ngữ của Google, nhanh và đơn giản',
        icon: '🐹',
        color: '#00add8',
        bgColor: '#e0f7fa',
        totalLessons: 60,
        completedLessons: 0,
        progress: 0,
        difficulty: 'intermediate',
        popular: false
    },
    {
        id: 'rust',
        name: 'Rust',
        description: 'Ngôn ngữ an toàn, hiệu suất cao',
        icon: '🦀',
        iconImage: '/images/rust.png',
        color: '#000000',
        bgColor: '#fff0eb',
        totalLessons: 70,
        completedLessons: 0,
        progress: 0,
        difficulty: 'advanced',
        popular: false
    },
    {
        id: 'swift',
        name: 'Swift',
        description: 'Ngôn ngữ chính cho iOS và macOS',
        icon: '🍎',
        color: '#fa7343',
        bgColor: '#fff5f0',
        totalLessons: 75,
        completedLessons: 0,
        progress: 0,
        difficulty: 'intermediate',
        popular: false
    }
];

// Mock Units with Python Lessons
export const mockUnits: Unit[] = [
    {
        id: 'unit-1',
        title: 'Hello Python!',
        titleVi: 'Làm quen Python',
        description: 'Bắt đầu hành trình lập trình',
        color: '#58cc02',
        status: 'completed',
        lessons: [
            {
                id: 'lesson-1-1',
                title: 'Print Hello World',
                titleVi: 'In Hello World',
                description: 'Viết chương trình đầu tiên của bạn',
                icon: '👋',
                type: 'concept',
                difficulty: 'beginner',
                xpReward: 10,
                status: 'completed',
                progress: 100,
                exercises: 5,
                completedExercises: 5
            },
            {
                id: 'lesson-1-2',
                title: 'Variables',
                titleVi: 'Biến trong Python',
                description: 'Học cách lưu trữ dữ liệu',
                icon: '📦',
                type: 'concept',
                difficulty: 'beginner',
                xpReward: 10,
                status: 'completed',
                progress: 100,
                exercises: 5,
                completedExercises: 5
            },
            {
                id: 'lesson-1-3',
                title: 'Data Types',
                titleVi: 'Kiểu dữ liệu',
                description: 'String, Number, Boolean',
                icon: '🔤',
                type: 'concept',
                difficulty: 'beginner',
                xpReward: 10,
                status: 'completed',
                progress: 100,
                exercises: 5,
                completedExercises: 5
            },
            {
                id: 'lesson-1-4',
                title: 'Practice: Basics',
                titleVi: 'Thực hành cơ bản',
                description: 'Bài tập tổng hợp',
                icon: '🎯',
                type: 'practice',
                difficulty: 'beginner',
                xpReward: 15,
                status: 'completed',
                progress: 100,
                exercises: 8,
                completedExercises: 8
            },
            {
                id: 'lesson-1-5',
                title: 'Unit 1 Complete!',
                titleVi: 'Hoàn thành Phần 1',
                description: 'Tổng kết kiến thức cơ bản',
                icon: '🏆',
                type: 'quiz',
                difficulty: 'beginner',
                xpReward: 25,
                status: 'completed',
                progress: 100,
                exercises: 10,
                completedExercises: 10
            }
        ]
    },
    {
        id: 'unit-2',
        title: 'Control Flow',
        titleVi: 'Điều khiển luồng',
        description: 'If, Else, Loops',
        color: '#1cb0f6',
        status: 'current',
        lessons: [
            {
                id: 'lesson-2-1',
                title: 'If Statements',
                titleVi: 'Câu lệnh If',
                description: 'Điều kiện trong Python',
                icon: '🔀',
                type: 'concept',
                difficulty: 'beginner',
                xpReward: 15,
                status: 'completed',
                progress: 100,
                exercises: 6,
                completedExercises: 6
            },
            {
                id: 'lesson-2-2',
                title: 'For Loops',
                titleVi: 'Vòng lặp For',
                description: 'Lặp qua dữ liệu',
                icon: '🔄',
                type: 'concept',
                difficulty: 'beginner',
                xpReward: 15,
                status: 'current',
                progress: 60,
                exercises: 6,
                completedExercises: 4
            },
            {
                id: 'lesson-2-3',
                title: 'While Loops',
                titleVi: 'Vòng lặp While',
                description: 'Lặp với điều kiện',
                icon: '🔁',
                type: 'concept',
                difficulty: 'beginner',
                xpReward: 15,
                status: 'locked',
                progress: 0,
                exercises: 6,
                completedExercises: 0
            },
            {
                id: 'lesson-2-4',
                title: 'Mini Project: Game',
                titleVi: 'Dự án nhỏ: Game',
                description: 'Tạo trò chơi đoán số',
                icon: '🎮',
                type: 'project',
                difficulty: 'beginner',
                xpReward: 25,
                status: 'locked',
                progress: 0,
                exercises: 10,
                completedExercises: 0
            },
            {
                id: 'lesson-2-5',
                title: 'Unit 2 Complete!',
                titleVi: 'Hoàn thành Phần 2',
                description: 'Tổng kết điều khiển luồng',
                icon: '🏆',
                type: 'quiz',
                difficulty: 'beginner',
                xpReward: 30,
                status: 'locked',
                progress: 0,
                exercises: 12,
                completedExercises: 0
            }
        ]
    },
    {
        id: 'unit-3',
        title: 'Functions',
        titleVi: 'Hàm',
        description: 'Tổ chức code của bạn',
        color: '#ff9600',
        status: 'locked',
        lessons: [
            {
                id: 'lesson-3-1',
                title: 'Defining Functions',
                titleVi: 'Định nghĩa hàm',
                description: 'Tạo hàm trong Python',
                icon: '🔧',
                type: 'concept',
                difficulty: 'intermediate',
                xpReward: 20,
                status: 'locked',
                progress: 0,
                exercises: 8,
                completedExercises: 0
            },
            {
                id: 'lesson-3-2',
                title: 'Parameters',
                titleVi: 'Tham số',
                description: 'Truyền dữ liệu vào hàm',
                icon: '📥',
                type: 'concept',
                difficulty: 'intermediate',
                xpReward: 20,
                status: 'locked',
                progress: 0,
                exercises: 8,
                completedExercises: 0
            },
            {
                id: 'lesson-3-3',
                title: 'Return Values',
                titleVi: 'Giá trị trả về',
                description: 'Lấy kết quả từ hàm',
                icon: '📤',
                type: 'concept',
                difficulty: 'intermediate',
                xpReward: 20,
                status: 'locked',
                progress: 0,
                exercises: 8,
                completedExercises: 0
            },
            {
                id: 'lesson-3-4',
                title: 'Lambda Functions',
                titleVi: 'Hàm Lambda',
                description: 'Hàm ẩn danh trong Python',
                icon: '⚡',
                type: 'concept',
                difficulty: 'intermediate',
                xpReward: 20,
                status: 'locked',
                progress: 0,
                exercises: 8,
                completedExercises: 0
            },
            {
                id: 'lesson-3-5',
                title: 'Unit 3 Complete!',
                titleVi: 'Hoàn thành Phần 3',
                description: 'Tổng kết về Hàm',
                icon: '🏆',
                type: 'quiz',
                difficulty: 'intermediate',
                xpReward: 35,
                status: 'locked',
                progress: 0,
                exercises: 12,
                completedExercises: 0
            }
        ]
    },
    {
        id: 'unit-4',
        title: 'Data Structures',
        titleVi: 'Cấu trúc dữ liệu',
        description: 'Lists, Dictionaries, Sets',
        color: '#ce82ff',
        status: 'locked',
        lessons: [
            {
                id: 'lesson-4-1',
                title: 'Lists',
                titleVi: 'Danh sách',
                description: 'Array trong Python',
                icon: '📋',
                type: 'concept',
                difficulty: 'intermediate',
                xpReward: 25,
                status: 'locked',
                progress: 0,
                exercises: 10,
                completedExercises: 0
            },
            {
                id: 'lesson-4-2',
                title: 'Dictionaries',
                titleVi: 'Từ điển',
                description: 'Key-value pairs',
                icon: '📖',
                type: 'concept',
                difficulty: 'intermediate',
                xpReward: 25,
                status: 'locked',
                progress: 0,
                exercises: 10,
                completedExercises: 0
            },
            {
                id: 'lesson-4-3',
                title: 'Sets & Tuples',
                titleVi: 'Set và Tuple',
                description: 'Các kiểu dữ liệu đặc biệt',
                icon: '🎲',
                type: 'concept',
                difficulty: 'intermediate',
                xpReward: 25,
                status: 'locked',
                progress: 0,
                exercises: 10,
                completedExercises: 0
            },
            {
                id: 'lesson-4-4',
                title: 'List Methods',
                titleVi: 'Phương thức List',
                description: 'Các thao tác với List',
                icon: '🔧',
                type: 'practice',
                difficulty: 'intermediate',
                xpReward: 25,
                status: 'locked',
                progress: 0,
                exercises: 10,
                completedExercises: 0
            },
            {
                id: 'lesson-4-5',
                title: 'Unit 4 Complete!',
                titleVi: 'Hoàn thành Phần 4',
                description: 'Tổng kết cấu trúc dữ liệu',
                icon: '🏆',
                type: 'quiz',
                difficulty: 'intermediate',
                xpReward: 40,
                status: 'locked',
                progress: 0,
                exercises: 15,
                completedExercises: 0
            }
        ]
    }
];

// Mock Leaderboard
export const mockLeaderboard: LeaderboardUser[] = [
    { id: '1', name: 'CodeMaster', avatar: '🦸', xp: 5420, league: 'Diamond', rank: 1, level: 25 },
    { id: '2', name: 'PythonNinja', avatar: '🥷', xp: 4890, league: 'Diamond', rank: 2, level: 23 },
    { id: '3', name: 'JSWizard', avatar: '🧙', xp: 4650, league: 'Diamond', rank: 3, level: 22 },
    { id: '4', name: 'AlgoKing', avatar: '👑', xp: 4200, league: 'Diamond', rank: 4, level: 20 },
    { id: '5', name: 'ByteQueen', avatar: '👸', xp: 3980, league: 'Diamond', rank: 5, level: 19 },
    { id: '6', name: 'DataDragon', avatar: '🐉', xp: 3750, league: 'Platinum', rank: 6, level: 18 },
    { id: '7', name: 'LoopLord', avatar: '🔁', xp: 3500, league: 'Platinum', rank: 7, level: 17 },
    { id: '8', name: 'FuncFox', avatar: '🦊', xp: 3200, league: 'Platinum', rank: 8, level: 16 },
    { id: '9', name: 'ClassCat', avatar: '🐱', xp: 2900, league: 'Gold', rank: 9, level: 14 },
    { id: '10', name: 'StackStar', avatar: '⭐', xp: 2600, league: 'Gold', rank: 10, level: 13 }
];

// Mock Achievements
export const mockAchievements: Achievement[] = [
    {
        id: 'ach-1',
        title: 'Hello World!',
        description: 'Viết chương trình đầu tiên',
        icon: '🌍',
        unlocked: true,
        progress: 1,
        maxProgress: 1,
        rarity: 'common',
        unlockedDate: '15/01/2024'
    },
    {
        id: 'ach-2',
        title: 'Bug Hunter',
        description: 'Sửa 10 lỗi trong code',
        icon: '🐛',
        unlocked: true,
        progress: 10,
        maxProgress: 10,
        rarity: 'common',
        unlockedDate: '20/01/2024'
    },
    {
        id: 'ach-3',
        title: 'Streak Master',
        description: 'Duy trì chuỗi 30 ngày',
        icon: '🔥',
        unlocked: false,
        progress: 15,
        maxProgress: 30,
        rarity: 'rare'
    },
    {
        id: 'ach-4',
        title: 'Polyglot Coder',
        description: 'Học 3 ngôn ngữ lập trình',
        icon: '💻',
        unlocked: false,
        progress: 2,
        maxProgress: 3,
        rarity: 'rare'
    },
    {
        id: 'ach-5',
        title: 'Perfect Code',
        description: 'Hoàn thành bài không lỗi',
        icon: '💯',
        unlocked: true,
        progress: 1,
        maxProgress: 1,
        rarity: 'rare',
        unlockedDate: '05/02/2024'
    },
    {
        id: 'ach-6',
        title: 'Algorithm Ace',
        description: 'Giải 50 bài thuật toán',
        icon: '🧠',
        unlocked: false,
        progress: 12,
        maxProgress: 50,
        rarity: 'epic'
    },
    {
        id: 'ach-7',
        title: 'Code Legend',
        description: 'Đạt level 50',
        icon: '🏆',
        unlocked: false,
        progress: 12,
        maxProgress: 50,
        rarity: 'legendary'
    }
];

// Daily Quests
export interface DailyQuest {
    id: string;
    title: string;
    description: string;
    icon: string;
    xpReward: number;
    gemsReward: number;
    progress: number;
    maxProgress: number;
    completed: boolean;
}

export const mockDailyQuests: DailyQuest[] = [
    {
        id: 'quest-1',
        title: 'Code chăm chỉ',
        description: 'Hoàn thành 3 bài học hôm nay',
        icon: '⌨️',
        xpReward: 20,
        gemsReward: 5,
        progress: 2,
        maxProgress: 3,
        completed: false
    },
    {
        id: 'quest-2',
        title: 'Zero Bugs',
        description: 'Hoàn thành 1 bài với 0 lỗi',
        icon: '✨',
        xpReward: 30,
        gemsReward: 10,
        progress: 1,
        maxProgress: 1,
        completed: true
    },
    {
        id: 'quest-3',
        title: 'XP Hunter',
        description: 'Kiếm 50 XP hôm nay',
        icon: '⭐',
        xpReward: 10,
        gemsReward: 3,
        progress: 35,
        maxProgress: 50,
        completed: false
    }
];

// Mock Lesson Contents with Knowledge and Exercises
export const mockLessonContents: LessonContent[] = [
    {
        lessonId: 'lesson-1-1',
        knowledge: {
            title: 'Print Hello World',
            titleVi: 'In Hello World',
            concepts: [
                {
                    heading: 'What is print()?',
                    headingVi: 'print() là gì?',
                    content: 'The print() function outputs text to the console. It\'s the most basic way to display information in Python.',
                    contentVi: 'Hàm print() xuất văn bản ra console. Đây là cách cơ bản nhất để hiển thị thông tin trong Python.',
                    codeExample: 'print("Hello, World!")\n# Output: Hello, World!'
                },
                {
                    heading: 'String Basics',
                    headingVi: 'Chuỗi cơ bản',
                    content: 'Strings are text enclosed in quotes. You can use single (\') or double (") quotes.',
                    contentVi: 'Chuỗi là văn bản được đặt trong dấu ngoặc kép. Bạn có thể dùng ngoặc đơn (\') hoặc ngoặc kép (").',
                    codeExample: 'print("Hello")  # Double quotes\nprint(\'World\')  # Single quotes'
                }
            ]
        },
        exercises: [
            {
                id: 'ex-1-1-1',
                type: 'multiple_choice',
                question: 'What will print("CoerLingo") output?',
                questionVi: 'print("CoerLingo") sẽ xuất ra gì?',
                options: ['CoerLingo', '"CoerLingo"', 'print(CoerLingo)', 'Error'],
                correctAnswer: 'CoerLingo',
                explanation: 'print() displays the text inside the quotes without the quotes.',
                explanationVi: 'print() hiển thị văn bản bên trong dấu ngoặc kép mà không có dấu ngoặc.'
            },
            {
                id: 'ex-1-1-2',
                type: 'type_answer',
                question: 'What is the output of this code?',
                questionVi: 'Kết quả của đoạn code này là gì?',
                code: 'print("Hello")\nprint("World")',
                correctAnswer: 'Hello\nWorld',
                explanation: 'Each print() statement outputs on a new line.',
                explanationVi: 'Mỗi lệnh print() xuất ra một dòng mới.'
            },
            {
                id: 'ex-1-1-3',
                type: 'find_bug',
                question: 'Which line has an error?',
                questionVi: 'Dòng nào có lỗi?',
                codeLines: [
                    'message = "Hello"',
                    'print(Message)',
                    'print("Done")'
                ],
                correctAnswer: 1,
                explanation: 'Python is case-sensitive. "Message" is not the same as "message".',
                explanationVi: 'Python phân biệt chữ hoa/thường. "Message" không giống "message".'
            },
            {
                id: 'ex-1-1-4',
                type: 'drag_drop',
                question: 'Complete the code to print "Python"',
                questionVi: 'Hoàn thành code để in "Python"',
                template: '___("Python")',
                blanks: ['print', 'output', 'show', 'display'],
                correctAnswer: ['print'],
                explanation: 'The print() function is used to output text.',
                explanationVi: 'Hàm print() được dùng để xuất văn bản.'
            },
            {
                id: 'ex-1-1-5',
                type: 'multiple_choice',
                question: 'Which is the correct way to print text?',
                questionVi: 'Cách nào đúng để in văn bản?',
                options: [
                    'print("Hello")',
                    'Print("Hello")',
                    'PRINT("Hello")',
                    'console.log("Hello")'
                ],
                correctAnswer: 'print("Hello")',
                explanation: 'Python functions are lowercase. print() is the correct syntax.',
                explanationVi: 'Hàm Python viết thường. print() là cú pháp đúng.'
            },
            {
                id: 'ex-1-1-6',
                type: 'code_writing',
                question: 'Write code to print your name',
                questionVi: 'Viết code để in tên của bạn ra màn hình',
                starterCode: '# Viết code của bạn ở đây\n',
                expectedOutput: 'Tên của bạn',
                hints: [
                    'Sử dụng hàm print()',
                    'Đặt tên trong dấu ngoặc kép ""',
                    'Ví dụ: print("Minh")'
                ],
                testCases: [
                    { input: '', expectedOutput: 'Bất kỳ tên nào' }
                ],
                correctAnswer: 'print("Tên")',
                explanation: 'Use print() function with your name in quotes. Example: print("John") will output: John',
                explanationVi: 'Dùng hàm print() với tên của bạn trong dấu ngoặc kép. Ví dụ: print("Minh") sẽ in ra: Minh'
            }
        ]
    }
];

// Detailed content for AI Section
export interface AISectionDetail {
    theory: string;
    codeExamples: { title: string; code: string; explanation: string }[];
    keyPoints: string[];
}

export interface AISection {
    id: string;
    title: string;
    titleVi: string;
    content: string;
    duration: number;
    completed: boolean;
    order: number;
    detail?: AISectionDetail;
}

export interface AIModule {
    id: string;
    title: string;
    titleVi: string;
    description: string;
    order: number;
    completed: boolean;
    sections: AISection[];
}

export interface AIGeneratedCourse {
    id: string;
    title: string;
    titleVi: string;
    description: string;
    language: string;
    icon: string;
    createdAt: string;
    totalDuration: number;
    modules: AIModule[];
}

// Mock AI-Generated Courses
export const mockAICourses: AIGeneratedCourse[] = [
    {
        id: 'ai-python-basics',
        title: 'Python Fundamentals',
        titleVi: 'Nền tảng Python',
        description: 'Khóa học AI tạo ra về các khái niệm cơ bản của Python',
        language: 'Python',
        icon: '🐍',
        createdAt: '2024-12-20',
        totalDuration: 180,
        modules: [
            {
                id: 'mod-1',
                title: 'Getting Started',
                titleVi: 'Bắt đầu với Python',
                description: 'Giới thiệu và cài đặt Python',
                order: 1,
                completed: true,
                sections: [
                    { id: 'sec-1-1', title: 'What is Python?', titleVi: 'Python là gì?', content: 'Python là ngôn ngữ lập trình đa năng...', duration: 10, completed: true, order: 1 },
                    { id: 'sec-1-2', title: 'Installing Python', titleVi: 'Cài đặt Python', content: 'Hướng dẫn cài đặt Python trên các hệ điều hành...', duration: 15, completed: true, order: 2 },
                    { id: 'sec-1-3', title: 'Your First Program', titleVi: 'Chương trình đầu tiên', content: 'Viết và chạy chương trình Hello World...', duration: 10, completed: true, order: 3 },
                ]
            },
            {
                id: 'mod-2',
                title: 'Variables & Data Types',
                titleVi: 'Biến và Kiểu dữ liệu',
                description: 'Tìm hiểu về biến và các kiểu dữ liệu cơ bản',
                order: 2,
                completed: false,
                sections: [
                    { id: 'sec-2-1', title: 'Variables', titleVi: 'Biến', content: 'Biến là nơi lưu trữ dữ liệu...', duration: 15, completed: true, order: 1 },
                    { id: 'sec-2-2', title: 'Numbers', titleVi: 'Số', content: 'int, float và các phép toán...', duration: 15, completed: true, order: 2 },
                    { id: 'sec-2-3', title: 'Strings', titleVi: 'Chuỗi', content: 'Làm việc với chuỗi ký tự...', duration: 20, completed: false, order: 3 },
                    { id: 'sec-2-4', title: 'Boolean', titleVi: 'Boolean', content: 'True và False...', duration: 10, completed: false, order: 4 },
                ]
            },
            {
                id: 'mod-3',
                title: 'Control Flow',
                titleVi: 'Luồng điều khiển',
                description: 'if/else, loops và logic điều kiện',
                order: 3,
                completed: false,
                sections: [
                    { id: 'sec-3-1', title: 'If Statements', titleVi: 'Câu lệnh if', content: 'Điều kiện if, elif, else...', duration: 20, completed: false, order: 1 },
                    { id: 'sec-3-2', title: 'For Loops', titleVi: 'Vòng lặp for', content: 'Lặp qua danh sách với for...', duration: 20, completed: false, order: 2 },
                    { id: 'sec-3-3', title: 'While Loops', titleVi: 'Vòng lặp while', content: 'Lặp với điều kiện while...', duration: 15, completed: false, order: 3 },
                ]
            },
            {
                id: 'mod-4',
                title: 'Functions',
                titleVi: 'Hàm',
                description: 'Định nghĩa và sử dụng hàm',
                order: 4,
                completed: false,
                sections: [
                    { id: 'sec-4-1', title: 'Defining Functions', titleVi: 'Định nghĩa hàm', content: 'Cách tạo hàm với def...', duration: 20, completed: false, order: 1 },
                    { id: 'sec-4-2', title: 'Parameters', titleVi: 'Tham số', content: 'Truyền tham số vào hàm...', duration: 15, completed: false, order: 2 },
                    { id: 'sec-4-3', title: 'Return Values', titleVi: 'Giá trị trả về', content: 'Sử dụng return...', duration: 15, completed: false, order: 3 },
                ]
            }
        ]
    },
    {
        id: 'ai-js-intro',
        title: 'JavaScript Introduction',
        titleVi: 'Giới thiệu JavaScript',
        description: 'Khóa học AI về JavaScript cho người mới bắt đầu',
        language: 'JavaScript',
        icon: '⚡',
        createdAt: '2024-12-22',
        totalDuration: 150,
        modules: [
            {
                id: 'js-mod-1',
                title: 'JS Basics',
                titleVi: 'Cơ bản JavaScript',
                description: 'Syntax và cấu trúc cơ bản',
                order: 1,
                completed: true,
                sections: [
                    { id: 'js-sec-1-1', title: 'Variables (let, const)', titleVi: 'Biến (let, const)', content: 'Khai báo biến trong JS...', duration: 15, completed: true, order: 1 },
                    { id: 'js-sec-1-2', title: 'Data Types', titleVi: 'Kiểu dữ liệu', content: 'String, Number, Boolean...', duration: 15, completed: true, order: 2 },
                ]
            },
            {
                id: 'js-mod-2',
                title: 'DOM Manipulation',
                titleVi: 'Thao tác DOM',
                description: 'Tương tác với HTML elements',
                order: 2,
                completed: false,
                sections: [
                    { id: 'js-sec-2-1', title: 'Selecting Elements', titleVi: 'Chọn Elements', content: 'querySelector, getElementById...', duration: 20, completed: false, order: 1 },
                    { id: 'js-sec-2-2', title: 'Event Listeners', titleVi: 'Event Listeners', content: 'addEventListener...', duration: 25, completed: false, order: 2 },
                ]
            }
        ]
    }
];

// Weekly Stats for Profile Chart
export interface DayLesson {
    name: string;
    language: string;
    xp: number;
    time: string;
}

export interface WeeklyStat {
    day: string;
    dayShort: string;
    xp: number;
    lessons: number;
    date: string;
    fullDate: string;
    lessonDetails: DayLesson[];
}

export const mockWeeklyStats: WeeklyStat[] = [
    {
        day: 'Thứ 2', dayShort: 'T2', xp: 120, lessons: 3, date: '20/12', fullDate: '20/12/2024',
        lessonDetails: [
            { name: 'Hello World', language: 'Python', xp: 40, time: '08:30' },
            { name: 'Variables', language: 'Python', xp: 40, time: '12:15' },
            { name: 'Data Types', language: 'Python', xp: 40, time: '20:00' },
        ]
    },
    {
        day: 'Thứ 3', dayShort: 'T3', xp: 85, lessons: 2, date: '21/12', fullDate: '21/12/2024',
        lessonDetails: [
            { name: 'Functions', language: 'Python', xp: 45, time: '19:30' },
            { name: 'DOM Basics', language: 'JavaScript', xp: 40, time: '21:00' },
        ]
    },
    {
        day: 'Thứ 4', dayShort: 'T4', xp: 200, lessons: 5, date: '22/12', fullDate: '22/12/2024',
        lessonDetails: [
            { name: 'Loops', language: 'Python', xp: 40, time: '07:00' },
            { name: 'Arrays', language: 'JavaScript', xp: 40, time: '09:30' },
            { name: 'Objects', language: 'JavaScript', xp: 40, time: '14:00' },
            { name: 'Classes', language: 'Python', xp: 40, time: '18:00' },
            { name: 'Modules', language: 'Python', xp: 40, time: '21:30' },
        ]
    },
    {
        day: 'Thứ 5', dayShort: 'T5', xp: 150, lessons: 4, date: '23/12', fullDate: '23/12/2024',
        lessonDetails: [
            { name: 'Events', language: 'JavaScript', xp: 40, time: '10:00' },
            { name: 'Async/Await', language: 'JavaScript', xp: 35, time: '15:30' },
            { name: 'File I/O', language: 'Python', xp: 40, time: '19:00' },
            { name: 'Error Handling', language: 'Python', xp: 35, time: '21:00' },
        ]
    },
    {
        day: 'Thứ 6', dayShort: 'T6', xp: 180, lessons: 4, date: '24/12', fullDate: '24/12/2024',
        lessonDetails: [
            { name: 'APIs', language: 'JavaScript', xp: 45, time: '08:00' },
            { name: 'Fetch', language: 'JavaScript', xp: 45, time: '11:30' },
            { name: 'JSON', language: 'Python', xp: 45, time: '16:00' },
            { name: 'Requests', language: 'Python', xp: 45, time: '20:30' },
        ]
    },
    {
        day: 'Thứ 7', dayShort: 'T7', xp: 250, lessons: 6, date: '25/12', fullDate: '25/12/2024',
        lessonDetails: [
            { name: 'React Basics', language: 'JavaScript', xp: 40, time: '09:00' },
            { name: 'Components', language: 'JavaScript', xp: 45, time: '10:30' },
            { name: 'State', language: 'JavaScript', xp: 40, time: '14:00' },
            { name: 'Props', language: 'JavaScript', xp: 40, time: '16:00' },
            { name: 'Hooks', language: 'JavaScript', xp: 45, time: '18:30' },
            { name: 'Context', language: 'JavaScript', xp: 40, time: '21:00' },
        ]
    },
    {
        day: 'CN', dayShort: 'CN', xp: 95, lessons: 2, date: '26/12', fullDate: '26/12/2024',
        lessonDetails: [
            { name: 'Regex', language: 'Python', xp: 50, time: '10:00' },
            { name: 'Testing', language: 'Python', xp: 45, time: '15:00' },
        ]
    },
];


// Avatar Collection (owned + shop avatars)
export interface Avatar {
    id: string;
    name: string;
    emoji?: string;
    image?: string;
    owned: boolean;
    price?: number;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const mockAvatarCollection: Avatar[] = [
    { id: 'default', name: 'Lập trình viên', emoji: '🧑‍💻', owned: true, rarity: 'common' },
    { id: 'robot', name: 'Robot', emoji: '🤖', owned: true, rarity: 'rare' },
    { id: 'ninja', name: 'Ninja', emoji: '🥷', owned: true, rarity: 'rare' },
    { id: 'astronaut', name: 'Phi hành gia', emoji: '👨‍🚀', owned: false, price: 500, rarity: 'epic' },
    { id: 'wizard', name: 'Phù thủy', emoji: '🧙‍♂️', owned: false, price: 750, rarity: 'epic' },
    { id: 'superhero', name: 'Siêu anh hùng', emoji: '🦸', owned: false, price: 1000, rarity: 'legendary' },
    { id: 'alien', name: 'Người ngoài hành tinh', emoji: '👽', owned: false, price: 800, rarity: 'epic' },
    { id: 'cat', name: 'Mèo', emoji: '🐱', owned: true, rarity: 'common' },
    { id: 'dog', name: 'Chó', emoji: '🐶', owned: true, rarity: 'common' },
    { id: 'panda', name: 'Gấu trúc', emoji: '🐼', owned: false, price: 300, rarity: 'rare' },
    { id: 'fox', name: 'Cáo', emoji: '🦊', owned: false, price: 400, rarity: 'rare' },
    { id: 'dragon', name: 'Rồng', emoji: '🐲', owned: false, price: 1500, rarity: 'legendary' },
];

// Detailed Learning Stats
export interface LearningStats {
    totalTimeSpent: number; // in minutes
    averageSessionLength: number; // in minutes
    longestStreak: number;
    perfectLessons: number;
    totalMistakes: number;
    accuracyRate: number; // percentage
    favoriteTime: string;
    mostActiveDay: string;
    totalDaysActive: number;
    currentRank: number;
    totalUsers: number;
}

export const mockLearningStats: LearningStats = {
    totalTimeSpent: 1450, // ~24 hours
    averageSessionLength: 18,
    longestStreak: 23,
    perfectLessons: 15,
    totalMistakes: 127,
    accuracyRate: 87,
    favoriteTime: '20:00 - 22:00',
    mostActiveDay: 'Thứ 7',
    totalDaysActive: 45,
    currentRank: 8,
    totalUsers: 1250,
};
