import React, { Children } from 'react';
import Navbar from './navbar';
import Footer from './footer';

export interface LayoutProps {
  children:any
}

const Layout:React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
