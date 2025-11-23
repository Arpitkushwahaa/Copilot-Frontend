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
            <div className={`modern-card p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} transition-all duration-200`}>
                <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    <ClockIcon className="h-5 w-5" />
                    Prompt History
                </h2>
                <div className="text-center py-12">
                    <ClockIcon className={`h-12 w-12 mx-auto mb-3 ${isDarkMode ? 'text-slate-700' : 'text-slate-300'}`} />
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
            <div className="flex items-center justify-between mb-5">
                <h2 className={`text-lg font-semibold flex items-center gap-2 ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                    <ClockIcon className="h-5 w-5" />
                    Prompt History
                    <span className={`text-sm font-normal ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        ({filteredHistory.length})
                    </span>
                </h2>
                <button
                    onClick={onClearHistory}
                    className={`text-sm flex items-center gap-1.5 font-medium px-3 py-1.5 rounded-lg transition-all ${isDarkMode ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' : 'text-red-600 hover:text-red-700 hover:bg-red-50'}`}
                >
                    <TrashIcon className="h-4 w-4" />
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
            <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                    {ALL_LANGUAGES.slice(0, 5).map((lang) => (
                        <button
                            key={lang.value}
                            onClick={() => setLanguageFilter(lang.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                languageFilter === lang.value
                                    ? isDarkMode
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-indigo-600 text-white'
                                    : isDarkMode
                                        ? 'bg-slate-900 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
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
                            className={`relative group p-3.5 rounded-lg border-2 cursor-pointer transition-all duration-200 ${isDarkMode ? 'bg-slate-900 border-slate-700 hover:border-blue-500 hover:bg-slate-800' : 'bg-slate-50 border-slate-200 hover:border-indigo-500 hover:bg-white'}`}
                        >
                            <button
                                onClick={() => onSelectHistory(item)}
                                className="w-full text-left"
                            >
                                <p className={`text-sm font-medium truncate pr-8 mb-2 ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                                    {item.prompt}
                                </p>
                                <div className={`flex items-center gap-2 text-xs ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                                    <span className={`px-2 py-0.5 rounded font-medium ${isDarkMode ? 'bg-blue-600/20 text-blue-300' : 'bg-indigo-100 text-indigo-700'}`}>
                                        {item.language}
                                    </span>
                                    <span>•</span>
                                    <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                                </div>
                                {/* Code Preview */}
                                <p className={`text-xs mt-2 truncate font-code ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                                    {item.code.split('\n')[0]}
                                </p>
                            </button>

                            {/* Favorite Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleFavorite(index);
                                }}
                                className={`absolute top-3 right-3 transition-colors ${item.favorite ? 'text-yellow-500' : isDarkMode ? 'text-slate-600 hover:text-yellow-400' : 'text-slate-400 hover:text-yellow-500'}`}
                                aria-label={item.favorite ? 'Remove from favorites' : 'Add to favorites'}
                            >
                                {item.favorite ? (
                                    <StarIconSolid className="h-5 w-5" />
                                ) : (
                                    <StarIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
