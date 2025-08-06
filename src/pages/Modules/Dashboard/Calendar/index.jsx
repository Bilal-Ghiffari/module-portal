import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import BootstrapTheme from '@fullcalendar/bootstrap';
import { Modal, Button, Form } from 'react-bootstrap';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';

const Calender = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState('info');
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setEventTitle('');
    setEventType('info');
    setShowModal(true);
  };

  const handleEventClick = (info) => {
    setSelectedEventId(info.event.id);
    setEventTitle(info.event.title);
    setShowDeleteModal(true);
  };

  const getColorByType = (type) => {
    switch (type) {
      case 'penting':
        return '#dc3545'; // red
      case 'meeting':
        return '#0d6efd'; // blue
      case 'info':
        return '#198754'; // green
      case 'santai':
        return '#ffc107'; // yellow
      default:
        return '#6c757d'; // grey
    }
  };

  const handleSave = () => {
    if (eventTitle && selectedDate) {
      const newEvent = {
        id: `${Date.now()}`, // unique ID
        title: `${eventTitle} (${eventType})`,
        date: selectedDate,
        color: getColorByType(eventType),
      };
      setEvents([...events, newEvent]);
      setEventTitle('');
      setSelectedDate(null);
      setEventType('info');
      setShowModal(false);
    }
  };

  const handleDelete = () => {
    const updatedEvents = events.filter((event) => event.id !== selectedEventId);
    setEvents(updatedEvents);
    setShowDeleteModal(false);
    setSelectedEventId(null);
  };

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <div className="w-full">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="fw-semibold mb-0 text-dark">Kegiatan</h5>
            </div>
            <FullCalendar
              plugins={[BootstrapTheme, dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              editable={false}
              selectable={true}
              events={events}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              themeSystem="bootstrap"
              height="375px"
              // untuk ngilangin button today sama arrow
              // headerToolbar={false}
            />

            {/* Modal Tambah */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Tambah Kegiatan</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Judul Kegiatan</Form.Label>
                  <Form.Control
                    type="text"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    placeholder="Contoh: Rapat Koordinasi"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Jenis Kegiatan</Form.Label>
                  <Form.Select value={eventType} onChange={(e) => setEventType(e.target.value)}>
                    <option value="penting">Penting</option>
                    <option value="meeting">Meeting</option>
                    <option value="info">Info</option>
                    <option value="santai">Santai</option>
                  </Form.Select>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Batal
                </Button>
                <Button variant="primary" onClick={handleSave}>
                  Simpan
                </Button>
              </Modal.Footer>
            </Modal>

            {/* Modal Hapus */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Hapus Kegiatan</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Apakah Anda yakin ingin menghapus kegiatan ini?
                <p>
                  <strong>{eventTitle}</strong>
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                  Batal
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                  Hapus
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default Calender;
