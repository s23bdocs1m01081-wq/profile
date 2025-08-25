import React from 'react';

function About() {
  const principles = [
    {
      title: 'Clarity first',
      description:
        'Interfaces should feel quiet, legible, and purposeful—no visual noise.',
    },
    {
      title: 'Simplicity scales',
      description:
        'Prefer straightforward solutions that are easy to extend and maintain.',
    },
    {
      title: 'Accessibility by default',
      description:
        'Semantic HTML, keyboard support, and readable contrast on every screen.',
    },
  ];

  const highlights = [
    {
      title: 'What I enjoy',
      description:
        'Design‑system thinking, performance budgets, and crafting tiny details that add polish.',
    },
    {
      title: 'Currently exploring',
      description:
        'Server components, edge‑rendered patterns, and AI‑assisted developer tools.',
    },
  ];
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="grid md:grid-cols-[200px_1fr] gap-12 items-start">
          <div className="w-48 h-64 bg-gray-200 border border-gray-300 flex items-center justify-center text-sm text-gray-500">
            <img src="/mockups/me.jpg" alt="Profile portrait" />
          </div>
          <div>
            <h3 className="text-3xl font-semibold text-gray-900 mb-6">Hello there.</h3>
            <div className="prose prose-lg text-gray-700 leading-relaxed space-y-5">
              <p>
                I'm a full-stack developer based in Pakistan, passionate about creating digital experiences 
                that are both beautiful and functional. My journey in web development started during university, 
                where I fell in love with the process of turning ideas into interactive realities.
              </p>
              <p>
                Over the years, I've worked with startups and established companies, helping them build 
                everything from simple landing pages to complex web applications. I believe in writing 
                clean, maintainable code and designing interfaces that feel intuitive and human.
              </p>
              <p>
                When I'm not coding, you'll find me reading about new technologies, experimenting with 
                design patterns, or enjoying a good cup of tea while contemplating the next problem to solve.
              </p>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Experience</h3>
          <article className="bg-gray-50 border border-gray-200 p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-900">Think Code IT Solution</h4>
                <p className="text-sm text-gray-500">Full‑stack Developer • 6 months</p>
              </div>
              <div className="text-sm text-gray-600 font-mono">2024 — 2025</div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Partnered with a small, fast-moving team to design and ship production-ready features end‑to‑end. Focused on
              accessible UI, clean APIs, and maintainable code that aligns with a classical, content‑first product aesthetic.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Built responsive React interfaces with Tailwind CSS aligned to an existing design system.</li>
              <li>Developed REST endpoints in Node.js/Express with input validation and clear error surfaces.</li>
              <li>Integrated PostgreSQL/MongoDB data layers with pragmatic indexing and query optimization.</li>
              <li>Improved page performance via image sizing, route‑level code splitting, and memoization.</li>
            </ul>
            <div className="mt-4 text-sm text-gray-600 font-mono">
              React • Node.js • Express • PostgreSQL • MongoDB • Tailwind CSS
            </div>
          </article>
        </div>

        {/* Principles */}
        <section aria-labelledby="principles-heading" className="mt-16">
          <h3 id="principles-heading" className="text-2xl font-semibold text-gray-900 mb-6">Principles I work by</h3>
          <ul role="list" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((item, index) => (
              <li key={item.title} className="group relative">
                <div className="h-full bg-white border border-gray-200 p-6">
                  <div className="text-gray-500 text-xs tracking-widest mb-2">{String(index + 1).padStart(2, '0')}</div>
                  <h4 className="font-semibold text-slate-700 mb-2">{item.title}</h4>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Highlights */}
        <section aria-labelledby="highlights-heading" className="mt-16">
          <h3 id="highlights-heading" className="text-2xl font-semibold text-gray-900 mb-6">Highlights</h3>
          <ul role="list" className="grid gap-6 md:grid-cols-2">
            {highlights.map((item) => (
              <li key={item.title} className="relative">
                <div className="h-full bg-white border border-gray-200 p-6">
                  <h4 className="font-semibold text-slate-700 mb-2">{item.title}</h4>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}

export default About;