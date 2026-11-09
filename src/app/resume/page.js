import resume from '@/data/resume.json';
import Experience from '@/components/Experience/Experience';
import PrintButton from './PrintButton';
import styles from './resume.module.css';

export const metadata = {
  title: 'Digital resume — Ram Niwash Pandey',
  alternates: { canonical: '/resume/' },
};
function Bullets({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
function Entry({ title, dates, location, bullets }) {
  return (
    <div className={styles.entry}>
      <div className={styles.entryHeading}>
        <h3>{title}</h3>
        {dates && (
          <span>
            {dates} | {location}
          </span>
        )}
      </div>
      <Bullets items={bullets} />
    </div>
  );
}
function ProfileParagraph({ text }) {
  return (
    <p>
      {text.split('{experience}').map((part, i) => (
        <span key={i}>
          {i > 0 && <Experience />}
          {part}
        </span>
      ))}
    </p>
  );
}
export default function ResumePage() {
  return (
    <div className={styles.viewer}>
      <div className={styles.actions}>
        <PrintButton />
        <a href="/Ram-Pandey-Resume.pdf" download>
          Download original PDF
        </a>
      </div>
      <article className={styles.paper}>
        <div className={styles.sheet}>
          <div className={styles.heading}>
            <h1>{resume.name}</h1>
            <em>{resume.title}</em>
          </div>
          <address>
            {resume.contacts.map((c) =>
              c.href ? (
                <a key={c.label} href={c.href}>
                  {c.label}
                </a>
              ) : (
                <span key={c.label}>{c.label}</span>
              ),
            )}
          </address>
          <h2>Profile</h2>
          {resume.profile.map((text) => (
            <ProfileParagraph key={text} text={text} />
          ))}
          <h2>Professional Experience</h2>
          {resume.jobs.map((j) => (
            <Entry
              key={j.organization}
              title={
                <>
                  <strong>{j.organization}</strong>, {j.role}
                </>
              }
              {...j}
            />
          ))}
          <h2>Technical Skills</h2>
          {resume.skills.map((s) => (
            <p key={s.label}>
              <strong>{s.label}:</strong> {s.text}
            </p>
          ))}
        </div>
        <div className={styles.sheet}>
          <h2>Personal Projects</h2>
          {resume.projects.map((p) => (
            <Entry
              key={p.name}
              title={
                <>
                  <strong>{p.name}</strong>, <a href={p.url}>{p.url}</a>
                </>
              }
              bullets={p.bullets}
            />
          ))}
          <h2>Awards</h2>
          {resume.awards.map((a) => (
            <Entry key={a.name} title={a.name} bullets={a.bullets} />
          ))}
          <h2>Education</h2>
          {resume.education.map((e) => (
            <Entry key={e.name} title={e.name} {...e} />
          ))}
          <h2>Certificates</h2>
          <p>{resume.certificates.join('  |  ')}</p>
          <h2>Languages</h2>
          <p>{resume.languages.join('  |  ')}</p>
        </div>
      </article>
    </div>
  );
}
