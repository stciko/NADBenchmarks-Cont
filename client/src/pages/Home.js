import React from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import Navbar from '../components/Navbar';
import { Text, Image, Flex, Spacer, Box, Divider, extendTheme } from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';
import logo from '../img/logo.png';


const breakpoints = {
  '2xl': '1800px',
}

const theme = extendTheme({ breakpoints })

function Home() {
  return (
    <Box p="20px">
      {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
      <Flex justifyContent="center" alignItems="center">
        <Image
          src={logo}
          w="50px"
          h="50px"
          mr="10px"
        />
        <Text fontSize="2xl" as="b"><Link to="/">NADBenchmarks</Link></Text>
        <Spacer />
        <Navbar />
      </Flex>
      <Outlet />
    </Box>
  );
}

export default Home;
