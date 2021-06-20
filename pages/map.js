import React, { useState } from 'react';
import { ThemeProvider, Text} from 'theme-ui';
import theme from '../theme/theme';
import 'bootstrap/dist/css/bootstrap.min.css';

import dynamic from "next/dynamic";

import Skeleton from '@material-ui/lab/Skeleton';


import Layout from '../components/layout'
import SEO from '../components/seo';
import Footer from '../components/footer/footer';

export default function Map() {

  const MapWithNoSSR = dynamic(() => import("../components/map"), {
    ssr: false
  });
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO title="Map - Geo Spcomnav"/>
        {/*!loadComponent && <Skeleton variant="rect" height={'100vh'} /> */}
        <MapWithNoSSR />
        <Footer/>
      </Layout>   
    </ThemeProvider>
  )
}