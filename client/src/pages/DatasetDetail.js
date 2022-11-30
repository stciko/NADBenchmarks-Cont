import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Text,
  Flex,
  Box,
  Image,
  Button,
  useToast,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react';
import { JsonViewer } from '@textea/json-viewer';
import axios from 'axios';

const DatasetDetail = () => {
  const location = useLocation();
  const dataset = location.state;
  const toast = useToast();
  const [similarDatasets, setSimilarDatasets] = useState([]);

  const displayToast = () => {
    toast({
      title: 'Following reference has been copied.',
      description: dataset.reference,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    navigator.clipboard.writeText(dataset.reference);
  };

  const openReference = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const downloadDataset = () => {
    const blob = new Blob([JSON.stringify(dataset)]);
    const url = window.URL.createObjectURL(blob);
    let file = document.createElement('a');
    file.href = url;
    file.download = `${dataset.name}.json`;
    file.click();
  };

  const getSimilarDatasets = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:5000/${dataset.slug}`);
      setSimilarDatasets(res.data.by_task_type);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSimilarDatasets();
    window.scrollTo(0, 0);
  }, [dataset]);

  return (
    <Box ml="300px" maxW="70%" mt="10px">
      <Text fontSize="3xl" as="b">
        {dataset.name}
      </Text>
      <Flex>
        <Image
          src={dataset.image_url}
          alt="temp Image"
          mt="10px"
          mr="30px"
          w="300px"
          h="305px"
        ></Image>
        <Box mt="-2px">
          {dataset.content}
          <Box
            maxH="500px"
            maxW="680px"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            p="30px"
            mt="10px"
          >
            <Text fontSize="sm">
              <b>Cycle:</b> {dataset.phases}
            </Text>
            <br />
            <Text fontSize="sm">
              <b>Data Source:</b> {dataset.data_source}
            </Text>
            <br />
            <Text fontSize="sm">
              <b>Size:</b> {dataset.size}
            </Text>
            <br />
            <Text fontSize="sm">
              <b>Timespan:</b> {dataset.timespan}
            </Text>
            <br />
            <Text fontSize="sm">
              <b>Geographical Coverage:</b> {dataset.geo_coverage}
            </Text>
            <br />
            <Text fontSize="sm">
              <b>Published:</b> {dataset.published}
            </Text>
          </Box>
        </Box>
      </Flex>
      <Flex mt="50px" ml="50px">
        <Button
          bg="#7AAC35"
          color="#FFFFFF"
          variant="solid"
          w="200px"
          pl="10px"
          pr="10px"
          mr="50px"
          // onClick={downloadDataset}
        >
          Download Dataset
        </Button>
        <Button
          bg="#7AAC35"
          color="#FFFFFF"
          variant="solid"
          mb="10px"
          w="200px"
          pl="30px"
          pr="30px"
          mr="50px"
          onClick={() => openReference(dataset.paper_url)}
        >
          View Source Paper
        </Button>
        <Button
          bg="#7AAC35"
          color="#FFFFFF"
          variant="solid"
          mb="10px"
          w="200px"
          pl="30px"
          pr="30px"
          onClick={displayToast}
        >
          Copy Reference
        </Button>
      </Flex>
      <Box mt="40px" ml="10vw">
        <JsonViewer value={dataset} />
      </Box>
      {similarDatasets.length > 0 && (
        <Text fontSize="2xl" ml="-200px" mt="20px" as="b">
          Similar Datasets
        </Text>
      )}
      <SimpleGrid columns={2} spacing={10} w="80vw" ml="-200px" mt="-20px">
        {similarDatasets.map((dataset, index) => (
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            p="30px"
            mt="50px"
            h="420px"
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
              <Text fontSize="sm" mr="50px" mt="8px">
                <b>ML Task Type: </b> {dataset.task_type_str}
              </Text>
              <Spacer />
              <Link to={`/detail/${dataset.slug}`} state={dataset}>
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

export default DatasetDetail;
