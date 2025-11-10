# Lexentra - Document Management System

## Project Overview
Modern, Vite-based Document Management System with React and TypeScript featuring:
- Document upload and organization
- AI-powered search
- Tagging and filtering
- Folder hierarchies
- Access control
- Document preview
- Responsive UI/UX

## Development Status
✅ **Project Complete!**

All features have been successfully implemented:
- [x] Project scaffolding with Vite + React + TypeScript
- [x] All dependencies installed
- [x] Complete project structure created
- [x] Core DMS features implemented
- [x] Mock data and responsive styling
- [x] GitHub Pages configuration
- [x] Build tested successfully

## Project Structure
```
Lexentra/
├── src/
│   ├── components/          # React components
│   │   ├── Sidebar.tsx      # Navigation sidebar
│   │   ├── SearchBar.tsx    # Advanced search
│   │   ├── DocumentCard.tsx # Document display
│   │   ├── DocumentPreview.tsx # Preview modal
│   │   ├── ShareModal.tsx   # Sharing interface
│   │   ├── UploadModal.tsx  # File upload
│   │   └── FolderView.tsx   # Folder navigation
│   ├── hooks/
│   │   └── useLocalStorage.ts # Data persistence
│   ├── utils/
│   │   └── helpers.ts       # Utility functions
│   ├── types/
│   │   └── index.ts         # TypeScript definitions
│   ├── data/
│   │   └── mockData.ts      # Demo data
│   ├── App.tsx              # Main component
│   └── main.tsx             # Entry point
├── public/                  # Static assets
└── README.md               # Documentation
```

## Technology Stack
- **Frontend**: React 18 + TypeScript 5
- **Build Tool**: Vite 6
- **Icons**: Lucide React
- **Date Formatting**: date-fns
- **Storage**: Browser localStorage

## Development Commands
```bash
npm run dev      # Start dev server (http://localhost:5173/Lexentra/)
npm run build    # Build for production
npm run preview  # Preview production build
npm run deploy   # Deploy to GitHub Pages (requires gh-pages package)
```

## Key Features
1. ✅ **Document Management** - Upload, view, edit, delete
2. ✅ **AI-Powered Search** - Intelligent search with filters
3. ✅ **Folder Hierarchies** - Nested folders with navigation
4. ✅ **Smart Tagging** - Color-coded tags
5. ✅ **Access Control** - Share with role-based permissions
6. ✅ **Document Preview** - In-app preview
7. ✅ **Activity Tracking** - Comprehensive activity log
8. ✅ **Favorites** - Star important documents
9. ✅ **Responsive UI** - Mobile-friendly design

## Deployment to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Deploy:
```bash
npm run deploy
```

3. Configure GitHub Pages:
   - Go to repository Settings → Pages
   - Select `gh-pages` branch
   - Save

Your site will be live at: `https://[username].github.io/Lexentra/`

## Development Server
Currently running at: http://localhost:5173/Lexentra/
