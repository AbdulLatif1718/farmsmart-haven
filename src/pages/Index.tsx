import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DollarSign, 
  Home, 
  Sprout, 
  ShoppingCart, 
  Users, 
  GraduationCap,
  Truck,
  Settings,
  TrendingUp,
  MapPin,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  X,
  Trees
} from 'lucide-react';
import { FundingApplicationForm } from '@/components/FundingApplicationForm';
import { LandMonetizationForm } from '@/components/LandMonetizationForm';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const StartFarmWizard = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    farmType: '',
    experience: '',
    involvement: '',
    location: '',
    budget: '',
    timeline: '',
    goals: []
  });
  const [showRecommendations, setShowRecommendations] = useState(false);

  const steps = [
    {
      id: 'farmType',
      title: 'What type of farming interests you?',
      options: [
        { value: 'crops', label: 'Crop Farming', icon: '🌾', desc: 'Grow vegetables, grains, and fruits' },
        { value: 'livestock', label: 'Livestock Farming', icon: '🐄', desc: 'Raise cattle, poultry, goats, etc.' },
        { value: 'mixed', label: 'Mixed Farming', icon: '🚜', desc: 'Combine crops and livestock' },
        { value: 'aquaculture', label: 'Aquaculture', icon: '🐟', desc: 'Fish and aquatic farming' }
      ]
    },
    {
      id: 'experience',
      title: 'What\'s your farming experience level?',
      options: [
        { value: 'none', label: 'Complete Beginner', icon: '🌱', desc: 'New to farming' },
        { value: 'some', label: 'Some Experience', icon: '🌿', desc: '1-3 years experience' },
        { value: 'experienced', label: 'Experienced', icon: '🌳', desc: '3+ years of farming' },
        { value: 'expert', label: 'Expert Farmer', icon: '🏆', desc: 'Professional farmer' }
      ]
    },
    {
      id: 'involvement',
      title: 'How involved do you want to be?',
      options: [
        { value: 'hands-on', label: 'Hands-on Farming', icon: '👨‍🌾', desc: 'I want to work the farm myself' },
        { value: 'supervise', label: 'Supervise Operations', icon: '👔', desc: 'Oversee hired workers' },
        { value: 'investor', label: 'Investment Only', icon: '💼', desc: 'Purely financial investment' },
        { value: 'part-time', label: 'Part-time Involvement', icon: '⏰', desc: 'Farm on weekends/spare time' }
      ]
    },
    {
      id: 'location',
      title: 'Where are you located?',
      type: 'regions',
      options: [
        { value: 'greater-accra', label: 'Greater Accra', icon: '🏙️', desc: 'Urban and peri-urban farming' },
        { value: 'ashanti', label: 'Ashanti Region', icon: '🌳', desc: 'Forest zone agriculture' },
        { value: 'northern', label: 'Northern Region', icon: '🌾', desc: 'Savanna zone farming' },
        { value: 'western', label: 'Western Region', icon: '🌿', desc: 'Forest and coastal farming' },
        { value: 'eastern', label: 'Eastern Region', icon: '🏔️', desc: 'Mountainous agriculture' },
        { value: 'central', label: 'Central Region', icon: '🏖️', desc: 'Coastal farming' },
        { value: 'other', label: 'Other Region', icon: '📍', desc: 'Specify your location' }
      ]
    },
    {
      id: 'budget',
      title: 'What\'s your budget range?',
      options: [
        { value: 'small', label: '₵5,000 - ₵20,000', icon: '💰', desc: 'Small scale startup' },
        { value: 'medium', label: '₵20,000 - ₵100,000', icon: '💸', desc: 'Medium scale operation' },
        { value: 'large', label: '₵100,000 - ₵500,000', icon: '💎', desc: 'Large scale farming' },
        { value: 'enterprise', label: '₵500,000+', icon: '🏦', desc: 'Commercial enterprise' }
      ]
    },
    {
      id: 'timeline',
      title: 'When do you want to start?',
      options: [
        { value: 'immediate', label: 'Immediately', icon: '⚡', desc: 'Ready to start now' },
        { value: '1-3months', label: '1-3 Months', icon: '📅', desc: 'Need some preparation time' },
        { value: '3-6months', label: '3-6 Months', icon: '📆', desc: 'Planning phase needed' },
        { value: '6months+', label: '6+ Months', icon: '🗓️', desc: 'Long-term planning' }
      ]
    },
    {
      id: 'goals',
      title: 'What are your primary goals?',
      multiple: true,
      options: [
        { value: 'income', label: 'Generate Income', icon: '💵', desc: 'Primary income source' },
        { value: 'food-security', label: 'Food Security', icon: '🍽️', desc: 'Feed family/community' },
        { value: 'export', label: 'Export Products', icon: '🚢', desc: 'International markets' },
        { value: 'sustainability', label: 'Sustainable Farming', icon: '♻️', desc: 'Eco-friendly practices' },
        { value: 'employment', label: 'Create Jobs', icon: '👥', desc: 'Employ local community' }
      ]
    }
  ];

  const handleAnswer = (value) => {
    const currentStepData = steps[currentStep];
    if (currentStepData.multiple) {
      const currentAnswers = answers[currentStepData.id] || [];
      const newAnswers = currentAnswers.includes(value) 
        ? currentAnswers.filter(v => v !== value)
        : [...currentAnswers, value];
      setAnswers(prev => ({ ...prev, [currentStepData.id]: newAnswers }));
    } else {
      setAnswers(prev => ({ ...prev, [currentStepData.id]: value }));
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowRecommendations(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getRecommendations = () => {
    const { farmType, experience, involvement, location, budget, timeline, goals } = answers;
    
    const recommendations = {
      farmType: 'crops',
      crops: ['Tomatoes', 'Lettuce', 'Bell Peppers'],
      farmSize: '2-5 acres',
      investment: '₵25,000 - ₵50,000',
      timeline: '3-6 months',
      support: ['Agricultural extension officer', 'Drip irrigation system', 'Greenhouse setup'],
      nextSteps: [
        'Connect with local agricultural extension services',
        'Secure farmland through our marketplace',
        'Apply for agricultural loans and grants',
        'Purchase recommended equipment and seeds',
        'Join farmer training programs'
      ]
    };

    // Customize based on answers
    if (farmType === 'livestock') {
      recommendations.crops = ['Poultry (Broilers)', 'Layer Farming', 'Goat Rearing'];
      recommendations.support = ['Veterinary services', 'Feed suppliers', 'Housing construction'];
    }

    if (budget === 'small') {
      recommendations.farmSize = '0.5-2 acres';
      recommendations.investment = '₵5,000 - ₵15,000';
    }

    return recommendations;
  };

  const currentStepData = steps[currentStep];
  const currentAnswer = answers[currentStepData?.id];
  const canProceed = currentStepData?.multiple ? 
    (currentAnswer && currentAnswer.length > 0) : 
    currentAnswer;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl max-h-[95vh] overflow-hidden flex flex-col">
        <div className="p-4 sm:p-6 flex-shrink-0">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-2xl font-bold text-green-600">Start Your Farm Journey 🌱</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6">
          {!showRecommendations ? (
            <>
              <div className="mb-4 sm:mb-6">
                <div className="flex justify-between text-xs sm:text-sm text-gray-500 mb-2">
                  <span>Step {currentStep + 1} of {steps.length}</span>
                  <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">{currentStepData.title}</h3>
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {currentStepData.options.map((option) => {
                    const isSelected = currentStepData.multiple ? 
                      (currentAnswer && currentAnswer.includes(option.value)) :
                      currentAnswer === option.value;

                    return (
                      <Card
                        key={option.value}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                          isSelected ? 'ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20' : ''
                        }`}
                        onClick={() => handleAnswer(option.value)}
                      >
                        <CardContent className="p-3 sm:p-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-xl sm:text-2xl flex-shrink-0">{option.icon}</span>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm sm:text-base">{option.label}</h4>
                              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{option.desc}</p>
                            </div>
                            {isSelected && (
                              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center mb-6 sm:mb-8">
                <div className="text-3xl sm:text-4xl mb-4">🎉</div>
                <h3 className="text-xl sm:text-2xl font-bold text-green-600 mb-2">Your Farm Plan is Ready!</h3>
                <p className="text-sm sm:text-base text-gray-600">Based on your preferences, here's what we recommend:</p>
              </div>

              {(() => {
                const recs = getRecommendations();
                return (
                  <div className="space-y-4">
                    <Card className="bg-green-50 dark:bg-green-900/20">
                      <CardHeader className="pb-3 sm:pb-4">
                        <CardTitle className="text-base sm:text-lg text-green-700">Recommended Farm Setup</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <p className="font-semibold text-sm sm:text-base">Farm Type:</p>
                            <p className="capitalize text-sm sm:text-base">{answers.farmType}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-sm sm:text-base">Recommended Size:</p>
                            <p className="text-sm sm:text-base">{recs.farmSize}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-sm sm:text-base">Initial Investment:</p>
                            <p className="text-sm sm:text-base">{recs.investment}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-sm sm:text-base">Timeline to Start:</p>
                            <p className="text-sm sm:text-base">{recs.timeline}</p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="font-semibold mb-2 text-sm sm:text-base">Recommended Crops/Activities:</p>
                          <div className="flex flex-wrap gap-2">
                            {recs.crops.map((crop, i) => (
                              <span key={i} className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                                {crop}
                              </span>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3 sm:pb-4">
                        <CardTitle className="text-base sm:text-lg">Next Steps</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ol className="space-y-2 sm:space-y-3">
                          {recs.nextSteps.map((step, i) => (
                            <li key={i} className="flex items-start space-x-2 sm:space-x-3">
                              <span className="bg-green-600 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0 mt-0.5">
                                {i + 1}
                              </span>
                              <span className="text-sm sm:text-base">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </Card>

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                      <Button className="w-full sm:flex-1 bg-green-600 hover:bg-green-700">
                        Get Funding
                      </Button>
                      <Button variant="outline" className="w-full sm:flex-1">
                        Find Farmland
                      </Button>
                      <Button variant="outline" className="w-full sm:flex-1">
                        Connect with Experts
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
        
        {!showRecommendations && (
          <div className="flex-shrink-0 p-4 sm:p-6 pt-0 border-t bg-gray-50 dark:bg-gray-900/50">
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 0}
                className="text-xs sm:text-sm"
              >
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                Previous
              </Button>
              <Button 
                onClick={nextStep}
                disabled={!canProceed}
                className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
              >
                {currentStep === steps.length - 1 ? 'Get Recommendations' : 'Next'}
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Index = () => {
  const [showFundingForm, setShowFundingForm] = useState(false);
  const [showLandMonetizationForm, setShowLandMonetizationForm] = useState(false);
  const { profile } = useAuth();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Start a Farm",
      description: "Begin your agricultural journey with guided setup",
      icon: Sprout,
      action: () => navigate('/farm/add'),
      color: "emerald",
      featured: true
    },
    {
      title: "Monetize Land",
      description: "Lease, partner, or sell your farmland",
      icon: Trees,
      action: () => setShowLandMonetizationForm(true),
      color: "emerald",
      featured: true
    },
    {
      title: "Get Funding",
      description: "Apply for agricultural loans and grants",
      icon: DollarSign,
      action: () => setShowFundingForm(true),
      color: "green",
      featured: true
    },
    {
      title: "Join a Project",
      description: "Collaborate on agricultural projects",
      icon: Users,
      action: () => navigate('/projects'),
      color: "blue",
      featured: true
    },
    {
      title: "Get a Farm",
      description: "Find available farmland to lease or buy", 
      icon: Home,
      action: () => navigate('/services?tab=farms'),
      color: "blue"
    },
    {
      title: "Explore Market",
      description: "Browse crops, equipment, and services",
      icon: ShoppingCart,
      action: () => navigate('/marketplace'),
      color: "orange"
    },
    {
      title: "Find Transport",
      description: "Book delivery and logistics services",
      icon: Truck,
      action: () => navigate('/transport'),
      color: "purple"
    },
    {
      title: "Get a Farmer",
      description: "Hire experienced farmers for your land",
      icon: Users,
      action: () => navigate('/services?tab=experts'),
      color: "indigo"
    },
    {
      title: "Find an Expert",
      description: "Connect with agricultural consultants",
      icon: GraduationCap,
      action: () => navigate('/services?tab=experts'),
      color: "teal"
    }
  ];

  return (
    <MainLayout>
      <div className="mb-8">
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="text-3xl font-extrabold text-green-600">
              Welcome back, {profile?.full_name?.split(' ')[0] || 'Friend'}! 🌱
            </CardTitle>
            <CardDescription className="text-muted-foreground font-bold">
              Let's build wealth through smart farming.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              You're in the right place to <span className="font-semibold text-primary">grow wealth</span>, 
              <span className="font-semibold text-green-700"> feed Africa</span>, and 
              <span className="font-semibold text-emerald-700"> boost our economy</span>.  
              Let's make farming the future together. 🌍✨
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                action.featured ? 'ring-2 ring-primary/20 bg-primary/5' : ''
              }`}
              onClick={action.action}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg bg-${action.color}-100 dark:bg-${action.color}-900/30`}>
                    <action.icon className={`h-6 w-6 text-${action.color}-600 dark:text-${action.color}-400`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{action.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">For Farmers</CardTitle>
            <CardDescription>Tools and resources to optimize your farming</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/crops')}>
              <Sprout className="h-4 w-4 mr-2" />
              Manage Your Farm
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/machinery')}>
              <Settings className="h-4 w-4 mr-2" />
              Rent Equipment
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/knowledge')}>
              <GraduationCap className="h-4 w-4 mr-2" />
              Learn Best Practices
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">For Investors</CardTitle>
            <CardDescription>Discover profitable agricultural opportunities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/services?tab=farms')}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Browse Investments
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/services?tab=land')}>
              <MapPin className="h-4 w-4 mr-2" />
              Find Land
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/services?tab=experts')}>
              <Users className="h-4 w-4 mr-2" />
              Connect with Farmers
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">For Everyone</CardTitle>
            <CardDescription>Join the agricultural community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/marketplace')}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Shop Fresh Produce
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/transport')}>
              <Truck className="h-4 w-4 mr-2" />
              Logistics Services
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/knowledge')}>
              <GraduationCap className="h-4 w-4 mr-2" />
              Agricultural Knowledge
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <FundingApplicationForm 
        isOpen={showFundingForm}
        onClose={() => setShowFundingForm(false)}
      />
      
      <LandMonetizationForm 
        isOpen={showLandMonetizationForm}
        onClose={() => setShowLandMonetizationForm(false)}
      />
    </MainLayout>
  );
};

export default Index;