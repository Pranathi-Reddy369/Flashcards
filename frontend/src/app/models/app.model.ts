// 🔵 Core Flashcard Models

// app.model.ts
export interface FlashcardSet {
  _id?: string; // 👈 Add this line
  title: string;
  description: string;
  tags?: string[];
  createdBy?: string;
  lastReviewed?: string;
  cards: Flashcard[];
  videos?: VideoResource[];
  resources?: ExternalResource[];
  quizzes?: QuizQuestion[];
  doubts?: DoubtThread[];
}


export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  favorite?: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isReviewed?: boolean;
}

// 🔗 Learning Extensions

export interface VideoResource {
  title: string;
  url: string;
  duration: string; // Format: e.g., "12:34"
}

export interface ExternalResource {
  title: string;
  link: string;
  type: 'Article' | 'Cheat Sheet' | 'Docs' | 'Tool';
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}
export interface DoubtThread {
  _id?: string;            // MongoDB ID, optional when creating a new doubt
  setId: string;
  user: string;
  question: string;
  upvotes: number;
  likedByUser?: boolean;   // Track if the user liked the doubt
  responses: Response[];
}


export interface Response {
  user: string;
  answer: string;
}

export interface Bookmark {
  _id?: string;               // MongoDB id, optional on create, present on fetch
  setId: string;              // The flashcard set this bookmark belongs to
  cardId: number;             // The card id inside the set
  question: string;
  answer: string;
}

// 👤 User & Auth Models

export interface User {
  _id?: string;
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string; // frontend use only
  joined: string;
  gender: string;
}

// ⭐ Feedback & Issues

export interface Feedback {
  id?: number;
  name: string;
  email: string;
  message: string;
  rating: number; // 1–5 stars
  date: string;   // ISO format
}

export interface Issue {
  id?: number;
  message: string;
  date: string;   // ISO format
}

// 🎁 Referrals & Rewards

export interface Referral {
  id: number;
  referredBy: string;      // referral code of inviter
  referredUser: string;    // email or ID of invited
  date: string;
  avatar?: string;
  name?: string;
  referrals?: number;      // how many people they referred
}

export interface UserRewards {
  referralCode: string;
  rewards: {
    amazonVoucher: number;
    plusMonths: number;
  };
}

// 🔥 Activity & Streaks

export interface DailyActivity {
  id?: number;
  date: string; // Format: YYYY-MM-DD
  minutesWatched: number;
  questionsAttempted: number;
}

export interface StreakStats {
  currentStreak: number;
  longestStreak: number;
}
export interface Contact {
  _id?: string;         // 🔁 changed from id → _id
  name: string;
  email: string;
  message: string;
}

