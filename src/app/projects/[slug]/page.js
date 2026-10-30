import { notFound } from 'next/navigation';
import { projects } from '@/data/profile';
import { ProjectVisual } from '@/components/Projects';
import Icon from '@/components/Icon';
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return {
    title: p ? `${p.title} — Project Details` : 'Project',
    description: p?.description,
    alternates: { canonical: `/projects/${slug}/` },
  };
}
export default async function ProjectDetail({ params }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <>
      <section className="pageHero projectDetailHero">
        <a href="/projects/" className="breadcrumb">
          ← Project workspace / {p.category}
        </a>
        <div className="projectHeroGrid">
          <div>
            <span className="eyebrow">
              PROJECT {p.number} / {p.category.toUpperCase()}
            </span>
            <h1>
              {p.title}
              <span className="accent">.</span>
            </h1>
            <p className="lead">{p.label}</p>
            <p>{p.description}</p>
            <div className="tags">
              {p.stack.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="buttonRow">
              {p.live && (
                <a
                  className="button primary"
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {p.slug === 'omnext' ? 'Visit Omnext' : 'Open live calculator'}
                  <Icon name="arrow" />
                </a>
              )}
              <a className="button secondary" href="#overview">
                Explore the project ↓
              </a>
            </div>
            <span className="projectStatusPill">
              <span className="statusDot" />
              {p.status}
            </span>
          </div>
          <ProjectVisual project={p} />
        </div>
      </section>
      <div className="detailLayout">
        <aside className="contents">
          <span className="eyebrow">PROJECT EXPLORER</span>
          {[
            ['overview', 'Overview'],
            ['capabilities', 'Capabilities'],
            ['workflow', 'Workflow'],
            ['engineering', 'Engineering focus'],
            ['status', 'Status & links'],
          ].map(([id, t]) => (
            <a key={id} href={`#${id}`}>
              {t}
              <span>↗</span>
            </a>
          ))}
          <a href="/projects/">← All projects</a>
        </aside>
        <div className="articleBody">
          <section id="overview">
            <span className="eyebrow">01 / THE WHY</span>
            <h2>
              The problem
              <br />
              <em>worth solving.</em>
            </h2>
            <p className="lead">{p.problem}</p>
            <h3>The approach</h3>
            <p>{p.approach}</p>
          </section>
          <section id="capabilities">
            <span className="eyebrow">02 / THE SCOPE</span>
            <h2>
              What it’s
              <br />
              <em>designed around.</em>
            </h2>
            <div className="capabilityList">
              {p.capabilities.map((item, i) => (
                <article key={item}>
                  <span>0{i + 1}</span>
                  <h3>{item}</h3>
                  <Icon name="check" />
                </article>
              ))}
            </div>
          </section>
          <section id="workflow">
            <span className="eyebrow">03 / THE FLOW</span>
            <h2>
              From input
              <br />
              <em>to useful output.</em>
            </h2>
            <div className="workflowDiagram" aria-label="Conceptual project workflow">
              {p.flow.map((step, i) => (
                <div key={step}>
                  <span>0{i + 1}</span>
                  <Icon name={i === 0 ? p.icon : i === 3 ? 'check' : 'layers'} size={28} />
                  <strong>{step}</strong>
                  {i < p.flow.length - 1 && <i>→</i>}
                </div>
              ))}
            </div>
            <p className="subtleNote">A conceptual view of the project’s intended workflow.</p>
          </section>
          <section id="engineering">
            <span className="eyebrow">04 / ENGINEERING PERSPECTIVE</span>
            <h2>
              The thinking
              <br />
              <em>behind the tool.</em>
            </h2>
            <div className="principleList">
              {p.focus.map(([t, d], i) => (
                <article key={t}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section id="status">
            <span className="eyebrow">05 / CURRENT STATUS</span>
            <h2>
              Where it
              <br />
              <em>stands today.</em>
            </h2>
            <p className="lead">{p.status}</p>
            <p>{p.note}</p>
            <div className="buttonRow">
              {p.live && (
                <a
                  href={p.live}
                  className="button primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit {p.title}
                  <Icon name="arrow" />
                </a>
              )}
              <a className="button secondary" href="/contact/">
                Ask me about this project
                <Icon name="arrow" />
              </a>
            </div>
            {p.live && (
              <p className="liveAddress">
                <a href={p.live} target="_blank" rel="noopener noreferrer">
                  {p.live}
                </a>
              </p>
            )}
          </section>
        </div>
      </div>
      <section className="section">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">KEEP EXPLORING</span>
            <h2>
              Another angle.
              <br />
              <em>Another possibility.</em>
            </h2>
          </div>
          <a href="/projects/" className="textLink">
            All projects <Icon name="arrow" />
          </a>
        </div>
        <div className="relatedProjects">
          {projects
            .filter((other) => other.slug !== p.slug)
            .slice(0, 3)
            .map((other) => (
              <a href={`/projects/${other.slug}/`} className="glassCard" key={other.slug}>
                <Icon name={other.icon} size={30} />
                <span className="eyebrow">{other.category}</span>
                <h3>{other.title}</h3>
                <p>{other.label}</p>
                <Icon name="arrow" />
              </a>
            ))}
        </div>
      </section>
    </>
  );
}
