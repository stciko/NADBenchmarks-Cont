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

const DatasetForm_Submit = () => {
  const [datasetInput, setDatasetInput] = useState({
    dataset_name: '',
    paper_title: '',
    data_type: '',
    topic: '',
    phases: '',
    description: '',
    task_type: [],
    data_source: '',
    size: '',
    timespan: '',
    geo_coverage: '',
    published: '',
    image_url: '',
    paper_url: '',
    // dataset_url: '',
    reference: '',
    annotation_methods: '',
    missing_values: '',
    feature_description: '',
    labels: [],
    base_models: [],
    data_split: [],
    metrics: [],
    // results: '',
    limitations: '',
    authors: '',
    availability: '',
    license: '',
    other_resources_descr: '',
    other_resources_url: ''
  });
  const datasetError =
    JSON.stringify(datasetInput) ===
    JSON.stringify({
      dataset_name: '',
      paper_title: '',
      data_type: '',
      topic: '',
      phases: '',
      description: '',
      task_type: [],
      data_source: '',
      size: '',
      timespan: '',
      geo_coverage: '',
      published: '',
      image_url: '',
      paper_url: '',
      // dataset_url: '',
      reference: '',
      annotation_methods: '',
      missing_values: '',
      feature_description: '',
      labels: [],
      base_models: [],
      data_split: [],
      metrics: [],
      // results: '',
      limitations: '',
      authors: '',
      availability: '',
      license: '',
      other_resources_descr: '',
      other_resources_url: ''
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

  const handleDataType = value => {
    setDatasetInput(prevState => ({
      ...prevState,
      data_type: value,
    }));
  };

  const handleTaskType = value => {
    setDatasetInput(prevState => ({
      ...prevState,
      task_type: value,
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
      ) {
        if (!datasetError) {
          setCurrPage(1);
        }
      } else {
        toast({
          title: 'Error',
          description: 'Missing some inputs',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      if (e.target.name !== 'submit') {
        setCurrPage(0);
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
          dataset_name: '',
          paper_title: '',
          data_type: '',
          topic: '',
          phases: '',
          description: '',
          task_type: [],
          data_source: '',
          size: '',
          timespan: '',
          geo_coverage: '',
          published: '',
          image_url: '',
          paper_url: '',
          // dataset_url: '',
          reference: '',
          annotation_methods: '',
          missing_values: '',
          feature_description: '',
          labels: [],
          base_models: [],
          data_split: [],
          metrics: [],
          // results: '',
          limitations: '',
          authors: '',
          availability: '',
          license: '',
          other_resources_descr: '',
          other_resources_url: ''
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
    <Box w="90%" mt={{ base: '50px', '2xl': "100px" }} ml={{ base: '100px', '2xl': "250px" }}>
      <Flex mt="30px" w="90%">
        <Image
          src={submitImg}
          ml="50px"
          boxSize="400px"
          mb="300px"
          mt="90px"
          mr={{ base: '150px', '2xl': "250px" }}
        />

        <Box mt="-20px">
          {currPage === 0 && (
            <Box w="500px">
              <FormControl isRequired mb="20px">
                <FormLabel>Dataset Name</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.dataset_name}
                  onChange={handleForm}
                  name="dataset_name"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Paper Title</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.paper_title}
                  onChange={handleForm}
                  name="paper_title"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Paper Link </FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.paper_url}
                  onChange={handleForm}
                  name="paper_url"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Type of Dataset</FormLabel>
                <RadioGroup
                  onChange={handleDataType}
                  value={datasetInput?.data_type}
                >
                  <Stack direction="row">
                    <Radio value="Image">Image</Radio>
                    <Radio value="Multimodal">Multimodal</Radio>
                    <Radio value="Numerical">Numerical</Radio>
                    <Radio value="Text">Text</Radio>
                    <Radio value="Vector Data">Vector Data</Radio>
                    <Radio value="Video">Video</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Topic of Natural Disaster</FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={handleForm}
                  value={datasetInput?.topic}
                  name="topic"
                >
                  <option value="Atmospheric Rivers">Atmospheric Rivers</option>
                  <option value="Drought">Drought</option>
                  <option value="Extreme Weather">Extreme Weather</option>
                  <option value="Flood">Flood</option>
                  <option value="General">General</option>
                  <option value="Hurricane">Hurricane</option>
                  <option value="Tornado">Tornado</option>
                  <option value="Tropical Cyclone">Tropical Cyclone</option>
                  <option value="Volcanic Eruption">Volcanic Eruption</option>
                  <option value="Wildfire">Wildfire</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Phase in Disaster Cycle</FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={handleForm}
                  value={datasetInput?.phases}
                  name="phases"
                >
                  <option value="Preparedness"> Preparedness</option>
                  <option value="Prevention"> Prevention</option>
                  <option value="Recovery"> Recovery</option>
                  <option value="Response"> Response  </option>
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
                <FormLabel>ML Task Type</FormLabel>
                <CheckboxGroup
                  onChange={handleTaskType}
                  value={datasetInput?.task_type}
                  // name="task_type"
                  colorScheme="green"
                >
                  <SimpleGrid columns={2} spacing={5}>
                    <Checkbox value="Binary Classification">
                      Binary Classification
                    </Checkbox>
                    <Checkbox value="Image Classification">
                      Image Classification
                    </Checkbox>
                    <Checkbox value="Image Segmentation">
                      Image Segmentation
                    </Checkbox>
                    <Checkbox value="Multiclass Classification">
                      Multiclass Classification
                    </Checkbox>
                    <Checkbox value="Multiclass Multilabel Classification">
                      Multiclass Multilabel Classification
                    </Checkbox>
                    <Checkbox value="Multiclass Segmentation">
                      Multiclass Segmentation
                    </Checkbox>
                    <Checkbox value=" Multilabel Classification">
                      Multilabel Classification
                    </Checkbox>
                    <Checkbox value=" Multitask Learning">
                      Multitask Learning
                    </Checkbox>
                    <Checkbox value="Semantic Segmentation">
                      Semantic Segmentation
                    </Checkbox>
                    <Checkbox value="Video Prediction">
                      Video Prediction
                    </Checkbox>
                    <Checkbox value="Visual Question Answering">
                      Visual Question Answering
                    </Checkbox>
                    <Checkbox value="Other">Other</Checkbox>
                  </SimpleGrid>
                </CheckboxGroup>
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Dataset Source</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.data_source}
                  onChange={handleForm}
                  name="data_source"
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
                  value={datasetInput?.geo_coverage}
                  onChange={handleForm}
                  name="geo_coverage"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Year Published </FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.published}
                  onChange={handleForm}
                  name="published"
                />
              </FormControl>
            </Box>
          )}

          {currPage === 1 && (
            <Box>
              <FormControl isRequired mb="20px">
                <FormLabel>Paper Citation</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.reference}
                  onChange={handleForm}
                  name="reference"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Annotation Methods</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.annotation_methods}
                  onChange={handleForm}
                  name="annotation_methods"
                />
              </FormControl>


              <FormControl isRequired mb="20px">
                <FormLabel>Missing Values</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.missing_values}
                  onChange={handleForm}
                  name="missing_values"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Feature Description</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.feature_description}
                  onChange={handleForm}
                  name="feature_description"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Labels</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.labels}
                  onChange={handleForm}
                  name="labels"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Base Models</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.base_models}
                  onChange={handleForm}
                  name="base_models"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Data Split</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.data_split}
                  onChange={handleForm}
                  name="data_split"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Metrics</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.metrics}
                  onChange={handleForm}
                  name="metrics"
                />
              </FormControl>
              <FormControl mb="20px">
                <FormLabel>Results</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.results}
                  onChange={handleForm}
                  name="results"
                />
              </FormControl>

              <FormControl isRequired mb="20px">
                <FormLabel>Limitations</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.limitations}
                  onChange={handleForm}
                  name="limitations"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Authors</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.authors}
                  onChange={handleForm}
                  name="authors"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Availability</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.availability}
                  onChange={handleForm}
                  name="availability"
                />
              </FormControl>

              <FormControl isRequired mb="20px">
                <FormLabel>License</FormLabel>
                <Input
                  type="text"
                  value={datasetInput?.license}
                  onChange={handleForm}
                  name="license"
                />
              </FormControl>
              <FormControl isRequired mb="20px">
                <FormLabel>Other Resources - Description</FormLabel>
                <Textarea
                  type="text"
                  value={datasetInput?.other_resources}
                  onChange={handleForm}
                  w="500px"
                  h="100px"
                  name="other_resources"
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

              <FormControl mb="20px">
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

export default DatasetForm_Submit;
