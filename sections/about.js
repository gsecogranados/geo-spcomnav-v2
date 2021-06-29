/** @jsxImportSource theme-ui */
import { jsx, Box, Container, Heading, Text, Button, Image } from 'theme-ui';
import {Card} from 'reactstrap'
import BannerBG from '../assets/bg.png';
import PhotoPeatonal from '../assets/peaton2.png'

const About = () => {
  return (
    <Box as="section" id="about">
      <Container  sx={styles.container}>
        <Box sx={styles.boxTitle}>
          <Heading sx={styles.title}>
            About iGNSSrx Project
          </Heading>
        </Box>

        <Box sx={styles.contentWrapper}>
          <Box sx={styles.content}>
            <Image src={PhotoPeatonal}></Image>
            
          </Box>
          <Box sx={styles.content}>
            <Text as="p" sx={styles.text}>
            During the years 2012 and 2015 the research group Signal Processing for Communications and Navigation (SPCOMNAV) that belongs to the Department 
            of Telecommunications and Systems Engineering of the Autonomous University of Barcelona (UAB), together with other partners such as NSL and TRN 
            located in the UK, were involved in a project funded by the European Commission for the realization of a project called iGNSSrx. The objective 
            of the project was to contribute to the development of signal processing algorithms in order to improve integrity in GNSS receivers, against different 
            threats, such as the presence of multiple paths, an absence of line of sight or interference.In 2014, during the experimentation process, a campaign was
             carried out where a large amount of data was collected, which was stored in a network connected storage (NAS) with a very specific distribution.
            </Text>
          </Box>
          
        </Box>
      </Container>
    </Box>
  );
};

export default About;

const styles = {
  container: {
    marginBottom: 100
  },
  boxTitle: {
    display: ['grid'],
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    pt:[100]
  },
  title: {
    fontWeight: 'bold',
    fontSize: ['35px'],
    lineHeight: 1.33,
    letterSpacing: '-1px',
    color: 'textSecondary',
  },
  contentWrapper: {
    display: [null, null, null, 'flex', 'grid'],
    gridTemplateColumns: 'repeat(2, 1fr)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -5,
    pt: 100,
  },
  content: {
    maxWidth: [null, null, null, 324, 450],
    textAlign: 'justify',
  },
  text: {
    fontSize: '16px',
    color: 'textSecondary',
    
  },
 
};
