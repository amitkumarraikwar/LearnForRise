require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Post = require('./models/Post');
const Category = require('./models/Category');

const categories = [
  { name: 'Latest Jobs', slug: 'latest-jobs', description: 'Government job vacancy listings', icon: 'briefcase', order: 1 },
  { name: 'Result', slug: 'result', description: 'Exam results and merit lists', icon: 'trophy', order: 2 },
  { name: 'Admit Card', slug: 'admit-card', description: 'Admit card downloads and exam dates', icon: 'id-card', order: 3 },
  { name: 'Syllabus', slug: 'syllabus', description: 'Exam syllabus and patterns', icon: 'book', order: 4 },
  { name: 'Answer Key', slug: 'answer-key', description: 'Official and unofficial answer keys', icon: 'key', order: 5 },
  { name: 'Admission', slug: 'admission', description: 'College and university admissions', icon: 'graduation-cap', order: 6 },
];

const samplePosts = [
  {
    title: 'UPSC Civil Services Examination 2026',
    category: 'latest-jobs',
    department: 'Union Public Service Commission',
    state: 'All India',
    qualification: 'Graduate',
    shortDescription: 'UPSC has released the notification for Civil Services Examination 2026. Total 1000+ vacancies for IAS, IPS, IFS and allied services.',
    fullDescription: '<h2>UPSC CSE 2026 Notification</h2><p>The Union Public Service Commission has released the official notification for the Civil Services Examination 2026. This is an excellent opportunity for graduates across India to join the prestigious Indian Administrative Service, Indian Police Service, Indian Foreign Service, and various other Group A and Group B services.</p><h3>Vacancy Details</h3><p>Total vacancies: 1000+ (exact breakup to be notified)</p><h3>How to Apply</h3><p>Candidates can apply online through the official UPSC website at upsc.gov.in. Fill the application form carefully and pay the examination fee before the last date.</p>',
    importantDates: [
      { label: 'Application Start', date: new Date('2026-08-01') },
      { label: 'Last Date to Apply', date: new Date('2026-09-15') },
      { label: 'Prelims Exam', date: new Date('2026-12-01') },
    ],
    importantLinks: [
      { label: 'Apply Online', url: 'https://upsc.gov.in' },
      { label: 'Download Notification', url: 'https://upsc.gov.in/notifications' },
      { label: 'Official Website', url: 'https://upsc.gov.in' },
    ],
    eligibility: 'Indian citizen, Graduate from recognized university, Age 21-32 years (relaxation as per rules)',
    ageLimit: '21-32 years (relaxation for SC/ST/OBC as per rules)',
    applicationFee: 'General: ₹100, SC/ST/Female: Nil',
    totalPosts: '1000+ vacancies',
    status: 'published',
    isFeatured: true,
    isTrending: true,
    tags: ['upsc', 'ias', 'civil-services', 'central-government'],
    publishedAt: new Date('2026-08-01'),
  },
  {
    title: 'SSC CGL 2026 Recruitment — 10,000+ Vacancies',
    category: 'latest-jobs',
    department: 'Staff Selection Commission',
    state: 'All India',
    qualification: 'Graduate',
    shortDescription: 'SSC Combined Graduate Level Examination 2026 notification released. Apply for Group B and Group C posts in various central government departments.',
    fullDescription: '<h2>SSC CGL 2026</h2><p>Staff Selection Commission has announced the Combined Graduate Level Examination 2026 for recruitment to various Group B and Group C posts in ministries, departments and organizations of the Government of India.</p>',
    importantDates: [
      { label: 'Application Start', date: new Date('2026-07-15') },
      { label: 'Last Date to Apply', date: new Date('2026-08-30') },
      { label: 'Tier-I Exam', date: new Date('2026-11-01') },
    ],
    importantLinks: [
      { label: 'Apply Online', url: 'https://ssc.nic.in' },
      { label: 'Download Notification', url: 'https://ssc.nic.in' },
    ],
    eligibility: 'Graduate from recognized university',
    ageLimit: '18-32 years',
    applicationFee: 'General: ₹100, SC/ST/Female: Nil',
    totalPosts: '10,000+ vacancies',
    status: 'published',
    isTrending: true,
    tags: ['ssc', 'cgl', 'central-government', 'graduate'],
    publishedAt: new Date('2026-07-15'),
  },
  {
    title: 'Railway RRB NTPC 2026 — 35,000+ Posts',
    category: 'latest-jobs',
    department: 'Railway Recruitment Board',
    state: 'All India',
    qualification: 'Graduate / 12th Pass',
    shortDescription: 'RRB NTPC 2026 notification for Non-Technical Popular Categories. Massive recruitment drive with 35,000+ vacancies across Indian Railways.',
    fullDescription: '<h2>RRB NTPC 2026 Recruitment</h2><p>Railway Recruitment Boards have released notification for Non-Technical Popular Categories (NTPC) posts across all railway zones in India.</p>',
    importantDates: [
      { label: 'Application Start', date: new Date('2026-08-10') },
      { label: 'Last Date to Apply', date: new Date('2026-09-30') },
    ],
    importantLinks: [
      { label: 'Apply Online', url: 'https://rrbapply.gov.in' },
      { label: 'Official Website', url: 'https://indianrailways.gov.in' },
    ],
    eligibility: '12th Pass / Graduate depending on post',
    ageLimit: '18-33 years',
    applicationFee: 'General: ₹500, SC/ST/Female: ₹250',
    totalPosts: '35,000+ vacancies',
    status: 'published',
    isFeatured: true,
    isTrending: true,
    tags: ['railway', 'rrb', 'ntpc', 'central-government'],
    publishedAt: new Date('2026-08-10'),
  },
  {
    title: 'UP Police Constable 2026 — 60,000+ Vacancies',
    category: 'latest-jobs',
    department: 'UP Police Recruitment Board',
    state: 'Uttar Pradesh',
    qualification: '12th Pass',
    shortDescription: 'Uttar Pradesh Police Recruitment and Promotion Board has released a bumper recruitment for Constable posts. 60,000+ vacancies to be filled.',
    fullDescription: '<h2>UP Police Constable Bharti 2026</h2><p>The UP Police Recruitment Board has issued notification for recruitment of Constable (Civil Police) in Uttar Pradesh Police.</p>',
    importantDates: [
      { label: 'Application Start', date: new Date('2026-07-20') },
      { label: 'Last Date to Apply', date: new Date('2026-09-10') },
    ],
    importantLinks: [
      { label: 'Apply Online', url: 'https://uppbpb.gov.in' },
    ],
    eligibility: '12th Pass from recognized board',
    ageLimit: '18-22 years (relaxation as per rules)',
    applicationFee: '₹400 for all categories',
    totalPosts: '60,000+ vacancies',
    status: 'published',
    isTrending: true,
    tags: ['up-police', 'constable', 'state-government', 'uttar-pradesh'],
    publishedAt: new Date('2026-07-20'),
  },
  // Results
  {
    title: 'SSC CHSL 2025 Final Result Declared',
    category: 'result',
    department: 'Staff Selection Commission',
    state: 'All India',
    shortDescription: 'SSC has declared the final result for Combined Higher Secondary Level (CHSL) Examination 2025. Check your result and download marks.',
    fullDescription: '<h2>SSC CHSL 2025 Result</h2><p>The Staff Selection Commission has released the final result for CHSL 2025 exam. Candidates can check their result on the official website.</p>',
    importantDates: [
      { label: 'Result Date', date: new Date('2026-08-05') },
    ],
    importantLinks: [
      { label: 'Check Result', url: 'https://ssc.nic.in/result' },
      { label: 'Download Marks', url: 'https://ssc.nic.in/marks' },
    ],
    status: 'published',
    isTrending: true,
    tags: ['ssc', 'chsl', 'result'],
    publishedAt: new Date('2026-08-05'),
  },
  {
    title: 'IBPS PO 2025 Mains Result Released',
    category: 'result',
    department: 'Institute of Banking Personnel Selection',
    state: 'All India',
    shortDescription: 'IBPS has released the Mains examination result for PO/MT-XV recruitment. Check your scorecard and interview call status.',
    fullDescription: '<h2>IBPS PO Mains Result</h2><p>The Institute of Banking Personnel Selection has declared the main examination result for Probationary Officer/Management Trainee recruitment.</p>',
    importantDates: [
      { label: 'Result Date', date: new Date('2026-07-28') },
      { label: 'Interview Dates', date: new Date('2026-09-01') },
    ],
    importantLinks: [
      { label: 'Check Result', url: 'https://ibps.in' },
    ],
    status: 'published',
    tags: ['ibps', 'po', 'banking', 'result'],
    publishedAt: new Date('2026-07-28'),
  },
  // Admit Cards
  {
    title: 'UPSC CAPF 2026 Admit Card Available',
    category: 'admit-card',
    department: 'Union Public Service Commission',
    state: 'All India',
    shortDescription: 'UPSC has released the admit card for Central Armed Police Forces (CAPF) Assistant Commandants Examination 2026. Download from upsc.gov.in.',
    fullDescription: '<h2>UPSC CAPF Admit Card</h2><p>Candidates who applied for UPSC CAPF exam can download their admit cards from the official website.</p>',
    importantDates: [
      { label: 'Admit Card Available', date: new Date('2026-08-01') },
      { label: 'Exam Date', date: new Date('2026-08-20') },
    ],
    importantLinks: [
      { label: 'Download Admit Card', url: 'https://upsc.gov.in/admitcard' },
    ],
    status: 'published',
    isTrending: true,
    tags: ['upsc', 'capf', 'admit-card'],
    publishedAt: new Date('2026-08-01'),
  },
  // Syllabus
  {
    title: 'SSC MTS 2026 Syllabus & Exam Pattern',
    category: 'syllabus',
    department: 'Staff Selection Commission',
    state: 'All India',
    shortDescription: 'Complete syllabus and exam pattern for SSC Multi-Tasking Staff 2026 examination. Paper-I and Paper-II subject-wise details.',
    fullDescription: '<h2>SSC MTS 2026 Syllabus</h2><h3>Paper-I (Computer Based)</h3><ul><li>General Intelligence & Reasoning</li><li>Numerical Aptitude</li><li>General English</li><li>General Awareness</li></ul><h3>Paper-II (Descriptive)</h3><ul><li>Short Essay/Letter Writing</li></ul>',
    importantLinks: [
      { label: 'Download Syllabus PDF', url: 'https://ssc.nic.in/syllabus' },
      { label: 'Previous Year Papers', url: 'https://ssc.nic.in/papers' },
    ],
    status: 'published',
    tags: ['ssc', 'mts', 'syllabus'],
    publishedAt: new Date('2026-07-10'),
  },
  // Answer Key
  {
    title: 'RRB Group D 2026 Answer Key Released',
    category: 'answer-key',
    department: 'Railway Recruitment Board',
    state: 'All India',
    shortDescription: 'RRB has released the provisional answer key for Group D Level-1 examination 2026. Raise objections before the last date.',
    fullDescription: '<h2>RRB Group D Answer Key</h2><p>The provisional answer key for RRB Group D exam has been released. Candidates can check and raise objections through the official portal.</p>',
    importantDates: [
      { label: 'Answer Key Released', date: new Date('2026-08-08') },
      { label: 'Objection Last Date', date: new Date('2026-08-18') },
    ],
    importantLinks: [
      { label: 'View Answer Key', url: 'https://rrbapply.gov.in/answerkey' },
      { label: 'Raise Objection', url: 'https://rrbapply.gov.in/objection' },
    ],
    status: 'published',
    isTrending: true,
    tags: ['rrb', 'group-d', 'answer-key', 'railway'],
    publishedAt: new Date('2026-08-08'),
  },
  // Admission
  {
    title: 'JNU Admission 2026-27 — JNUEE Registration Open',
    category: 'admission',
    department: 'Jawaharlal Nehru University',
    state: 'Delhi',
    qualification: 'Graduate / Post-Graduate',
    shortDescription: 'JNU has started registration for JNUEE 2026 for admission to various UG, PG, and doctoral programmes. Apply through NTA portal.',
    fullDescription: '<h2>JNU Admission 2026-27</h2><p>Jawaharlal Nehru University invites applications for admission through JNUEE 2026 for various programmes.</p>',
    importantDates: [
      { label: 'Registration Start', date: new Date('2026-08-01') },
      { label: 'Registration End', date: new Date('2026-09-15') },
      { label: 'Exam Date', date: new Date('2026-10-20') },
    ],
    importantLinks: [
      { label: 'Apply Online', url: 'https://jnuexams.nta.nic.in' },
      { label: 'Official Website', url: 'https://jnu.ac.in' },
    ],
    eligibility: 'Varies by programme — check JNU prospectus',
    applicationFee: 'General: ₹500, SC/ST/PwD: ₹250',
    status: 'published',
    tags: ['jnu', 'admission', 'university', 'delhi'],
    publishedAt: new Date('2026-08-01'),
  },
];

const seedDB = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB. Seeding...');

    // Clear existing data
    await Category.deleteMany({});
    await Post.deleteMany({});

    // Seed categories
    await Category.insertMany(categories);
    console.log(`✅ ${categories.length} categories seeded`);

    // Seed posts (use create for pre-save hooks)
    for (const postData of samplePosts) {
      await Post.create(postData);
    }
    console.log(`✅ ${samplePosts.length} sample posts seeded`);

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seedDB();
