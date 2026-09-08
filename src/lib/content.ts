export const SITE = {
  name: 'Raneesh Savindi', 
  title: 'Software Developer | Full-Stack Developer | Frontend Developer | UI/UX Designer',
  tagline: 'A Web Developer with a curious mind and a love for turning ideas into interactive digital experiences.',
  email: 'raneeshasavindi53@gmail.com',
  location: 'Hambantota, Sri Lanka',
  currentRole: 'Software Engineer Intern', 
  currentCompany: 'Darimac Technologies (Pvt) Ltd', 
  socials: {
    github: 'https://github.com/RRSavindi', 
    linkedin: 'https://www.linkedin.com/in/raneesha-savindi/',
    email: 'raneeshasavindi53@gmail.com', 
  },
};

export const SKILLS = {
  'UI/UX': ['Figma', 'Canva'],
  Frontend: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'JavaScript', 'HTML5', 'CSS3' ],
  Backend: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'REST APIs'],
  'Tools & Infra': ['Git', 'GitHub', 'PuTTY', 'VS Code', 'Jira', 'Postman', 'WordPress'],
};

export interface Project {
  title: string;
  role: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    title: 'Smart Garment Production Tracking and Optimization System (Group Project)',
    role: 'Frontend Developer (Garment Line Supervisor Module) & Partial Backend Developer',
    description:
      'A smart production monitoring system using React.js, Node.js, MongoDB, RFID, and IoT concepts to track garment production, worker performance, and operational efficiency through real-time dashboards and data visualization.',
    tech: ['React.js', 'Tailwind CSS', 'MongoDB', 'RFID', 'IoT Concepts'],
    link: '#', 
    github: '#', 
    accent: 'from-indigo-500/20 to-blue-500/10',
  },
  {
    title: 'Plant HouseWebsite – Leaf and Petals (Personal Project)',
    role: 'Frontend Developer',
    description:
      'A responsive plant e-commerce web application built with React.js and Tailwind CSS, featuring product listings, authentication, shopping cart, and checkout interfaces with a modern user-friendly design.',
    tech: ['React.js', 'Tailwind CSS', 'Vercel'],
    link: 'https://my-portfolio-7evq.vercel.app/assets/my_plantshop-DHgJ4rP0.mp4',
    github: 'https://github.com/RRSavindi/Leaf-Petal.git',
    accent: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    title: 'Coffee Shop Web App (Personal Project)',
    role: 'Frontend Developer',
    description:
      'A modern and visually appealing coffee shop website designed to showcase beverages, menu items, and shop information. The application provides an engaging user experience with a responsive design, attractive product presentation, and smooth navigation across different devices.',
    tech: ['Next.js', 'Tailwind CSS'],
    link: '',
    github: '#',
    accent: 'from-purple-500/20 to-fuchsia-500/10',
  },
  {
    title: 'Smart Calculator Application (Personal Project)',
    role: '',
    description:
      'A lightweight calculator featuring a two-line display, keyboard support, and a minimalistic UI with dark/light mode.',
    tech: ['Python', 'JavaScript', 'CSS'],
    link: 'https://my-portfolio-7evq.vercel.app/assets/cal_video-2TX_fhYO.mp4',
    github: 'https://github.com/RRSavindi/project1_mycalculator.git',
    accent: 'from-purple-500/20 to-fuchsia-500/10',
  },
  
];

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
}

export const CERTIFICATES: Certificate[] = [
  {
    title: 'Introduction to C#',
    issuer: 'Sololearn',
    date: '2026',
    credentialUrl: '#',
  },
  {
    title: 'Python for Beginniners',
    issuer: 'Open Learning Platform UoM',
    date: '2026',
    credentialUrl: '#',
  },
  {
    title: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    date: '2023',
    credentialUrl: '#',
  },
];

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  responsibilities: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: 'Software Engineer Intern',
    company: 'Darimac Technologies (Pvt) Ltd', 
    period: '6 months (February 2026 - August 2026)',
    responsibilities: [
      'Developed and maintained web applications using React, TypeScript, and Tailwind CSS',
      'Assisted in backend development and API integration using Node.js and Express',
      'Mobile app development with Flutter, Dart and Firebase',
      'Frontend builds with React, Vite, and Tailwind CSS',
      'WordPress plugin development and customization',
      'Collaborated with cross-functional teams to gather requirements and implement new features',
    ],
  },
];
