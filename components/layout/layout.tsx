import React, { Children } from 'react';
import Navbar from './navbar';
import Footer from './footer';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
