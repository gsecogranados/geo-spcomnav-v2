import React from 'react';
import { ThemeProvider, Text} from 'theme-ui';
import theme from '../theme/theme';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from '../components/layout'
import SEO from '../components/seo';
import ProfileLog from '../components/profileLog';
import Footer from '../components/footer/footer';

export default function Profile() {

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO title="Profile - Geo Spcomnav"/>       
        <ProfileLog/>
        <Footer/>
       
      </Layout>   
    </ThemeProvider>
  )
}