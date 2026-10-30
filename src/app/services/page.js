import Icon from '@/components/Icon/Icon';
export const metadata = {
  title: 'Services — Engineering for Your Next Product',
  description:
    'Discuss React and Next.js applications, frontend architecture, accessibility, performance improvements, and AI-enabled workflows with Ram Pandey.',
  alternates: { canonical: '/services/' },
};
const services = [
  [
    'code',
    'React & Next.js development',
    'From an idea to an interface people can use.',
    'Websites, SaaS interfaces, dashboards, and modern web applications built around clear user journeys.',
    [
      'Reusable component design',
      'Responsive layouts across devices',
      'API integration and application state',
      'Clear loading, empty, and error states',
    ],
  ],
  [
    'layers',
    'Frontend architecture',
    'A foundation that can grow with the product.',
    'Help structure applications around maintainable modules and shared UI patterns. Architecture should make change easier to reason about.',
    [
      'Component and feature boundaries',
      'Design-system and UI-library direction',
      'Micro-frontend architecture discussions',
      'Code splitting and performance patterns',
    ],
  ],
  [
    'shield',
    'Accessibility & performance',
    'Better experiences for more people.',
    'Review and improve the details that shape how people navigate, understand, and interact with your application.',
    [
      'Keyboard and focus behavior',
      'Semantic HTML and accessible forms',
      'Screen-reader compatibility',
      'Rendering and interaction performance',
    ],
  ],
  [
    'spark',
    'AI-enabled applications',
    'Useful assistance, grounded in the workflow.',
    'Explore practical AI features and automation with clear context and meaningful human oversight.',
    [
      'LLM-powered application experiences',
      'Developer productivity workflows',
      'MCP-based integration exploration',
      'Human review and decision boundaries',
    ],
  ],
];
export default function Services() {
  return (
    <>
      <section className="pageHero">
        <span className="eyebrow">LET’S TURN INTENT INTO SOMETHING USEFUL</span>
        <h1>
          Your challenge.
          <br />
          <em>A clear way forward.</em>
        </h1>
        <p>
          Software development and engineering conversations grounded in the real problem, the
          people using the product, and the constraints that matter.
        </p>
        <a className="button primary" href="/contact/">
          Discuss your project <Icon name="arrow" />
        </a>
      </section>
      <section className="section">
        <div className="serviceDetails">
          {services.map(([icon, t, sub, d, list], i) => (
            <article className="serviceDetail glassCard" key={t}>
              <div className="serviceDetailIcon">
                <Icon name={icon} size={34} />
                <span>0{i + 1}</span>
              </div>
              <div>
                <h2>{t}</h2>
                <p className="lead">{sub}</p>
                <p>{d}</p>
                <ul>
                  {list.map((item) => (
                    <li key={item}>
                      <Icon name="check" size={17} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a className="textLink" href="/contact/">
                  Talk about {t.toLowerCase()} <Icon name="arrow" size={18} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <span className="eyebrow">HOW WE CAN START</span>
        <h2>
          Understand first.
          <br />
          <em>Build with intention.</em>
        </h2>
        <div className="processGrid">
          {[
            [
              '01',
              'A conversation',
              'Share the problem, context, product stage, and desired outcome.',
            ],
            [
              '02',
              'A shared direction',
              'Clarify scope, constraints, responsibilities, and what success should look like.',
            ],
            [
              '03',
              'Thoughtful implementation',
              'Work through focused increments with review and feedback.',
            ],
            [
              '04',
              'Refine & evolve',
              'Test actual journeys, resolve friction, and identify the next useful improvement.',
            ],
          ].map(([n, t, d]) => (
            <article key={n}>
              <span className="processNumber">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
        <a className="button primary" href="/contact/">
          Start with a conversation <Icon name="arrow" />
        </a>
      </section>
    </>
  );
}
