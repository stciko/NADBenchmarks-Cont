import React, { useState, useEffect } from 'react';
import { useLocation, Link, useHistory } from 'react-router-dom';
import '../css/datasetdetail_text.css';
import {
  Text,
  Flex,
  Box,
  Image,
  Button,
  SimpleGrid,
  Spacer,
  Center,

} from '@chakra-ui/react';
import '../css/datasetdetail_text.css';
import axios from 'axios';




const SimilarDatasets_Section = () => {
  const location = useLocation();
  const dataset = location.state;
  const [isOpen, setIsOpen] = useState(false);
  const [similarDatasets, setSimilarDatasets] = useState([]);

  const getSimilarDatasets = async () => {
    try {
      // const res = await axios.get(`https://nadbenchmarks.herokuapp.com/${dataset.slug}`);
      // setSimilarDatasets(res.data.by_task_type);
      const res = await axios.get('https://nadbenchmarks.herokuapp.com/datasetList');
      setSimilarDatasets(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  
  // function go_to_Dataset(dataset) {
  //   const history = useHistory();
  //   history.push({
  //     pathname: `detail/${dataset.slug}`,
  //     state: dataset
  //   });
  // }


  // useEffect(() => {
  //   getSimilarDatasets();
  //   window.scrollTo(0, 0);
  // }, [dataset]);

  useEffect(() => {
    getSimilarDatasets();
  }, []);

  return (
    <Box
      height="300px"
      // maxH="800px"
      maxW="1000px"
      // maxW="70%"
      // borderWidth="1px"
      // borderRadius="15px"
      // overflow-wrap //overflow="hidden"
      // overflowX="scroll"
      // boxShadow="md"
      p="20px"
      mt="20px">

      <Box> {
        similarDatasets.length > 0 && (
          // <Text fontSize="2xl" ml={{ base: '-200px', '2xl': "-250px" }} mt="20px" as="b">
          <Text className='section_header'>
            Similar Datasets
          </Text>
        )
      }
      </Box>

      <Box
        overflow-wrap //overflow="hidden"
        overflow="scroll">

        {/* <SimpleGrid columns={2} spacing={10} w="80vw" ml={{ base: '-200px', '2xl': "-250px" }} mt="-20px"> */}
        <div style={{ display: 'flex', overflowX: 'auto', width: '100vw' }}>

          {similarDatasets.map((dataset, index) => (
            <Box
              borderWidth="1px"
              borderRadius="sm"
              overflow="scroll"
              boxShadow="none"
              p="20px"
              mt="50px"
              mr="50px"
              w="250px"
              h="300px"
              key={index}
            >
              <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Image
                  src={dataset.image_url}
                  alt="Fallback Image"
                  w="95px"
                  h="90"
                  // mx="auto"
                  mr="20px"
                />
              </Box>
              <br />
              <Box >
                <Text className='dd_subheader'>
                  {dataset.name}
                </Text>
                <Text className='dd_text'>
                  {dataset.data_type} | {dataset.topic} | {dataset.phases}
                </Text>
                <Text className='dd_text'>
                   {dataset.task_type_str}
                </Text>
              </Box>
              {/* <Box> 
                <Link to={`/detail/${dataset.slug}`} state={dataset}>
                  <Button bg="#7AAC35" color="#FFFFFF" variant="solid" mb="10px">
                    Learn More
                  </Button>
                </Link>
              </Box> */}
            </Box>
          ))}
        </div>
        {/* </SimpleGrid> */}
      </Box>
      <br />
      <br />
    </Box>

  )
};

export default SimilarDatasets_Section;