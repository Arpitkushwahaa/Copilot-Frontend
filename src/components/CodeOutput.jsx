import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ClipboardDocumentIcon, CheckIcon, CodeBracketIcon, ArrowDownTrayIcon, HeartIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const FONT_SIZES = [12, 14, 16, 18];

const LANGUAGE_EXTENSIONS = {
    javascript: '.js',
    python: '.py',
    typescript: '.ts',
    java: '.java',
    cpp: '.cpp',
    go: '.go',
    rust: '.rs',
    csharp: '.cs',
    php: '.php',
    ruby: '.rb',
};

export default function CodeOutput({ code, language, isDarkMode }) {
    const [copied, setCopied] = useState(false);
    const [fontSizeIndex, setFontSizeIndex] = useState(1); // Default to 14
    const [isFavorite, setIsFavorite] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleDownload = () => {
        const ext = LANGUAGE_EXTENSIONS[language] || '.txt';
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `generated-code${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const increaseFontSize = () => {
        if (fontSizeIndex < FONT_SIZES.length - 1) {
            setFontSizeIndex(fontSizeIndex + 1);
        }
    };

    const decreaseFontSize = () => {
        if (fontSizeIndex > 0) {
            setFontSizeIndex(fontSizeIndex - 1);
        }
    };

    if (!code) {
        return (
            <div className={`modern-card p-6 h-full min-h-[500px] flex items-center ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} transition-all duration-200`}>
                <div className="text-center w-full -mt-32">
                    <div className={`inline-flex p-6 rounded-2xl mb-4 ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-100'}`}>
                        <CodeBracketIcon className={`h-16 w-16 ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`} />
                    </div>
                    <p className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        No code generated yet
                    </p>
                    <p className={`text-sm max-w-xs mx-auto ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                        Your generated code will appear here...
                    </p>
                    <div className={`mt-4 border-2 border-dashed rounded-lg p-4 ${isDarkMode ? 'border-slate-700' : 'border-slate-300'}`}>
                        <p className={`text-xs ${isDarkMode ? 'text-slate-600' : 'text-slate-400'}`}>
                            Enter a prompt and click "Generate Code"
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`modern-card overflow-hidden h-full flex flex-col ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} transition-all duration-200`}>
            {/* Header with Language Badge and Copy Button */}
            <div className={`px-5 py-3.5 flex items-center justify-between border-b ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-3">
                    {/* Language Badge */}
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white text-sm font-extrabold rounded-xl uppercase tracking-wider shadow-lg animate-gradient bg-[length:200%_auto] hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-default">
                        {language || 'code'}
                    </span>
                    <h3 className={`text-base lg:text-lg font-extrabold bg-gradient-to-r ${isDarkMode ? 'from-blue-400 via-purple-400 to-pink-400' : 'from-indigo-600 via-purple-600 to-pink-600'} bg-clip-text text-transparent animate-gradient bg-[length:200%_auto] group-hover:scale-105 transition-transform duration-300`}>
                        ⚡ Generated Code 🎯
                    </h3>
                </div>

                <div className="flex items-center gap-2">
                    {/* Font Size Controls */}
                    <div className={`flex items-center gap-2 border-r pr-3 ${isDarkMode ? 'border-slate-700' : 'border-slate-300'}`}>
                        <button
                            onClick={decreaseFontSize}
                            disabled={fontSizeIndex === 0}
                            className={`p-1.5 rounded ${isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'} disabled:opacity-40 disabled:cursor-not-allowed transition-all`}
                            title="Decrease font size"
                            aria-label="Decrease font size"
                        >
                            <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className={`text-xs font-mono min-w-[32px] text-center ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                            {FONT_SIZES[fontSizeIndex]}px
                        </span>
                        <button
                            onClick={increaseFontSize}
                            disabled={fontSizeIndex === FONT_SIZES.length - 1}
                            className={`p-1.5 rounded ${isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'} disabled:opacity-40 disabled:cursor-not-allowed transition-all`}
                            title="Increase font size"
                            aria-label="Increase font size"
                        >
                            <PlusIcon className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Copy Button */}
                    <button
                        onClick={handleCopy}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-300 text-sm font-medium transform hover:scale-110 ${isDarkMode ? 'text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600' : 'text-slate-600 hover:text-white hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600'}`}
                        aria-label="Copy code to clipboard"
                    >
                        {copied ? (
                            <>
                                <CheckIcon className="h-4 w-4 text-emerald-400 animate-bounce" />
                                <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent hidden sm:inline font-bold">Copied!</span>
                            </>
                        ) : (
                            <>
                                <ClipboardDocumentIcon className="h-4 w-4" />
                                <span className="hidden sm:inline">Copy</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Code Display */}
            <div className={`flex-1 overflow-auto ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
                <SyntaxHighlighter
                    language={language || 'javascript'}
                    style={isDarkMode ? vscDarkPlus : vs}
                    customStyle={{
                        margin: 0,
                        padding: '1.5rem',
                        fontSize: `${FONT_SIZES[fontSizeIndex]}px`,
                        lineHeight: '1.6',
                        background: isDarkMode ? '#0f172a' : '#ffffff',
                        fontFamily: 'JetBrains Mono, Fira Code, Courier New, monospace',
                    }}
                    showLineNumbers
                    lineNumberStyle={{
                        minWidth: '3em',
                        paddingRight: '1em',
                        color: isDarkMode ? '#64748b' : '#94a3b8',
                        userSelect: 'none',
                    }}
                >
                    {code}
                </SyntaxHighlighter>
            </div>

            {/* Action Buttons */}
            <div className={`px-5 py-4 flex items-center gap-3 border-t ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <button
                    onClick={handleCopy}
                    className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-extrabold text-base transition-all duration-300 transform hover:scale-110 active:scale-90 shadow-xl group ${isDarkMode ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.8)]' : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white hover:shadow-[0_0_30px_rgba(99,102,241,0.8)]'}`}
                >
                    {copied ? (
                        <>
                            <CheckIcon className="h-6 w-6 animate-bounce" />
                            <span className="bg-gradient-to-r from-emerald-200 via-green-200 to-emerald-200 bg-clip-text text-transparent text-lg">Copied! ✓✓</span>
                        </>
                    ) : (
                        <>
                            <ClipboardDocumentIcon className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                            <span className="group-hover:tracking-wider transition-all duration-300">Copy to Clipboard 📋</span>
                        </>
                    )}
                </button>
                <button
                    onClick={handleDownload}
                    className={`flex items-center gap-2 px-5 py-4 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-125 hover:rotate-3 active:scale-95 group ${isDarkMode ? 'bg-slate-800 hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-600 text-slate-200 hover:text-white hover:shadow-[0_0_25px_rgba(16,185,129,0.8)]' : 'bg-slate-200 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 text-slate-700 hover:text-white hover:shadow-[0_0_25px_rgba(16,185,129,0.8)]'}`}
                    title="Download as file"
                >
                    <ArrowDownTrayIcon className="h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
                    <span className="hidden sm:inline">Download</span>
                </button>
                <button
                    onClick={toggleFavorite}
                    className={`flex items-center gap-2 px-5 py-4 rounded-xl font-bold text-base transition-all duration-300 transform hover:scale-125 hover:rotate-6 active:scale-95 group ${isFavorite ? 'bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 text-white shadow-xl shadow-pink-500/60 animate-pulse' : isDarkMode ? 'bg-slate-800 hover:bg-gradient-to-r hover:from-pink-600 hover:to-red-600 text-slate-400 hover:text-white hover:shadow-[0_0_25px_rgba(236,72,153,0.8)]' : 'bg-slate-200 hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 text-slate-600 hover:text-white hover:shadow-[0_0_25px_rgba(236,72,153,0.8)]'}`}
                    title="Add to favorites"
                >
                    {isFavorite ? (
                        <HeartIconSolid className="h-5 w-5 group-hover:scale-150 transition-transform duration-300" />
                    ) : (
                        <HeartIcon className="h-5 w-5 group-hover:fill-current transition-all duration-300" />
                    )}
                </button>
            </div>
        </div>
    );
}
