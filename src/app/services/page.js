import { services } from '@/data/services';
import Link from 'next/link';
import ScrollTyping from '@/components/ScrollTyping/ScrollTyping';
import Icon from '@/components/Icon/Icon';
export const metadata = {
  title: 'Services — Engineering for Your Next Product',
  description:
    'Discuss React and Next.js applications, frontend architecture, accessibility, performance improvements, and AI-enabled workflows with Ram Pandey.',
  alternates: { canonical: '/services/' },
};
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
        <Link className="button primary" href="/contact/">
          Discuss your project <Icon name="arrow" />
        </Link>
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
                <ScrollTyping>{d}</ScrollTyping>
                <ul>
                  {list.map((item) => (
                    <li key={item}>
                      <Icon name="check" size={17} />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link className="textLink" href="/contact/">
                  Talk about {t.toLowerCase()} <Icon name="arrow" size={18} />
                </Link>
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
        <Link className="button primary" href="/contact/">
          Start with a conversation <Icon name="arrow" />
        </Link>
      </section>
    </>
  );
}
