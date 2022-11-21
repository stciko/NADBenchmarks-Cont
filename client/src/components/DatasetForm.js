import {
  Box,
  Text,
  Image,
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import dataReportImg from '../img/dataReport.png';

const DatasetForm = () => {
  const [input, setInput] = useState('');
  const handleInputChange = e => setInput(e.target.value);

  return (
    <Box w="90%" mt="50px" ml="100px">
      <Flex mt="30px" w="80%">
        <Image
          src={dataReportImg}
          ml="100px"
          boxSize="500px"
          mb="300px"
          mt="-100px"
          mr="100px"
        />

        <Box mt="-20px">
          <FormControl isRequired mb="20px">
            <FormLabel>Name</FormLabel>
            <Input type="text" value={input} onChange={handleInputChange} />
          </FormControl>
          <FormControl isRequired mb="20px">
            <FormLabel>Email</FormLabel>
            <Input type="email" value={input} onChange={handleInputChange} />
          </FormControl>
          <FormControl mb="20px">
            <FormLabel>Subject</FormLabel>
            <Input type="text" value={input} onChange={handleInputChange} />
          </FormControl>
          <FormControl isRequired mb="20px">
            <FormLabel>Message</FormLabel>
            <Textarea
              type="text"
              value={input}
              onChange={handleInputChange}
              w="500px"
              h="200px"
            />
          </FormControl>
          <Button
            bg="#7AAC35"
            color="#FFFFFF"
            variant="solid"
            mt="30px"
            ml="200px"
            size="lg"
          >
            Submit
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default DatasetForm;
