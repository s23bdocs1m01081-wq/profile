import React from 'react';

function Skills() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h3 className="text-3xl font-semibold text-gray-900 mb-12">Tools & Technologies</h3>
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h4 className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wide">Frontend</h4>
            <div className="text-gray-600 leading-relaxed space-y-1">
              <div>JavaScript (ES6+)</div>
              <div>React & Next.js</div>
              <div>Tailwind CSS</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wide">Backend</h4>
            <div className="text-gray-600 leading-relaxed space-y-1">
              <div>Node.js & Express</div>
              <div>PostgreSQL & MySQL</div>
              <div>MongoDB</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-slate-700 mb-4 text-sm uppercase tracking-wide">Tools</h4>
            <div className="text-gray-600 leading-relaxed space-y-1">
              <div>Git & GitHub</div>
              <div>Vercel</div>
              <div>Figma</div>
              <div>Vite</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;