import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="pageHero">
      <span className="eyebrow">404 / A LITTLE OFF THE PATH</span>
      <h1>
        Let’s get you
        <br />
        <em>back on track.</em>
      </h1>
      <p>This page could not be found.</p>
      <Link className="button primary" href="/">
        Back home ↗
      </Link>
    </section>
  );
}
