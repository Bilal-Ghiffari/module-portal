import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Collapse } from 'reactstrap';
import { FaQuestion } from 'react-icons/fa';
import FAQModal from './FaqModal';
const FAQ = () => {
  const [modal, setModal] = useState(false);
  const [collapse, setCollapse] = useState(null); // Menyimpan ID pertanyaan yang sedang terbuka

  // Toggle Modal
  const toggleModal = () => setModal(!modal);

  // Toggle Collapse untuk setiap item FAQ
  const toggleCollapse = (index) => {
    setCollapse(collapse === index ? null : index); // Toggle antara open/close
  };

  const faqData = [
    {
      question: 'Apa itu sistem ini?',
      answer: 'Sistem ini digunakan untuk mengelola data administrasi hukum.',
    },
    {
      question: 'Bagaimana cara menggunakan fitur ini?',
      answer: 'Pilih menu yang sesuai di dashboard untuk mengakses fitur.',
    },
    {
      question: 'Siapa yang dapat mengakses sistem ini?',
      answer: 'Hanya pengguna terdaftar dan memiliki akses yang valid.',
    },
  ];

  const faqDatas = [
    {
      title: 'FAQ Perseroan Terbatas',
      data: [
        {
          question: 'Siapa yang dapat mengakses sistem ini?',
          answer: 'Hanya pengguna terdaftar dan memiliki akses yang valid.',
        },
        {
          question: 'Bagaimana cara menggunakan fitur ini?',
          answer: 'Pilih menu yang sesuai di dashboard untuk mengakses fitur.',
        },
      ],
    },
    {
      title: 'FAQ Fidusia',
      data: [
        {
          question: 'Apa itu sistem ini?',
          answer: 'Sistem ini digunakan untuk mengelola data administrasi hukum.',
        },
      ],
    },
  ];

  return (
    <>
      <div className="position-absolute bottom-0 end-0 p-4 z-3">
        {/* FAQ Button */}
        <Button
          color="primary"
          onClick={toggleModal}
          style={{ position: 'fixed', bottom: '20px', right: '20px', borderRadius: '4px' }}
          className="d-flex align-items-center rounded-3">
          FAQ
          <FaQuestion size={12} className="ms-1" />
        </Button>
      </div>

      <FAQModal modal={modal} toggleModal={toggleModal} />
    </>
  );
};

export default FAQ;
