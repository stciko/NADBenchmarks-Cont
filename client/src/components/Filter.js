import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Button,
  Text, Box, Checkbox, CheckboxGroup,
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
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

  const accordionData = [
    {
      header: "Topic",
      values: ["Atmospheric Rivers", "Drought", "Extreme Weather", "Flood", "General", "Hurricane",
        "Tornado", "Tropical Cyclone", "Volcanic Eruption", "Wildfire"],
      filter_arr: selectedTopic,
      fn: handleTopicChange
    },
    {
      header: "Modality",
      values: ["Image", "Multimodal", "Numerical", "Text", "Vector Data", "Video"],
      filter_arr: selectedModality,
      fn: handleModalityChange
    },
    {
      header: "ML Task",
      values: ["Binary Classification", "Image Classification", "Image Segmentation",
        "Multiclass (Ordinal) Classification", "Multiclass Classification", "Multiclass Multilabel Classification",
        "Multiclass Segmentation", "Multilabel Classification", "Multitask Learning", "Semantic Segmentation",
        "Video Prediction", "Visual Question Answering"],
      filter_arr: selectedTask,
      fn: handleTaskChange
    },
    {
      header: "Phase",
      values: ["Preparedness", "Prevention", "Recovery", "Response"],
      filter_arr: selectedPhase,
      fn: handlePhaseChange
    },

  ];

  return (
    <Box >
      <Box mt="50px" className='filter_box'
        // height="750px"
        height="560px"
      // display="inline-block"
      // maxW="100%"
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

        <Accordion defaultIndex={[0, 1]} allowMultiple>
          {accordionData.map((section, index) => (
            <AccordionItem key={index} className='my_accordion'>
              <AccordionButton justifyContent="space-between">
                <Text className='filter_header'>
                  {section.header}
                </Text>
                <AccordionIcon mr={2} />
              </AccordionButton>

              {/* Checkboxes*/}
              <AccordionPanel isOpen={isOpen} paddingTop="0" paddingBottom="0">
                <Box paddingLeft={"15px"}>
                  {section.values.map((val, ind) => (
                    <div>
                      <Checkbox
                        key={ind}
                        className='checkbox'
                        value={val}
                        isChecked={section.filter_arr.includes(val)}
                        onChange={section.fn} size="sm">
                        <Text className='filter_text'>
                          {val}
                        </Text>
                      </Checkbox>
                      <br />
                    </div>
                  ))}
                </Box>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>

        {/* <ul>
        {filteredData.map((item) => (
          <li key={item.id}>
            Phase: {item.phase}, Task: {item.task}
          </li>
        ))}
      </ul> */}
      </Box>
        <Button size="sm" bg="#7AAC35" color="#FFFFFF" variant="solid" borderRadius={"0"}
          onClick={handleApplyFilters}>
          Apply
        </Button>
        <Button size="sm" ml="5px" bg="#7AAC35" color="#FFFFFF" variant="solid"  borderRadius={"0"} 
          onClick={handleClearFilters}>
          Clear All
        </Button>
    </Box>


  );
};

export default Filter;













