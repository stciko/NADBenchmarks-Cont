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
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import contactImg from '../img/contact.png';
import axios from 'axios';

const GeneralForm_Contact = () => {
  const handleInputChange = e => {
    const { name, value } = e.target;
    setContactInput(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [contactInput, setContactInput] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const toast = useToast();

  const submitContact = async () => {
    try {
      const res = await axios.post(
        'https://nadbenchmarks.herokuapp.com/submit/contact',
        contactInput
      );
      if (res.data['success']) {
        toast({
          title: 'Success',
          description: 'Message has been delivered successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        setContactInput({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'Message has not been delivered',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="90%" mt={{base: '50px', '2xl': "100px"}} ml={{base: '100px', '2xl': "650px"}}>
      <Flex mt="30px" w="70%">
        <Image
          src={contactImg}
          ml="40px"
          w="500px"
          mb="300px"
          mt="10px"
          mr={{base: '150px', '2xl': "250px"}}
        />

        <Box mt="-20px"  mr="30px">
          <FormControl isRequired mb="20px">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={contactInput?.name}
              onChange={handleInputChange}
              name="name"
            />
          </FormControl>
          <FormControl isRequired mb="20px">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={contactInput?.email}
              onChange={handleInputChange}
              name="email"
            />
          </FormControl>
          <FormControl mb="20px">
            <FormLabel>Subject</FormLabel>
            <Input
              type="text"
              value={contactInput?.subject}
              onChange={handleInputChange}
              name="subject"
            />
          </FormControl>
          <FormControl isRequired mb="20px">
            <FormLabel>Message</FormLabel>
            <Textarea
              type="text"
              value={contactInput?.message}
              onChange={handleInputChange}
              w="500px"
              h="200px"
              name="message"
            />
          </FormControl>
          <Button
            bg="#7AAC35"
            color="#FFFFFF"
            variant="solid"
            mt="30px"
            ml="200px"
            size="lg"
            onClick={submitContact}
          >
            Submit
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default GeneralForm_Contact;
