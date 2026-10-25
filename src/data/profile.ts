// All biographical and career content on the site comes from this file, and
// everything in it is taken from Rowegie's resume. Keep it that way: no new
// employers, dates, metrics or links unless the resume (or Rowegie) supplies them.

// Company and project names are shown as text only: logos were removed on
// purpose, since using them can need the owner's permission.
// Stock and Transfer's client (Aboitiz), Traidify's new name (Lumitrade),
// BaseUp's new name (Yodelle) and the BBBolig dashboard project came from
// Rowegie; none of them is on the resume.

export type YearMonth = { year: number; month: number } // month is 1-12

export type Role = {
  title: string
  employer: string
  location: string
  start: YearMonth
  end: YearMonth
  duties: string[]
  tech: string[]
  // Show the Upwork client rating (see clientFeedback) on this entry.
  feedback?: true
}

export type Project = {
  name: string
  summary: string
  role: string
  context?: string
  work: string
  stack: string[]
  site?: { label: string; url: string }
  feedback?: true
}

export type SkillGroup = { name: string; items: string[] }

export type ProfileLink = {
  kind: 'linkedin' | 'upwork' | 'github'
  label: string
  url: string
  note?: string
}

export const profile = {
  name: 'Rowegie P. Lambojon',
  role: 'Full-stack developer, backend focus',
  location: 'Lapu-Lapu City, Cebu, Philippines',
  timezone: 'Philippine Time (UTC+8)',
  email: 'rowegie.lambojon@gmail.com',
  positioning:
    'I build the backend of business systems: REST APIs, integrations with other services, and the data behind them. Eight years of Python and Django across ERP, payments, traceability and scheduling products.',
  summary: [
    'I’m a backend developer with 8 years of experience in the information technology industry. Most of my work is building REST APIs, integrating with other APIs, and troubleshooting and debugging web applications.',
    'I also write unit tests and functional specifications for features based on customer requirements. On the frontend, I’ve built user interfaces with Vue.js and Angular and connected them to the APIs behind them.',
  ],
}

export const highlights = [
  {
    name: 'Product used at scale',
    text: 'Part of the engineering team at a startup whose product has been used by over 100,000 users, including businesses and clients.',
  },
  {
    name: 'Faster releases to QA',
    text: 'Wrote automation scripts that cut the time from building the application to releasing it for QA by 50%.',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    name: 'Backend',
    items: [
      'Python',
      'Django',
      'Django REST Framework',
      'FastAPI',
      'Flask',
      'Jinja',
      'Odoo',
      'pytest',
      'Selenium',
    ],
  },
  { name: 'Databases', items: ['PostgreSQL', 'MySQL', 'Redis'] },
  {
    name: 'Cloud and delivery',
    items: [
      'AWS (ECS, ECR, ALB, S3, RDS, KMS, Lambda, Step Functions, SQS, SNS)',
      'Terraform',
      'GitHub Actions',
      'Jenkins',
      'DigitalOcean',
    ],
  },
  { name: 'Frontend', items: ['Angular', 'Vue.js', 'React', 'JavaScript', 'HTML', 'CSS'] },
  { name: 'Operating systems', items: ['Linux', 'Ubuntu', 'macOS'] },
]

// Tripletex, Gmail and Google Calendar (BBBolig) and Polygon.io and the FRED API
// (Traidify/Lumitrade) came from Rowegie; they aren't on the resume.
export const integrations = [
  'Sage',
  'SAP',
  'Xendit',
  'PayMongo',
  'Square',
  'StoreHub',
  'Tripletex',
  'Gmail',
  'Google Calendar',
  'Polygon.io',
  'FRED API',
]

