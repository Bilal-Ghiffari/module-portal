import { Input, Row, Col } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaArrowRight, FaEdit } from "react-icons/fa";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import { transformData } from "@/helpers/services/convert";
import { useEffect } from "react";
import { useState } from "react";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import {
  apiGetDropdownApostilleCountry,
  apiGetDropdownApostilleDokumen,
} from "@/helpers/backend_helper";

const OnBoardingPendaftaran = ({ formik, setActiveStep, label }) => {
  const [data, setData] = useState({
    documents: [],
    negara: [],
  });
  const toastifyService = new ToastifyService();

  function handleCheckAndRedirect() {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  useEffect(() => {
    fetchData();
  }, [label]);

  const fetchData = async () => {
    toastifyService.showLoading();

    try {
      const [docRes, countryRes] = await Promise.all([
        apiGetDropdownApostilleDokumen(),
        apiGetDropdownApostilleCountry(),
      ]);

      setData({
        documents: transformData(docRes?.data, {
          value: "id_jenis_dokumen",
          label: "jenis_dokumen",
        }),
        negara: transformData(countryRes?.data, {
          value: "id_negara",
          label: "nama_negara",
          jenis_layanan: "jenis_layanan",
        }),
      });
    } catch (err) {
      console.log("err", err);
    } finally {
      toastifyService.close();
    }
  };

  return (
    <div className="bg-white">
      <div className="d-flex flex-column w-100 py-4">
        <Row
          className="w-100"
          style={{ maxWidth: "800px", padding: "0px 50px" }}
        >
          <Col xs="12" className="mb-2">
            <h4 className="fw-bold" style={{ color: "#041662" }}>
              {label}
            </h4>
            <hr className="mt-0 mb-3" />
          </Col>

          <Col xs="12" className="mb-4">
            <p style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
              Anda akan memulai proses pendaftaran permohonan legalisasi
              dokumen. Silakan pilih dokumen yang ingin dilegalisasi serta
              negara tujuan untuk proses selanjutnya.
            </p>
          </Col>

          <Col xs="12" className="mb-2">
            <DynamicDropdown
              formik={formik}
              fieldName={"id_jenis_dokumen"}
              data={data.documents}
              label="Dokumen yang ingin dilegalisasi"
              required
              onChange={(val) => {
                formik.setFieldValue("id_jenis_dokumen", val.value);
                formik.setFieldValue("document", val.label);
              }}
            />
          </Col>

          <Col xs="12" className="mb-2">
            <DynamicDropdown
              id="apostille"
              formik={formik}
              fieldName={"id_negara"}
              data={data.negara}
              label="Negara tujuan legalisasi"
              required
            />
          </Col>

          <Col xs="12">
            {formik.values?.jenis_layanan && (
              <button
                className="mb-4"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: "#0d6efd",
                  color: "#fff",
                  border: "1px solid #0d6efd",
                  padding: "8px 16px",
                  borderRadius: "2px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                <FaEdit size={14} />
                <span className="text-capitalize">
                  {formik.values?.jenis_layanan}
                </span>
              </button>
            )}
          </Col>

          <Col xs="12" className="mb-4">
            <button
              onClick={handleCheckAndRedirect}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#041662",
                color: "#fff",
                border: "none",
                padding: "10px 16px",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            >
              <span>Mulai Pendaftaran</span> <FaArrowRight size={10} />
            </button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OnBoardingPendaftaran;
