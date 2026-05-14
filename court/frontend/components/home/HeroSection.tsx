'use client';

import { DotLottiePlayer } from '@dotlottie/react-player';

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Text and Buttons */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">
                VerdictAI
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              AI-powered courtroom simulation and legal case assessment for Indian disputes. Test arguments, analyze precedents, and predict outcomes in real-time.
            </p>
            
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors shadow-md">
                Start Simulation
              </button>
              <button className="px-8 py-3 bg-white text-slate-700 font-semibold rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors shadow-sm">
                Upload Case File
              </button>
            </div>
          </div>

          {/* Right Side: Lottie Animation */}
          <div className="w-full flex items-center justify-center relative min-h-[300px] lg:min-h-[400px]">
            {/* 
              Make sure to replace the 'src' URL with a link to your actual Lottie file. 
              You can host them for free on lottiefiles.com and copy the "Lottie Animation URL".
            */}
            <DotLottiePlayer
              src="https://lottie.host/24bd81cc-0cb3-48b4-82a9-d3e95af9e262/a0j2eN5T6v.json" 
              autoplay
              loop
              className="w-full h-full max-w-md mx-auto"
            />
          </div>

        </div>
      </div>
    </section>
  );
};