export const projects: Project[] = [
  {
    name: 'BBBolig Dashboard',
    summary:
      'A dashboard for a Norwegian company that brings its projects, trading robots, email and calendar into one overview.',
    role: 'Full Stack Developer',
    context: 'BBBolig',
    work: 'The Flask backend and Jinja templates, and integrations with Tripletex, the Gmail inbox and Google Calendar alongside the trading robots.',
    stack: ['Python', 'Flask', 'Jinja', 'PostgreSQL', 'Tripletex', 'Gmail', 'Google Calendar'],
    site: { label: 'bbbolig.com', url: 'https://bbbolig.com/' },
  },
  {
    name: 'Jetpack Shipping ERP',
    feedback: true,
    // Module list from Rowegie's screenshot of the app; the CI/CD pipeline
    // set-up comes from Rowegie (the resume says "took part in").
    summary:
      'An ERP for vitamin and supplement manufacturing, covering items and formulations, purchasing, accounting, manufacturing, quality assurance, R&D, sales and inventory, with dedicated batch, QC and warehouse terminals.',
    role: 'Python Developer',
    context: 'Jetpack Shipping',
    work: 'Backend features and ERP workflows, an e-signature service using AWS KMS, setting up the automated CI/CD deployment pipelines with GitHub Actions, and AWS resources provisioned with Terraform.',
    stack: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Terraform', 'AWS', 'GitHub Actions'],
    site: { label: 'jetpackshipping.io', url: 'https://jetpackshipping.io/' },
  },
  {
    name: 'Tracesense',
    summary: 'Recipe weighing and batch traceability for food manufacturers.',
    role: 'Software Engineer',
    context: 'Tracesense Ltd',
    work: 'REST APIs, integrations with other APIs, bug fixes, and functional specifications for new features.',
    stack: ['Python', 'Django', 'Django REST Framework', 'JavaScript', 'PostgreSQL', 'Redis'],
    site: { label: 'tracesense.com', url: 'https://tracesense.com/' },
  },
  {
    name: 'Yodelle',
    summary:
      'An all-in-one solution that simplifies online booking and appointment management for beauty clinics.',
    role: 'Senior Backend Developer',
    context: 'BaseUp Inc',
    work: 'API design, bug fixes, unit tests, data analysis, integrations with other APIs, and functional specifications.',
    stack: ['Python', 'Django', 'Django REST Framework', 'Angular', 'React', 'PostgreSQL'],
    site: { label: 'yodelle.us', url: 'https://www.yodelle.us/' },
  },
  {
    name: 'Traidify (now Lumitrade)',
    summary:
      'A platform that helps people with financial decisions such as investing in stocks and crypto.',
    role: 'Backend Engineer',
    work: 'REST APIs, integrations with Polygon.io and the FRED API, deployments, server optimization, and functional specifications for new features.',
    stack: [
      'Python',
      'Django',
      'Django REST Framework',
      'React',
      'PostgreSQL',
      'Redis',
      'Polygon.io',
      'FRED API',
    ],
    site: { label: 'lumitrade.ai', url: 'https://lumitrade.ai/' },
  },
  {
    name: 'Stock and Transfer',
    summary:
      "An on-premise application that manages a company's stockholders, share transactions and stock certificate issuance.",
    role: 'Full Stack Developer',
    context: 'Aboitiz',
    work: 'REST APIs and the user interface, deployment to the server, and migrating the database, schema and data, from SQL Server to MySQL.',
    stack: ['Python', 'Django', 'Django REST Framework', 'Angular', 'MySQL'],
  },
  {
    name: 'Continuous Integration Automation',
    summary:
      'Automation for the integration, build, test and release to QA of Kyocera Net Viewer, a network device management tool.',
    role: 'Developer',
    context: 'Kyocera Net Viewer',
    work: 'Automation scripts for building the application and releasing it for QA.',
    stack: ['Jenkins', 'Groovy', 'PowerShell', 'Perl', 'Python'],
  },
]

