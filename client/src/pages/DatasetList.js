import React, { useEffect, useState } from 'react';
import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  Spacer,
  SimpleGrid,
  Input,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from 'axios';

let initialList = [];
const DatasetList = () => {
  const [datasetList, setDatasetList] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const getData = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/');
      setDatasetList(res.data);
      initialList = res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = e => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const searchResults = [];
    initialList.forEach(dataset => {
      if (
        dataset.name.toLowerCase().match(searchInput.toLowerCase()) ||
        dataset.phases.toLowerCase().match(searchInput.toLowerCase())
      ) {
        searchResults.push(dataset);
      }
    });
    if (searchResults.length > 0) {
      setDatasetList(searchResults);
    }
  }, [searchInput]);

  return (
    <Box>
      <Input
        placeholder="Search dataset"
        type="search"
        onChange={handleSearch}
        value={searchInput}
        mt="30px"
        w="50vw"
        ml="350px"
        borderColor="#7AAC35"
        boxShadow="md"
        borderRadius="lg"
        borderWidth="2px"
      />
      <SimpleGrid columns={2} spacing={10}>
        {datasetList.map((dataset, index) => (
          <Box
            maxW="xl"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            p="30px"
            mt="50px"
            ml="60px"
            key={index}
          >
            <Flex mb="20px">
              <Image
                src={dataset.image_url}
                alt="Fallback Image"
                w="210px"
                h="200px"
                mr="20px"
              />
              <Spacer />
              <Box>
                <Text fontSize="2xl" as="b">
                  {dataset.name}
                </Text>
                <br />
                <Text fontSize="lg" as="b">
                  Phases: {dataset.phases}
                </Text>
              </Box>
            </Flex>
            <Text fontSize="sm" mb="20px">
              {dataset.description}
            </Text>
            <Flex>
              <Text fontSize="sm" mt="8px">
                <b>ML Task Type:</b> {dataset.task_type_str}
              </Text>
              <Spacer/>
              <Link to={`detail/${dataset.slug}`} state={dataset}>
                <Button bg="#7AAC35" color="#FFFFFF" variant="solid" mb="10px">
                  Learn More
                </Button>
              </Link>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default DatasetList;
