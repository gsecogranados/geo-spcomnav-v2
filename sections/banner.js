/** @jsxImportSource theme-ui */
import Carousel from '../components/carousel';
import { jsx, Box, Container, Heading, Text, Button, Image } from 'theme-ui';
import {Card} from 'reactstrap'
import BannerBG from '../assets/bg.png';

const Banner = () => {
  return (
    <Box id="home" as="section" variant="section.banner" sx={styles.banner}>
      <Container>
      <Box sx={styles.boxTitle}>
        <Heading sx={styles.title}>
          Welcome to SPCOMNAV!
        </Heading>
      </Box>
        <Box sx={styles.contentWrapper}>
          <Box sx={styles.content}>
            <Heading sx={styles.title}>
            iGNSSrx Project
            </Heading>
            <Text as="p" sx={styles.text}>
              This is a web page to display and download a set of samples that were obtained from different routes performed during the iGNSSrx experiment.
            </Text>
          </Box>
          <Box>
          <Card >
            <Carousel/>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>

  );
};

export default Banner;

const styles = {
  banner: {
    paddingBottom: 5,
    backgroundImage: [
      `url(${BannerBG})`,
    ],
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left top',
    backgroundAttachment: 'fixed'
    
  },
  contentWrapper: {
    display: [null, null, null, 'flex', 'grid'],
    gridTemplateColumns: 'repeat(2, 1fr)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -5,
    pt: 100,
  },
  boxTitle: {
    display: ['grid'],
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    minHeight: ['35vh'],
    pt:[100]
  },
  content: {
    maxWidth: [null, null, null, 324, 500],
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: ['60px'],
    lineHeight: 1.33,
    letterSpacing: '-1px',
    color: 'textSecondary',
  },
  text: {
    fontSize: ['14px', '14px', '14px', '16px', '16px', '18px'],
    color: 'textSecondary',
    mt: ['14px', '19px'],
  },
  button: {
    display: ['none', 'flex'],
    mt: [45, 45, 45, 25, 25],
  }
};
