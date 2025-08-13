export interface FlashcardSet {
  _id?: string; 
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



export interface VideoResource {
  title: string;
  url: string;
  duration: string;}

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
  _id?: string;            
  setId: string;
  user: string;
  question: string;
  upvotes: number;
  likedByUser?: boolean;   
  responses: Response[];
}


export interface Response {
  user: string;
  answer: string;
}

export interface Bookmark {
  _id?: string;               
  setId: string;              
  cardId: number;             
  question: string;
  answer: string;
}


export interface User {
  _id?: string;
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  joined: string;
  gender: string;
}



export interface Feedback {
  id?: number;
  name: string;
  email: string;
  message: string;
  rating: number; 
  date: string;   
}

export interface Issue {
  id?: number;
  message: string;
  date: string;   
}



export interface Referral {
  id: number;
  referredBy: string;      
  referredUser: string;    
  date: string;
  avatar?: string;
  name?: string;
  referrals?: number;      
}

export interface UserRewards {
  referralCode: string;
  rewards: {
    amazonVoucher: number;
    plusMonths: number;
  };
}



export interface DailyActivity {
  id?: number;
  date: string; 
  minutesWatched: number;
  questionsAttempted: number;
}

export interface StreakStats {
  currentStreak: number;
  longestStreak: number;
}
export interface Contact {
  _id?: string;         
  name: string;
  email: string;
  message: string;
}

