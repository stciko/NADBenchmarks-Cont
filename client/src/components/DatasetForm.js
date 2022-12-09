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
  Select,
  RadioGroup,
  Radio,
  Stack,
  useToast,
  Checkbox,
  CheckboxGroup,
  SimpleGrid,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import submitImg from '../img/submit.png';
import axios from 'axios';

const DatasetForm = () => {
  const [datasetInput, setDatasetInput] = useState({
    name: '',
    email: '',
    paperTitle: '',
    resourceLink: '',
    datasetName: '',
    datasetSource: '',
    benchmarkTask: '',
    mlTaskType: [],
    topic: '',
    description: '',
    phase: '',
    timespan: '',
    coverage: '',
    datasetType: '',
    publishYear: '',
    size: '',
    citation: '',
    additionalComments: '',
    datasetFile: '',
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
      datasetType: '',
      publishYear: '',
      size: '',
      citation: '',
      additionalComments: '',
      datasetFile: '',
    });
  const [currPage, setCurrPage] = useState(0);
  const [file, setFile] = useState();
  const toast = useToast();

  const handleForm = e => {
    const { name, value } = e.target;
    setDatasetInput(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChoiceForm = value => {
    setDatasetInput(prevState => ({
      ...prevState,
      datasetType: value,
    }));
  };

  const switchPage = e => {
    if (currPage === 0) {
      if (
        datasetInput?.name !== '' &&
        datasetInput?.email !== '' &&
        datasetInput?.paperTitle !== '' &&
        datasetInput?.resourceLink !== '' &&
        datasetInput?.datasetName !== '' &&
        datasetInput?.datasetSource !== '' &&
        datasetInput?.benchmarkTask !== ''
      )
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

  const handleFile = e => {
    setFile(e.target.files[0]);
  };

  const submitDatasetSucceeded = async e => {
    e.preventDefault();
    setDatasetInput(prevState => ({
      ...prevState,
      datasetFile: file,
    }));

    try {
      const res = await axios.post(
        'https://nadbenchmarks.herokuapp.com/submit/dataset',
        datasetInput
      );
      if (res.data['success']) {
        toast({
          title: 'Success',
          description: 'Dataset has been submitted successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        setDatasetInput({
          name: '',
          email: '',
          paperTitle: '',
          resourceLink: '',
          datasetName: '',
          datasetSource: '',
          benchmarkTask: '',
          mlTaskType: [],
          topic: '',
          description: '',
          phase: '',
          timespan: '',
          coverage: '',
          datasetType: '',
          publishYear: '',
          size: '',
          citation: '',
          additionalComments: '',
          datasetFile: '',
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'Dataset cannot be submitted',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="90%" mt="50px" ml="100px">
      <Flex mt="30px" w="90%">
        <Image
          src={submitImg}
          ml="50px"
          boxSize="500px"
          mb="300px"
          mt="90px"
          mr="150px"
        />

        <Box mt="-20px">
          {currPage === 0 && (
            <Box w="500px">
              <FormControl isRequired mb="20px">
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.name}
                  onChange={handleForm}
                  name="name"
                />
                {/* {!datasetError ? "" : (
                  <FormErrorMessage>Your name is required.</FormErrorMessage>
                )} */}
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={datasetInput?.email}
                  onChange={handleForm}
                  name="email"
                />
                {/* {!datasetError ? "" : (
                  <FormErrorMessage>Your email is required.</FormErrorMessage>
                )} */}
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
              <FormControl isRequired mb="20px">
                <FormLabel>ML task type</FormLabel>
                <CheckboxGroup
                  onChange={handleChoiceForm}
                  name="mlTaskType"
                  colorScheme="green"
                >
                  <SimpleGrid columns={2} spacing={5}>
                    <Checkbox value="Binary Classification">
                      Binary Classification
                    </Checkbox>
                    <Checkbox value="Image Segmentation">
                      Image Segmentation
                    </Checkbox>
                    <Checkbox value="Multiclass Segmentation">
                      Multiclass Segmentation
                    </Checkbox>
                    <Checkbox value="Multiclass (ordinal) Segmentation">
                      Multiclass (ordinal) Segmentation
                    </Checkbox>
                    <Checkbox value="Semantic Segmentation">
                      Semantic Segmentation
                    </Checkbox>
                    <Checkbox value="Video Prediction">
                      Video Prediction
                    </Checkbox>
                    <Checkbox value="Other">Other</Checkbox>
                  </SimpleGrid>
                </CheckboxGroup>
              </FormControl>
            </Box>
          )}

          {currPage === 1 && (
            <Box>
              <FormControl isRequired mb="20px">
                <FormLabel>Topic of Natural Disaster</FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={handleForm}
                  name="topic"
                >
                  <option value="Drought">Drought</option>
                  <option value="Extreme Weather">Extreme Weather</option>
                  <option value="Flood">Flood</option>
                  <option value="General">General</option>
                  <option value="Hurricane">Hurricane</option>
                  <option value="Volcano">Volcano</option>
                  <option value="Wildfire">Wildfire</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Description</FormLabel>
                <Textarea
                  type="text"
                  value={datasetInput?.description}
                  onChange={handleForm}
                  w="500px"
                  h="100px"
                  name="description"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Phase in Disaster Cycle</FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={handleForm}
                  name="phase"
                >
                  <option value="Drought">Preparedness - Early Warning</option>
                  <option value="Preparedness - Monitoring and Detection">
                    Preparedness - Monitoring and Detection
                  </option>
                  <option value="Forecasting and Predicting">
                    Forecasting and Predicting
                  </option>
                  <option value="Recovery">Recovery</option>
                  <option value="Response - Damage assessment">
                    Response - Damage assessment
                  </option>
                  <option value="Response - Post-disaster Coordination and Response">
                    Response - Post-disaster Coordination and Response
                  </option>
                  <option value="Other">Other</option>
                </Select>
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
              <FormControl isRequired mb="20px">
                <FormLabel>Type of Dataset</FormLabel>
                <RadioGroup
                  onChange={handleChoiceForm}
                  value={datasetInput?.datasetType}
                >
                  <Stack direction="row">
                    <Radio value="Image">Image</Radio>
                    <Radio value="Numerical">Numerical</Radio>
                    <Radio value="Text">Text</Radio>
                    <Radio value="Video">Video</Radio>
                    <Radio value="Other">Other</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Publish Year</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.publishYear}
                  onChange={handleForm}
                  name="publishYear"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Size</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.size}
                  onChange={handleForm}
                  name="size"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Citation</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.citation}
                  onChange={handleForm}
                  name="citation"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Additional Comments</FormLabel>
                <Textarea
                  type="text"
                  value={datasetInput?.additionalComments}
                  onChange={handleForm}
                  w="500px"
                  h="100px"
                  name="additionalComments"
                />
              </FormControl>
              <FormControl mb="20px">
                <FormLabel>Upload dataset</FormLabel>
                <input type="file" name="datasetFile" onChange={handleFile} />
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
                onClick={submitDatasetSucceeded}
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
