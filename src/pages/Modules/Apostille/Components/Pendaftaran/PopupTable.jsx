import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../../../Fidusia/Header";
import { Row, Col, Label } from "reactstrap";
import Checked from "@/components/Common/Checked";
import { FormInput } from "@/components/Common/FormField";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import FileUploadComponent from "@/components/Common/UploadFile";
import ButtonCustom from "@/components/Common/ButtonCustom";
import { removeWord } from "@/helpers/services/convert";
import { postLayananFormData } from "@/helpers/api_helper";

const PopupTable = ({
  formik,
  open,
  setOpen,
  setDataDocuments,
  dataDocuments,
  dropdown,
}) => {
  const handleClose = () => setOpen(false);

  const handleSaveDocument = () => {
    const currentDocIdx = dataDocuments[0];
    const newDoc = formik.values.data_document[currentDocIdx];

    // Hapus slot kosong (null atau doc kosong)
    const existingDocs = formik.values.data_document.filter(
      (doc, idx) =>
        idx !== currentDocIdx && doc && doc.nama_dokumen?.trim() !== ""
    );

    // Tambah doc baru ke list lama
    const updatedDocs = [...existingDocs, newDoc];

    // Tambahkan slot kosong baru untuk berikutnya
    const initialDocumentObject = {
      tipe_dokumen: "Konvensional",
      nomor_dokumen: "",
      nama_dokumen: "",
      nama_tercantum: "",
      jumlah_halaman: "",
      tanggal_dokumen: "",
      tempat_cetak: "",
      instansi: "",
      nama_pejabat: "",
      jabatan_pejabat: "",
      berkas: [],
    };

    const py = {
      ...newDoc,
      jumlah_halaman: Number(newDoc.jumlah_halaman),
      id_kanwil: Number(newDoc.id_kanwil),
      id_jenis_dokumen: Number(formik.values.id_jenis_dokumen),
      id_spesimen_pejabat: Number(newDoc.id_spesimen_pejabat || 1),
    };

    postLayananFormData("/apostille/permohonan/dokumen", py)
      .then((res) => {
        const id = res?.data?.id_data_dokumen;
        if (id) {
          formik.setFieldValue("data_dokumen", [
            ...(formik.values.data_dokumen || []),
            { id_data_dokumen: id },
          ]);
        }

        formik.setFieldValue("data_document", [
          ...updatedDocs,
          initialDocumentObject,
        ]);

        setOpen(false);
      })
      .catch((err) => {
        console.log("err", err);
      });

    // Reset index pointer ke slot kosong
    setDataDocuments([updatedDocs.length]);
  };

  return (
    <div>
      <button
        className="px-2 py-2 border-0 text-primary d-flex align-items-center gap-1 px-3"
        onClick={() => {
          // Hitung index baru
          const nextIndex = formik.values.data_document.length;

          // Set dataDocuments ke index baru untuk render form kosong
          setDataDocuments([nextIndex]);

          // Buka popup
          setOpen(true);
        }}
        style={{ backgroundColor: "#E7E7E7", borderRadius: "6px" }}
      >
        + Tambah
      </button>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
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
          {dataDocuments.map((docIndex, docIdx) => {
            return (
              <div key={docIdx} className="border rounded-2 mb-3 p-3">
                {/* Tipe Dokumen */}
                <Row>
                  <Label>
                    Tipe Dokumen{" "}
                    {removeWord(formik.values?.document, "Dokumen")}
                    <span className="text-danger">*</span>
                  </Label>
                  <Col
                    xs="12"
                    style={{ padding: "0px 40px" }}
                    className="d-flex gap-5 mb-3"
                  >
                    <Checked
                      label={`Dokumen ${removeWord(
                        formik?.values.document || "",
                        "Dokumen"
                      )} Konvensional`}
                      value="Konvensional"
                      fieldName={`data_document[${docIndex}].tipe_dokumen`}
                      formik={formik}
                      type="radio"
                    />
                    <Checked
                      label={`Dokumen ${removeWord(
                        formik?.values.document || "",
                        "Dokumen"
                      )} Elektronik`}
                      value="Elektronik"
                      fieldName={`data_document[${docIndex}].tipe_dokumen`}
                      formik={formik}
                      type="radio"
                    />
                  </Col>
                </Row>

                {/* Input fields */}
                <Row>
                  <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                    <FormInput
                      formik={formik}
                      name={`document`}
                      type="text"
                      placeholder={`Jenis Dokumen`}
                      required
                      readonly
                    />
                    {/* <DynamicDropdown
                      formik={formik}
                      fieldName={"id_jenis_dokumen"}
                      data={dropdown.documents}
                      label="Dokumen yang ingin dilegalisasi"
                      required
                      isDisabled
                    /> */}
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                    <FormInput
                      formik={formik}
                      name={`data_document[${docIndex}].nama_dokumen`}
                      type="text"
                      placeholder={`Nama Dokumen ${removeWord(
                        formik?.values.document || "",
                        "Dokumen"
                      )}`}
                      required
                    />
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                    <FormInput
                      formik={formik}
                      name={`data_document[${docIndex}].nomor_dokumen`}
                      type="text"
                      placeholder={`Nomor Dokumen ${removeWord(
                        formik?.values.document || "",
                        "Dokumen"
                      )}`}
                      required
                    />
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                    <FormInput
                      formik={formik}
                      name={`data_document[${docIndex}].nama_tercantum`}
                      type="text"
                      placeholder={`Nama Tercantum di Dokumen ${removeWord(
                        formik?.values.document || "",
                        "Dokumen"
                      )}`}
                      required
                    />
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                    <FormInput
                      formik={formik}
                      name={`data_document[${docIndex}].jumlah_halaman`}
                      type="number"
                      maks={50}
                      title="Jumlah Halaman pada Dokumen"
                      placeholder={`Jumlah Halaman pada Dokumen (maks 50) ${removeWord(
                        formik?.values.document || "",
                        "Dokumen"
                      )}`}
                      required
                    />
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                    <FormInput
                      formik={formik}
                      name={`data_document[${docIndex}].tanggal_dokumen`}
                      type="date"
                      placeholder={`Tanggal Dokumen ${removeWord(
                        formik?.values.document || "",
                        "Dokumen"
                      )}`}
                      required
                    />
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="6" className="px-3">
                    <DynamicDropdown
                      formik={formik}
                      fieldName={`data_document[${docIndex}].id_kanwil`}
                      data={dropdown.kanwill}
                      label="Tempat Cetak Sticker Legalisasi"
                      required
                    />
                  </Col>
                </Row>

                {/* Lampiran */}
                <Col xs="12" className="px-3 border p-2 rounded-2 mt-3">
                  <Label>
                    Lampiran Dokumen{" "}
                    {removeWord(formik?.values.document, "Dokumen")}{" "}
                    <span className="text-danger">*</span>
                  </Label>
                  <Row>
                    {Array.from({
                      length:
                        Number(
                          formik.values.data_document?.[docIndex]
                            ?.jumlah_halaman
                        ) || 1,
                    }).map((_, idx) => (
                      <Row key={idx} className="mt-2">
                        <Col xs="8">
                          <FileUploadComponent
                            text={`Pilih file Anda ${idx + 1}`}
                            name={`data_document[${docIndex}].berkas[${idx}]`}
                            fieldValue={
                              formik.values?.data_document?.[docIndex]
                                ?.berkas?.[idx] || null
                            }
                            resFile={(file) => {
                              const jenisBerkas = "dokumen";

                              const formData = new FormData();
                              formData.append(jenisBerkas, file);

                              postLayananFormData(
                                "/apostille/permohonan/upload",
                                formData
                              ).then((res) => {
                                const result = res?.data;

                                const newFileObj = {
                                  id_berkas: result?.id_berkas,
                                  jenis_berkas: result?.jenis_berkas,
                                  s3_key: result?.s3_key,
                                  name: result?.original_name,
                                };

                                const docsCopy = [
                                  ...formik.values.data_document,
                                ];

                                // Pastikan dokumen di posisi docIndex ada
                                if (!docsCopy[docIndex]) {
                                  // Tambahkan dokumen default jika belum ada
                                  docsCopy[docIndex] = {
                                    tipe_dokumen: "Konvensional",

                                    nama_dokumen: "",
                                    nama_tercantum: "",
                                    jumlah_halaman: "",
                                    tanggal_dokumen: "",
                                    tempat_cetak: "",
                                    berkas: [],
                                    instansi: "",
                                    nama_pejabat: "",
                                    jabatan_pejabat: "",
                                  };
                                }

                                const currentAttachments = Array.isArray(
                                  docsCopy[docIndex].berkas
                                )
                                  ? [...docsCopy[docIndex].berkas]
                                  : [];

                                // Pastikan array cukup panjang
                                while (currentAttachments.length <= idx) {
                                  currentAttachments.push(null);
                                }

                                // Ganti file di posisi idx
                                currentAttachments[idx] = newFileObj;

                                docsCopy[docIndex].berkas = currentAttachments;

                                // Simpan kembali ke Formik
                                formik.setFieldValue("data_document", docsCopy);
                              });
                            }}
                            maxSizeMb={10}
                            validType="pdf"
                            specified
                            required
                          />
                        </Col>
                        {/* 
                        <Col
                          xs="4"
                          className="d-flex align-items-center gap-2"
                          style={{ marginTop: "-30px" }}
                        > */}
                        {/* Tombol Tambah */}
                        {/* {idx ===
                            (formik.values.data_document?.[docIndex]?.berkas
                              ?.length ?? 0) -
                              1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updatedDocs = [
                                  ...formik.values.data_document,
                                ];

                                if (
                                  !Array.isArray(updatedDocs[docIndex].berkas)
                                ) {
                                  updatedDocs[docIndex].berkas = [];
                                }

                                updatedDocs[docIndex].berkas.push(null);

                                formik.setFieldValue(
                                  "data_document",
                                  updatedDocs
                                );
                              }}
                              className="btn btn-light border"
                            >
                              +
                            </button>
                          )} */}

                        {/* Tombol Hapus */}
                        {/* {(formik.values.data_document?.[docIndex]?.berkas
                            ?.length ?? 0) > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const updatedDocs = [
                                  ...formik.values.data_document,
                                ];

                                updatedDocs[docIndex].berkas = (
                                  Array.isArray(updatedDocs[docIndex].berkas)
                                    ? updatedDocs[docIndex].berkas
                                    : [null]
                                ).filter((_, i) => i !== idx);

                                formik.setFieldValue(
                                  "data_document",
                                  updatedDocs
                                );
                              }}
                              className="btn btn-danger border"
                            >
                              -
                            </button>
                          )} */}
                        {/* </Col> */}
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
                      fieldName={`data_document[${docIndex}].id_spesimen_pejabat`}
                      data={dropdown.pejabat}
                      label="Nama Pejabat Publik"
                      onChange={(val) => {
                        formik.setFieldValue(
                          `data_document[${docIndex}].id_spesimen_pejabat`,
                          val.value
                        );
                        formik.setFieldValue(
                          `data_document[${docIndex}].nama_pejabat`,
                          val.label
                        );
                        formik.setFieldValue(
                          `data_document[${docIndex}].instansi`,
                          val.instansi
                        );
                        formik.setFieldValue(
                          `data_document[${docIndex}].jabatan_pejabat`,
                          val.jabatan_pejabat
                        );
                      }}
                      required
                      useLabel
                    />
                  </Col>

                  <Col xs="12" md="6" lg="4" xl="4" className="px-3">
                    <FormInput
                      formik={formik}
                      name={`data_document[${docIndex}].instansi`}
                      type="text"
                      placeholder="Onstansi"
                      readonly={true}
                    />
                  </Col>
                  <Col xs="12" md="6" lg="4" xl="4" className="px-3">
                    <FormInput
                      formik={formik}
                      name={`data_document[${docIndex}].jabatan_pejabat`}
                      type="text"
                      placeholder="Jabatan"
                      readonly={true}
                    />
                  </Col>
                </Row>
              </div>
            );
          })}

          {/* Tombol Simpan */}
          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <ButtonCustom onClick={handleSaveDocument} label="Simpan" />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupTable;
