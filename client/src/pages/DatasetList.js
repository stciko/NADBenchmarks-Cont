import React, { useEffect, useState } from 'react';
import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  Spacer,
  SimpleGrid, Divider,
  Input, InputGroup, InputRightElement, IconButton,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Filter from '../components/Filter'


let initialList = [];
const DatasetList = () => {
  const [datasetList, setDatasetList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const getData = async () => {
    try {
      const res = await axios.get('https://nadbenchmarks.herokuapp.com/datasetList');
      setDatasetList(res.data);
      initialList = res.data;
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getData();
  }, []);

  const handleSearchInput = e => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  // Search
  const handleSearch = () => {
    const searchResults = [];
    initialList.forEach(dataset => {
      if (
        dataset.name.toLowerCase().match(searchInput.toLowerCase()) ||
        dataset.phases.toLowerCase().match(searchInput.toLowerCase()) ||
        dataset.task_type_str.toLowerCase().match(searchInput.toLowerCase()) ||
        dataset.description.toLowerCase().match(searchInput.toLowerCase())
      ) {
        searchResults.push(dataset);
      }
    });
    if (searchResults.length > 0) {
      setDatasetList(searchResults);
    }
    else {
      setDatasetList([])
    }
  }; //used to be useEffect, dependent on ", [searchInput]"

  // const toggleAccordion = () => {
  //   setIsOpen(!isOpen);
  // };
  // const [isOpen, setIsOpen] = useState(false);

  const handleFilter = (data) => {
    // setFilteredData(data);
    if (data.length > 0) {
      setDatasetList(data);
    } else {
      setDatasetList([])
    }

    // setDatasetList(data);
  };


  return (
    <Box>
      {/* <Input
        placeholder="Search..."
        type="search"
        onChange={handleSearch}
        value={searchInput}
        mt="30px"
        w="50vw"
        ml={{base: '350px', '2xl': "450px"}}
        borderColor="#7AAC35"
        boxShadow="md"
        borderRadius="3xl"
        borderWidth="1px"
      /> */}

      {/* <InputGroup> */}
      <Flex
        justifyContent="center"
        alignItems="center"
        paddingTop={"35px"}>
        <Input
          placeholder="Search..."
          type="search"
          onChange={handleSearchInput}
          value={searchInput}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSearch();
            }
          }}
          // onChange={(e) => setSearchTerm(e.target.value)}
          // onChange={(e) => setSearchInput(e.target.value)}
          // mt="35px"
          // mx="auto"
          // ml={{ base: '350px', '2xl': "450px" }}
          // boxShadow="md"
          // borderTopColor="#7AAC35"
          // borderBottomColor="#7AAC35"
          // borderLeftColor="#7AAC35"
          w="50vw"
          focusBorderColor="#7AAC35"
          focusBorderWidth="1px"
          _hover={{ borderColor: "#7AAC35" }}

          borderColor={"#7AAC35"}
          borderLeftRadius={"3xl"}
          borderRightRadius={"0px"}
          borderWidth="1px"
        />

        {/* <InputRightElement position="end"> */}
        <IconButton
          aria-label="Search"
          icon={<SearchIcon />}
          onClick={handleSearch}
          // mt="30px"
          // ml={{base: '350px', '2xl': "450px"}}
          borderRightColor="#7AAC35"
          borderTopColor="#7AAC35"
          borderBottomColor="#7AAC35"
          borderRightRadius={"3xl"}
          borderLeftRadius={"0px"}
          borderWidth="1px"
          boxShadow="none"

        />
      </Flex>
      {/* </InputRightElement> */}
      {/* </InputGroup> */}
      {/* <br/>
      <Divider mr="50px" orientation='horizontal' color="#7AAC35" borderColor="#7AAC35" border="1px" /> */}

      <SimpleGrid ml="20px" templateColumns="1fr 4fr" columns={2}>

        {/* Filters */}
        <Filter dataset={datasetList} onFilter={handleFilter} onClear={handleSearch} />

        {/* Dataset List */}
        <SimpleGrid mt="50px" columns={2} spacing={5}>
          {datasetList.map((dataset, index) => (
            <Box
              maxW={"500px"}
              height={"350px"}
              borderWidth="1px"
              borderRadius="lg"
              overflow="scroll"
              boxShadow="md"
              pr="30px"
              pl="30px"
              pt="25px"
              // ml={{ base: '60px', '2xl': "150px" }}
              // mr="20px"
              key={index}
            >
              <Flex mb="20px">
                <Image
                  src={dataset.image_url}
                  alt="Fallback Image"
                  w="140px"
                  h="130px"
                  mr="20px"
                />
                <Spacer />
                <Box>
                  <Text fontSize="xl" as="b">
                    {dataset.name}
                  </Text>
                  <Spacer />
                
                  <Text className='dd_text'>
                  {dataset.data_type} | {dataset.topic} | {dataset.phases}
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
                <Spacer />
                <Link to={`detail/${dataset.slug}`} state={dataset}>
                  <Button bg="#7AAC35" color="#FFFFFF" variant="solid" mb="10px">
                    Learn More
                  </Button>
                </Link>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
};

export default DatasetList;
