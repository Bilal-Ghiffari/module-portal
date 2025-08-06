import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../Header';
import { Row, Col, Label } from 'reactstrap';
import Checked from '@/components/Common/Checked';
import { FormInput } from '@/components/Common/FormField';
import { DynamicDropdown } from '@/components/DynamicDropdown';
import FileUploadComponent from '@/components/Common/UploadFile';
import ButtonCustom from '@/components/Common/ButtonCustom';

const PopupTable = ({ formik }) => {
  const [open, setOpen] = useState(false);
  const [dataDocuments, setDataDocuments] = useState([0]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSaveDocument = () => {
    const currentDocIdx = dataDocuments[0];
    const newDoc = formik.values.data_document[currentDocIdx];

    // Simpan dokumen baru ke list lama, exclude dokumen kosong
    const existingDocs = formik.values.data_document.filter(
      (_, idx) => idx !== currentDocIdx
    );
    const updatedDocs = [...existingDocs, newDoc];

    // Set dokumen yg sudah fix ke formik
    formik.setFieldValue('data_document', updatedDocs);

    // Siapkan slot kosong untuk dokumen berikutnya
    const initialDocumentObject = {
      tipe_document: 'dokumen_konvesional',
      jenis_document: '',
      nama_document: '',
      nama_pemilik_document: '',
      jumlah_document: '',
      tanggal_document: '',
      tempat_cetak: '',
      instansi_pejabat: '',
      nama_pejabat: '',
      jabatan: '',
      lampiran_document: [null],
    };

    const nextIdx = updatedDocs.length; // index berikutnya
    formik.setFieldValue('data_document', [
      ...updatedDocs,
      initialDocumentObject,
    ]);
    // formik.setFieldValue("data_document", updatedDocs);

    // Reset dataDocuments → render hanya slot kosong berikutnya
    setDataDocuments([nextIdx]);
  };

  return (
    <div>
      <button
        className="px-2 py-2 border-0 text-primary d-flex align-items-center gap-1 px-3"
        onClick={handleOpen}
        style={{ backgroundColor: '#E7E7E7', borderRadius: '6px' }}
      >
        + Tambah
      </button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Header label="Data Dokumen" />
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {dataDocuments.map((docIndex, docIdx) => (
            <div key={docIndex} className="border rounded-2 mb-3 p-3">
              {/* Tipe Dokumen */}
              <Row>
                <Label>
                  Tipe Dokumen <span className="text-danger">*</span>
                </Label>
                <Col
                  xs="12"
                  style={{ padding: '0px 40px' }}
                  className="d-flex gap-5 mb-3"
                >
                  <Checked
                    label="Dokumen Konvesional"
                    value="dokumen_konvesional"
                    fieldName={`data_document[${docIndex}].tipe_document`}
                    formik={formik}
                  />
                  <Checked
                    label="Dokumen Elektronik"
                    value="dokumen_elektronik"
                    fieldName={`data_document[${docIndex}].tipe_document`}
                    formik={formik}
                  />
                </Col>
              </Row>

              {/* Input fields */}
              <Row>
                <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                  <DynamicDropdown
                    formik={formik}
                    fieldName={`data_document[${docIndex}].jenis_document`}
                    data={[]}
                    label="Jenis Dokumen"
                    required
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                  <FormInput
                    formik={formik}
                    name={`data_document[${docIndex}].nama_document`}
                    type="text"
                    placeholder="Nama Dokumen"
                    required
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                  <FormInput
                    formik={formik}
                    name={`data_document[${docIndex}].nomor_document`}
                    type="text"
                    placeholder="Nomor Dokumen"
                    required
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                  <FormInput
                    formik={formik}
                    name={`data_document[${docIndex}].nama_pemilik_document`}
                    type="text"
                    placeholder="Nama Pemilik Dokumen"
                    required
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                  <FormInput
                    formik={formik}
                    name={`data_document[${docIndex}].jumlah_document`}
                    type="number"
                    placeholder="Jumlah Dokumen"
                    required
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                  <FormInput
                    formik={formik}
                    name={`data_document[${docIndex}].tanggal_document`}
                    type="date"
                    placeholder="Tanggal Dokumen"
                    required
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                  <DynamicDropdown
                    formik={formik}
                    fieldName={`data_document[${docIndex}].tempat_cetak`}
                    data={[]}
                    label="Tempat Cetak Sticker Legalisasi"
                    required
                  />
                </Col>
              </Row>

              {/* Lampiran */}
              <Col xs="12" className="px-3 border p-2 rounded-2 mt-3">
                <Label>
                  Lampiran Dokumen <span className="text-danger">*</span>
                </Label>
                <Row>
                  {(
                    formik.values.data_document?.[docIndex]
                      ?.lampiran_document ?? []
                  ).map((file, idx) => (
                    <Row key={idx} className="mt-2">
                      <Col xs="8">
                        <FileUploadComponent
                          text={`Pilih file Anda ${idx + 1}`}
                          name={`data_document[${docIndex}].lampiran_document_${idx}`}
                          resFile={(newFile) => {
                            const updatedDocs = formik.values.data_document.map(
                              (doc, dIdx) => {
                                if (dIdx !== docIndex) return doc;
                                return {
                                  ...doc,
                                  lampiran_document: doc.lampiran_document.map(
                                    (f, fIdx) => (fIdx === idx ? newFile : f)
                                  ),
                                };
                              }
                            );
                            formik.setFieldValue('data_document', updatedDocs);
                          }}
                          maxSizeMb={10}
                          validType="pdf"
                          specified
                          required
                        />
                      </Col>
                      <Col xs="4" className="d-flex align-items-center gap-2">
                        {idx ===
                          (formik.values.data_document?.[docIndex]
                            ?.lampiran_document?.length ?? 0) -
                            1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updatedDocs =
                                formik.values.data_document.map((doc, dIdx) => {
                                  if (dIdx !== docIndex) return doc;
                                  return {
                                    ...doc,
                                    lampiran_document: [
                                      ...doc.lampiran_document,
                                      null,
                                    ],
                                  };
                                });
                              formik.setFieldValue(
                                'data_document',
                                updatedDocs
                              );
                            }}
                            className="btn btn-light border"
                          >
                            +
                          </button>
                        )}

                        {(formik.values.data_document?.[docIndex]
                          ?.lampiran_document?.length ?? 0) > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const updatedDocs =
                                formik.values.data_document.map((doc, dIdx) => {
                                  if (dIdx !== docIndex) return doc;
                                  return {
                                    ...doc,
                                    lampiran_document:
                                      doc.lampiran_document.filter(
                                        (_, i) => i !== idx
                                      ),
                                  };
                                });
                              formik.setFieldValue(
                                'data_document',
                                updatedDocs
                              );
                            }}
                            className="btn btn-danger border"
                          >
                            -
                          </button>
                        )}
                      </Col>
                    </Row>
                  ))}
                </Row>
              </Col>

              {/* Data Pejabat */}
              <Col xs="12" className="mt-4">
                <Header label="Data Pejabat" />
              </Col>
              <Row>
                <Col xs="12" md="6" lg="4" xl="4" className="px-3">
                  <DynamicDropdown
                    formik={formik}
                    fieldName={`data_document[${docIndex}].instansi_pejabat`}
                    data={[]}
                    label="Instansi Pejabat Publik"
                    required
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="4" className="px-3">
                  <FormInput
                    formik={formik}
                    name={`data_document[${docIndex}].nama_pejabat`}
                    type="text"
                    placeholder="Nama Pejabat Publik"
                    required
                  />
                </Col>
                <Col xs="12" md="6" lg="4" xl="4" className="px-3">
                  <DynamicDropdown
                    formik={formik}
                    fieldName={`data_document[${docIndex}].jabatan`}
                    data={[]}
                    label="Jabatan"
                    required
                  />
                </Col>
              </Row>
            </div>
          ))}

          {/* Tombol Simpan */}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <ButtonCustom onClick={handleSaveDocument} label="Simpan" />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupTable;
