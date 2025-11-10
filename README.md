# Lexentra - Modern Document Management System# React + TypeScript + Vite



![Lexentra](https://img.shields.io/badge/Lexentra-DMS-blue?style=for-the-badge)This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)

[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)Currently, two official plugins are available:

[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

A modern, intuitive, and feature-rich Document Management System built with React, TypeScript, and Vite. Lexentra helps individuals and teams manage their documents efficiently with AI-powered search, smart tagging, folder hierarchies, and access control.- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



## ✨ Features## React Compiler



### 🔍 **AI-Powered Search**The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

- Intelligent search across document names, descriptions, and tags

- Advanced filtering by document type, tags, date range, and creator## Expanding the ESLint configuration

- Multiple sorting options (relevance, date, name, size)


If you are developing a production application, consider enabling type-aware ESLint rules and reviewing `eslint.config.js` to match your team's coding standards.

### 📁 Folder Hierarchies

- Organize documents in nested folder structures
- Visual breadcrumb navigation for easy traversal
- Quick folder creation and management
- Color-coded folders for better organization

### 🏷️ Smart Tagging System

- Create and assign multiple tags to documents
- Color-coded tags for quick identification
- Filter and group documents by tags

### 👥 Access Control & Sharing

- Share documents with team members
- Role-based access levels (Owner, Editor, Viewer)
- Generate shareable links and manage permissions

# Lexentra — Modern Document Management System

![Lexentra](https://img.shields.io/badge/Lexentra-DMS-blue?style=for-the-badge)

A modern, intuitive, and feature-rich Document Management System built with React, TypeScript, and Vite. Lexentra helps individuals and teams manage documents efficiently with AI-powered search, smart tagging, folder hierarchies, and access control.

Badges

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)

## ✨ Features

- 🔍 AI-powered search across document names, descriptions, and tags
- 📁 Folder hierarchies with nested folders and breadcrumb navigation
- �️ Smart tagging system with color-coded tags and tag-based filtering
- 👥 Access control and sharing (Owner / Editor / Viewer roles)
- 📄 In-app document preview for supported formats
- 📊 Activity tracking (uploads, edits, shares, deletions)
- ⭐ Favorites and quick access
- 🎨 Modern, responsive UI/UX
- 💾 Data persisted to browser `localStorage` (no backend required for demo)

## 🚀 Getting Started

Prerequisites

- Node.js 18+ and npm
- A modern web browser

Installation

1. Clone the repository:

```powershell
git clone https://github.com/yourusername/Lexentra.git
cd Lexentra
```

2. Install dependencies:

```powershell
npm install
```

3. Start the development server:

```powershell
npm run dev
```

4. Open in your browser:

Navigate to `http://localhost:5173` (or the URL shown in the terminal).
# Lexentra — Modern Document Management System

![Lexentra](https://img.shields.io/badge/Lexentra-DMS-blue?style=for-the-badge)

A modern, intuitive, and feature-rich Document Management System built with React, TypeScript, and Vite. Lexentra helps individuals and teams manage documents efficiently with AI-powered search, smart tagging, folder hierarchies, and access control.

Badges

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)

## ✨ Features

- 🔍 AI-powered search across document names, descriptions, and tags
- 📁 Folder hierarchies with nested folders and breadcrumb navigation
- 🏷️ Smart tagging system with color-coded tags and tag-based filtering
- 👥 Access control and sharing (Owner / Editor / Viewer roles)
- 📄 In-app document preview for supported formats
- 📊 Activity tracking (uploads, edits, shares, deletions)
- ⭐ Favorites and quick access
- 🎨 Modern, responsive UI/UX
- 💾 Data persisted to browser `localStorage` (no backend required for demo)

## 🚀 Getting Started

Prerequisites

- Node.js 18+ and npm
- A modern web browser

Installation

1. Clone the repository:

```powershell
git clone https://github.com/yourusername/Lexentra.git
cd Lexentra
```

2. Install dependencies:

```powershell
npm install
```

3. Start the development server:

```powershell
npm run dev
```

4. Open in your browser:

Navigate to `http://localhost:5173` (or the URL shown in the terminal).

### Building for production

```powershell
npm run build
```

### Preview production build

```powershell
npm run preview
```

## 🌐 Deploy to GitHub Pages

1. Install `gh-pages` (dev dependency):

```powershell
npm install --save-dev gh-pages
```

2. Add a `deploy` script to `package.json` (example):

```json
{
    "scripts": {
        "deploy": "npm run build && gh-pages -d dist"
    }
}
```

3. Deploy:

```powershell
npm run deploy
```

4. Configure GitHub Pages in repository Settings → Pages and choose the `gh-pages` branch.

Your site will be available at `https://yourusername.github.io/Lexentra/`.

## 📚 Tech Stack

- Frontend: React 18 + TypeScript 5
- Build tool: Vite 6
- Icons: Lucide React
- Date handling: date-fns
- Storage: Browser `localStorage`

## 🎯 Key Components

- `Sidebar` — Navigation and quick actions
- `SearchBar` — Advanced search with filters

# Lexentra — Modern Document Management System

![Lexentra](https://img.shields.io/badge/Lexentra-DMS-blue?style=for-the-badge)

A modern, intuitive, and feature-rich Document Management System built with React, TypeScript, and Vite. Lexentra helps individuals and teams manage documents efficiently with AI-powered search, smart tagging, folder hierarchies, and access control.

Badges

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)

## ✨ Features

- 🔍 AI-powered search across document names, descriptions, and tags
- 📁 Folder hierarchies with nested folders and breadcrumb navigation
- 🏷️ Smart tagging system with color-coded tags and tag-based filtering
- 👥 Access control and sharing (Owner / Editor / Viewer roles)
- 📄 In-app document preview for supported formats
- 📊 Activity tracking (uploads, edits, shares, deletions)
- ⭐ Favorites and quick access
- 🎨 Modern, responsive UI/UX
- 💾 Data persisted to browser `localStorage` (no backend required for demo)

## 🚀 Getting Started

Prerequisites

- Node.js 18+ and npm
- A modern web browser

Installation

1. Clone the repository:

```powershell
git clone https://github.com/yourusername/Lexentra.git
cd Lexentra
```

2. Install dependencies:

```powershell
npm install
```

3. Start the development server:

```powershell
npm run dev
```

4. Open in your browser:

Navigate to `http://localhost:5173` (or the URL shown in the terminal).

### Building for production

```powershell
npm run build
```

### Preview production build

```powershell
npm run preview
```

## 🌐 Deploy to GitHub Pages

1. Install `gh-pages` (dev dependency):

```powershell
npm install --save-dev gh-pages
```

2. Add a `deploy` script to `package.json` (example):

```json
{
    "scripts": {
        "deploy": "npm run build && gh-pages -d dist"
    }
}
```

3. Deploy:

```powershell
npm run deploy
```

4. Configure GitHub Pages in repository Settings → Pages and choose the `gh-pages` branch.

Your site will be available at `https://yourusername.github.io/Lexentra/`.

## 📚 Tech Stack

- Frontend: React 18 + TypeScript 5
- Build tool: Vite 6
- Icons: Lucide React
- Date handling: date-fns
- Storage: Browser `localStorage`

## 🎯 Key Components

- `Sidebar` — Navigation and quick actions
- `SearchBar` — Advanced search with filters
- `DocumentCard` — Document display with actions
- `DocumentPreview` — Full document preview modal
- `ShareModal` — Document sharing interface
- `UploadModal` — Drag-and-drop file upload
- `FolderView` — Folder navigation and display

## 📖 Usage Guide

Uploading Documents

1. Click "Upload" in the sidebar
2. Drag and drop a file or browse
3. Add folder, description, and tags (optional)
4. Click "Upload Document"

Creating Folders

1. Click "New Folder" in the sidebar
2. Enter a folder name

Searching Documents

1. Use the search bar at the top
2. Click the filter icon for advanced options
3. Filter by type, tags, date range, or sort order

Sharing Documents

1. Click the share icon on a document card
2. Select user and access level
3. Click "Share" or copy the generated link

## 🤝 Contributing

Contributions are welcome — please open a Pull Request with a clear description of your change.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/)
- Powered by [React](https://reactjs.org/)

---

Made with ❤️ for better document management

