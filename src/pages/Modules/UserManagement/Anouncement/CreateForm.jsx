import React, { useEffect, useMemo } from 'react';
import { Formik, Form } from 'formik';
import { Form as BootstrapForm, Button, Row, Col } from 'react-bootstrap';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Select from 'react-select';

const optionStatus = [
  { value: '1', label: 'Aktif' },
  { value: '0', label: 'Tidak Aktif' },
];

const CreateForm = ({ onSubmit, optionRole, detail }) => {
  const initialValues = useMemo(
    () => ({
      title: detail?.title || '',
      message: detail?.message || '',
      start_date: detail?.start_date || '',
      end_date: detail?.end_date || '',
      is_active: detail?.is_active || '1',
      r_roles_code: detail?.r_roles_code || [],
    }),
    [detail]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          onSubmit(values);
          actions.setSubmitting(false);
          actions.resetForm();
        }}>
        {({ handleChange, handleBlur, values, handleSubmit, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <BootstrapForm.Group className="mb-3" controlId="formTitle">
              <BootstrapForm.Label>Judul</BootstrapForm.Label>
              <BootstrapForm.Control
                type="text"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="(contoh: PENTING!!)"
                required
              />
            </BootstrapForm.Group>

            <BootstrapForm.Group className="mb-3" controlId="formMessage">
              <BootstrapForm.Label>Pesan</BootstrapForm.Label>
              <BootstrapForm.Control
                as="textarea"
                name="message"
                rows={3}
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Masukkan pesan"
                required
              />
            </BootstrapForm.Group>

            <Row>
              <Col md={12}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Pilih Role</BootstrapForm.Label>
                  <Select
                    name="role"
                    options={optionRole}
                    isMulti
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: 'white',
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: 'white',
                      }),
                    }}
                    value={optionRole.filter((opt) =>
                      values.r_roles_code.includes(Number(opt.value))
                    )}
                    onChange={(selectedOptions) =>
                      setFieldValue(
                        'r_roles_code',
                        selectedOptions ? selectedOptions.map((option) => Number(option.value)) : [] // Ubah nilai selectedOptions.value menjadi Number
                      )
                    }
                    onBlur={handleBlur}
                    isSearchable={false}
                    placeholder={'Pilih role'}
                  />
                </BootstrapForm.Group>
              </Col>
              <Col md={12}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Status Running Text</BootstrapForm.Label>
                  <Select
                    name="status"
                    options={optionStatus}
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: 'white',
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: 'white',
                      }),
                    }}
                    value={optionStatus.find((opt) => opt.value === values.is_active) || null}
                    onChange={(option) => setFieldValue('is_active', option?.value)}
                    onBlur={handleBlur}
                    isSearchable={false}
                    placeholder={'Pilih aktif / tidak'}
                  />
                </BootstrapForm.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Tanggal Mulai</BootstrapForm.Label>
                  <DatePicker
                    value={values.start_date ? dayjs(values.start_date) : null}
                    onChange={(val) =>
                      setFieldValue('start_date', val ? val.format('YYYY-MM-DD') : '')
                    }
                    minDate={dayjs()}
                    slotProps={{
                      textField: { fullWidth: true, size: 'small' },
                    }}
                    format="YYYY-MM-DD"
                  />
                </BootstrapForm.Group>
              </Col>
              <Col md={6}>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Tanggal Selesai</BootstrapForm.Label>
                  <DatePicker
                    value={values.end_date ? dayjs(values.end_date) : null}
                    onChange={(val) =>
                      setFieldValue('end_date', val ? val.format('YYYY-MM-DD') : '')
                    }
                    minDate={values.start_date ? dayjs(values.start_date) : dayjs()}
                    slotProps={{
                      textField: { fullWidth: true, size: 'small' },
                    }}
                    format="YYYY-MM-DD"
                  />
                </BootstrapForm.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end">
              <Button type="submit" variant="primary">
                Kirim
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </LocalizationProvider>
  );
};

export default CreateForm;
