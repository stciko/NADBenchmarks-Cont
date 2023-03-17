import React from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import Navbar from '../components/Navbar';
import { Text, Flex, Spacer, Box, Divider, extendTheme } from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';

const breakpoints = {
  '2xl': '1800px',
}

const theme = extendTheme({ breakpoints })

function Home() {
  return (
    <Box p="20px">
      {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
      <Flex>
        <Text fontSize="3xl" as="b"><Link to="/">NAD Benchmark</Link></Text>
        <Spacer />
        <Navbar />
      </Flex>
      <Divider orientation='horizontal' color="#7AAC35" borderColor="#7AAC35" border="0.5px" />
      <Outlet />
    </Box>
  );
}

export default Home;
