import React from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import Navbar from '../components/Navbar';
import { Text, Flex, Spacer, Box } from '@chakra-ui/react';
import { Link, Outlet } from 'react-router-dom';

function Home() {
  return (
    <Box p="20px">
      {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
      <Flex>
        <Text fontSize="4xl"><Link to="/">NAD Benchmark</Link></Text>
        <Spacer />
        <Navbar />
      </Flex>
      <Outlet />
    </Box>
  );
}

export default Home;
