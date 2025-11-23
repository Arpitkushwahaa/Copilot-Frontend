# Code Copilot - AI-Powered Code Generator

![Code Copilot UI](https://raw.githubusercontent.com/Arpitkushwahaa/Copilot-frontend/main/screenshot.png)

A modern, immersive web application for AI-powered code generation with a beautiful glassmorphism UI inspired by GitHub Copilot, Replit, and VSCode.

![React](https://img.shields.io/badge/React-19.2.0-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan) ![Vite](https://img.shields.io/badge/Vite-7.2.4-purple)

## 🚀 Features

- **AI Code Generation** - Generate code in 10+ programming languages using Google Gemini AI
- **Syntax Highlighting** - Professional code display with VSCode Dark+ and Light themes
- **Dark/Light Mode** - Seamless theme switching with persistent preferences
- **Code History** - Track and revisit generated code with search and filtering
- **Copy/Download/Favorites** - Export and bookmark code snippets
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Immersive UI** - Animated gradients, glassmorphism, and smooth transitions

## 📁 Project Structure

```
MiniCode-Copilot-main/
├── frontend/                 # React + Vite frontend
├── backend/                  # Node.js + Express backend
│   ├── index.js             # API server with Gemini AI
│   └── package.json
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx       # Navigation bar
│   │   ├── PromptInput.jsx  # Input form
│   │   ├── CodeOutput.jsx   # Code display
│   │   ├── HistoryPanel.jsx # History sidebar
│   │   └── WarningPopup.jsx # Validation modal
│   ├── pages/
│   │   └── Home.jsx         # Main page
│   ├── utils/
│   │   ├── api.js           # API client
│   │   └── promptCheck.js   # Prompt validation
│   └── styles/
│       └── global.css
└── README.md
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 16+
- npm
- Google Gemini API key

### Backend Setup
```bash
cd backend
npm install
```

Create `.env`:
```env
GEMINI_API_KEY=your_api_key_here
PORT=3001
```

Start backend:
```bash
npm start
```

### Frontend Setup
```bash
npm install
npm run dev
```

App runs on `http://localhost:5173`

## 🏗️ Architecture Decisions

**Frontend:**
- **React + Vite** - Fast development with HMR
- **TailwindCSS** - Utility-first styling with custom theme
- **react-syntax-highlighter** - Professional code display with Prism
- **LocalStorage** - Persistent theme and history

**Backend:**
- **Express.js** - Lightweight REST API
- **Google Gemini AI** - Advanced code generation
- **CORS enabled** - Cross-origin support

**Design System:**
- Custom color palette for dark/light modes
- Gradient animations and glassmorphism effects
- 40/60 split layout (input/output)
- Inter font (UI) + JetBrains Mono (code)

## 📡 API Example

**Endpoint:** `POST http://localhost:3001/api/generate`

**Request:**
```json
{
  "prompt": "Create a Python function to calculate fibonacci numbers",
  "language": "python"
}
```

**Response:**
```json
{
  "code": "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)"
}
```

## 🎯 Future Improvements

**If I had more time:**

1. **User Authentication** - Save history across devices
2. **Code Execution** - Run code in browser with sandboxing
3. **Multi-file Projects** - Generate entire project structures
4. **Code Explanations** - AI-powered analysis and docs
5. **Collaboration** - Share snippets with team
6. **Version Control** - Track code iterations
7. **AI Model Selection** - GPT-4, Claude, etc.
8. **Code Templates** - Pre-built patterns
9. **Diff View** - Compare versions
10. **GitHub Export** - Direct repo creation

## 🔧 Technologies Used

- React 18
- Vite
- TailwindCSS
- Heroicons
- Express.js
- Google Gemini AI
- Prism Syntax Highlighter

---

Built with ❤️ using React and AI
