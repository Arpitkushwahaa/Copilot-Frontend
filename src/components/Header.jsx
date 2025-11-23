import { MoonIcon, SunIcon, ClockIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import { CodeBracketIcon } from '@heroicons/react/24/solid';

export default function Header({ isDarkMode, toggleDarkMode }) {
    return (
        <header className={`sticky top-0 z-50 glass-nav h-16 animate-fade-in ${isDarkMode ? 'bg-slate-900/80' : 'bg-white/80'} backdrop-blur-lg transition-colors duration-300`}>
            <div className="container mx-auto px-4 h-full">
                <div className="flex items-center justify-between h-full">
                    {/* Logo - Left */}
                    <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-indigo-500 to-purple-600'} shadow-lg`}>
                            <CodeBracketIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-slate-50' : 'text-slate-900'}`}>
                                Code Copilot
                            </h1>
                        </div>
                    </div>

                    {/* Center Tagline - Hidden on mobile */}
                    <div className="hidden md:block">
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            AI-Powered Code Generation
                        </p>
                    </div>

                    {/* Right Side - Controls */}
                    <div className="flex items-center gap-2">
                        {/* Docs Link - Hidden on mobile */}
                        <a
                            href="#docs"
                            className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? 'text-slate-300 hover:bg-slate-800 hover:text-slate-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'} transition-all duration-200 text-sm font-medium`}
                            aria-label="Documentation"
                        >
                            <BookOpenIcon className="h-5 w-5" />
                            <span className="hidden lg:inline">Docs</span>
                        </a>

                        {/* Dark/Light Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'} transition-all duration-200 hover:scale-105`}
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? (
                                <SunIcon className="h-5 w-5" />
                            ) : (
                                <MoonIcon className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
