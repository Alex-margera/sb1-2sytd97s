```typescript
export interface UserState {
  matchPoints: number;
  stars: number;
  lastMatchPointsReset: number;
}

export interface UserActions {
  setMatchPoints: (points: number) => void;
  setStars: (stars: number) => void;
  deductStars: (amount: number) => boolean;
  addMatchPoints: (points: number) => void;
  addStars: (amount: number) => void;
  resetMatchPoints: () => void;
  checkAndResetDailyPoints: () => void;
}

export interface UserDetails {
  name: string;
  gender: 'male' | 'female' | 'other' | null;
  age: number | null;
}

export interface WelcomeScreenProps {
  userDetails: UserDetails;
  onUserDetailsChange: (details: Partial<UserDetails>) => void;
  onContinue: () => void;
}
```