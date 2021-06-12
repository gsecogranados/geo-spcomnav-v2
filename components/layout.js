/** @jsxImportSource theme-ui */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';

import Header from './header/header';


export default function Layout({ children }) {
  
  return (
    <React.Fragment>
        <Header />
      <main id="content" sx={{ variant: 'layout.main', }} >
        {children}
      </main>
 
    </React.Fragment>
  );
}