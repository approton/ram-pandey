'use client';
import Link from 'next/link';
import { useState } from 'react';
import { projects } from '@/data/profile';
import Icon from '../Icon/Icon';
export function ProjectVisual({ project: p }) {
  return (
    <div className={`projectVisual ${p.color}`} aria-hidden="true">
      <div className="visualGrid" />
      <span className="visualIndex">PROJECT / {p.number}</span>
      {p.slug === 'vyom' ? (
        <div className="terminalWindow">
          <div className="terminalDots">
            <i />
            <i />
            <i />
            <span>vyom / workspace</span>
          </div>
          <p>
            <span>❯</span> vyom develop
          </p>
          <small>task → context → implementation</small>
          <div className="codeLine" />
          <div className="codeLine short" />
          <span className="terminalReady">● ENGINEERING, CONNECTED</span>
        </div>
      ) : p.slug === 'the-watcher' ? (
        <div className="watcherVisual">
          <div className="watcherEye">
            <Icon name="shield" size={52} />
            <i />
          </div>
          <span>THE WATCHER</span>
          <div className="watcherChecks">
            <span>
              <Icon name="check" size={13} /> Production rules
            </span>
            <span>
              <Icon name="check" size={13} /> Code quality
            </span>
          </div>
        </div>
      ) : p.slug === 'income-tax-calculator' ? (
        <div className="calculatorVisual">
          <span>CLARITY IN EVERY CALCULATION</span>
          <div className="calculatorValue">
            ₹ <i>— — —</i>
          </div>
          <div className="calculatorBars">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <small>Income · Inputs · Results</small>
        </div>
      ) : p.slug === 'omnext' ? (
        <div className="omVisual">
          <strong>
            om<span>next</span>
            <i>↗</i>
          </strong>
          <p>One connected possibility.</p>
          <div>
            <span>BUILD</span>
            <span>CONNECT</span>
            <span>EVOLVE</span>
          </div>
        </div>
      ) : (
        <div className="pilotVisual">
          <Icon name="spark" size={40} />
          <strong>Your next chapter.</strong>
          <span>Discover → Evaluate → Decide</span>
        </div>
      )}
      <span className="visualCaption">
        {p.live ? 'PROJECT VISUAL' : 'ILLUSTRATIVE PROJECT VISUAL'}
      </span>
    </div>
  );
}
export default function Projects({ filterable = false, limit }) {
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const shown = projects
    .filter(
      (p) =>
        (filter === 'All' || p.category === filter) &&
        `${p.title} ${p.description} ${p.stack.join(' ')}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    )
    .slice(0, limit || projects.length);
  return (
    <>
      {filterable && (
        <div className="projectControls">
          <div className="filters" aria-label="Project categories">
            {['All', 'Developer tools', 'Web applications', 'AI & automation'].map((f) => (
              <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
          <label className="projectSearch">
            <Icon name="search" size={18} />
            <span className="srOnly">Search projects</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              type="search"
            />
          </label>
        </div>
      )}
      <div className="projectsGrid">
        {shown.map((p) => (
          <article className="projectCard" key={p.slug}>
            <Link
              href={`/projects/${p.slug}/`}
              className="projectVisualLink"
              aria-label={`Explore ${p.title}`}
            >
              <ProjectVisual project={p} />
            </Link>
            <div className="projectInfo">
              <span className="projectCategory">{p.category}</span>
              <div className="projectTitle">
                <h3>
                  <Link href={`/projects/${p.slug}/`}>{p.title}</Link>
                </h3>
                <Link
                  href={`/projects/${p.slug}/`}
                  className="roundArrow"
                  aria-label={`Read about ${p.title}`}
                >
                  <Icon name="arrow" />
                </Link>
              </div>
              <p className="projectLabel">{p.label}</p>
              <p>{p.description}</p>
              <div className="tags">
                {p.stack.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <div className="projectBottom">
                <span>
                  <i className={p.live ? 'liveDot' : ''} />
                  {p.status}
                </span>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer">
                    Visit site <Icon name="arrow" size={14} />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      {filterable && (
        <p className="filterResult" role="status">
          {shown.length
            ? `${shown.length} project${shown.length === 1 ? '' : 's'} shown`
            : 'No matching projects. Try another search or category.'}
        </p>
      )}
    </>
  );
}
