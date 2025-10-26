# 🧩 Loops

**Close your open loops. Reclaim your mental energy.**

Loops is a productivity and awareness web app that helps you identify, track, and close your open mental loops — unfinished thoughts, tasks, and mental to-dos that drain focus and energy.

## 🎯 Features

- **Create & Manage Loops**: Add loops, edit them, and mark them open or closed
- **Visual Dashboard**: See all open loops with timestamps and status
- **Local Storage**: Your data is saved in the browser
- **Minimal UI**: Clean, calming interface with smooth animations
- **Mental Energy Tracking**: Track how many loops you've closed

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: React State with localStorage persistence
- **Icons**: Lucide React

## 📦 Project Structure

```
app/
  page.tsx          # Main application page
  layout.tsx        # Root layout
  globals.css       # Global styles

components/
  loop-card.tsx     # Individual loop card component

lib/
  hooks/
    use-loops.ts    # Custom hook for loop management
  utils.ts          # Utility functions

types/
  loop.ts           # TypeScript interfaces for loops
```

## 🗺️ Roadmap

- **Phase 1** ✅: Core UI & Local State (MVP) - Current
- **Phase 2**: Backend Integration (PostgreSQL + Prisma + BetterAuth)
- **Phase 3**: Realtime & AI Layer (WebSockets + Gemini API)
- **Phase 4**: Analytics & Refinement

## 💡 Concept

Based on [David Allen's Getting Things Done methodology](https://gettingthingsdone.com/), "open loops" are anything that's incomplete in your life and drains your mental energy. This app helps you:

1. Capture everything on your mind
2. Visualize your open loops
3. Close them intentionally
4. Reclaim your focus and mental energy

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
