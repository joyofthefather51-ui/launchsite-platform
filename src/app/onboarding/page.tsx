"use client";

import { useState, ChangeEvent, FormEvent } from 'react';

// Define the structure for the form data
interface FormData {
  industry: string;
  businessName: string;
  ownerName: string;
  tagline: string;
  mostRequestedService: string;
  highestMarginService: string;
  phone: string;
  email: string;
  address: string;
  logo?: File;
  profilePhoto?: File;
  whiteGlove: boolean;
  photoShoot: boolean;
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    industry: 'Law',
    businessName: '',
    ownerName: '',
    tagline: '',
    mostRequestedService: '',
    highestMarginService: '',
    phone: '',
    email: '',
    address: '',
    whiteGlove: false,
    photoShoot: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);


  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
        const { files } = e.target as HTMLInputElement;
        setFormData((prev) => ({ ...prev, [name]: files ? files[0] : undefined }));
    }
     else {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback(null);

    const data = new window.FormData();
    Object.keys(formData).forEach(key => {
        const value = formData[key as keyof FormData];
        if (value instanceof File) {
            data.append(key, value);
        } else if (typeof value === 'boolean') {
            data.append(key, String(value));
        }
        else if (value) {
            data.append(key, value);
        }
    });

    try {
        const response = await fetch('/api/onboarding', {
            method: 'POST',
            body: data,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Something went wrong');
        }

        setFeedback('Onboarding complete! Your site is being generated. We will email you a link shortly.');

    } catch (error: any) {
        setFeedback(`Error: ${error.message}`);
    } finally {
        setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Step 1: Industry Selection</h2>
            <p className="text-gray-600">Select your business vertical. This helps us tailor your site.</p>
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option>Law</option>
                <option disabled>Medical (coming soon)</option>
                <option disabled>Real Estate (coming soon)</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Step 2: Business Details</h2>
            <p className="text-gray-600">Tell us about your business. This will populate your site's content.</p>
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Firm/Business Name</label>
              <input required type="text" name="businessName" id="businessName" value={formData.businessName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">Owner Name</label>
              <input required type="text" name="ownerName" id="ownerName" value={formData.ownerName} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="tagline" className="block text-sm font-medium text-gray-700">Tagline</label>
              <input type="text" name="tagline" id="tagline" value={formData.tagline} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="mostRequestedService" className="block text-sm font-medium text-gray-700">Most-Requested Service</label>
              <input type="text" name="mostRequestedService" id="mostRequestedService" value={formData.mostRequestedService} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
             <div>
              <label htmlFor="highestMarginService" className="block text-sm font-medium text-gray-700">Highest-Margin Service</label>
              <input type="text" name="highestMarginService" id="highestMarginService" value={formData.highestMarginService} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Step 3: Contact Information</h2>
             <p className="text-gray-600">How can clients reach you?</p>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input required type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Physical Address (Optional)</label>
              <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Step 4: Media & Add-Ons</h2>
            <p className="text-gray-600">Upload your logo and a profile photo. You can add up to 10 more images later.</p>
            <div>
                <label htmlFor="logo" className="block text-sm font-medium text-gray-700">Corporate Logo</label>
                <input type="file" name="logo" id="logo" onChange={handleChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
            </div>
            <div>
                <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700">Profile/Team Photo</label>
                <input type="file" name="profilePhoto" id="profilePhoto" onChange={handleChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
            </div>
            <div className="relative flex items-start">
                <div className="flex items-center h-5">
                    <input id="whiteGlove" name="whiteGlove" type="checkbox" checked={formData.whiteGlove} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="whiteGlove" className="font-medium text-gray-700">Add $149 White-Glove Onboarding</label>
                    <p className="text-gray-500">Includes custom domain setup, professional asset styling, a strategy review, and an initial SEO pass.</p>
                </div>
            </div>
             <div className="relative flex items-start">
                <div className="flex items-center h-5">
                    <input id="photoShoot" name="photoShoot" type="checkbox" checked={formData.photoShoot} onChange={handleChange} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="photoShoot" className="font-medium text-gray-700">Add $199 Professional Photography/Video</label>
                    <p className="text-gray-500">An in-person site visit for professional photos and videos of your firm, team, and premises.</p>
                </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (feedback && !feedback.startsWith('Error')) {
    return (
        <main className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full space-y-8 text-center">
                 <h1 className="text-4xl font-extrabold text-gray-900">Thank You!</h1>
                 <p className="mt-4 text-lg text-green-600">{feedback}</p>
            </div>
        </main>
    )
  }

  return (
    <main className="bg-gray-50 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <h1 className="text-center text-4xl font-extrabold text-gray-900">
            Create Your Instant Website
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            No credit card required. Just 2 minutes to a live site.
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${(step / 4) * 100}%` }}></div>
        </div>

        <div className="bg-white p-8 shadow-xl rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
                {renderStep()}

                {feedback && <p className={`mt-4 text-sm ${feedback.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>{feedback}</p>}

                <div className="flex justify-between pt-6">
                    {step > 1 && (
                        <button type="button" onClick={prevStep} disabled={isLoading} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50">
                        Back
                        </button>
                    )}
                    <div className="flex-grow"></div>
                    {step < 4 && (
                        <button type="button" onClick={nextStep} disabled={isLoading} className="ml-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                        Next
                        </button>
                    )}
                    {step === 4 && (
                        <button type="submit" disabled={isLoading} className="ml-auto inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50">
                          {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>}
                        {isLoading ? 'Submitting...' : 'Submit & Create My Site'}
                        </button>
                    )}
                </div>
            </form>
        </div>
         <p className="text-center text-xs text-gray-500">Powered by Launchsite</p>
      </div>
    </main>
  );
}
