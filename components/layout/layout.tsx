import React, { Children } from 'react';
import Navbar from './navbar';
import Footer from './footer';

const Layout:React.FC = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
