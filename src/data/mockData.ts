
import { FarmerProfile, InvestorProfile, LandownerProfile } from '../types/user';
import { ProjectListing, LandListing, LivestockListing } from '../types/project';

// Sample Users
export const sampleFarmers: FarmerProfile[] = [
  {
    id: '1',
    email: 'john@example.com',
    fullName: 'John Mensah',
    role: 'farmer',
    bio: 'Experienced maize and cassava farmer with over 15 years in sustainable farming practices.',
    location: 'Kumasi, Ghana',
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    verified: true,
    rating: 4.8,
    reviewCount: 32,
    expertise: ['Maize', 'Cassava', 'Sustainable Farming'],
    yearsOfExperience: 15,
    previousProjects: 24,
    successRate: 92,
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-11-10T00:00:00Z'
  },
  {
    id: '2',
    email: 'amara@example.com',
    fullName: 'Amara Osei',
    role: 'farmer',
    bio: 'Poultry and livestock specialist focusing on organic methods and high welfare standards.',
    location: 'Tamale, Ghana',
    profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    verified: true,
    rating: 4.6,
    reviewCount: 18,
    expertise: ['Poultry', 'Livestock', 'Organic Farming'],
    yearsOfExperience: 8,
    previousProjects: 12,
    successRate: 85,
    createdAt: '2023-03-22T00:00:00Z',
    updatedAt: '2023-10-05T00:00:00Z'
  }
];

export const sampleInvestors: InvestorProfile[] = [
  {
    id: '3',
    email: 'kwame@example.com',
    fullName: 'Kwame Asante',
    role: 'investor',
    bio: 'Angel investor with special interest in agricultural innovation and sustainable farming projects.',
    location: 'Accra, Ghana',
    profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    verified: true,
    rating: 4.9,
    reviewCount: 7,
    investmentPreferences: ['Crop Production', 'AgTech', 'Sustainable Agriculture'],
    totalInvested: 150000,
    activeInvestments: 4,
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2023-11-15T00:00:00Z'
  },
  {
    id: '4',
    email: 'fatima@example.com',
    fullName: 'Fatima Ibrahim',
    role: 'investor',
    bio: 'Investment manager specializing in agricultural portfolios across West Africa.',
    location: 'Tema, Ghana',
    profileImage: 'https://randomuser.me/api/portraits/women/4.jpg',
    verified: true,
    rating: 4.7,
    reviewCount: 11,
    investmentPreferences: ['Livestock', 'Export Crops', 'Value Chain'],
    totalInvested: 320000,
    activeInvestments: 7,
    createdAt: '2022-11-05T00:00:00Z',
    updatedAt: '2023-10-20T00:00:00Z'
  }
];

export const sampleLandowners: LandownerProfile[] = [
  {
    id: '5',
    email: 'kofi@example.com',
    fullName: 'Kofi Adu',
    role: 'landowner',
    bio: 'Third-generation landowner with fertile lands near water sources, ideal for year-round farming.',
    location: 'Ho, Ghana',
    profileImage: 'https://randomuser.me/api/portraits/men/5.jpg',
    verified: true,
    rating: 4.5,
    reviewCount: 9,
    totalLandArea: 50,
    landLocations: ['Ho', 'Kpando'],
    activeLeasedLands: 2,
    createdAt: '2023-01-30T00:00:00Z',
    updatedAt: '2023-09-15T00:00:00Z'
  },
  {
    id: '6',
    email: 'ama@example.com',
    fullName: 'Ama Darko',
    role: 'landowner',
    bio: 'Owner of premium agricultural land with modern irrigation systems already in place.',
    location: 'Cape Coast, Ghana',
    profileImage: 'https://randomuser.me/api/portraits/women/6.jpg',
    verified: true,
    rating: 4.4,
    reviewCount: 6,
    totalLandArea: 35,
    landLocations: ['Cape Coast', 'Elmina'],
    activeLeasedLands: 1,
    createdAt: '2023-04-12T00:00:00Z',
    updatedAt: '2023-10-28T00:00:00Z'
  }
];

