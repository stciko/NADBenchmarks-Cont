import { Box, Text, Image, Button, Flex, useToast } from '@chakra-ui/react';
import React from 'react';
import logo from '../img/logo.png';
import paper from '../img/paper.png';
import '../css/about.css';


const reference = 'Proma, A. M., Islam, M. S., Ciko, S., Baten, R. A., & Hoque, E. (2022). NADBenchmarks-a compilation of Benchmark Datasets for Machine Learning Tasks related to Natural Disasters.';

const About = () => {
  const toast = useToast();

  const displayToast = () => {
    toast({
      title: 'Following reference has been copied.',
      description: reference,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    navigator.clipboard.writeText(reference);
  }


  return (
    <Box w="90%" mt={{ base: '80px', '2xl': "100px" }}>
      <Text fontSize="2xl" mt="30px" ml={{ base: '430px', '2xl': "650px" }} color="#7AAC35" as="b">
        A Database for Benchmarks related to Natural Disasters
      </Text>

      <Flex ml={{ base: '200px', '2xl': "300px" }} mt={{ base: '80px', '2xl': "100px" }}>
        <Box textAlign="justify">
          <Text>
            This site hopes to facilitate the process of searching for natural disaster datasets for ML engineers
          </Text>
          <br />
          <Text>

            NADBenchmarks presents a collection of existing benchmark datasets for machine learning models for natural disasters.
            The supported features and individual dataset information are specifically included as per feedback collected through
            user interviews. This project is supported by the ROC HCI Group.

          </Text>
          <br />
          <Text size={"sm"}>
            NaD Benchmarks 2 is an extention of Benchmark datasets for Machine
            Learning for Natural Disasters as introduced by Proma et al.
          </Text>

        </Box>
        <Image
          src={logo}
          ml="100px"
          boxSize="400px"
          mb="40px"
          mt="-20px"
        />
      </Flex>

      <Text ml="100px" className='about_header'>
        Publications
      </Text>
      <br />
      <Flex>
        <Image
          ml="100px"
          src={paper}
          width={"140px"}
          border={'solid'}
          mt="20px"
        />
        <Flex>
          <Text ml="20px" mt="20px" className='about_text'>
            A. Proma, M. S. Islam, S. Ciko, R. A. Baten, E. Hoque. NADBenchmarks – a compilation of Benchmark Datasets for Machine Learning Tasks related to Natural Disasters. The Role of AI in Responding to Climate Change, AAAI Fall Symposium Series, November 2022
          </Text>
          <br/>
          {/* <Button
            bg="#7AAC35"
            color="#FFFFFF"
            variant="solid"
            // mt="30px"
            ml="20px"
            onClick={displayToast}
          >
            Copy Reference
          </Button> */}
        </Flex>

      </Flex>


    </Box >
  );
};

export default About;
