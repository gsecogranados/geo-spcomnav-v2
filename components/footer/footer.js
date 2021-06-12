/** @jsxImportSource theme-ui */
import { jsx, Box, Container, Image, Text } from 'theme-ui';
import Link from 'next/link';
import FooterLogo from '../../assets/logo.svg';
import FooterData from '../../components/header/header.data'
export default function Footer() {
  return (
    <footer sx={styles.footer}>
      <Container>
        <Box sx={styles.footer.footerBottomArea}>
          <Link href="/">
            <Image src={FooterLogo} alt="Logo" style={{height:'40px'}}></Image>
          </Link>
          <Box>
          <Text sx={styles.footer.copyright}>
            <a href="https://www.uab.cat/enginyeria/" target="_blank" sx={styles.footer.text}>2021 Universitat Autònoma de Barcelona - Escola d'Enginyeria </a>
          </Text>
          </Box>
          <Text sx={styles.footer.copyright}>
            <a href="https://www.linkedin.com/in/sergio-d%C3%ADaz98" target="_blank" sx={styles.footer.text}> © Create by Sergio Díaz Serena</a>
          </Text>
          <Box>
          <Text sx={styles.footer.copyright}>
            <a href="http://spcomnav.uab.es/" target="_blank" sx={styles.footer.text}> For SPCOMNAV UAB</a>
            
          </Text>
        </Box>
        </Box>
        
      </Container>
    </footer>
  );
}

const styles = {
  footer: {
   
    footerBottomArea: {
      borderTop: '1px solid',
      borderTopColor: 'border_color',
      display: 'flex',
      pt: [4, null, 4],
      pb: [4, null, 4],
      textAlign: 'center',
      flexDirection: 'column',
      
    }, 
    copyright: {
      fontSize: [1, '13px'],
      width: '100%',
    },
    text: {
      textDecoration: 'none',
      color:'black',
      ':hover': {
        color: 'primary'
      }
    }
  },
};

