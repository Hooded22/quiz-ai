# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Quiz AI is a Next.js application built with TypeScript that provides AI-powered interview practice. Users can select from various technology roles and experience levels to receive randomized interview questions, answer them via text or voice, and receive AI-generated feedback using OpenAI's GPT models.

## Key Technologies

- **Framework**: Next.js 13.2.1 with App Router
- **Language**: TypeScript 4.9.5
- **UI**: React 18.2.0 with CSS Modules and Tailwind CSS
- **Authentication**: Supabase Auth with React Context
- **State Management**: Zustand for global state
- **AI Integration**: OpenAI API for question analysis and feedback
- **Testing**: Jest with React Testing Library
- **Voice Recognition**: react-speech-recognition

## Development Commands

```bash
# Development server
npm run dev
yarn dev

# Build for production
npm run build
yarn build

# Start production server
npm start
yarn start

# Linting
npm run lint
yarn lint

# Testing (watch mode)
npm run test
yarn test
```

## Environment Setup

Required environment variables in `.env.local`:
- `GPT_API_KEY`: OpenAI API key for AI functionality
- Supabase configuration variables (see utils/supabase/)

## Architecture

### Core Components Structure

- **Authentication**: Supabase-based auth with React Context (`contexts/AuthContext.tsx`)
- **State Management**: Zustand store for quiz results (`stores/quizStore.ts`)
- **Question Data**: JSON files in `/data/` directory organized by technology (react.json, javascript.json, etc.)
- **AI Integration**: OpenAI API calls in `pages/api/sendAIRequest.ts`

### Key Directories

- `/app/`: Next.js App Router pages and layouts
- `/components/`: Reusable React components with CSS Modules
- `/data/`: Interview question JSON files categorized by technology
- `/constants/`: Configuration files for roles, feature flags, and question mappings
- `/types/`: TypeScript type definitions
- `/utils/`: Utility functions and Supabase client setup

### Question System

Questions are stored in JSON format with structure:
```typescript
{
  "id": string,
  "title": string,
  "answer": string,
  "level": "junior" | "mid" | "senior",
  "category": string
}
```

### Voice Recognition

The app uses `react-speech-recognition` for voice input in the `RecordButton` component, allowing users to speak their answers instead of typing.

### Styling

- CSS Modules for component-specific styles
- Tailwind CSS for utility classes
- Custom font configuration in `styles/fonts/`

## Testing

Tests are configured with Jest and React Testing Library. Example test file: `components/MakeAnswerForm/index.test.tsx`.

## Key Features

1. **Role-based Questions**: Users select from predefined roles (React, Node.js, DevOps, etc.)
2. **Seniority Levels**: Questions filtered by experience level (junior, mid, senior)
3. **AI Feedback**: OpenAI integration provides detailed feedback on user answers
4. **Voice Input**: Speech-to-text functionality for answering questions
5. **Authentication**: User registration and login with Supabase
6. **Interview Summary**: Results tracking and display

## Business plan for feature developnet

### Landing page
Copy / structure
• Headline: “Ace your next ___ interview with 10-minute AI-powered mock sessions.”
• Sub-headline: “Real voice Q&A, instant grading, role-specific question banks.”
• Three benefit bullets (pick wording that fits your niche):
– Realistic: Speak or type, just like a real interviewer.
– Immediate feedback: GPT evaluates depth & correctness, points to missing areas.
– Focused prep: We pull questions only for the exact role/stack you choose.
• 30-sec GIF / Loom that shows the flow.
• Single e-mail field + optional “target role” drop-down.
• Social proof placeholder (“Used by devs from ____”) you’ll fill later.

Tech
• Host on the same Vercel project so you keep one repo.
• Add Google Analytics or Posthog + a “utm_source” parser so you later see which promotion channel sent sign-ups.

Legal must-haves
• Tiny privacy note: “We’ll only use your e-mail to invite you to the beta.”
• Copyright disclaimer that you own/provide all practice questions.
