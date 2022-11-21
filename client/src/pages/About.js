import { Box, Text, Image, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import dataReportImg from '../img/dataReport.png'

const About = () => {
  return (
    <Box w="90%" mt="80px">
      <Text fontSize="3xl" mt="30px" ml="500px" color="#7AAC35" as="b">
        A climate change benchmark database
      </Text>
      <Flex ml="200px" mt="30px" w="80%">
        <Box textAlign="justify">
          <Text>
            This site facilitates the proccess of searching for natural disaster
            datasets for ML engineers
          </Text>
          <br />
          <Text>
            NaD Benchmarks 2 presents a collection of existing benchmark
            datasets for machine learning models for natural disasters. The
            supported features and individual dataset information are
            specifically included as per feedback collected through user
            interviews.{' '}
          </Text>
          <br />
          <Text>
            NaD Benchmarks 2 is an extention of Benchmark datasets for Machine
            Learning for Natural Disasters as introduced by Proma et al.
          </Text>
          <Button bg="#7AAC35" color="#FFFFFF" variant="solid" mt="30px" ml="140px">
            Copy References
          </Button>
        </Box>
        <Image src={dataReportImg} ml="100px" boxSize="500px" mb="300px" mt="-100px"/>
      </Flex>
    </Box>
  );
};

export default About;
