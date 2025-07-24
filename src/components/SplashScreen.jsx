import React from 'react';

export default function SplashScreen() {
    return (
      <div className="w-screen h-screen bg-[#f83758] relative overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 left-0 w-60 rotate-[-145deg] opacity-80">
          <img src="/public/SignUpSS.png" alt="mockup" className="w-full" />
        </div>
        <div className="absolute top-2 right-0 w-44 rotate-[45deg] opacity-80">
          <img src="/public/LoginSS.png" alt="mockup" className="w-full" />
        </div>
        <div className="absolute bottom-8 left-12 w-44 rotate-[15deg] opacity-80">
          <img src="/public/ChooseProfileSS.png" alt="mockup" className="w-full" />
        </div>
        <div className="absolute bottom-10 right-14 w-40 rotate-[-15deg] opacity-80">
          <img src="/phone4.png" alt="mockup" className="w-full" />
        </div>

        <div className="text-center z-10 text-white">
          <h1 className="text-5xl font-semibold mb-4 tracking-wide">
            Kaam Kaazi
          </h1>
          <p className="text-lg font-light">
            Helping Homes run better
            <br /> -every day
          </p>
        </div>

        <div className="absolute bottom-6">
          <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animated-spin" />
        </div>
      </div>
    );
}