
import { UserProfile } from './user';

export type ProjectStatus = 'draft' | 'open' | 'funded' | 'in_progress' | 'completed' | 'cancelled';
export type ProjectType = 'crop' | 'livestock' | 'mixed';
export type AgreementType = 'profit_sharing' | 'land_leasing' | 'livestock_management';

export interface ProjectListing {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  status: ProjectStatus;
  creator: UserProfile;
  location: string;
  fundingGoal: number;
  fundingRaised: number;
  duration: number; // in months
  expectedRoi: number; // percentage
  riskLevel: 'low' | 'medium' | 'high';
  agreementType: AgreementType;
  agreementTerms: {
    farmerShare?: number; // percentage
    investorShare?: number; // percentage
    leaseAmount?: number; // fixed amount
    leaseType?: 'fixed' | 'percentage';
    managementFee?: number;
  };
  tags: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LandListing {
  id: string;
  title: string;
  description: string;
  owner: UserProfile;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  size: number; // in acres
  soilType: string;
  waterSource: string[];
  availableFrom: string;
  availableTo?: string;
  pricePerMonth: number;
  leaseTerms: {
    minDuration: number; // in months
    maxDuration?: number; // in months
    paymentFrequency: 'monthly' | 'quarterly' | 'yearly';
    revenueSharingOption: boolean;
    revenueSharingPercentage?: number;
  };
  images: string[];
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LivestockListing {
  id: string;
  title: string;
  description: string;
  farmer: UserProfile;
  location: string;
  animalType: string;
  capacity: number;
  costPerAnimal: number;
  duration: number; // in months
  careDetails: string;
  expectedReturns: {
    growthRate: number;
    mortalityRate: number;
    projectedValue: number;
  };
  images: string[];
  createdAt: string;
  updatedAt: string;
}