// Sample Project Listings
export const sampleProjects: ProjectListing[] = [
  {
    id: '1',
    title: 'Sustainable Maize Production',
    description: 'A 6-month project to grow high-yield, drought-resistant maize varieties using organic farming methods.',
    type: 'crop',
    status: 'open',
    creator: sampleFarmers[0],
    location: 'Kumasi, Ghana',
    fundingGoal: 15000,
    fundingRaised: 5000,
    duration: 6,
    expectedRoi: 25,
    riskLevel: 'medium',
    agreementType: 'profit_sharing',
    agreementTerms: {
      farmerShare: 70,
      investorShare: 30
    },
    tags: ['Maize', 'Organic', 'Sustainable'],
    images: ['https://images.unsplash.com/photo-1595312685837-918b9782c683'],
    createdAt: '2023-11-01T00:00:00Z',
    updatedAt: '2023-11-05T00:00:00Z'
  },
  {
    id: '2',
    title: 'Free-Range Poultry Farm',
    description: 'Establishing a free-range poultry farm with capacity for 1000 birds. Focus on organic feed and high welfare standards.',
    type: 'livestock',
    status: 'open',
    creator: sampleFarmers[1],
    location: 'Tamale, Ghana',
    fundingGoal: 25000,
    fundingRaised: 12500,
    duration: 12,
    expectedRoi: 35,
    riskLevel: 'medium',
    agreementType: 'profit_sharing',
    agreementTerms: {
      farmerShare: 65,
      investorShare: 35
    },
    tags: ['Poultry', 'Free-Range', 'Organic'],
    images: ['https://images.unsplash.com/photo-1569597967185-cd6120712154'],
    createdAt: '2023-10-15T00:00:00Z',
    updatedAt: '2023-11-10T00:00:00Z'
  },
  {
    id: '3',
    title: 'Cassava Processing Unit',
    description: 'Setting up a small-scale cassava processing unit to produce gari and high-quality cassava flour for export.',
    type: 'mixed',
    status: 'funded',
    creator: sampleFarmers[0],
    location: 'Kumasi, Ghana',
    fundingGoal: 35000,
    fundingRaised: 35000,
    duration: 24,
    expectedRoi: 40,
    riskLevel: 'low',
    agreementType: 'profit_sharing',
    agreementTerms: {
      farmerShare: 60,
      investorShare: 40
    },
    tags: ['Cassava', 'Processing', 'Export'],
    images: ['https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0'],
    createdAt: '2023-09-20T00:00:00Z',
    updatedAt: '2023-10-25T00:00:00Z'
  }
];

// Sample Land Listings
export const sampleLands: LandListing[] = [
  {
    id: '1',
    title: '10 Acre Fertile Land with Water Source',
    description: 'Fertile land with year-round water access, perfect for crop production. Previously used for maize cultivation.',
    owner: sampleLandowners[0],
    location: 'Ho, Ghana',
    coordinates: {
      latitude: 6.6000,
      longitude: 0.4667
    },
    size: 10,
    soilType: 'Loamy',
    waterSource: ['River', 'Borehole'],
    availableFrom: '2023-12-01T00:00:00Z',
    pricePerMonth: 500,
    leaseTerms: {
      minDuration: 12,
      maxDuration: 36,
      paymentFrequency: 'quarterly',
      revenueSharingOption: true,
      revenueSharingPercentage: 15
    },
    images: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef'],
    verified: true,
    createdAt: '2023-11-01T00:00:00Z',
    updatedAt: '2023-11-05T00:00:00Z'
  },
  {
    id: '2',
    title: '5 Acre Premium Land with Irrigation System',
    description: 'Premium agricultural land with modern drip irrigation system and road access. Ideal for high-value crop production.',
    owner: sampleLandowners[1],
    location: 'Cape Coast, Ghana',
    coordinates: {
      latitude: 5.1053,
      longitude: -1.2466
    },
    size: 5,
    soilType: 'Sandy Loam',
    waterSource: ['Irrigation System', 'Rainwater Catchment'],
    availableFrom: '2023-12-15T00:00:00Z',
    pricePerMonth: 700,
    leaseTerms: {
      minDuration: 6,
      maxDuration: 24,
      paymentFrequency: 'monthly',
      revenueSharingOption: false
    },
    images: ['https://images.unsplash.com/photo-1560493676-04071c5f467b'],
    verified: true,
    createdAt: '2023-10-20T00:00:00Z',
    updatedAt: '2023-11-10T00:00:00Z'
  }
];

// Sample Livestock Listings
export const sampleLivestockListings: LivestockListing[] = [
  {
    id: '1',
    title: 'Poultry Raising Partnership',
    description: 'Opportunity to invest in 500 broiler chickens to be raised over 8 weeks with guaranteed market access.',
    farmer: sampleFarmers[1],
    location: 'Tamale, Ghana',
    animalType: 'Broiler Chickens',
    capacity: 500,
    costPerAnimal: 10,
    duration: 2, // 2 months
    careDetails: 'Full veterinary care, high-quality feed, and proper housing with temperature control.',
    expectedReturns: {
      growthRate: 55, // percentage
      mortalityRate: 3, // percentage
      projectedValue: 17 // per animal
    },
    images: ['https://images.unsplash.com/photo-1569597967185-cd6120712154'],
    createdAt: '2023-11-05T00:00:00Z',
    updatedAt: '2023-11-10T00:00:00Z'
  },
  {
    id: '2',
    title: 'Cattle Fattening Program',
    description: 'Partnership opportunity for fattening 20 cattle over 6 months using specialized feed formulations for premium meat quality.',
    farmer: sampleFarmers[0],
    location: 'Kumasi, Ghana',
    animalType: 'Beef Cattle',
    capacity: 20,
    costPerAnimal: 500,
    duration: 6, // 6 months
    careDetails: 'Regular health checks, vaccinations, quality feed, and spacious housing with grazing access.',
    expectedReturns: {
      growthRate: 35, // percentage
      mortalityRate: 1, // percentage
      projectedValue: 850 // per animal
    },
    images: ['https://images.unsplash.com/photo-1570042225831-d98fa7577f1e'],
    createdAt: '2023-10-15T00:00:00Z',
    updatedAt: '2023-11-01T00:00:00Z'
  }
];
