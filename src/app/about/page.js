import AboutNarrative from '@/components/ScrollTyping/AboutNarrative';
import { getExperience } from '@/lib/experience.mjs';
import PortraitAvatar from '@/components/PortraitAvatar/PortraitAvatar';
import Link from 'next/link';
import Experience from '@/components/Experience/Experience';
import ScrollTyping from '@/components/ScrollTyping/ScrollTyping';
import Image from 'next/image';
import Icon from '@/components/Icon/Icon';
import ContactActions, { SocialLinks } from '@/components/ContactActions/ContactActions';
export const metadata = {
  title: 'About — The Engineer, the Work, the Journey',
  description:
    'Get to know Ram Niwash Pandey: his role at HCLSoftware BigFix, frontend engineering experience, approach to accessible systems, and journey from Deoria to Pune.',
  alternates: { canonical: '/about/' },
};
const sections = [
  ['story', 'My story'],
  ['work', 'What I do'],
  ['experience', 'My experience'],
  ['principles', 'How I think'],
  ['beyond', 'Beyond the role'],
  ['connect', 'Connect'],
];
export default function About() {
  return (
    <>
      <section className="pageHero aboutHero">
        <div>
          <span className="eyebrow">THE ENGINEER · THE PERSON · THE JOURNEY</span>
          <div className="aboutHeadingRow">
            <h1>
              More than
              <br />
              <em>a job title.</em>
            </h1>
            <PortraitAvatar />
          </div>
          <p>
            I’m Ram Niwash Pandey. I build frontend systems, solve product problems, and care about
            the person on the other side of the screen.
          </p>
          <div className="tags">
            <span>
              <Icon name="location" size={14} /> Pune, India
            </span>
            <span>Senior Software Engineer I</span>
            <span>HCLSoftware · BigFix</span>
          </div>
        </div>
        <figure className="aboutPortrait aboutDesktopPortrait">
          <Image
            src="/images/profile/ram-pandey-cutout.png"
            width={1254}
            height={1254}
            alt="Ram Niwash Pandey, portrait in a dark suit"
            priority
          />
          <figcaption className="srOnly">Ram Niwash Pandey, Senior Software Engineer.</figcaption>
        </figure>
      </section>
      <div className="detailLayout">
        <aside className="contents">
          <span className="eyebrow">ON THIS PAGE</span>
          {sections.map(([id, t]) => (
            <a href={`#${id}`} key={id}>
              {t}
              <span>↗</span>
            </a>
          ))}
          <div className="contentsNote">
            <span className="statusDot" /> Open to meaningful
            <br />
            engineering conversations.
          </div>
        </aside>
        <div className="articleBody">
          <section id="story">
            <span className="eyebrow">01 / MY STORY</span>
            <h2>
              Curiosity brought me here.
              <br />
              <em>Craft keeps me moving.</em>
            </h2>
            <p className="lead">
              My work sits between product intent and the engineering decisions that make it real.
            </p>
            <AboutNarrative initialSnapshot={getExperience()} />
            <div className="profileFacts">
              <div>
                <small>BASED IN</small>
                <strong>Pune, Maharashtra</strong>
              </div>
              <div>
                <small>ROOTS IN</small>
                <strong>Deoria, Uttar Pradesh</strong>
              </div>
              <div>
                <small>CURRENT FOCUS</small>
                <strong>Frontend systems & AI tools</strong>
              </div>
              <div>
                <small>EXPERIENCE</small>
                <strong>
                  <Experience />
                </strong>
                <span className="experienceAsOf">
                  As of <Experience display="month" />
                </span>
              </div>
            </div>
          </section>
          <section id="work">
            <span className="eyebrow">02 / WHAT I DO</span>
            <h2>
              Enterprise problems.
              <br />
              <em>Human-scale solutions.</em>
            </h2>
            <p className="lead">
              I currently work as a Senior Software Engineer I at HCLSoftware, contributing to
              BigFix.
            </p>
            <ScrollTyping>
              My role includes enterprise frontend engineering, reusable component architecture,
              accessibility improvements, UI modernization, and scalable React application patterns.
              I work on the interactions that connect complex device-management capabilities to the
              people using them.
            </ScrollTyping>
            <div className="detailCardGrid">
              {[
                [
                  'code',
                  'Reusable UI engineering',
                  'Building and improving components that support consistent behavior across enterprise interfaces. Reusability means clear contracts, predictable interactions, and maintainable implementation.',
                ],
                [
                  'layers',
                  'Device-management experiences',
                  'Contributing to device exploration, listings, grouping, tags, overview screens, filtering, and enterprise management journeys. The goal is to make complex operational information easier to navigate.',
                ],
                [
                  'shield',
                  'Accessibility in practice',
                  'Working on keyboard navigation, focus management, screen-reader behavior, accessible controls, and interaction improvements that help more people use the product.',
                ],
                [
                  'spark',
                  'Engineering collaboration',
                  'Participating in implementation planning, technical discussions, pull requests, and code reviews. Good software depends on shared understanding as much as individual implementation.',
                ],
              ].map(([icon, title, body]) => (
                <article className="glassCard" key={title}>
                  <Icon name={icon} size={27} />
                  <h3>{title}</h3>
                  <ScrollTyping>{body}</ScrollTyping>
                </article>
              ))}
            </div>
            <p className="subtleNote">
              Employer contributions are described at a general level. Proprietary code, internal
              designs, and customer information are not reproduced here.
            </p>
          </section>
          <section id="experience">
            <span className="eyebrow">03 / EXPERIENCE</span>
            <p className="experienceSummary">
              <Experience /> · Started 18 January 2021 · As of <Experience display="month" />
            </p>
            <h2>
              A foundation built
              <br />
              <em>across disciplines.</em>
            </h2>
            <div className="careerItem">
              <span className="careerDot" />
              <div className="careerMeta">
                <span>CURRENT ROLE</span>
                <small>HCLSoftware · BigFix</small>
              </div>
              <h3>Senior Software Engineer I</h3>
              <ScrollTyping>
                Enterprise frontend engineering, component design, accessibility, and maintainable
                React applications. Working with engineering teams to turn implementation
                requirements into consistent user experiences.
              </ScrollTyping>
              <div className="tags">
                <span>React</span>
                <span>Enterprise UI</span>
                <span>Accessibility</span>
                <span>Component architecture</span>
              </div>
            </div>
            <div className="careerItem">
              <span className="careerDot" />
              <div className="careerMeta">
                <span>EARLIER EXPERIENCE</span>
                <small>Engineering foundations</small>
              </div>
              <h3>Systems, automation & software</h3>
              <ScrollTyping>
                Earlier work includes network engineering, enterprise automation, Tosca-based
                end-to-end testing, and software engineering. Those experiences strengthened my
                attention to reliability, repeatable workflows, debugging, and the end-to-end
                behavior of a system.
              </ScrollTyping>
            </div>
            <div className="careerItem">
              <span className="careerDot" />
              <div className="careerMeta">
                <span>PERSONAL WORK</span>
                <small>Building beyond the day job</small>
              </div>
              <h3>Developer tools & product exploration</h3>
              <ScrollTyping>
                Vyom explores developer automation. The Watcher brings production rules and
                code-quality checks into development. Income Tax Calculator is a standalone web
                utility, while Omnext explores modular business software. ApplyPilot represents an
                AI-assisted product direction.
              </ScrollTyping>
              <Link href="/projects/" className="textLink">
                Explore the projects <Icon name="arrow" size={17} />
              </Link>
            </div>
          </section>
          <section id="principles">
            <span className="eyebrow">04 / HOW I THINK</span>
            <h2>
              The decisions behind
              <br />
              <em>the interface.</em>
            </h2>
            <div className="principleList">
              {[
                [
                  'Understand before implementing',
                  'Start with the user journey, business need, and actual constraints. A clear problem definition makes the technical decisions sharper.',
                ],
                [
                  'Keep boundaries clear',
                  'Build focused components and modules. Shared primitives should reduce friction without hiding important behavior behind unnecessary abstractions.',
                ],
                [
                  'Make quality part of the workflow',
                  'Treat keyboard support, error states, testing, security, and performance as design inputs. They work best when they shape implementation from the beginning.',
                ],
                [
                  'Use AI with engineering judgment',
                  'AI can accelerate exploration and repetitive tasks. Context, reviewable output, human oversight, and an understanding of the codebase remain essential.',
                ],
                [
                  'Build for the next engineer',
                  'Readable code, predictable patterns, and explicit decisions help a product continue improving after the first version ships.',
                ],
              ].map(([t, d], i) => (
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
          <section id="beyond">
            <span className="eyebrow">05 / BEYOND THE ROLE</span>
            <h2>
              Rooted in Deoria.
              <br />
              <em>Building from Pune.</em>
            </h2>
            <p>
              My hometown is Deoria in Uttar Pradesh. Today I live and work in Pune, Maharashtra. My
              personal projects give me space to explore practical questions that come up in
              engineering and everyday workflows.
            </p>
            <p>
              I’m particularly interested in tools that remove repetitive effort, applications that
              clarify complex information, and frontend systems that balance product ambition with
              maintainability.
            </p>
            <blockquote className="inlineQuote">
              “Make the complex feel simple.”<small>A personal engineering principle.</small>
            </blockquote>
          </section>
          <section id="connect">
            <span className="eyebrow">06 / WHAT’S NEXT</span>
            <h2>
              Let’s build
              <br />
              <em>something useful.</em>
            </h2>
            <p>
              I’m open to discussing software-development opportunities, consulting engagements,
              collaborations, and suitable engineering roles. If your team values clear
              architecture, accessible interfaces, and thoughtful implementation, I’d like to hear
              about what you’re building.
            </p>
            <ContactActions />
            <SocialLinks />
          </section>
        </div>
      </div>
    </>
  );
}
