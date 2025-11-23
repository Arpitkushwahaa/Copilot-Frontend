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

            <div className={`modern-card p-6 h-full flex flex-col ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} transition-all duration-200`}>
                {/* Header with Info Tooltip */}
                <div className="flex items-center justify-between mb-5">
                    <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-slate-50' : 'text-slate-900'}`}>
                        Enter Your Prompt
                    </h2>
                    <button 
                        className={`p-1 rounded-lg ${isDarkMode ? 'text-slate-400 hover:text-slate-300 hover:bg-slate-700' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'} transition-colors`}
                        title="Describe what code you want to generate"
                    >
                        <InformationCircleIcon className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                    {/* Language Selector with Icons */}
                    <div className="mb-4">
                        <label htmlFor="language" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            Programming Language
                        </label>
                        <select
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            disabled={isLoading}
                            className={`w-full px-4 py-2.5 rounded-lg border-2 ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100 focus:border-blue-500' : 'bg-white border-slate-300 text-slate-900 focus:border-indigo-500'} focus:outline-none focus:ring-0 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium`}
                        >
                            {LANGUAGES.map((lang) => (
                                <option key={lang.value} value={lang.value}>
                                    {lang.icon} {lang.label} ({lang.ext})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Prompt Textarea with Character Counter */}
                    <div className="flex-1 mb-4 relative">
                        <label htmlFor="prompt" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            Code Description
                        </label>
                        <textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Describe what you want to code... (e.g., 'Create a Python function that calculates fibonacci numbers')"
                            maxLength={5000}
                            className={`w-full h-full min-h-[200px] p-4 rounded-lg border-2 ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-blue-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500'} focus:outline-none focus:ring-0 resize-none transition-all duration-200 font-code text-sm`}
                            disabled={isLoading}
                        />
                        {/* Character Counter */}
                        <div className={`absolute bottom-2 right-2 text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-400'} font-mono`}>
                            {charCount} / 5000
                        </div>
                    </div>

                    {/* Generate Button with Gradient */}
                    <button
                        type="submit"
                        disabled={!prompt.trim() || isLoading}
                        className="btn-ripple relative w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-slate-700 disabled:to-slate-800 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100"
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                <span>Generating...</span>
                            </>
                        ) : (
                            <>
                                <SparklesIcon className="h-5 w-5" />
                                <span>Generate Code</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </>
    );
}
