/** @jsxImportSource theme-ui */
import React, { useState} from 'react';
import { jsx, Container, Flex, Button} from 'theme-ui';
import { keyframes } from '@emotion/react';
import Link from 'next/link';

import LogoImg from '../../assets/logo.png'
import Logo from '../logo';
import menuItems from './header.data';

import Login from '../login'


export default function Header() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [modal, setModal] = useState(false);
  
  const toggle = () => setModal(!modal);
  const openCloseMobileMenu = () => {
    setMobileMenu(!mobileMenu);
  };

  return (
      <header sx={styles.header} className="sticky bg-transparent" id="header"> 
        <Flex as="nav" sx={styles.nav} className="navbar navbar-expand-lg navbar-light sticky-top font-weight-bold shadow p-3 mb-5 rounded bg-white">
          <Container className="container " >
            <Logo src={LogoImg}/>
            <Flex as="div" sx={styles.container} >
              {menuItems.map((i)=>{
                return (
                    <Link key={i.path} href={i.path}>
                     {i.label}
                    </Link>
                )
              })}
            </Flex>
            <Button className="donate__btn" variant="secondary" arial-label="Get Started" onClick={toggle}>
              Login
            </Button>
            <Login toggle={toggle} modal={modal} setModal={setModal}/>

            <button className="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#navbar" onClick = {() => setMobileMenu (! mobileMenu)}>
              <span className="navbar-toggler-icon"></span>
            </button>
            {mobileMenu && (
              <Flex as="div" style={mobileMenu?{display:"block"}:{display:'none'}} className="collapse navbar-collapse ">
                <Flex as="ul" className="navbar-nav ml-auto ">
               {menuItems.map((i)=>{
                return (
                  <Flex
                    className="nav-item mt-3 "
                    as="li"
                    key={i.label}
                  >
                    <Link key={i.path} href={i.path} >
                {i.label}
                </Link>
                  </Flex>)})}
                  </Flex>
            </Flex>)}
        </Container>
        </Flex>  
      </header>
  );
}

const positionAnim = keyframes`
  from {
    position: fixed;
    opacity: 1;
  }

  to {
    position: absolute;
    opacity: 1;
    transition: all 0.4s ease;
  }
`;

const styles = {
  header: {
    color: 'text',
    fontWeight: 'body',
    py: 4,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
    backgroundColor: 'transparent',
    transition: 'all 0.4s ease',
    animation: `${positionAnim} 0.4s ease`,
    '.donate__btn': {
      flexShrink: 0,
      mr: [15, 20, null, null, 0],
      ml: ['auto', null, null, null, 0],
    },
    '&.sticky': {
      position: 'fixed',
      backgroundColor: 'background',
      color: '#000000',
      py: 3,
      'nev > a': {
        color: 'text',
      },
    },
  },
  container: {
    display: 'none',
    '@media screen and (min-width: 992px)': {
      display: 'block',
    },
    
  },
  nav: {
    mx: 'auto',
    marginTop: -3,
    display: 'block',
    a: {
      fontSize: 2,
      fontWeight: 'body',
      px: 5,
      cursor: 'pointer',
      lineHeight: '1.2',
      color: 'black',
      textDecoration: 'none',
      transition: 'all 0.15s',
      '&:hover': {
        color: 'primary',
      },
      '&.active': {
        color: 'primary',
      },
    },
  },
  verticleLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#909090',
  }
};
