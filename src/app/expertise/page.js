import Icon from '@/components/Icon/Icon';
import { expertise } from '@/data/profile';
export const metadata = {
  title: 'Expertise — Frontend, Architecture, Accessibility & AI',
  description:
    'Explore Ram Pandey’s engineering practice: React, Next.js, reusable components, modular architecture, accessible interfaces, testing, and AI-assisted workflows.',
  alternates: { canonical: '/expertise/' },
};
const domains = [
  {
    id: 'frontend',
    icon: 'code',
    title: 'Frontend engineering',
    intro: 'Build the interface around the person using it.',
    body: 'My core practice is modern JavaScript and React development. I focus on predictable component behavior, clear state boundaries, and interfaces that explain what is happening through loading, empty, success, and error states.',
    tools: [
      'React.js',
      'Next.js',
      'JavaScript ES6+',
      'HTML5',
      'CSS Modules',
      'Material UI',
      'React Hooks',
      'Context API',
    ],
    details: [
      'Reusable components and composition',
      'Responsive layouts and interaction patterns',
      'Custom hooks for focused stateful logic',
      'REST API integration and state handling',
    ],
  },
  {
    id: 'architecture',
    icon: 'layers',
    title: 'Frontend architecture',
    intro: 'Make complexity easier to reason about.',
    body: 'Clear feature boundaries help an application evolve. I work with modular frontend patterns, shared UI primitives, and reusable component systems. Micro-frontends are a possible architectural choice when deployment and team boundaries justify them.',
    tools: [
      'Modular architecture',
      'Micro-frontends',
      'Design systems',
      'Component libraries',
      'Dynamic imports',
      'Code splitting',
    ],
    details: [
      'Feature-oriented organization',
      'Shared UI contracts and consistent tokens',
      'Caching, pagination, and virtualization patterns',
      'Maintainable interfaces between modules',
    ],
  },
  {
    id: 'accessibility',
    icon: 'shield',
    title: 'Accessibility & quality',
    intro: 'An interaction should work beyond the mouse.',
    body: 'Accessibility is part of interface behavior: a logical heading structure, a predictable keyboard path, a useful label, and focus that moves where it should. I work on accessible controls and screen-reader compatibility, including NVDA testing.',
    tools: [
      'WCAG',
      'Semantic HTML',
      'ARIA',
      'Keyboard navigation',
      'NVDA',
      'Playwright',
      'End-to-end testing',
      'Code review',
    ],
    details: [
      'Visible focus and keyboard interactions',
      'Accessible forms and feedback',
      'Screen-reader behavior and meaningful semantics',
      'Testing complete user journeys',
    ],
  },
  {
    id: 'ai',
    icon: 'spark',
    title: 'AI & developer workflows',
    intro: 'Useful intelligence starts with the right context.',
    body: 'I explore AI-assisted development and applications that reduce repetitive effort. My interests include LLM integration, agentic workflows, developer tooling, RAG concepts, and MCP-based connections between tools and workspaces.',
    tools: [
      'LLM integration',
      'AI-assisted development',
      'MCP',
      'Agentic workflows',
      'RAG concepts',
      'Developer automation',
    ],
    details: [
      'Context-aware assistance',
      'Workflow automation with human review',
      'Reviewable engineering outputs',
      'Practical productivity improvements',
    ],
  },
];
export default function Expertise() {
  return (
    <>
      <section className="pageHero">
        <span className="eyebrow">THE ENGINEERING TOOLKIT</span>
        <h1>
          Depth in the craft.
          <br />
          <em>Clarity in the system.</em>
        </h1>
        <p>
          Frontend engineering is the center of my practice. Architecture, accessibility, testing,
          and AI exploration help connect individual interactions to a dependable product.
        </p>
      </section>
      <section className="section">
        <div className="expertiseGrid">
          {expertise.map(([n, t, s, d], i) => (
            <a href={`#${domains[i].id}`} className="expertiseCard" key={n}>
              <div className="cardTop">
                {n}
                <Icon name={domains[i].icon} size={27} />
              </div>
              <h3>{t}</h3>
              <p className="cardSubtitle">{s}</p>
              <p>{d}</p>
              <Icon name="arrow" size={20} />
            </a>
          ))}
        </div>
      </section>
      <div className="detailLayout">
        <aside className="contents">
          <span className="eyebrow">EXPLORE THE PRACTICE</span>
          {domains.map((d) => (
            <a href={`#${d.id}`} key={d.id}>
              {d.title}
              <span>↗</span>
            </a>
          ))}
          <a href="#supporting">
            Supporting skills<span>↗</span>
          </a>
        </aside>
        <div className="articleBody">
          {domains.map((d, i) => (
            <section id={d.id} key={d.id}>
              <span className="eyebrow">
                0{i + 1} / {d.title}
              </span>
              <h2>
                {d.title}
                <span className="accent">.</span>
              </h2>
              <p className="lead">{d.intro}</p>
              <p>{d.body}</p>
              <div className="capabilityList">
                {d.details.map((t, j) => (
                  <article key={t}>
                    <span>0{j + 1}</span>
                    <h3>{t}</h3>
                    <Icon name="check" size={19} />
                  </article>
                ))}
              </div>
              <h3>Tools & patterns</h3>
              <div className="tags">
                {d.tools.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </section>
          ))}
          <section id="supporting">
            <span className="eyebrow">05 / A BROADER TOOLKIT</span>
            <h2>
              Connected to
              <br />
              <em>the whole workflow.</em>
            </h2>
            <h3>APIs & backend integration</h3>
            <p>
              Node.js, Express.js, REST APIs, Next.js route handlers, full-stack JavaScript, and
              authentication and authorization concepts support my frontend work.
            </p>
            <h3>Engineering tools</h3>
            <p>
              Git, GitHub, VS Code, Jira, npm, Linux environments, ESLint, and Prettier. My wider
              experience includes enterprise automation and Tosca-based end-to-end testing,
              alongside CI/CD, Jenkins, and Azure concepts.
            </p>
            <p className="subtleNote">
              Depth varies by tool and project. Tool familiarity is distinct from specialist
              expertise or production ownership.
            </p>
            <a className="button primary" href="/contact/">
              Discuss your engineering challenge <Icon name="arrow" />
            </a>
          </section>
        </div>
      </div>
    </>
  );
}
