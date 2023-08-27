import { Metadata } from 'next';

import AboutIndex from '@/components/pages/about/index';

export const metadata: Metadata = {
  title: 'About',
  description: `My professional background, key accomplishments, personal values, and any brands I may be associated with.`,
};

const About = async () => {
  return <AboutIndex />;
};

export default About;
