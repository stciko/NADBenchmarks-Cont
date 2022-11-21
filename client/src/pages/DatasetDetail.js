import React from 'react';
import { useLocation } from 'react-router-dom';
import { Text, Flex, Box, Image } from '@chakra-ui/react';
import cardImgDetail from '../img/cardImgDetail.png'

const DatasetDetail = () => {
  const location = useLocation();
  const dataSet = location.state;
  return (
    <Box p="20px">
      <Box ml="200px" maxW="70%" mt="10px">
        <Text fontSize="3xl" as="b">{dataSet.title} - {dataSet.subTitle}</Text>
        <Flex>
          <Image src={cardImgDetail} alt="temp Image" mt="10px" mr="30px" w="200px" h="400px">
          </Image>
          <Box mt="5px">
            {dataSet.content}
            <Box maxH="500px" maxW="680px" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow='md' p="30px" mt="10px" >
              <Text fontSize="sm"><b>Cycle:</b> Preparedness</Text>
              <br />
              <Text fontSize="sm"><b>Data Source:</b> Earth Observation Data and GeoSpatial Imagery (Satellite)</Text>
              <br />
              <Text fontSize="sm"><b>Size:</b> Images cover 850km^2, 32k buildings, 1,300km roads</Text>
              <br />
              <Text fontSize="sm"><b>Timespan:</b> July 2021, August 2021, and other not specified</Text>
              <br />
              <Text fontSize="sm"><b>Geographical Coverage:</b> Germany, Louisiana, mystery location</Text>
              <br />
              <Text fontSize="sm">Published: 2022</Text>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default DatasetDetail;
