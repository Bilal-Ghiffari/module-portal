import { Box, Typography } from "@mui/material";
import { Col, Row } from "reactstrap";
import { FormInput } from "@/components/Common/FormField";
import Header from "@/components/Header";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import Checked from "@/components/Common/Checked";
import DiriSendiri from "./DiriSendiri";
import OrangLain from "./OrangLain";
import PopupTable from "../PopupTable";
import TableKegiatanUsaha from "../TableDataDocument";
import { useState } from "react";
import { getCountries } from "@/services/RegionService";
import { transformData } from "@/helpers/services/convert";
import { useEffect } from "react";
import {
  apiGetDropdownApostilleDokumen,
  apiGetDropdownApostilleKanwil,
  apiGetDropdownApostilleSpesimenPejabat,
} from "@/helpers/backend_helper";

const PemilikUsaha = ({ formik, disabled = false }) => {
  const [open, setOpen] = useState(false);
  const [dataDocuments, setDataDocuments] = useState([0]);
  const [dropdown, setDropdown] = useState({
    negara: [],
    kanwill: [],
    pejabat: [],
    documents: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [countryRes, kanwilRes, pejabatRes, docRes] = await Promise.all([
        getCountries(),
        apiGetDropdownApostilleKanwil(),
        apiGetDropdownApostilleSpesimenPejabat(),
        apiGetDropdownApostilleDokumen(),
      ]);

      // console.log("pejabatRes", pejabatRes);

      setDropdown({
        negara: transformData(countryRes?.data, {
          value: "id_negara",
          label: "nama_negara",
        }),
        kanwill: transformData(kanwilRes?.data, {
          value: "id_kanwil",
          label: "nama_kanwil",
        }),
        pejabat: transformData(pejabatRes?.data, {
          value: "id_spesimen_pejabat",
          label: "nama_pejabat",
          instansi: "instansi",
          jabatan_pejabat: "jabatan_pejabat",
        }),
        documents: transformData(docRes?.data, {
          value: "id_jenis_dokumen",
          label: "jenis_dokumen",
        }),
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className="mt-5 mb-3 px-2 ">
      <Box sx={{ border: "1px solid #E7E7E7", borderRadius: 5, padding: 2 }}>
        {/* Informasi Pemohon Section */}
        <Row>
          <Col xs="12" md="12">
            <Header label={"Jenis Pemohon"} disabled={disabled} />
          </Col>
          <Col
            xs="12"
            style={{ padding: "0px 40px" }}
            className="d-flex align-items-center gap-5 mb-3"
          >
            <Checked
              key={`diri_sendiri-${formik.values.jenis_permohonan}`}
              label="Diri Sendiri"
              value="diri_sendiri"
              fieldName="jenis_permohonan"
              formik={formik}
              type="radio"
            />
            <Checked
              key={`orang_lain-${formik.values.jenis_permohonan}`}
              label="Orang Lain"
              value="orang_lain"
              fieldName="jenis_permohonan"
              formik={formik}
              type="radio"
            />
          </Col>
          <Col xs="12">
            {formik.values.jenis_permohonan == "orang_lain" && (
              <OrangLain
                formik={formik}
                disabled={disabled}
                country={dropdown.negara}
                dropdown={dropdown}
              />
            )}
            <DiriSendiri
              formik={formik}
              disabled={disabled}
              dropdown={dropdown}
            />
          </Col>
        </Row>

        {/*Data Dokumen Section */}
        <Row className="mt-4">
          <Col xs="12" md="12">
            <Box
              className="d-flex align-items-center justify-content-between"
              sx={{
                backgroundColor: "#EFF7FF",
                padding: 1,
                borderRadius: 2,
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#041662",
                  fontSize: "14px",
                  px: 0,
                  fontFamily: "Poppins",
                }}
                className="fw-semibold"
              >
                Data Dokumen
              </Typography>
              {!disabled && (
                <PopupTable
                  formik={formik}
                  open={open}
                  setOpen={setOpen}
                  setDataDocuments={setDataDocuments}
                  dataDocuments={dataDocuments}
                  dropdown={dropdown}
                />
              )}
            </Box>
          </Col>
          <Col xs="12" md="12" lg="12" xl="12" className="px-3">
            <TableKegiatanUsaha
              data={formik.values?.data_document?.filter(
                (doc) => doc?.nomor_dokumen && doc.nomor_dokumen.trim() !== ""
              )}
              formik={formik}
              showSelect={false}
              setOpen={setOpen}
              setDataDocuments={setDataDocuments}
            />
          </Col>
        </Row>
      </Box>
    </div>
  );
};

export default PemilikUsaha;
