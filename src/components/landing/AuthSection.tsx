
import React from 'react';
import { Button } from '@/components/ui/button';

const AuthSection = () => {

  return (
    <section id="auth-section" className="py-20 bg-gradient-wheat">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-bold text-soil-800 mb-4">Ready to Get Started?</h2>
          <p className="text-soil-600 mb-8">
            Join thousands of farmers and investors transforming African agriculture
          </p>
          <Button 
            onClick={() => window.location.href = '/auth'}
            className="bg-leaf-600 hover:bg-leaf-700 text-white px-8 py-3 text-lg"
          >
            Sign Up / Login
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AuthSection;
