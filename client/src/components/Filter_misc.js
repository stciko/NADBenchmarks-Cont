<Accordion defaultIndex={[0]} allowMultiple>
  <AccordionItem>


    <h2>Phase:</h2>
    <label>
      <input
        type="checkbox"
        value="Preparedness"
        checked={selectedPhase && selectedPhase.includes('Preparedness')}
        onChange={handlePhaseChange}
      />
      Preparedness
    </label>
    <br />
    <label>
      <input
        type="checkbox"
        value="Response"
        checked={selectedPhase && selectedPhase.includes('Response')}
        onChange={handlePhaseChange}
      />
      Response
    </label>
    <br />

    {/* Task */}
    <br />
    <h2>Task:</h2>
    <label>
      <input
        type="checkbox"
        value="Multiclass classification"
        checked={selectedTask && selectedTask.includes('Multiclass classification')}
        onChange={handleTaskChange}
      />
      Multiclass classification
    </label>
    <br />
    <label>
      <input
        type="checkbox"
        value="Segmentation"
        checked={selectedTask && selectedTask.includes('Segmentation')}
        onChange={handleTaskChange}
      />
      Segmentation
    </label>
    <br />

    {/* Modality */}
    <br />
    <h2>Modality:</h2>
    <label>
      <input
        type="checkbox"
        value="Image"
        checked={selectedModality && selectedModality.includes('Image')}
        onChange={handleModalityChange}
      />
      Image
    </label>
    <br />
    <label>
      <input
        type="checkbox"
        value="Video"
        checked={selectedModality && selectedModality.includes('Video')}
        onChange={handleModalityChange}
      />
      Video
    </label>







    <h2>
      <AccordionButton onClick={toggleAccordion} >
        {/* <Text fontSize="xl" as="b"> */}
        <Text className='section_header'>
          Disaster Topic
        </Text>
      </AccordionButton>
    </h2>
    {/* Checkboxes*/}
    <AccordionPanel isOpen={isOpen}>
      <CheckboxGroup>
        <Checkbox value="Atmospheric Rivers" isChecked={selectedTopic.includes('Atmospheric Rivers')}
          onChange={handleTopicChange} size="sm">
          Atmospheric Rivers
        </Checkbox>
        <br />
        <Checkbox value="Drought" isChecked={selectedTopic.includes('Drought')}
          onChange={handleTopicChange} size="sm">
          Drought
        </Checkbox>
        <br />
        <Checkbox value="Extreme Weather" isChecked={selectedTopic.includes('Extreme Weather')}
          onChange={handleTopicChange} size="sm">
          Extreme Weather
        </Checkbox> <br />
        <Checkbox value="Flood" isChecked={selectedTopic.includes('Flood')}
          onChange={handleTopicChange} size="sm">
          Flood
        </Checkbox> <br />
        <Checkbox value="General" isChecked={selectedTopic.includes('General')}
          onChange={handleTopicChange} size="sm">
          General
        </Checkbox><br />
        <Checkbox value="Hurricane" isChecked={selectedTopic.includes('Hurricane')}
          onChange={handleTopicChange} size="sm">
          Hurricane
        </Checkbox><br />
        <Checkbox value="Tornado" isChecked={selectedTopic.includes('Tornado')}
          onChange={handleTopicChange} size="sm">
          Tornado
        </Checkbox><br />
        <Checkbox value="Tropical Cyclone" isChecked={selectedTopic.includes('Tropical Cyclone')}
          onChange={handleTopicChange} size="sm">
          Tropical Cyclone
        </Checkbox><br />
        <Checkbox value="Volcanic Eruption" isChecked={selectedTopic.includes('Volcanic Eruption')}
          onChange={handleTopicChange} size="sm">
          Volcanic Eruption
        </Checkbox><br />
        <Checkbox value="Wildfire" isChecked={selectedTopic.includes('Wildfire')}
          onChange={handleTopicChange} size="sm">
          Wildfire
        </Checkbox><br />
      </CheckboxGroup>
    </AccordionPanel>
  </AccordionItem>

  {/* Topic */}

</Accordion>

//----------------------------------------------------------------------------------------------------------------
//Pre filter design



import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Button,
  Text, Box, Checkbox, CheckboxGroup,
  Accordion, AccordionItem, AccordionButton, AccordionPanel,
} from '@chakra-ui/react';
import '../css/filters.css';



