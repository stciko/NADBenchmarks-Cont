
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
  Collapse,
  Accordion, AccordionItem, AccordionButton, AccordionPanel,
  AccordionHeader, AccordionIcon
} from '@chakra-ui/react';
import DatasetInfo_Accordion from '../components/DatasetInfo_Accordion'
import SimilarDatasets_Section from '../components/SimilarDatasets_Section'
import { JsonViewer } from '@textea/json-viewer';
import axios from 'axios';

const DatasetDetail = () => {
  const location = useLocation();
  const dataset = location.state;
  const toast = useToast();

  const displayToast = () => {
    toast({
      // style: { backgroundColor: "#7AAC35", color: "#7AAC35" },
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


  return (
    <Box
      mx="auto"
      maxW="70%" mt={{ base: '20px', '2xl': "30px" }}>
      <Text fontSize="3xl" as="b">
        {dataset.name}
      </Text>
      <Flex>
        <Image
          src={dataset.image_url}
          alt="temp Image"
          mt="35px"
          mr="30px"
          w="190px"
          h="140px"
        ></Image>
        <Box
          ml="20px"
          mt="10px"
          w="740px"
          overflow-wrap
        >
          {dataset.content}
          <Text fontSize="l" mt="15px">
            {dataset.description}
          </Text>
          <Box
            maxH="500px"
            maxW="740px"
            borderWidth="1px"
            borderRadius="30px"
            overflow-wrap //overflow="hidden"
            overflow="scroll"
            boxShadow="md"
            p="20px"
            mt="20px"
          >
            <Text fontSize="sm">
              <b>ML Task Type:</b> {dataset.task_type_str}
            </Text>
            <br />
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
      {/* <Flex mt="30px"> */}
      <div style={{
        display: 'flex', justifyContent: 'center', flexWrap: "wrap",
        marginTop: '30px'
      }}>
        <Button
          bg="#7AAC35"
          color="#FFFFFF"
          variant="solid"
          borderRadius="30px"
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
          borderRadius="30px"
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
          borderRadius="30px"
          mb="10px"
          w="200px"
          pl="30px"
          pr="30px"
          onClick={displayToast}
        >
          Copy Reference
        </Button>
      </div>
      {/* </Flex> */}

      <DatasetInfo_Accordion />
      <br />
      <SimilarDatasets_Section />


      {/* <Box mt="40px" ml={{base: '10vw', '2xl': "8vw"}}>
        <JsonViewer value={dataset} />
      </Box> */}

     
    </Box>
  );
};

export default DatasetDetail;
