import { ClockIcon, TrashIcon, MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { useState } from 'react';

// All available languages
const ALL_LANGUAGES = [
    { value: 'all', label: 'All Languages' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
];

export default function HistoryPanel({ history, onSelectHistory, onClearHistory, onToggleFavorite, isDarkMode }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [languageFilter, setLanguageFilter] = useState('all');

    // Filter history based on search and language
    const filteredHistory = history.filter(item => {
        const matchesSearch = item.prompt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesLanguage = languageFilter === 'all' || item.language === languageFilter;
        return matchesSearch && matchesLanguage;
    });

    if (history.length === 0) {
        return (
            <div className={`modern-card p-6 relative overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 border-slate-700' : 'bg-gradient-to-br from-white via-slate-50 to-purple-50/30 border-slate-200'} transition-all duration-500 shadow-xl hover:shadow-2xl animate-fade-in`}>
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
                </div>
                <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 relative z-10 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    <ClockIcon className="h-5 w-5 animate-pulse" />
                    Prompt History
                </h2>
                <div className="text-center py-12 relative z-10">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                        <ClockIcon className={`h-12 w-12 mx-auto mb-3 relative ${isDarkMode ? 'text-slate-600' : 'text-slate-400'} animate-float`} />
                    </div>
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        No history yet
                    </p>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                        Generated code will appear here
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={`modern-card p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} transition-all duration-200`}>
            <div className="flex items-center justify-between mb-6">
                <h2 className={`text-xl lg:text-2xl font-extrabold flex items-center gap-3 bg-gradient-to-r ${isDarkMode ? 'from-cyan-400 via-blue-400 to-purple-400' : 'from-indigo-600 via-purple-600 to-pink-600'} bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] hover:scale-105 transition-transform duration-300 cursor-default group`}>
                    <ClockIcon className={`h-6 w-6 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'} group-hover:rotate-[360deg] transition-transform duration-700`} />
                    📜 Prompt History
                    <span className={`text-base font-bold px-3 py-1 rounded-lg ${isDarkMode ? 'text-slate-400 bg-slate-800/50' : 'text-slate-500 bg-slate-200/50'}`}>
                        {filteredHistory.length}
                    </span>
                </h2>
                <button
                    onClick={onClearHistory}
                    className={`text-base flex items-center gap-2 font-extrabold px-4 py-2.5 rounded-xl transition-all duration-300 transform hover:scale-125 hover:rotate-6 active:scale-90 group ${isDarkMode ? 'text-red-400 hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-600 hover:text-white hover:shadow-[0_0_25px_rgba(239,68,68,0.8)]' : 'text-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white hover:shadow-[0_0_25px_rgba(220,38,38,0.8)]'}`}
                >
                    <TrashIcon className="h-5 w-5 group-hover:animate-bounce" />
                    Clear
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-3">
                <div className="relative">
                    <MagnifyingGlassIcon className={`h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} />
                    <input
                        type="text"
                        placeholder="Filter prompts by keyword..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border-2 focus:outline-none focus:ring-0 text-sm transition-all ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-100 placeholder-slate-500 focus:border-blue-500' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500'}`}
                    />
                </div>
            </div>

            {/* Language Filter Tabs */}
            <div className="mb-5">
                <div className="flex flex-wrap gap-2">
                    {ALL_LANGUAGES.slice(0, 5).map((lang) => (
                        <button
                            key={lang.value}
                            onClick={() => setLanguageFilter(lang.value)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all duration-300 transform hover:scale-110 hover:rotate-2 active:scale-95 ${
                                languageFilter === lang.value
                                    ? isDarkMode
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105'
                                    : isDarkMode
                                        ? 'bg-slate-900 text-slate-400 hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-800 hover:text-slate-200 hover:shadow-lg'
                                        : 'bg-slate-100 text-slate-600 hover:bg-gradient-to-r hover:from-slate-200 hover:to-slate-300 hover:text-slate-900 hover:shadow-lg'
                            }`}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* History Cards */}
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {filteredHistory.length === 0 ? (
                    <div className="text-center py-8">
                        <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                            No matching results
                        </p>
                    </div>
                ) : (
                    filteredHistory.map((item, index) => (
                        <div
                            key={index}
                            className={`relative group p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-[1.03] hover:rotate-1 ${isDarkMode ? 'bg-slate-900 border-slate-700 hover:border-blue-500 hover:bg-slate-800 hover:shadow-xl hover:shadow-blue-500/30' : 'bg-slate-50 border-slate-200 hover:border-indigo-500 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/30'}`}
                        >
                            <button
                                onClick={() => onSelectHistory(item)}
                                className="w-full text-left"
                            >
                                <p className={`text-base font-bold truncate pr-10 mb-3 ${isDarkMode ? 'text-slate-100 group-hover:text-blue-400' : 'text-slate-900 group-hover:text-indigo-600'} transition-colors duration-300`}>
                                    {item.prompt}
                                </p>
                                <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                    <span className={`px-3 py-1 rounded-lg font-bold shadow-md ${isDarkMode ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-blue-300' : 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700'}`}>
                                        {item.language}
                                    </span>
                                    <span>•</span>
                                    <span className="font-semibold">{new Date(item.timestamp).toLocaleTimeString()}</span>
                                </div>
                                {/* Code Preview */}
                                <p className={`text-sm mt-3 truncate font-code font-semibold ${isDarkMode ? 'text-slate-500 group-hover:text-slate-400' : 'text-slate-400 group-hover:text-slate-600'} transition-colors duration-300`}>
                                    {item.code.split('\n')[0]}
                                </p>
                            </button>

                            {/* Favorite Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleFavorite(index);
                                }}
                                className={`absolute top-3 right-3 transition-all duration-300 transform hover:scale-150 hover:rotate-12 ${item.favorite ? 'text-yellow-400 animate-pulse' : isDarkMode ? 'text-slate-600 hover:text-yellow-400' : 'text-slate-400 hover:text-yellow-500'}`}
                                aria-label={item.favorite ? 'Remove from favorites' : 'Add to favorites'}
                            >
                                {item.favorite ? (
                                    <StarIconSolid className="h-6 w-6" />
                                ) : (
                                    <StarIcon className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
