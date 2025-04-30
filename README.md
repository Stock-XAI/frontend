# Stock-XAI Frontend

## Environment
- node: 22.13.0
- React: 19.0.0

## Tools
- Language: TypeScript
- Style: Styled-Components
- Build: Vite
- Server State Management: Tanstack Query

## Structure
```
frontend/
├── api/                    # Code for API-related communication
├── assets/                 # Static image files and SVGs
├── components/             # Reusable common components
├── constants/              # Centralized constant values
├── hooks/                  # Custom React hooks
├── pages/                  # Page-level components and routes
├── styles/                 # Global styles using styled-components
├── types/                  # TypeScript type definitions
├── utils/                  # Common utility functions
├── App.tsx                 # Root component with route and provider setup
├── index.tsx              # Entry point of the React application
└── tsconfig.json           # TypeScript configuration
```

## Implementation
1. Git Clone
```
git clone https://github.com/Stock-XAI/frontend.git
```

2. Active node version
```
nvm use
```
If the specified version is not available, install and activate version 22.13.0 using nvm.
```
nvm install 22.13.0
nvm use
```
If nvm is not available, you need to install Node.js version 22.13.0 separately.


3. Install libraries
```
npm install
```

4. Create .env file at root directory (frontend)
```
VITE_API_URL=http://localhost:8000
```
You can enter the backend URL here.

5. Run
```
npm run dev
```
If you see a screen like the one below, the application has been successfully launched!

![image](https://github.com/user-attachments/assets/b9468c5b-012c-4ee9-a461-49a382319df8)
