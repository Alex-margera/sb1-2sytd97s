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