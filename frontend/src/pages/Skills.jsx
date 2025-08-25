import React from 'react';
import SkillBar from '../components/SkillBar.jsx';
import skills from '../data/skills.js';

function Skills() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left column - Introduction */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-8">
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">
                Skills & Expertise
              </h3>
              <div className="prose text-gray-700 leading-relaxed space-y-4">
                <p>
                  Over the years, I've developed proficiency across a diverse range of 
                  technologies and frameworks. Here's a breakdown of my core competencies 
                  and the depth of experience I bring to each area.
                </p>
                <p>
                  Each skill represents not just familiarity, but hands-on experience 
                  building production applications, solving complex problems, and 
                  delivering quality solutions.
                </p>
              </div>
              
              <div className="mt-8 p-4 bg-gray-50 border border-gray-200">
                <h4 className="font-semibold text-slate-700 mb-2 text-sm uppercase tracking-wide">
                  Legend
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-slate-700 rounded-full"></div>
                    <span>90%+ Expert level</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-slate-600 rounded-full"></div>
                    <span>80%+ Advanced proficiency</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                    <span>70%+ Intermediate level</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Skills list */}
          <div className="lg:col-span-8">
            <div className="grid gap-6 md:grid-cols-2">
              {skills.map((skill) => (
                <SkillBar key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;