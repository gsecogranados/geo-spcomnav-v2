/** @jsxImportSource theme-ui */
import { jsx } from 'theme-ui';
import { Container, Grid, Box, Heading, Text} from 'theme-ui';
import { FaLinkedin } from 'react-icons/fa';
import {IoSchoolOutline } from 'react-icons/io5';
import { GiArchiveResearch } from "react-icons/gi";

import TeamCard from '../components/team-card';

import Gonzalo from '../assets/gonzalo.jpg';
import Salcedo from '../assets/salcedo.jpg';
const data = [
  {
    id: 1,
    imgSrc: Gonzalo,
    altText: 'Gonzalo',
    title: 'Gonzalo Seco Granados',
    designation: 'Faculty professor',
    socialProfile: [
      {
        id: 1,
        name: 'linkedin',
        path: 'https://es.linkedin.com/in/gsecogra',
        icon: <FaLinkedin />,
      },
      {
        id: 2,
        name: 'spcomnav',
        path: 'http://spcomnav.uab.es/?section=3&id=91',
        icon: <IoSchoolOutline />,
      },
      {
        id: 3,
        name: 'portalrecerca',
        path: 'https://portalrecerca.uab.cat/en/persons/gonzalo-seco-granados-9',
        icon: <GiArchiveResearch />,
      },
    ],
  },
  {
    id: 2,
    imgSrc: Salcedo,
    altText: 'Jose',
    title: 'Jose A. Lopez Salcedo',
    designation: 'Faculty professor',
    socialProfile: [
      {
        id: 1,
        name: 'linkedin',
        path: 'https://www.linkedin.com/in/jlopezsalcedo/',
        icon: <FaLinkedin />,
      },
      {
        id: 2,
        name: 'spcomnav',
        path: 'http://spcomnav.uab.es/?section=3&id=93',
        icon: <IoSchoolOutline />,
      },
      {
        id: 3,
        name: 'portalrecerca',
        path: 'https://portalrecerca.uab.cat/en/persons/jose-antonio-lopez-salcedo-3',
        icon: <GiArchiveResearch />,
      },
    ],
  },
  
];

export default function TeamSection() {
  return (
    <section id="team" style={styles.container}>
      <Container >
      <Box sx={styles.boxTitle}>
        <Heading sx={styles.title}>
          Meet UAB Team
        </Heading>
        <Text as="p" sx={styles.text}>
          Meet the UAB team that worked on the iGNSSrx project
        </Text>
      </Box>
        <Grid sx={styles.grid}>
          {data.map((i)=>(
            <TeamCard title={i.title} src={i.imgSrc} altText={i.altText} key={i.id} designation={i.designation} social={i.socialProfile}/>
          ))}

        </Grid>
      </Container>
    </section>
  );
}

const styles = {
  container : {
    paddingBottom: 100,
    backgroundColor: '#F9FBFD',
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
  text: {
    fontSize: '16px',
    color: 'textSecondary',
    
  },
  grid: {
    mt: 5,
    gridGap: ['35px 0px', null, 0, null, null, '30px 35px'],
    gridTemplateColumns: ['repeat(2,1fr)', null, 'repeat(2,1fr)', null, 'repeat(2,1fr)'],
    textAlign: 'center'
  },
};
