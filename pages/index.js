import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from '../theme/theme';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from '../components/layout'
import SEO from '../components/seo';
import Banner from '../sections/banner';
import About from '../sections/about';
import Team from '../sections/team';
import Footer from '../components/footer/footer';


export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO title="Geo Spcomnav"/>
        <Banner/>
        <About/>
        <Team/>
        <Footer/>

      </Layout>   
    </ThemeProvider>
  )
}
