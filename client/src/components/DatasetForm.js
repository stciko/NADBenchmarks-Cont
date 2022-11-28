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
  const [datasetInput, setDatasetInput] = useState({
    name: '',
    email: '',
    paperTitle: '',
    resourceLink: '',
    datasetName: '',
    datasetSource: '',
    benchmarkTask: '',
    mlTaskType: '',
    topic: '',
    description: '',
    phase: '',
    timespan: '',
    coverage: '',
  });
  const datasetError =
    JSON.stringify(datasetInput) ===
    JSON.stringify({
      name: '',
      email: '',
      paperTitle: '',
      resourceLink: '',
      datasetName: '',
      datasetSource: '',
      benchmarkTask: '',
      mlTaskType: '',
      topic: '',
      description: '',
      phase: '',
      timespan: '',
      coverage: '',
    });
  const [currPage, setCurrPage] = useState(0);

  const handleForm = e => {
    const { name, value } = e.target;
    setDatasetInput(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const switchPage = e => {
    if (currPage === 0) {
      // if (
      //   datasetInput?.name !== '' &&
      //   datasetInput?.email !== '' &&
      //   datasetInput?.paperTitle !== '' &&
      //   datasetInput?.resourceLink !== '' &&
      //   datasetInput?.datasetName !== '' &&
      //   datasetInput?.datasetSource !== '' &&
      //   datasetInput?.benchmarkTask !== ''
      // )
      if (!datasetError) {
        setCurrPage(1);
      }
    } else {
      if (e.target.name !== 'submit') {
        setCurrPage(0);
      } else {
        // submit form
      }
    }
  };

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
          {currPage === 0 && (
            <Box w="500px">
              <FormControl isRequired isInvalid={datasetError} mb="20px">
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.name}
                  onChange={handleForm}
                  name="name"
                />
                {!datasetError ? "" : (
                  <FormErrorMessage>Your name is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired isInvalid={datasetError} mb="20px">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={datasetInput?.email}
                  onChange={handleForm}
                  name="email"
                />
                {!datasetError ? "" : (
                  <FormErrorMessage>Your email is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Resource (Paper) Title</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.paperTitle}
                  onChange={handleForm}
                  name="paperTitle"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Link to the resource above</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.resourceLink}
                  onChange={handleForm}
                  name="resourceLink"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Dataset Name</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.datasetName}
                  onChange={handleForm}
                  name="datasetName"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Dataset Source</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.datasetSource}
                  onChange={handleForm}
                  name="datasetSource"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Task the benchmark is made for</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.benchmarkTask}
                  onChange={handleForm}
                  name="benchmarkTask"
                />
              </FormControl>
            </Box>
          )}

          {currPage === 1 && (
            <Box>
              <FormControl isRequired mb="20px">
                <FormLabel>ML task type</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.mlTaskType}
                  onChange={handleForm}
                  name="mlTaskType"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Topic of Natural Disaster</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.topic}
                  onChange={handleForm}
                  name="topic"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Description</FormLabel>
                <Textarea
                  type="text"
                  value={datasetInput?.description}
                  onChange={handleForm}
                  w="500px"
                  h="200px"
                  name="description"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Phase in Disaster Cycle</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.phase}
                  onChange={handleForm}
                  name="phase"
                />
              </FormControl>
              <FormControl mb="20px">
                <FormLabel>Timespan</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.timespan}
                  onChange={handleForm}
                  name="timespan"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Geological Coverage</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.coverage}
                  onChange={handleForm}
                  name="coverage"
                />
              </FormControl>
            </Box>
          )}

          <Flex>
            {currPage === 1 && (
              <Button
                bg="#7AAC35"
                color="#FFFFFF"
                variant="solid"
                mt="20px"
                ml="150px"
                size="lg"
                onClick={switchPage}
              >
                Back
              </Button>
            )}
            {currPage === 0 && (
              <Button
                bg="#7AAC35"
                color="#FFFFFF"
                variant="solid"
                mt="20px"
                ml="200px"
                size="lg"
                onClick={switchPage}
              >
                Next
              </Button>
            )}
            {currPage === 1 && (
              <Button
                bg="#7AAC35"
                color="#FFFFFF"
                variant="solid"
                mt="20px"
                ml="50px"
                size="lg"
                name="submit"
                onClick={switchPage}
              >
                Submit
              </Button>
            )}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default DatasetForm;
