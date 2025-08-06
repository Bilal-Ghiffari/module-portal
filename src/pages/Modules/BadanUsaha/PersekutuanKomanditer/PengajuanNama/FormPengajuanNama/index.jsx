import { Formik, Form } from "formik";
import { Box } from "@mui/material";
import { Label, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";

import LineDashed from "@/components/Common/Line/Dashed";
import InformasiPemohon from "./InformasiPemohon";
import AlamatPemohon from "./AlamatPemohon";
import InformasiCV from "./InformasiCV";
import { CustomButton } from "@/components/Common/Button";

import InitialValuesPengajuanNama from "../Schema/InitialValues/InitialValues";
import ValidationSchemaPengajuanNama from "../Schema/PengajuanNamaValidationSchema";
import { ErrorMessage } from "formik";
import { useState, useRef } from "react";
import ModalPreview from "../components/Modal/ModalPreview";
import SuccessPengajuanNama from "./Success";

const FormPengajuanNama = () => {
  const navigate = useNavigate();
  const informasiCV = useRef();

  const [openModal, setOpenModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [duplicate, setDuplicate] = useState({
    nama: null,
    singkatan: null,
  });

  const handleSubmit = (values) => {
    console.log("submit berhasil", values);
    setIsSuccess(true);
    setOpenModal(false);
  };

  if (isSuccess)
    return <SuccessPengajuanNama values={InitialValuesPengajuanNama} />;

  return (
    <Box
      className="bg-white page-content mb-4"
      sx={{ width: "100%", minHeight: "100vh" }}
    >
      <div style={{ minHeight: "100vh" }}>
        <h3 style={{ fontWeight: 500, fontSize: 24, color: "#041662" }}>
          Formulir Pengajuan Nama CV
        </h3>

        <Formik
          initialValues={InitialValuesPengajuanNama}
          validationSchema={ValidationSchemaPengajuanNama}
          onSubmit={() => {
            const isBlocked =
              duplicate.nama !== false || duplicate.singkatan !== false;

            if (isBlocked) {
              const element = informasiCV.current;
              if (element) {
                const yOffset = -100;
                const y =
                  element.getBoundingClientRect().top +
                  window.pageYOffset +
                  yOffset;

                window.scrollTo({ top: y, behavior: "smooth" });
              }
              return;
            }
            setOpenModal(!openModal);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            setFieldValue,
            submitForm,
          }) => (
            <Form>
              <div
                className="border border-1 p-4 mt-4"
                style={{ borderColor: "#E7E7E7", borderRadius: "12px" }}
              >
                <InformasiPemohon
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />

                <LineDashed />

                <AlamatPemohon
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                />

                <LineDashed />

                <div ref={informasiCV}>
                  <InformasiCV
                    values={values}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    duplicate={duplicate}
                    setDuplicate={setDuplicate}
                  />
                </div>

                <LineDashed />

                <div>
                  <Label check className="d-flex gap-2">
                    <Input
                      type="checkbox"
                      name="setuju"
                      value={values.setuju}
                      onChange={(e) =>
                        setFieldValue("setuju", e.target.checked)
                      }
                    />
                    <span className="fw-normal">
                      Saya mengerti dan memahami, atas Peraturan Presiden nomor
                      13 tahun 2018 tentang Prinsip Mengenali Pemilik Manfaat
                      dari korporasi Dalam Rangka Pencegahan dan Pemberantasan
                      Tindak Pidana Pencucian Uang dan Tindak Pidana Pendanaan
                      Terorisme.
                    </span>
                  </Label>
                  <ErrorMessage
                    name="setuju"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <LineDashed />

                <div className="d-flex justify-content-end gap-2">
                  <CustomButton
                    text="Kembali"
                    bgColor="transparent"
                    border="1px solid #E7E7E7"
                    textColor="#041662"
                    onClick={() =>
                      navigate(
                        "/badan-usaha/persekutuan-komanditer/pengajuan-nama/"
                      )
                    }
                    sx={{ width: "180px" }}
                  />
                  <CustomButton
                    text="Simpan"
                    type="button"
                    onClick={submitForm}
                    sx={{
                      width: "180px",
                    }}
                  />
                </div>
              </div>

              <ModalPreview
                isOpen={openModal}
                toggle={() => setOpenModal(!openModal)}
                onSubmit={() => handleSubmit(values)}
                values={values}
              />
            </Form>
          )}
        </Formik>
      </div>
    </Box>
  );
};

export default FormPengajuanNama;
