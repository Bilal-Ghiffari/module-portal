import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Collapse } from 'reactstrap';
import Select from 'react-select'; // Import react-select
import { faqDatas } from '../dummy';

const styles = {
  control: (base) => ({
    ...base,
    backgroundColor: '#f4f7fa', // Light gray background for control
    borderColor: '#e0e7ed', // Subtle border
    borderRadius: 8, // Rounded corners
    padding: '8px 12px',
    boxShadow: 'none', // No shadow
    transition: 'border-color 0.2s ease',
    '&:hover': {
      borderColor: '#a0aec0', // Light border color on hover
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for dropdown
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#3182ce' : 'white',
    color: state.isSelected ? 'white' : '#2d3748',
    padding: '10px 15px',
    cursor: 'pointer',
    fontWeight: state.isSelected ? '600' : '400',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#a0aec0', // Placeholder color
  }),
};

const FAQModal = ({ modal, toggleModal }) => {
  const [selectedFAQ, setSelectedFAQ] = useState('FAQ Perseroan Terbatas'); // Default selected FAQ title
  const [collapse, setCollapse] = useState(null); // To handle collapsing of questions

  // Toggle collapse for each question
  const toggleCollapse = (index) => {
    setCollapse(collapse === index ? null : index);
  };

  // Handle selecting FAQ category
  const handleSelectFAQ = (selectedOption) => {
    setSelectedFAQ(selectedOption.value); // Update selected FAQ title based on react-select
  };

  // Find the selected FAQ data based on the title
  const selectedData = faqDatas.find((item) => item.title === selectedFAQ);

  // Options for react-select dropdown
  const faqOptions = faqDatas.map((faq) => ({
    value: faq.title,
    label: faq.title,
  }));

  return (
    <Modal isOpen={modal} toggle={toggleModal} size="lg">
      <ModalHeader toggle={toggleModal} className="bg-primary text-white">
        FAQ
      </ModalHeader>
      <ModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
        {/* react-select dropdown for selecting FAQ category */}
        <Select
          options={faqOptions}
          value={faqOptions.find((option) => option.value === selectedFAQ)} // Set default value
          onChange={handleSelectFAQ} // Handle selection change
          className="mb-4 fw-bold"
          styles={styles}
        />

        {/* List of questions and collapsible answers */}
        <div className="list-group">
          {selectedData.data.map((item, index) => (
            <div
              key={index}
              className="list-group-item border-0 mb-3"
              style={{
                backgroundColor: '#f7fafc',
              }}>
              <h6
                className="fw-bold text-primary"
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => toggleCollapse(index)}>
                {item.question}
              </h6>

              <Collapse isOpen={collapse === index}>
                <p
                  style={{
                    fontSize: '13px',
                    lineHeight: '1.6',
                    paddingLeft: '15px',
                    marginTop: '8px',
                    padding: '12px 5px',
                  }}>
                  {item.answer}
                </p>
              </Collapse>
            </div>
          ))}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggleModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FAQModal;
