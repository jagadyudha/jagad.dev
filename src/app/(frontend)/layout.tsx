import React from 'react';

import { Metadata } from 'next';

import Layout from '@/components/layout/layout';

import { dataOpenGraph, dataSeo } from '@/libs/data';

export const metadata: Metadata = {
  title: {
    template: '%s - Jagad Yudha Awali',
    default: dataSeo.title,
  },
  generator: 'Next.js',
  applicationName: 'jagad.dev',
  referrer: 'origin-when-cross-origin',
  keywords: ['Personal Website', 'Personal Blog', 'Web Development'],
  authors: [{ name: dataSeo.name }],
  colorScheme: 'dark',
  creator: dataSeo.name,
  publisher: dataSeo.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(dataSeo.url),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: dataOpenGraph,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <Layout>{children}</Layout>;
};

export default RootLayout;