// Newest first, with titles, employers and dates exactly as on the resume.
export const experience: Role[] = [
  {
    title: 'Python Developer',
    employer: 'Jetpack Shipping',
    location: 'Akron, OH, United States',
    feedback: true,
    start: { year: 2025, month: 6 },
    end: { year: 2026, month: 6 },
    duties: [
      'Developed backend features for an ERP used in vitamin and supplement manufacturing, across R&D, batch processing, quality control, inventory, purchasing, sales and planning.',
      'Built an independent e-signature service using AWS KMS for document signing and key management.',
      // Rowegie set the pipelines up (the resume says "took part in").
      'Set up the automated CI/CD deployment pipelines with GitHub Actions for test, staging and production, and managed AWS resources with Terraform.',
    ],
    tech: ['Python', 'Django', 'FastAPI', 'Terraform', 'GitHub Actions', 'AWS', 'Cursor', 'Claude Code'],
  },
  {
    title: 'Software Engineer',
    employer: 'Tracesense Ltd',
    location: 'Edinburgh, Scotland',
    start: { year: 2024, month: 2 },
    end: { year: 2025, month: 4 },
    duties: [
      'Created REST APIs for the frontend and built UIs with Vue.js.',
      'Integrated with other APIs, including Sage and SAP.',
      'Fixed bugs reported by customers in JIRA.',
    ],
    tech: ['Python', 'Django', 'Django REST Framework', 'Vue.js', 'jQuery', 'Electron'],
  },
  {
    title: 'Python Developer',
    employer: 'Cloud Employee',
    location: 'Makati, Philippines',
    start: { year: 2023, month: 8 },
    end: { year: 2024, month: 2 },
    // The Lambda, Step Functions and feature-ownership duties came from Rowegie;
    // the resume lists only the bug fixing, stand-ups and unit tests.
    duties: [
      'Built new features in Python, taking them from implementation through to deployment.',
      'Wrote AWS Lambda functions and debugged AWS Step Functions workflows.',
      'Fixed bugs assigned in JIRA and wrote unit tests.',
      'Took part in daily stand-ups and sprint planning.',
    ],
    tech: [
      'Python',
      'AWS (Lambda, Step Functions, SQS, SNS, EC2, S3, CloudWatch)',
      'Jenkins',
      'Terraform',
    ],
  },
  {
    title: 'Software Engineer',
    employer: 'Tracesense Ltd',
    location: 'Edinburgh, Scotland',
    start: { year: 2023, month: 2 },
    end: { year: 2023, month: 6 },
    duties: [
      'Built new features such as recipe weighing with Django, HTML, CSS and JavaScript.',
      'Integrated with Sage and fixed customer-reported bugs.',
    ],
    tech: ['Python', 'Django', 'Django REST Framework', 'JavaScript', 'jQuery'],
  },
  {
    title: 'Senior Backend Developer',
    // BaseUp Inc has since been renamed Yodelle (from Rowegie; not on the resume).
    employer: 'BaseUp Inc (now Yodelle)',
    location: 'Makati, Philippines',
    start: { year: 2019, month: 1 },
    end: { year: 2023, month: 2 },
    duties: [
      'Designed features such as payments, email sending and scheduled tasks.',
      'Integrated online payments (Xendit, PayMongo) and point-of-sale systems (Square, StoreHub).',
      'Customized Odoo modules such as point of sale and accounting, fixed bugs and wrote unit tests.',
    ],
    tech: ['Python', 'Django', 'Django REST Framework', 'Odoo', 'pytest', 'AWS', 'PostgreSQL'],
  },
  {
    title: 'Junior Software Developer',
    employer: 'Lorax AI',
    location: 'Mandaue, Philippines',
    start: { year: 2017, month: 3 },
    end: { year: 2018, month: 12 },
    duties: [
      'Created RESTful APIs for the frontend.',
      'Tested the web application before deployment, including automated tests with Selenium.',
      'Fixed bugs reported by customers.',
    ],
    tech: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'Selenium'],
  },
  {
    title: 'Intern',
    employer: 'KYOCERA Philippines',
    location: 'Cebu, Philippines',
    start: { year: 2016, month: 1 },
    end: { year: 2017, month: 3 },
    duties: [
      'Built DLLs for Kyocera Net Viewer and designed the automation scripts that build them.',
    ],
    tech: ['Python', 'Perl', 'Groovy', 'PowerShell', 'Bash'],
  },
]

export const education = [
  {
    credential: 'Certificate in Computer Technology (Specialization in Software Development)',
    school: 'University of San Carlos – TC',
    location: 'Cebu City, Philippines',
    year: 2017,
  },
  {
    credential: 'Computer Hardware Servicing NC II',
    school: 'The Sisters of Mary School Boystown',
    location: 'Cebu, Philippines',
    year: 2013,
  },
]

// LinkedIn and Upwork are from Rowegie; the GitHub accounts are from Rowegie's
// own notes in this workspace (not the resume). The notes record which account
// covers which years.
const UPWORK_URL = 'https://www.upwork.com/freelancers/rowegielambojon'

export const profileLinks: ProfileLink[] = [
  {
    kind: 'linkedin',
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/rowegie-lambojon-951a4a12a/',
  },
  { kind: 'upwork', label: 'Upwork', url: UPWORK_URL },
  { kind: 'github', label: 'GitHub (gie-afk)', url: 'https://github.com/gie-afk', note: '2023–present' },
  { kind: 'github', label: 'GitHub (rowegie)', url: 'https://github.com/rowegie', note: '2017–2022' },
]

// From Rowegie's Upwork profile (screenshots supplied by Rowegie). Rowegie
// confirmed this job is the Jetpack Shipping ERP work. The job's price is
// deliberately left off the site.
export const clientFeedback = {
  platform: 'Upwork',
  url: UPWORK_URL,
  jobTitle: 'Django Python Developer for Manufacturing ERP Software',
  rating: 5,
  start: { year: 2025, month: 6 },
  end: { year: 2026, month: 6 },
  endorsements: ['Clear Communicator', 'Accountable for Outcomes'],
}
