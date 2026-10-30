export const profile = {
  name: 'Ram Niwash Pandey',
  email: 'pandey.ram1397@gmail.com',
  phone: '+91-8874913546',
  location: 'Pune, India',
  github: 'https://github.com/approton',
  linkedin: 'https://www.linkedin.com/in/ram-niwash-pandey-2580ab172/',
  instagram: 'https://www.instagram.com/itsram.n.p',
};
export const projects = [
  {
    slug: 'vyom',
    title: 'Vyom',
    category: 'Developer tools',
    label: 'From task context to engineering action.',
    description:
      'A personal developer automation CLI focused on bringing task context, workspace knowledge, and AI-assisted engineering into one workflow.',
    stack: ['Developer CLI', 'AI workflows', 'MCP'],
    status: 'Personal engineering initiative',
    number: '01',
    icon: 'code',
    color: 'violet',
    problem:
      'Engineering work starts with context: a task, a design, an existing codebase, and the conventions that connect them. Switching between these sources can make implementation feel fragmented.',
    approach:
      'Vyom explores a workspace-aware command-line workflow that brings relevant context closer to implementation. Its direction includes interpreting tasks, connecting engineering tools, and assisting development with reviewable outputs.',
    capabilities: [
      'Workspace-aware developer commands',
      'Task interpretation and implementation context',
      'Exploration of Jira and Figma integrations',
      'MCP-based tool integration',
      'AI-assisted development with human review',
    ],
    flow: [
      'Task context',
      'Workspace understanding',
      'Assisted implementation',
      'Developer review',
    ],
    focus: [
      [
        'Context before code',
        'A useful assistant needs to understand the workspace and requirements before proposing a change.',
      ],
      [
        'Composable integrations',
        'Keep adapters for engineering tools separate from the core development workflow.',
      ],
      [
        'Reviewable output',
        'Changes should be understandable and subject to normal engineering review.',
      ],
    ],
    note: 'Integration ideas are described as planned or explored capabilities. A public release and project-specific repository are not configured here.',
  },
  {
    slug: 'the-watcher',
    title: 'The Watcher',
    category: 'Developer tools',
    label: 'A second set of eyes on your code.',
    description:
      'A code-monitoring tool that checks work against production rules, code-quality expectations, and engineering conventions.',
    stack: ['Code monitoring', 'Production rules', 'Code quality'],
    status: 'Personal engineering project',
    number: '02',
    icon: 'shield',
    color: 'cyan',
    problem:
      'As a codebase evolves, individual changes can drift from production conventions. Teams need a way to bring engineering rules and quality expectations into the development feedback loop.',
    approach:
      'The Watcher watches code and checks it against production rules and code-quality expectations. Its purpose is to make potential issues easier to see while the work is still in progress.',
    capabilities: [
      'Observe changes in the development workflow',
      'Compare code against production rules',
      'Surface code-quality concerns',
      'Support consistency with engineering conventions',
      'Bring quality feedback closer to implementation',
    ],
    flow: ['Code changes', 'Production rules', 'Quality checks', 'Review findings'],
    focus: [
      [
        'Rules in context',
        'Quality guidance is most useful when it reflects the conventions of the actual product.',
      ],
      [
        'Actionable findings',
        'Feedback should help a developer identify what needs attention and why.',
      ],
      [
        'Engineering judgment',
        'Automated checks support review and complement the engineer’s understanding of the system.',
      ],
    ],
    note: 'Description reflects the project information supplied by Ram. Implementation details, a public repository, and a live demo have not been supplied.',
  },
  {
    slug: 'income-tax-calculator',
    title: 'Income Tax Calculator',
    category: 'Web applications',
    label: 'Bring clarity to the numbers.',
    description:
      'A web-based income-tax calculator available as a standalone application. Open the live tool to explore its current calculation workflow.',
    stack: ['Web application', 'Financial utility', 'Interactive forms'],
    status: 'Live application',
    number: '03',
    icon: 'layers',
    color: 'green',
    live: 'https://calculate-tax-nine.vercel.app',
    problem:
      'Income-tax questions involve inputs and assumptions that can be difficult to follow without a clear interface.',
    approach:
      'A dedicated calculator gives visitors a focused place to enter their details and explore the application’s tax-calculation workflow.',
    capabilities: [
      'Dedicated income-tax calculation interface',
      'Browser-based access',
      'An interactive input-to-result workflow',
      'Standalone live deployment',
    ],
    flow: ['Enter details', 'Review inputs', 'Calculate', 'Explore results'],
    focus: [
      [
        'Input clarity',
        'Financial utilities benefit from clear labels, understandable values, and visible assumptions.',
      ],
      [
        'Readable results',
        'A useful result should be easy to interpret in the context of the inputs.',
      ],
      [
        'Scope awareness',
        'Use the live application for its current supported tax years, rules, and calculation details.',
      ],
    ],
    note: 'The live link was supplied by Ram. Tax-rule accuracy and calculation coverage have not been independently audited. This portfolio does not provide tax advice.',
  },
  {
    slug: 'omnext',
    title: 'Omnext',
    category: 'Web applications',
    label: 'Connected software. Practical possibilities.',
    description:
      'A modular business-software initiative exploring web applications, SaaS experiences, and connected operational workflows.',
    stack: ['Business software', 'SaaS', 'Modular interfaces'],
    status: 'Live site · initiative in development',
    number: '04',
    icon: 'layers',
    color: 'amber',
    live: 'https://omnext.vercel.app',
    problem:
      'Businesses often work across disconnected processes. A coherent software experience can make everyday operations easier to understand and manage.',
    approach:
      'Omnext explores a modular direction for business applications. Areas of interest include SaaS tools, hospitality technology, booking journeys, billing, and checkout experiences.',
    capabilities: [
      'Business-oriented web experiences',
      'Modular SaaS direction',
      'Hospitality workflow exploration',
      'Booking and billing concepts',
      'A connected interface across operational tasks',
    ],
    flow: ['Business need', 'Feature modules', 'Connected workflows', 'Useful outcomes'],
    focus: [
      [
        'Domain understanding',
        'Start with the real operational workflow before choosing a software abstraction.',
      ],
      [
        'Modular growth',
        'Use clear feature boundaries so the platform can evolve with business needs.',
      ],
      [
        'Consistent interaction',
        'Make different workflows feel like parts of one coherent product.',
      ],
    ],
    note: 'The live Omnext site is linked below. The areas described here include exploration and development directions rather than a claim that every module is complete.',
  },
  {
    slug: 'applypilot',
    title: 'ApplyPilot',
    category: 'AI & automation',
    label: 'A more intentional next chapter.',
    description:
      'An AI-assisted job-application platform concept focused on opportunity discovery, fit evaluation, and human-reviewed application workflows.',
    stack: ['AI assistance', 'Workflow design', 'Human review'],
    status: 'Product concept · planned capabilities',
    number: '05',
    icon: 'spark',
    color: 'pink',
    problem:
      'Job searching often spans scattered opportunities, repetitive evaluation, and fragmented tracking.',
    approach:
      'Explore an assistant that helps discover opportunities and evaluate fit while keeping the person in control of application decisions.',
    capabilities: [
      'Opportunity discovery',
      'Profile matching and eligibility evaluation',
      'Resume-based assessment',
      'Human review before submission',
      'Application tracking',
    ],
    flow: ['Discover', 'Evaluate fit', 'Human review', 'Track progress'],
    focus: [
      ['Human control', 'A person should make the decision before an application is submitted.'],
      [
        'Relevant matching',
        'Evaluation should reflect the candidate’s actual profile and the role requirements.',
      ],
      ['Responsible assistance', 'Privacy and platform rules matter throughout the workflow.'],
    ],
    note: 'A concept with planned capabilities. Public availability and completed functionality are not claimed.',
  },
];
export const expertise = [
  [
    '01',
    'Frontend engineering',
    'Interfaces that feel effortless.',
    'React, Next.js, JavaScript, responsive design, reusable components, and thoughtful state management.',
  ],
  [
    '02',
    'Systems that scale',
    'A strong foundation for what’s next.',
    'Modular architecture, micro-frontends, design systems, code splitting, and maintainable component boundaries.',
  ],
  [
    '03',
    'Accessible by design',
    'Good software includes everyone.',
    'Semantic HTML, keyboard navigation, focus management, ARIA, screen readers, and WCAG-informed engineering.',
  ],
  [
    '04',
    'AI-enabled applications',
    'Practical intelligence. Human intent.',
    'LLM integration, developer automation, agentic workflows, and exploration of MCP-based tools.',
  ],
];
