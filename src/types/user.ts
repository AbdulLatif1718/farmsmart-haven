
export type UserRole = 'farmer' | 'investor' | 'landowner';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  bio?: string;
  location?: string;
  profileImage?: string;
  verified: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface FarmerProfile extends UserProfile {
  role: 'farmer';
  expertise: string[];
  yearsOfExperience: number;
  previousProjects?: number;
  successRate?: number;
}

export interface InvestorProfile extends UserProfile {
  role: 'investor';
  investmentPreferences?: string[];
  totalInvested?: number;
  activeInvestments?: number;
}

export interface LandownerProfile extends UserProfile {
  role: 'landowner';
  totalLandArea?: number;
  landLocations?: string[];
  activeLeasedLands?: number;
}
