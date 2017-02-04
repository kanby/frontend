import React from 'react';
import Navbar from 'compositions/navbar';

type LayoutProps = {
  children: any,
};

const Layout = ({ children }: LayoutProps) => (
  <div>
    <Navbar />
    <main role="main">
      {children}
    </main>
  </div>
);

export default Layout;