const Filter = ({ dataset, onFilter, onClear }) => {
  // const location = useLocation();
  // const dataset = location.state;

  // console.log(initialList);
  const [filteredData, setFilteredData] = useState([]);

  const [selectedTopic, setSelectedTopic] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [selectedModality, setSelectedModality] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleTopicChange = (event) => {
    const topic = event.target.value;
    setSelectedTopic((prevSelected) => {
      if (prevSelected.includes(topic)) { //remove from list if unchecked
        return prevSelected.filter((selected) => selected !== topic);
      } else {                           //add to list if checked
        return [...prevSelected, topic];
      }
    });
  };
  const handlePhaseChange = (event) => {
    const phase = event.target.value;
    setSelectedPhase((prevSelected) => {
      if (prevSelected.includes(phase)) {
        return prevSelected.filter((selected) => selected !== phase);
      } else {
        return [...prevSelected, phase];
      }
    });
  };
  const handleTaskChange = (event) => {
    const task = event.target.value;
    setSelectedTask((prevSelected) => {
      if (prevSelected.includes(task)) {
        return prevSelected.filter((selected) => selected !== task);
      } else {
        return [...prevSelected, task];
      }
    });
  };
  const handleModalityChange = (event) => {
    const modality = event.target.value;
    setSelectedModality((prevSelected) => {
      if (prevSelected.includes(modality)) {
        return prevSelected.filter((selected) => selected !== modality);
      } else {
        return [...prevSelected, modality];
      }
    });
  };

  //change results only after clicking Apply button
  const handleApplyFilters = () => {
    const filteredList = dataset.filter((item) => {
      //topic, phase, modality are single element
      const matchTopic = selectedTopic.length ? selectedTopic.includes(item.topic) : true;
      const matchModality = selectedModality.length ? selectedModality.includes(item.data_type) : true;
      const matchPhase = selectedPhase.length ? selectedPhase.includes(item.phases) : true;

      //task type is array of task types
      const matchTask = selectedTask.length ? selectedTask.some((task) => item.task_type.includes(task)) : true;
      return matchTopic && matchPhase && matchTask && matchModality;
    });
    // setFilteredData(filteredList);

    onFilter(filteredList);
  };

  //reset list as narrowed down by search results
  const handleClearFilters = () => {
    setSelectedTopic([]);
    setSelectedTask([]);
    setSelectedModality([]);
    setSelectedPhase([]);
    // console.log(initialList);
    onClear();
  };

  // change results as checkbox clicked
  // useEffect(() => {
  //   const filteredData = dataset.filter((item) => {
  //     const matchPhase = selectedPhase.length ? selectedPhase.includes(item.phases) : true;
  //     const matchTask = selectedTask.length ? item.task_type.some(taskType => selectedTask.includes(taskType)) : true;
  //     return matchPhase && matchTask;
  //   });
  //   onFilter(filteredData);
  // }, [dataset, selectedPhase, selectedTask, onFilter]);

  return (
    <Box p="10px" mt="50px" className='filter_box'
    // height="750px"
    // maxH="800px"
    // maxW="1000px"
    // // maxW="70%"
    // borderWidth="1px"
    // borderRadius="15px"
    // overflow="hidden"
    // // boxShadow="md"
    // border={"hidden"}
    // p="20px"
    // mt="20px"
    >
      {/* Topic */}

      <Accordion defaultIndex={[0, 1, 2, 3]} allowMultiple>
        <AccordionItem>
          <h2>
            <AccordionButton onClick={toggleAccordion} >
              {/* <Text fontSize="xl" as="b"> */}
              <Text className='filter_header'>
                Phase
              </Text>
            </AccordionButton>
          </h2>
          {/* Checkboxes*/}
          <AccordionPanel isOpen={isOpen}>

            {/* Phase */}
            <Checkbox className='checkbox' value="Preparedness" isChecked={selectedPhase.includes('Preparedness')}
              onChange={handlePhaseChange} size="sm">
              <Text className='filter_text'>
                Preparedness
              </Text>
            </Checkbox><br />
            <Checkbox value="Response" isChecked={selectedPhase.includes('Response')}
              onChange={handlePhaseChange} size="sm">
              Response
            </Checkbox><br />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton onClick={toggleAccordion} >
              {/* <Text fontSize="xl" as="b"> */}
              <Text className='section_header'>
                Task
              </Text>
            </AccordionButton>
          </h2>
          {/* Checkboxes*/}
          <AccordionPanel isOpen={isOpen}>
            {/* Task */}
            <Checkbox value="Multiclass classification" isChecked={selectedTask.includes('Multiclass classification')}
              onChange={handleTaskChange} size="sm">
              Multiclass classification
            </Checkbox><br />
            <Checkbox value="Segmentation" isChecked={selectedTask.includes('Segmentation')}
              onChange={handleTaskChange} size="sm">
              Segmentation
            </Checkbox><br />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton onClick={toggleAccordion} >
              {/* <Text fontSize="xl" as="b"> */}
              <Text className='section_header'>
                Modality
              </Text>
            </AccordionButton>
          </h2>
          {/* Checkboxes*/}
          <AccordionPanel isOpen={isOpen}>
            {/* Task */}
            <Checkbox value="Image" isChecked={selectedModality.includes('Image')}
              onChange={handleModalityChange} size="sm">
              Image
            </Checkbox><br />
            <Checkbox value="Video" isChecked={selectedModality.includes('Video')}
              onChange={handleModalityChange} size="sm">
              Video
            </Checkbox><br />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton onClick={toggleAccordion} >
              {/* <Text fontSize="xl" as="b"> */}
              <Text className='section_header'>
                Disaster Topic
              </Text>
            </AccordionButton>
          </h2>
          {/* Checkboxes*/}
          <AccordionPanel isOpen={isOpen}>
            {/* Task */}
            <Checkbox value="Flood" isChecked={selectedTopic.includes('Flood')}
              onChange={handleTopicChange} size="sm">
              Flood
            </Checkbox><br />
            <Checkbox value="General" isChecked={selectedTopic.includes('General')}
              onChange={handleTopicChange} size="sm">
              General
            </Checkbox><br />
          </AccordionPanel>
        </AccordionItem>

      </Accordion>
      <br />
      <Button bg="#7AAC35" color="#FFFFFF" variant="solid" onClick={handleApplyFilters}>
        Apply
      </Button>
      <Button ml="5px" bg="#7AAC35" color="#FFFFFF" variant="solid" onClick={handleClearFilters}>
        Clear All
      </Button>

      {/* <ul>
        {filteredData.map((item) => (
          <li key={item.id}>
            Phase: {item.phase}, Task: {item.task}
          </li>
        ))}
      </ul> */}
    </Box>
  );
};

export default Filter;












