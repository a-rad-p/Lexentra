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

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

### 📁 **Folder Hierarchies**

- Organize documents in nested folder structures```js

- Visual breadcrumb navigationexport default defineConfig([

- Easy folder creation and management  globalIgnores(['dist']),

- Color-coded folders for better organization  {

    files: ['**/*.{ts,tsx}'],

### 🏷️ **Smart Tagging System**    extends: [

- Create and assign multiple tags to documents      // Other configs...

- Color-coded tags for quick identification

- Filter documents by tags      // Remove tseslint.configs.recommended and replace with this

- Tag-based document categorization      tseslint.configs.recommendedTypeChecked,

      // Alternatively, use this for stricter rules

### 👥 **Access Control & Sharing**      tseslint.configs.strictTypeChecked,

- Share documents with team members      // Optionally, add this for stylistic rules

- Role-based access levels (Owner, Editor, Viewer)      tseslint.configs.stylisticTypeChecked,

- Track who has access to each document

- Generate shareable links      // Other configs...

    ],

### 📄 **Document Preview**    languageOptions: {

- In-app document preview for supported formats      parserOptions: {

- View document metadata and details        project: ['./tsconfig.node.json', './tsconfig.app.json'],

- Quick access to document actions        tsconfigRootDir: import.meta.dirname,

- Version tracking      },

      // other options...

### 📊 **Activity Tracking**    },

- Real-time activity log  },

- Track uploads, edits, shares, and deletions])

- User attribution for all actions```



### ⭐ **Favorites & Quick Access**You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

- Mark important documents as favorites

- Quick access to frequently used documents```js

- Shared documents view// eslint.config.js

import reactX from 'eslint-plugin-react-x'

### 🎨 **Modern UI/UX**import reactDom from 'eslint-plugin-react-dom'

- Clean and intuitive interface

- Responsive design for all devicesexport default defineConfig([

- Dark-themed sidebar with gradient accents  globalIgnores(['dist']),

- Smooth animations and transitions  {

    files: ['**/*.{ts,tsx}'],

### 💾 **Local Storage**    extends: [

- All data persisted in browser localStorage      // Other configs...

- No backend required      // Enable lint rules for React

- Privacy-focused      reactX.configs['recommended-typescript'],

      // Enable lint rules for React DOM

## 🚀 Getting Started      reactDom.configs.recommended,

    ],

### Prerequisites    languageOptions: {

      parserOptions: {

- Node.js 18+ and npm        project: ['./tsconfig.node.json', './tsconfig.app.json'],

- Modern web browser        tsconfigRootDir: import.meta.dirname,

      },

### Installation      // other options...

    },

1. **Clone the repository**  },

```bash])

git clone https://github.com/yourusername/Lexentra.git```

cd Lexentra
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deploy to GitHub Pages

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Add deploy script to `package.json`**
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

3. **Deploy**
```bash
npm run deploy
```

4. **Configure GitHub Pages**
   - Go to repository settings → Pages
   - Select `gh-pages` branch
   - Your site will be live at `https://yourusername.github.io/Lexentra/`

## 📚 Tech Stack

- **Frontend**: React 18 + TypeScript 5
- **Build Tool**: Vite 6
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Storage**: Browser localStorage

## 🎯 Key Components

- `Sidebar` - Navigation and quick actions
- `SearchBar` - Advanced search with filters
- `DocumentCard` - Document display with actions
- `DocumentPreview` - Full document preview modal
- `ShareModal` - Document sharing interface
- `UploadModal` - Drag-and-drop file upload
- `FolderView` - Folder navigation and display

## 📖 Usage Guide

### Uploading Documents
1. Click "Upload" in sidebar
2. Drag and drop file or browse
3. Add folder, description, and tags (optional)
4. Click "Upload Document"

### Creating Folders
1. Click "New Folder" in sidebar
2. Enter folder name

### Searching Documents
1. Use search bar at top
2. Click filter icon for advanced options
3. Filter by type, tags, or sort order

### Sharing Documents
1. Click share icon on document card
2. Select user and access level
3. Click "Share" or copy link

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/)
- Powered by [React](https://reactjs.org/)

---

Made with ❤️ for better document management
