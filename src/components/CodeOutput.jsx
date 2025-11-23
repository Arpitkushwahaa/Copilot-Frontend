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
            <div className={`modern-card p-6 h-full min-h-[500px] flex items-center justify-center ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} transition-all duration-200`}>
                <div className="text-center">
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
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-lg uppercase tracking-wide shadow-md">
                        {language || 'code'}
                    </span>
                    <h3 className={`text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        Generated Code
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
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-sm font-medium ${isDarkMode ? 'text-slate-300 hover:text-slate-100 hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
                        aria-label="Copy code to clipboard"
                    >
                        {copied ? (
                            <>
                                <CheckIcon className="h-4 w-4 text-emerald-500" />
                                <span className="text-emerald-500 hidden sm:inline">Copied!</span>
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
            <div className={`px-5 py-3 flex items-center gap-2 border-t ${isDarkMode ? 'bg-slate-900/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
                <button
                    onClick={handleCopy}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
                >
                    {copied ? (
                        <>
                            <CheckIcon className="h-4 w-4" />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <ClipboardDocumentIcon className="h-4 w-4" />
                            <span>Copy to Clipboard</span>
                        </>
                    )}
                </button>
                <button
                    onClick={handleDownload}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'}`}
                    title="Download as file"
                >
                    <ArrowDownTrayIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">Download</span>
                </button>
                <button
                    onClick={toggleFavorite}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-200 hover:bg-slate-300'} ${isFavorite ? 'text-red-500' : isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}
                    title="Add to favorites"
                >
                    {isFavorite ? (
                        <HeartIconSolid className="h-4 w-4" />
                    ) : (
                        <HeartIcon className="h-4 w-4" />
                    )}
                </button>
            </div>
        </div>
    );
}
