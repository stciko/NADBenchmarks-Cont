import { Box, Image, Flex, Text, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import GeneralForm from '../components/GeneralForm';
import uploadImg from '../img/upload.png';
import mailImg from '../img/mail.png'

const Contact = () => {
  return (
    <Flex ml="300px" mt="50px">
      <Box
        w="350px"
        h="550px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        p="30px"
        mt="10px"
        mr="100px"
      >
        <Image src={uploadImg} w="150px" ml="75px" />
        <Text mt="20px" textAlign="justify">
          Our goal is to constantly update our webpage with related benchmark
          datasets. If you would like to add a dataset to this page, please
          submit it here and we will notify you if your dataset passes our
          validation.
        </Text>
        <Button
          bg="#7AAC35"
          color="#FFFFFF"
          variant="solid"
          mt="30px"
          size="lg"
          ml="70px"
        >
          Submit Data
        </Button>
      </Box>
      <Box
        w="350px"
        h="550px"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        p="30px"
        mt="10px"
      >
        <Image src={mailImg} w="150px" ml="60px" />
        <Text mt="20px" textAlign="justify">
          We would love your feedback, and we are happy to answer any queries
          you have. Feel free to email us.
        </Text>
        <Button
          bg="#7AAC35"
          color="#FFFFFF"
          variant="solid"
          mt="100px"
          size="lg"
          ml="90px"
        >
          Email Us
        </Button>
      </Box>
    </Flex>

    /* <GeneralForm/> */
  );
};

export default Contact;
