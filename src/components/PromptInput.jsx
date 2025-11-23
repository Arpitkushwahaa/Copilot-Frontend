import { useState } from 'react';
import { isCodingPrompt } from '../utils/promptCheck';
import { SparklesIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import WarningPopup from './WarningPopup';

const LANGUAGES = [
    { value: 'javascript', label: 'JavaScript', icon: '📜', ext: '.js' },
    { value: 'python', label: 'Python', icon: '🐍', ext: '.py' },
    { value: 'typescript', label: 'TypeScript', icon: '💙', ext: '.ts' },
    { value: 'java', label: 'Java', icon: '☕', ext: '.java' },
    { value: 'cpp', label: 'C++', icon: '⚡', ext: '.cpp' },
    { value: 'go', label: 'Go', icon: '🔷', ext: '.go' },
    { value: 'rust', label: 'Rust', icon: '🦀', ext: '.rs' },
    { value: 'csharp', label: 'C#', icon: '🔷', ext: '.cs' },
    { value: 'php', label: 'PHP', icon: '🐘', ext: '.php' },
    { value: 'ruby', label: 'Ruby', icon: '💎', ext: '.rb' },
];


export default function PromptInput({ onGenerate, isLoading, isDarkMode }) {
    const [prompt, setPrompt] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [showWarning, setShowWarning] = useState(false);
    const charCount = prompt.length;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!prompt.trim() || isLoading) return;

        // Check if prompt is coding-related
        if (!isCodingPrompt(prompt)) {
            setShowWarning(true);
            return;
        }

        onGenerate(prompt, language);
    };

    return (
        <>
            {showWarning && (
                <WarningPopup
                    message="⚠️ This app is designed for code generation only. Please ask coding-related questions or describe the code you want to generate. Examples: 'Create a function to sort an array', 'Write a React component', 'Generate a Python class', etc."
                    onClose={() => setShowWarning(false)}
                />
            )}

            <div className={`modern-card p-6 h-full flex flex-col relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-slate-700' : 'bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 border-slate-200'} transition-all duration-500 shadow-2xl hover:shadow-blue-500/20 animate-in`}>
                {/* Animated background orbs */}
                <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
                </div>
                {/* Header with Info Tooltip */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className={`text-xl lg:text-2xl font-extrabold bg-gradient-to-r ${isDarkMode ? 'from-blue-400 via-purple-400 to-pink-400' : 'from-indigo-600 via-purple-600 to-pink-600'} bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] hover:scale-105 transition-transform duration-300 cursor-default`}>
                        💡 Enter Your Prompt
                    </h2>
                    <button 
                        className={`p-2 rounded-xl transition-all duration-300 hover:scale-125 hover:rotate-[360deg] ${isDarkMode ? 'text-slate-400 hover:text-blue-400 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-purple-500/20 hover:shadow-lg hover:shadow-blue-500/50' : 'text-slate-500 hover:text-indigo-600 hover:bg-gradient-to-br hover:from-indigo-100 hover:to-purple-100 hover:shadow-lg hover:shadow-indigo-500/50'}`}
                        title="Describe what code you want to generate"
                    >
                        <InformationCircleIcon className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                    {/* Language Selector with Icons */}
                    <div className="mb-5 group">
                        <label htmlFor="language" className={`block text-base lg:text-lg font-bold mb-3 ${isDarkMode ? 'text-slate-200 group-hover:text-blue-400' : 'text-slate-800 group-hover:text-indigo-600'} transition-colors duration-300`}>
                            🔤 Programming Language
                        </label>
                        <select
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            disabled={isLoading}
                            className={`w-full px-5 py-3.5 rounded-xl border-2 text-base ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100 hover:border-blue-500 focus:border-blue-500 hover:shadow-lg hover:shadow-blue-500/30' : 'bg-white border-slate-300 text-slate-900 hover:border-indigo-500 focus:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30'} focus:outline-none focus:ring-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold cursor-pointer hover:scale-[1.02]`}
                        >
                            {LANGUAGES.map((lang) => (
                                <option key={lang.value} value={lang.value}>
                                    {lang.icon} {lang.label} ({lang.ext})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Prompt Textarea with Character Counter */}
                    <div className="flex-1 mb-5 relative group">
                        <label htmlFor="prompt" className={`block text-base lg:text-lg font-bold mb-3 ${isDarkMode ? 'text-slate-200 group-hover:text-purple-400' : 'text-slate-800 group-hover:text-purple-600'} transition-colors duration-300`}>
                            ✍️ Code Description
                        </label>
                        <textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe what you want to code... (e.g., 'Create a Python function that calculates fibonacci numbers')"
                            maxLength={5000}
                            className={`w-full h-full min-h-[220px] p-5 rounded-xl border-2 text-base ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-purple-500 hover:border-purple-600 hover:shadow-xl hover:shadow-purple-500/20' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-purple-500 hover:border-purple-600 hover:shadow-xl hover:shadow-purple-500/20'} focus:outline-none focus:ring-0 resize-none transition-all duration-300 font-code hover:scale-[1.01]`}
                            disabled={isLoading}
                        />
                        {/* Character Counter */}
                        <div className={`absolute bottom-3 right-3 text-sm font-bold px-3 py-1 rounded-lg ${isDarkMode ? 'text-slate-400 bg-slate-800/80 group-hover:text-purple-400 group-hover:bg-purple-900/30' : 'text-slate-500 bg-slate-100/80 group-hover:text-purple-600 group-hover:bg-purple-100/80'} font-mono transition-all duration-300`}>
                            {charCount} / 5000
                        </div>
                    </div>

                    {/* Generate Button with Gradient */}
                    <button
                        type="submit"
                        disabled={!prompt.trim() || isLoading}
                        className="btn-ripple relative w-full overflow-hidden bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 hover:from-blue-600 hover:via-purple-700 hover:to-pink-700 disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed text-white font-extrabold text-lg py-5 px-8 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl hover:shadow-[0_0_60px_rgba(168,85,247,1)] hover:scale-[1.08] active:scale-[0.95] disabled:hover:scale-100 animate-gradient bg-[length:200%_auto] group border-2 border-white/20">
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.9),transparent_50%)] transition-opacity duration-300"></div>
                        {/* Sparkle particles */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute top-2 left-1/4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                            <div className="absolute top-4 right-1/3 w-1 h-1 bg-white rounded-full animate-ping animation-delay-2000"></div>
                            <div className="absolute bottom-3 left-1/2 w-1 h-1 bg-white rounded-full animate-ping animation-delay-4000"></div>
                        </div>
                        {isLoading ? (
                            <>
                                <div className="relative animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
                                <span className="relative text-xl bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent animate-pulse">Generating Magic...</span>
                            </>
                        ) : (
                            <>
                                <SparklesIcon className="h-7 w-7 relative animate-pulse group-hover:rotate-180 group-hover:scale-125 transition-all duration-500" />
                                <span className="relative group-hover:tracking-wider transition-all duration-300">Generate Code ✨🚀</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </>
    );
}
