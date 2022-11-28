import React, { useEffect } from 'react';
import { Box, Image, Text, Button, Flex, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import cardImg from '../img/cardImg.png';
import axios from 'axios';

const DataCard = () => {
  const dataSet = {
    id: '1',
    title: 'SpaceNet 8',
    subTitle: 'The Detection of Flooded Roads and Buildings',
    types: 'Image | Flood | Preparedness',
    content:
      'SpaceNet 8 is flood-disaster dataset for building detection, road network extraction and flood detection. It covers 850km^2, including 32k buildings and 1,300km roads. It is introduced for multiclass segmentation and binary classification.',
    mlTaskType: 'Multiclass segmentation | binary classification',
  };

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/");
      console.log(res);
    } catch (error) {
      // Handle errors
      console.log(error)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box
      maxW="xl"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      p="30px"
      mt="50px"
      ml="30px"
    >
      <Flex mb="20px">
        <Image src={cardImg} alt="Fallback Image" w="200px" mr="20px" />
        <Spacer />
        <Box>
          <Text fontSize="2xl" as="b">
            {dataSet.title}
          </Text>
          <br />
          <Text fontSize="xl" as="b">
            {dataSet.subTitle}
          </Text>
          <br />
          <Text fontSize="lg" as="b">
            {dataSet.types}
          </Text>
        </Box>
      </Flex>
      <Text fontSize="sm" mb="20px">
        {dataSet.content}
      </Text>
      <Flex>
        <Text fontSize="sm" mr="50px" mt="8px">
          <b>ML Task Type: </b>
          {dataSet.mlTaskType}
        </Text>
        <Link to={`/detail/${dataSet.id}`} state={dataSet}>
          <Button bg="#7AAC35" color="#FFFFFF" variant="solid" mb="10px">
            Learn More
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default DataCard;
