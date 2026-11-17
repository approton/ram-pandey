import { topics } from './questions.mjs';

// Build from the same public data used by the portfolio and digital resume.
export function buildKnowledge(resume, projects, expertise, services) {
  const entry = (id, label, keywords, answer, href = '/resume/') => ({
    id,
    label,
    keywords,
    answer,
    href,
    link: `Explore ${label.toLowerCase()}`,
  });
  return [
    ...topics.map((topic) =>
      topic.id === 'about'
        ? { ...topic, keywords: ['about', 'who', 'location', 'pune', 'deoria'] }
        : topic.id === 'projects'
          ? { ...topic, keywords: ['project', 'projects', 'portfolio'] }
          : topic.id === 'work'
            ? { ...topic, keywords: ['work', 'job', 'company', 'role', 'working'] }
            : topic,
    ),
    entry(
      'education',
      'Education',
      [
        'education',
        'educational',
        'qualification',
        'qualifications',
        'study',
        'studied',
        'college',
        'university',
        'degree',
        'graduation',
        'btech',
        'b tech',
      ],
      resume.education
        .map((item) => `${item.name}, ${item.location} (${item.dates}). ${item.bullets.join(' ')}`)
        .join('\n\n'),
    ),
    entry(
      'certificates',
      'Certifications',
      ['certifications', 'certificates', 'certification', 'certified', 'courses'],
      `Ram’s certifications include ${resume.certificates.join('; ')}.`,
    ),
    entry(
      'awards',
      'Awards',
      ['awards', 'award', 'achievement', 'achievements', 'recognition'],
      resume.awards.map((item) => `${item.name}: ${item.bullets.join(' ')}`).join('\n\n'),
    ),
    entry(
      'languages',
      'Languages',
      ['languages', 'language', 'speak', 'spoken'],
      `Ram speaks ${resume.languages.join(' and ')}.`,
    ),
    ...resume.education.map((item, i) =>
      entry(
        `education-${i}`,
        i === 0 ? 'College degree' : i === 1 ? 'Intermediate education' : 'High school',
        i === 0
          ? ['bachelor', 'engineering college', 'babu banarasi das', 'lucknow', 'college marks']
          : i === 1
            ? ['intermediate', '12th', 'higher secondary']
            : ['10th', 'high school', 'cgpa'],
        `${item.name}, ${item.location} (${item.dates}). ${item.bullets.join(' ')}`,
      ),
    ),
    ...resume.jobs.map((item, i) =>
      entry(
        `job-${i}`,
        item.organization,
        [item.organization, ...item.organization.split(' ')],
        `${item.role} at ${item.organization}, ${item.location}. ${item.bullets.slice(0, 3).join(' ')}`,
      ),
    ),
    ...resume.skills.map((item, i) =>
      entry(
        `skill-${i}`,
        item.label,
        [item.label, ...item.text.split(/[,;]/).map((text) => text.trim())],
        `${item.label}: ${item.text}`,
        '/expertise/',
      ),
    ),
    ...projects.map((item) =>
      entry(
        `project-${item.slug}`,
        item.title,
        [
          item.title,
          item.slug.replaceAll('-', ' '),
          ...item.title.split(' ').filter((word) => word.length > 3),
        ],
        `${item.description} ${item.approach} ${item.note || ''}`,
        `/projects/${item.slug}/`,
      ),
    ),
    ...resume.projects
      .filter(
        (item) =>
          !projects.some((project) => project.title.toLowerCase() === item.name.toLowerCase()),
      )
      .map((item, i) =>
        entry(
          `resume-project-${i}`,
          item.name,
          [item.name, ...item.name.split(' ').filter((word) => word.length > 3)],
          `${item.name}. ${item.bullets.join(' ')}`,
        ),
      ),
    ...expertise.map((item, i) =>
      entry(`expertise-${i}`, item[1], [item[1]], `${item[2]} ${item[3]}`, '/expertise/'),
    ),
    ...services.map((item, i) =>
      entry(
        `service-${i}`,
        item[1],
        [item[1], 'services ' + item[1]],
        `${item[3]} This includes ${item[4].join(', ')}.`,
        '/services/',
      ),
    ),
  ];
}
