import React, { useState } from 'react'; 
import { useLocation, Link } from 'react-router-dom';
import '../css/datasetdetail_text.css';
import {
    Text,Box,
    Accordion, AccordionItem, AccordionButton, AccordionPanel, 
    AccordionHeader, AccordionIcon
} from '@chakra-ui/react';

const Bullet_List = ({arr}) => {
  return (
      <ul className='bullet_list'>
        {arr.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
  );
}

const DatasetInfo_Accordion = () => {
    const location = useLocation();
    const dataset = location.state;
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };

    return (
      <Box
            height="750px"
            maxH="800px"
            maxW="1000px"
            // maxW="70%"
            borderWidth="1px"
            borderRadius="15px"
            overflow-wrap //overflow="hidden"
            overflow= "scroll"
            boxShadow="md"
            p="20px"
            mt="20px"
          > 
        <Accordion defaultIndex={[0]} allowMultiple>

          {/* Overview */}
          <AccordionItem>
            <h2>
              <AccordionButton onClick={toggleAccordion} >
                {/* <Text fontSize="xl" as="b"> */}
                <Text className='section_header'>    
                  Overview
              </Text>
              </AccordionButton>
            </h2>
            {/* Overview Content*/}
            <AccordionPanel isOpen={isOpen}>
              {/* Creator Info */}
              <Text className='dd_g_header'>
                Creator Information
              </Text >
                <Text className='dd_subheader'>
                  Authors  
                </Text>
                <Text className='dd_text'>
                  {dataset.authors}
                </Text>
                <br />
              {/* Data Selection and Preprocessing */}
              <Text className='dd_g_header'>
                Data Selection and Preprocessing
              </Text >
                <Text className='dd_subheader'>
                  Data Source  
                </Text>
                <Text className='dd_text'>
                  {dataset.data_source}
                </Text> <br />
                <Text className='dd_subheader'>
                  Annotation Methods / Annotation Information  
                </Text>
                <Text className='dd_text'>
                  {dataset.annotation_methods}
                </Text> <br />
                <Text className='dd_subheader'>
                  Missing Values
                </Text>
                <Text className='dd_text'>
                  {dataset.missing_values}
                </Text>
            </AccordionPanel>
          </AccordionItem>
          {/* End of Overview */}

          {/* Dataset Characteristics */}
          <AccordionItem>
            <h2>
              <AccordionButton onClick={toggleAccordion} >
                {/* <Text fontSize="xl" as="b"> */}
                <Text className='section_header'>    
                  Dataset Characteristics
              </Text>
              </AccordionButton>
            </h2>
            {/* Dataset Characteristics Content*/}
            <AccordionPanel isOpen={isOpen}>
              {/* Relevant Information */}
              <Text className='dd_g_header'>
                Relevant Information
              </Text >
                <Text className='dd_subheader'>
                  Feature Description  
                </Text>
                <Text className='dd_text'>
                  {dataset.feature_description}
                </Text><br />
                <Text className='dd_subheader'>
                  Number & Distribution of Labels  
                </Text>
                <Text className='dd_text'>
                  <Bullet_List arr={dataset.labels} />
                </Text>
            </AccordionPanel>
          </AccordionItem>
          {/* End of Dataset Characteristics */}

          {/* Evaluation  */}
          <AccordionItem>
            <h2>
              <AccordionButton onClick={toggleAccordion} >
                {/* <Text fontSize="xl" as="b"> */}
                <Text className='section_header'>    
                  Evaluation
              </Text>
              </AccordionButton>
            </h2>
            {/* Evaluation Content*/}
            <AccordionPanel isOpen={isOpen}>
              {/* Relevant Information */}
              <Text className='dd_g_header'>
                Models
              </Text >
                <Text className='dd_subheader'>
                  Base Models Used  
                </Text>
                <Text className='dd_text'>
                  <Bullet_List arr={dataset.base_models} />
                </Text><br />
                <Text className='dd_subheader'>
                  Deafult train/test/dev split 
                </Text>
                <Text className='dd_text'>
                  <Bullet_List arr={dataset.data_split} />
                </Text> <br />
                <Text className='dd_subheader'>
                  Evaluation Metrics 
                </Text>
                <Text className='dd_text'>
                  <Bullet_List arr={dataset.metrics} />
                </Text>
            </AccordionPanel>
          </AccordionItem>
          {/* End of Evaluation */}

          {/* Samples  */}
          <AccordionItem>
            <h2>
              <AccordionButton onClick={toggleAccordion} >
                {/* <Text fontSize="xl" as="b"> */}
                <Text className='section_header'>    
                Samples
              </Text>
              </AccordionButton>
            </h2>
            {/* Samples Content*/}
            <AccordionPanel isOpen={isOpen}>
              <Text className='dd_g_header'>
                Sample Data
              </Text >
            </AccordionPanel>
          </AccordionItem>
          {/* End of Samples */}

          {/* Limitations  */}
          <AccordionItem>
            <h2>
              <AccordionButton onClick={toggleAccordion} >
                {/* <Text fontSize="xl" as="b"> */}
                <Text className='section_header'>    
                Limitations
              </Text>
              </AccordionButton>
            </h2>
            {/* Limitations Content*/}
            <AccordionPanel isOpen={isOpen}>
              <Text className='dd_g_header'>
                Known Limitations
              </Text >
              <Text className='dd_text'>
                  {dataset.limitations}  
              </Text>
            </AccordionPanel>
          </AccordionItem>
          {/* End of Limitations */}

          {/* Access  */}
          <AccordionItem>
            <h2>
              <AccordionButton onClick={toggleAccordion} >
                {/* <Text fontSize="xl" as="b"> */}
                <Text className='section_header'>    
                Access
              </Text>
              </AccordionButton>
            </h2>
            {/* Access Content*/}
            <AccordionPanel isOpen={isOpen}>
              <Text className='dd_g_header'>
                Availability
              </Text >
                <Text className='dd_text'>
                  {dataset.availability}  
                </Text>
                <br />
              <Text className='dd_g_header'>
                License
              </Text >
                <Text className='dd_text'>
                  {dataset.license}  
                </Text>
            </AccordionPanel>
          </AccordionItem>
          {/* End of Access */}

           {/* More Resources  */}
           <AccordionItem>
            <h2>
              <AccordionButton onClick={toggleAccordion} >
                {/* <Text fontSize="xl" as="b"> */}
                <Text className='section_header'>    
                More Resources
              </Text>
              </AccordionButton>
            </h2>
            {/* More Resources Content*/}
            <AccordionPanel isOpen={isOpen}>
              <Text className='dd_g_header'>
                Other Resources
              </Text >
              <Text className='dd_text'>
                  {dataset.other_resources}  
              </Text>
            </AccordionPanel>
          </AccordionItem>
          {/* End of More Resources */}
        </Accordion>
        </Box>
    );
  };

export default DatasetInfo_Accordion;
