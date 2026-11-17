export const topics = [
  {
    id: 'experience',
    label: 'Experience',
    keywords: ['experience', 'years', 'career', 'background', 'exp'],
    href: '/resume/',
    link: 'Digital resume',
  },
  {
    id: 'about',
    label: 'About Ram',
    keywords: ['about', 'who', 'ram', 'location', 'pune', 'where', 'deoria'],
    answer:
      'Ram is a software engineer based in Pune, Maharashtra, originally from Deoria, Uttar Pradesh. He builds scalable React applications with an emphasis on accessibility, reusable architecture, and clear user experiences.',
    href: '/about/',
    link: 'Meet Ram',
  },
  {
    id: 'skills',
    label: 'Skills',
    keywords: [
      'skills',
      'skill',
      'react',
      'next',
      'frontend',
      'tech',
      'stack',
      'javascript',
      'services',
      'help',
    ],
    answer:
      'Ram focuses on React, Next.js, JavaScript, reusable UI architecture, accessibility, and performance. You can reach out about frontend development, automation, AI-enabled tools, and consulting.',
    href: '/expertise/',
    link: 'Explore expertise',
  },
  {
    id: 'projects',
    label: 'Projects',
    keywords: [
      'project',
      'projects',
      'vyom',
      'watcher',
      'omnext',
      'tax',
      'applypilot',
      'portfolio',
    ],
    answer:
      'His projects include Vyom, The Watcher, Income Tax Calculator, Omnext, and ApplyPilot. The Watcher checks code against production rules and code-quality expectations. Explore the project pages for details and available links.',
    href: '/projects/',
    link: 'Explore projects',
  },
  {
    id: 'work',
    label: 'Current work',
    keywords: ['work', 'job', 'company', 'hcl', 'bigfix', 'infosys', 'role', 'working'],
    answer:
      'Ram is a Senior Software Engineer I at HCL Software, working on BigFix. His work includes frontend features, reusable components, performance, and accessibility. Previously, he worked at Infosys.',
    href: '/about/',
    link: 'More about his work',
  },
  {
    id: 'contact',
    label: 'Get in touch',
    keywords: [
      'contact',
      'email',
      'phone',
      'call',
      'hire',
      'hiring',
      'message',
      'connect',
      'opportunity',
    ],
    answer:
      'Email pandey.ram1397@gmail.com or call +91-8874913546. You can also use the form below. Share your project or role, team context, timing, and the kind of help you need.',
    href: '#contact-message',
    link: 'Write a message',
  },
  {
    id: 'resume',
    label: 'Resume',
    keywords: ['resume', 'cv', 'download'],
    answer:
      'You can read Ram’s digital resume with automatically updated experience, save it as a PDF, or download the original PDF.',
    href: '/resume/',
    link: 'Open digital resume',
  },
];
const stopWords = new Set(
  'a an the is are was were does do did can could would will i me my you your he his him ram pandey niwash tell about what which where how please know give and of in on to for has have'.split(
    ' ',
  ),
);
const normalize = (input) =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
const tokens = (input) =>
  normalize(input)
    .split(' ')
    .filter((word) => word && !stopWords.has(word));
export function matchTopic(input, knowledge = topics) {
  const query = normalize(input);
  const words = tokens(input);
  if (!words.length)
    return /\b(who|about|hello|hi)\b/.test(query)
      ? knowledge.find((topic) => topic.id === 'about')
      : null;
  const results = knowledge
    .map((topic) => {
      const aliases = [topic.label, ...topic.keywords].map(normalize);
      const exact = aliases.some((alias) => alias && ` ${query} `.includes(` ${alias} `));
      const keywordWords = new Set(aliases.flatMap(tokens));
      const hits = words.filter((word) => keywordWords.has(word)).length;
      const contentWords = new Set(tokens(topic.answer || ''));
      const contentHits = words.filter((word) => contentWords.has(word)).length;
      const score = (exact ? 12 : 0) + hits * 4 + contentHits;
      return {
        topic,
        score,
        relevant: exact || hits > 0 || (words.length > 1 && contentHits >= 2),
      };
    })
    .filter((item) => item.relevant)
    .sort((a, b) => b.score - a.score);
  if (results.length) return results[0].topic;
  // Short fragments such as �edu� and �ski� get an explicit interpretation.
  const fragments = words.filter((word) => word.length >= 3);
  if (!fragments.length) return null;
  const partials = knowledge
    .map((topic) => {
      const labelWords = tokens(topic.label);
      const aliasWords = topic.keywords.flatMap(tokens);
      const score = fragments.reduce(
        (sum, fragment) =>
          sum +
          (labelWords.some((word) => word.startsWith(fragment))
            ? 5
            : aliasWords.some((word) => word.startsWith(fragment))
              ? 1
              : 0),
        0,
      );
      return { topic, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);
  return partials.length ? { ...partials[0].topic, inferred: true } : null;
}
export function topicAnswer(topic, experience) {
  if (!topic)
    return 'I couldn’t find a reliable answer to that in Ram’s portfolio. Ask about education, experience, skills, certifications, projects, services, or contact details. For anything else, please send Ram a message.';
  const answer =
    topic.id === 'experience'
      ? `Ram has ${experience.duration} of professional engineering experience, focused on frontend development, reusable UI architecture, accessibility, automation, and testing.`
      : topic.answer;
  return topic.inferred
    ? `You might be asking about ${topic.label.toLowerCase()}. ${answer}`
    : answer;
}
