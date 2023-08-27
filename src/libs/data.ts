export const dataSeo = {
  url: 'https://jagad.dev',
  title: 'Jagad Yudha Awali — Software Engineer',
  description:
    'My personal website to share my projects, blogs, and other stuff.',
  ogimage:
    'https://res.cloudinary.com/dlpb6j88q/image/upload/w_1200,h_630,c_limit%2Cf_auto%2Cfl_progressive%2Cq_75/jagad.dev/default_social_ooweiu.png',
  name: 'Jagad Yudha Awali',
};

export const dataOpenGraph = {
  url: dataSeo.url,
  title: dataSeo.title,
  description: dataSeo.description,
  images: [
    {
      url: dataSeo.ogimage,
      width: 1280,
      height: 720,
      alt: 'Social',
      type: 'image/jpeg',
    },
  ],
  siteName: dataSeo.title,
  locale: 'en_US',
  type: 'website',
};

export const dataCardX = {
  handle: '@imyour_universe',
  site: '@imyour_universe',
  cardType: 'summary_large_image',
};

export const dataSkills = [
  {
    name: 'Programming Languages',
    list: ['JavaScript', 'TypeScript', 'Python'],
  },
  {
    name: 'Mobile Development',
    list: ['React Native'],
  },
  {
    name: 'Backend Development',
    list: ['Express', 'Next.js API', 'Flask', 'Supabase', 'Firebase'],
  },
  {
    name: 'Web Development',
    list: ['HTML & CSS', 'React', 'Vue.js'],
  },
  {
    name: 'Tools',
    list: ['VSCode', 'Figma', 'Postman', 'Git', 'Jupyter Notebook'],
  },

  {
    name: 'Hosting',
    list: ['Vercel', 'Netlify'],
  },
];

export const dataFooter = [
  {
    menu: 'Social',
    content: [
      { name: 'Github', href: 'https://github.com/jagadyudha' },
      { name: 'Twitter', href: 'https://twitter.com/imyour_universe' },
      {
        name: 'Linkedin',
        href: 'https://www.linkedin.com/in/jagad-yudha-39a4a51b6/',
      },
    ],
  },

  {
    menu: 'General',
    content: [
      { name: 'Home', href: '/' },
      { name: 'Posts', href: '/posts' },
      { name: 'Projects', href: '/projects' },
      { name: 'About', href: '/about' },
    ],
  },
  {
    menu: 'Extra',
    content: [
      {
        name: 'Resume',
        href: 'https://drive.google.com/file/d/1MWmVGVdnE83fggTb8PTbx7rVwChjuqD-/view?usp=sharing',
      },
      {
        name: 'Analytics',
        href: 'https://analytics.jagad.dev/share/PEGBLHu0/jagad.dev',
      },
      { name: 'Source Code', href: 'https://github.com/jagadyudha/jagad.dev' },
      {
        name: 'Reading List',
        href: 'https://jagadyudha.notion.site/jagadyudha/Reading-List-e5a47c93a900407e882db9b8989c605d',
      },
    ],
  },
];
