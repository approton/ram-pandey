import ProfileBanner from '@/components/ProfileBanner';
import Scene from '@/components/Scene';
import Icon from '@/components/Icon';
import ContactActions, { SocialLinks } from '@/components/ContactActions';
import Link from 'next/link';
import { expertise } from '@/data/profile';
import Projects from '@/components/Projects';
import ContactForm from '@/components/ContactForm';
import styles from './page.module.css';
export const metadata = { alternates: { canonical: '/' } };
export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <div className="availability">
            <span className="statusDot" /> OPEN TO WHAT’S NEXT
          </div>
          <p className={styles.hello}>
            Hello, I’m Ram Pandey <span>↗</span>
          </p>
          <h1>
            Engineering
            <br />
            <span>beyond the</span>
            <br />
            <em>interface.</em>
          </h1>
          <p className={styles.intro}>
            Senior Software Engineer building scalable systems, accessible experiences, and
            practical AI tools. A little curiosity. A lot of intention.
          </p>
          <div className="buttonRow">
            <a className="button primary" href="/projects/">
              Enter my workspace <Icon name="arrow" />
            </a>
            <a className="button secondary" href="/about/">
              Meet the engineer <Icon name="arrow" />
            </a>
          </div>
          <div className={styles.heroFoot}>
            <SocialLinks />
            <span>
              <Icon name="location" size={16} /> PUNE, INDIA
            </span>
          </div>
        </div>
        <div className={styles.visualStage}>
          <div className={styles.wordCloud} aria-hidden="true">
            <span>React</span>
            <span>systems.</span>
            <span>&lt;create /&gt;</span>
            <span>AI × intent</span>
            <span>Next.js</span>
            <span>think → build</span>
          </div>
          <Scene />
          <div className={styles.profileSlot}>
            <ProfileBanner />
          </div>
          <div className={styles.floatingChip}>
            <Icon name="code" />
            <span>
              Thoughtful code.<small>Meaningful impact.</small>
            </span>
          </div>
          <div className={styles.orbitLabel}>REACT · NEXT.JS · SYSTEMS · AI</div>
          <div className={styles.stageCaption}>
            <span>CREATIVE ENGINEERING / MOVE TO EXPLORE</span>
            <span>01 — INFINITE POSSIBILITIES</span>
          </div>
        </div>
        <a href="#overview" className={styles.scroll}>
          <span className={styles.mouse} /> SCROLL INTO MY WORLD ↓
        </a>
      </section>
      <div className="techStrip" aria-label="Core technologies">
        <span>REACT</span>
        <i>✳</i>
        <span>NEXT.JS</span>
        <i>✳</i>
        <span>JAVASCRIPT</span>
        <i>✳</i>
        <span>FRONTEND ARCHITECTURE</span>
        <i>✳</i>
        <span>AI-ENABLED APPLICATIONS</span>
      </div>
      <section className="section" id="overview">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">01 / THE ENGINEER BEHIND THE INTERFACE</span>
            <h2>
              Great software starts
              <br />
              with <em>better questions.</em>
            </h2>
          </div>
          <Link className="textLink" href="/about/">
            More about me ↗
          </Link>
        </div>
        <div className="aboutGrid">
          <div className="statement">
            “Make the complex
            <br />
            feel <span className="accent">simple.</span>”<small>MY APPROACH TO ENGINEERING</small>
          </div>
          <div>
            <p className="lead">
              I build at the intersection of thoughtful design and dependable engineering.
            </p>
            <p>
              From reusable enterprise components to modular frontend systems, my focus is on making
              software easier to use, maintain, and evolve. I care about the details people feel: a
              clear interaction, a fast response, a keyboard journey that simply works.
            </p>
            <p>
              Based in Pune, with roots in Deoria, Uttar Pradesh, I bring approximately six years of
              engineering experience across frontend development, automation, and testing.
            </p>
            <div className="miniStats">
              <div>
                <strong>~6 years</strong>
                <span>Engineering experience</span>
              </div>
              <div>
                <strong>HCLSoftware</strong>
                <span>Senior Software Engineer I · BigFix</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="expertise">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">02 / WHAT I BRING TO THE TABLE</span>
            <h2>
              Depth in the details.
              <br />
              <em>Clarity in the big picture.</em>
            </h2>
          </div>
          <Link className="textLink" href="/expertise/">
            Explore expertise ↗
          </Link>
        </div>
        <div className="expertiseGrid">
          {expertise.map(([n, title, sub, body]) => (
            <article className="expertiseCard" key={n}>
              <div className="cardTop">
                <span>{n}</span>
                <span className="cardIcon">{['⌘', '◇', '◎', '✳'][Number(n) - 1]}</span>
              </div>
              <h3>{title}</h3>
              <p className="cardSubtitle">{sub}</p>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section" id="work">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">03 / IDEAS IN MOTION</span>
            <h2>
              Tools, products,
              <br />
              <em>and possibilities.</em>
            </h2>
          </div>
          <Link className="textLink" href="/projects/">
            All project details ↗
          </Link>
        </div>
        <p className="sectionIntro">
          From developer automation and production-rule monitoring to financial utilities and
          business platforms. Explore each project’s purpose, engineering focus, status, and live
          links.
        </p>
        <Projects />
      </section>
      <section className="section experienceSection">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">04 / EXPERIENCE THAT SHAPES THE WORK</span>
            <h2>
              Enterprise scale.
              <br />
              <em>Everyday attention to detail.</em>
            </h2>
          </div>
        </div>
        <div className="timeline">
          <div className="timelineLabel">
            <span className="statusDot" /> CURRENT ROLE
          </div>
          <article>
            <span className="eyebrow">HCLSOFTWARE · BIGFIX</span>
            <h3>Senior Software Engineer I</h3>
            <p className="lead">Building clearer interfaces for complex enterprise workflows.</p>
            <p>
              My work spans reusable UI components, device management experiences, accessibility
              improvements, and maintainable React architecture. I collaborate through
              implementation planning, code reviews, and shared engineering decisions.
            </p>
            <div className="tags">
              <span>Enterprise React</span>
              <span>Reusable UI</span>
              <span>Accessibility</span>
              <span>Frontend architecture</span>
            </div>
          </article>
        </div>
        <div className="timeline">
          <div className="timelineLabel">THE FOUNDATION</div>
          <article>
            <h3>A broader engineering perspective</h3>
            <p>
              Earlier experience in network engineering, enterprise automation, and Tosca-based
              end-to-end testing shaped how I think about reliability, systems, and the complete
              user journey.
            </p>
          </article>
        </div>
        <Link className="textLink" href="/about/">
          Read the full story ↗
        </Link>
      </section>
      <section className="section">
        <div className="sectionHeading">
          <div>
            <span className="eyebrow">05 / HOW I WORK</span>
            <h2>
              From a good question
              <br />
              <em>to a useful product.</em>
            </h2>
          </div>
          <p className="sectionAside">
            A clear process creates space
            <br />
            for better decisions.
          </p>
        </div>
        <div className="processGrid">
          {[
            [
              '01',
              'Understand',
              'Start with people, the business problem, and the constraints. Define what useful actually looks like.',
            ],
            [
              '02',
              'Architect',
              'Choose clear boundaries, reusable patterns, and the simplest foundation that can grow.',
            ],
            [
              '03',
              'Build',
              'Translate the plan into purposeful interfaces, with accessibility and performance built in.',
            ],
            [
              '04',
              'Refine',
              'Test real journeys, listen to feedback, and improve the details that make a difference.',
            ],
          ].map(([n, t, d]) => (
            <article key={n}>
              <span className="processNumber">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section servicesSection">
        <span className="eyebrow">06 / LET’S MAKE SOMETHING USEFUL</span>
        <div className="sectionHeading">
          <h2>
            Your next idea.
            <br />
            <em>A thoughtful engineering partner.</em>
          </h2>
          <p className="sectionAside">
            Open to discussing consulting,
            <br />
            collaborations, and engineering roles.
          </p>
        </div>
        <div className="serviceList">
          {[
            [
              'React & Next.js development',
              'Modern websites, SaaS interfaces, and web applications.',
            ],
            [
              'Frontend architecture & design systems',
              'Reusable foundations that help products and teams evolve.',
            ],
            [
              'Performance & accessibility',
              'Faster, more inclusive experiences for the people using your product.',
            ],
            [
              'AI-enabled applications & automation',
              'Practical tools that simplify workflows and keep people in control.',
            ],
          ].map(([t, d], i) => (
            <Link href="/contact/" key={t}>
              <span className="eyebrow">0{i + 1}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
              <span className="serviceArrow">↗</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="quoteBand">
        <span>THE PRINCIPLE BEHIND THE PIXELS</span>
        <blockquote>
          “Good engineering is felt in
          <br />
          the things that <em>just work.</em>”
        </blockquote>
        <p>A personal design principle, from the first interaction to the last line of code.</p>
      </section>
      <section className="section contactSection" id="contact">
        <div>
          <span className="eyebrow">07 / THE NEXT CHAPTER STARTS WITH HELLO</span>
          <h2>
            Have something
            <br />
            in mind?
            <br />
            <em>Let’s talk.</em>
          </h2>
          <p>
            Tell me what you’re building, the challenge you’re facing, or the opportunity you’d like
            to discuss.
          </p>
          <ContactActions />
          <SocialLinks />
          <span className="eyebrow location">PUNE, MAHARASHTRA, INDIA</span>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
