import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { CodeBracketIcon } from '@heroicons/react/24/solid';

export default function Header({ isDarkMode, toggleDarkMode }) {
    return (
        <header className={`sticky top-0 z-50 glass-nav h-16 animate-fade-in ${isDarkMode ? 'bg-slate-900/90' : 'bg-white/90'} backdrop-blur-xl border-b ${isDarkMode ? 'border-slate-700/50' : 'border-slate-200/50'} shadow-2xl transition-all duration-300 group relative overflow-hidden`}>
            {/* Animated background shimmer */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <div className="container mx-auto px-4 h-full">
                <div className="flex items-center justify-between h-full">
                    {/* Logo - Left */}
                    <div className="flex items-center gap-4 group cursor-pointer relative z-10">
                        <div className="relative perspective-1000">
                            <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-600' : 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-600'} rounded-xl blur-lg opacity-50 group-hover:opacity-100 group-hover:blur-2xl transition-all duration-700 animate-pulse`}></div>
                            <div className={`relative p-3 rounded-xl ${isDarkMode ? 'bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600' : 'bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600'} shadow-2xl transform group-hover:scale-125 group-hover:rotate-[360deg] transition-all duration-700 animate-gradient bg-[length:200%_200%]`}>
                                <CodeBracketIcon className="h-7 w-7 text-white drop-shadow-lg" />
                            </div>
                            {/* Orbiting particles */}
                            <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full animate-spin"></div>
                                <div className="absolute bottom-0 right-0 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                            </div>
                        </div>
                        <div>
                            <h1 className={`text-2xl lg:text-3xl font-extrabold bg-gradient-to-r ${isDarkMode ? 'from-blue-400 via-purple-400 to-pink-400' : 'from-indigo-600 via-purple-600 to-pink-600'} bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] group-hover:scale-105 transition-transform duration-300`}>
                                Code Copilot
                            </h1>
                        </div>
                    </div>

                    {/* Center Tagline - Hidden on mobile */}
                    <div className="hidden md:block group">
                        <p className={`text-lg lg:text-xl font-extrabold bg-gradient-to-r ${isDarkMode ? 'from-cyan-400 via-blue-400 to-purple-400' : 'from-indigo-600 via-purple-600 to-pink-600'} bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] group-hover:scale-110 transition-transform duration-300`}>
                            ✨ AI-Powered Code Generation ⚡
                        </p>
                    </div>

                    {/* Right Side - Controls */}
                    <div className="flex items-center gap-2">
                        {/* Dark/Light Toggle */}
                        <button
                            onClick={toggleDarkMode}
                            className={`relative p-2.5 rounded-xl overflow-hidden transition-all duration-300 hover:scale-110 hover:rotate-12 ${isDarkMode ? 'bg-gradient-to-br from-slate-800 to-slate-900 text-yellow-400 hover:from-yellow-500 hover:to-orange-500 hover:text-white shadow-lg hover:shadow-yellow-500/50' : 'bg-gradient-to-br from-slate-100 to-slate-200 text-slate-700 hover:from-indigo-500 hover:to-purple-600 hover:text-white shadow-lg hover:shadow-indigo-500/50'}`}
                            aria-label="Toggle dark mode"
                        >
                            <span className="relative z-10">
                                {isDarkMode ? (
                                    <SunIcon className="h-5 w-5 animate-pulse" />
                                ) : (
                                    <MoonIcon className="h-5 w-5" />
                                )}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
