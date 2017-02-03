import React from 'react';
import Navbar from 'compositions/navbar';
import 'shared/styles/global.css';

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
