import React, { useState, useEffect, useRef } from 'react';

function SkillBar({ skill }) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const skillRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = skillRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const duration = 1500; // 1.5 seconds
        const startTime = Date.now();
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Easing function for smooth animation
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentPercent = Math.floor(easeOut * skill.percent);
          
          setAnimatedPercent(currentPercent);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        requestAnimationFrame(animate);
      }, 200); // Small delay for staggered effect

      return () => clearTimeout(timer);
    }
  }, [isVisible, skill.percent]);

  return (
    <article 
      ref={skillRef}
      className="bg-white border border-gray-200 p-6 group"
      aria-labelledby={`skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <header className="mb-4">
        <h4 
          id={`skill-${skill.name.replace(/\s+/g, '-').toLowerCase()}`}
          className="font-semibold text-slate-700 text-lg mb-2"
        >
          {skill.name}
        </h4>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {skill.description}
        </p>
      </header>

      <div className="space-y-3">
        {/* Progress bar container */}
        <div className="relative">
          <div 
            className="w-full h-2 bg-gray-100 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuenow={animatedPercent}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-label={`${skill.name} proficiency: ${skill.percent}%`}
          >
            <div 
              className="h-full bg-gradient-to-r from-slate-600 to-slate-700 rounded-full transition-all duration-1000 ease-out relative"
              style={{ 
                width: `${isVisible ? animatedPercent : 0}%`,
                transitionDelay: isVisible ? '200ms' : '0ms'
              }}
            >
              {/* Small knob at the end */}
              {isVisible && animatedPercent > 0 && (
                <div 
                  className="absolute -right-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-slate-700 rounded-full border-2 border-white shadow-sm"
                  style={{
                    opacity: animatedPercent > 5 ? 1 : 0,
                    transition: 'opacity 300ms ease-out'
                  }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Percentage display */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 font-mono tracking-wide">
            PROFICIENCY
          </span>
          <span 
            className="text-sm font-semibold text-slate-700 font-mono"
            aria-live="polite"
          >
            {animatedPercent}%
          </span>
        </div>
      </div>
    </article>
  );
}

export default SkillBar;