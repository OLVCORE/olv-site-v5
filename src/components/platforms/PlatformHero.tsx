import React from 'react';
import Image from 'next/image';

interface PlatformHeroProps {
  platformName: string;
  platformLogo: string;
  platformDescription: string;
  platformIntro?: string;
  platformColor: string;
  isBeta?: boolean;
}

const PlatformHero: React.FC<PlatformHeroProps> = ({
  platformName,
  platformLogo,
  platformDescription,
  platformIntro,
  platformColor = '#141c2f', // default dark tone if none provided
  isBeta = true,
}) => {
  return (
    <section
      className="platform-hero w-full mb-10 px-4 py-6 sm:px-8 md:px-10
                 flex flex-col md:flex-row items-center gap-6
                 rounded-lg border shadow-lg"
      style={{
        backgroundColor: platformColor,
        borderColor: '#2a3448',
        marginTop: 'calc(var(--height-header) + 50px)', // header + ticker
        paddingTop: 'env(safe-area-inset-top)' // notch safety on iOS
      }}
    >
      {/* Text Block */}
      <div className="flex-1 order-2 md:order-1 text-center md:text-left">
        <div className="flex items-center mb-6 relative">
          <img src={platformLogo} alt={`${platformName} logo`} className="w-16 h-16 mr-4" />
          <h1 className="text-4xl font-bold" style={{ color: platformColor }}>{platformName}</h1>
          {isBeta && (
            <span className="ml-3 px-3 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500 absolute -top-2 right-0 md:static md:relative">Versão Beta</span>
          )}
        </div>
        {platformDescription && (
          <p className="text-gray-300 leading-relaxed">
            {platformDescription}
          </p>
        )}

        {platformIntro && (
          <div className="bg-[#1a2338] border border-[#2a3448] p-4 rounded-lg mt-4 text-gray-300 text-base md:text-lg leading-relaxed">
            {platformIntro}
          </div>
        )}
      </div>

      {/* Banner / Logo */}
      <div className="flex-shrink-0 order-1 md:order-2 w-full md:w-1/3">
        <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] shadow-md">
          <Image
            src={platformLogo}
            alt={`${platformName} Logo`}
            width={460}
            height={460}
            className="rounded-lg w-full h-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default PlatformHero; 