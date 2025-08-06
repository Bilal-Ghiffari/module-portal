import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import { ArrowForward } from "@mui/icons-material";
import Layanan from "./Layanan";

import { StepLabel } from "@mui/material";

const PemilikManfaat = ({
  formik,
  label = "-",
  editingIndex,
  setEditingIndex,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const lastIdx = formik.values.pemilik_manfaat.length - 1;
  const [data, setData] = useState(
    editingIndex !== null ? [editingIndex] : [lastIdx]
  );

  const handleSave = () => {
    const currentIdx = data[0];
    const newItem = formik.values.pemilik_manfaat[currentIdx];

    if (editingIndex !== null) {
      // mode edit ➜ ganti item di index editingIndex
      const updatedList = formik.values.pemilik_manfaat.map((item, idx) =>
        idx === editingIndex ? newItem : item
      );
      formik.setFieldValue("pemilik_manfaat", updatedList);
      setEditingIndex(null);
    } else {
      const existingItems = formik.values.pemilik_manfaat.filter(
        (item, idx) => idx !== currentIdx && item?.nama_lengkap?.trim() !== ""
      );

      const initialObject = {
        kewarganegaraan: "",
        jenis_identitas: "",
        nama_lengkap: "",
        email: "",
        no_hp: "",
        tanggal_lahir: "",
        tempat_lahir: "",
        no_identitas: "",
        npwp: "",
        hubungan_antara_korporasi_dengan_pemilik_manfaat: "",
        provinsi: "",
        kabupaten: "",
        kecamatan: "",
        kelurahan: "",
        alamat: "",
        no_telp: "",
        rt: "",
        rw: "",
        kode_pos: "",
        negara_asal: "",
        rules_pemilik_manfaat_8: "",
      };

      const newList = [...existingItems, newItem, initialObject];
      formik.setFieldValue("pemilik_manfaat", newList);
      setData([newList.length - 1]);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const allSteps = [
    {
      id: "1",
      label: "Pemilik Manfaat",
      stepNumber: "Langkah 1",
      component: (
        <Layanan
          formik={formik}
          setActiveStep={setActiveStep}
          label={"Pemilik Manfaat"}
          description={
            "Pemilik Manfaat dari perseroan merupakan orang perseorangan yang memenuhi kriteria"
          }
          data={data}
        />
      ),
    },
    {
      id: "2",
      label: "Informasi Pemilik Manfaat",
      stepNumber: "Langkah 2",
      component: (
        <Layanan
          formik={formik}
          setActiveStep={setActiveStep}
          label={"Informasi Pemilik Manfaat"}
          data={data}
        />
      ),
    },
  ];

  const stepsConfig = {
    "-": ["1", "2"],
  };

  // ambil id step yg ingin dipakai sesuai label
  const activeStepIds = stepsConfig[label] || [];

  // hasil akhirnya: hanya steps yg id-nya ada di activeStepIds
  const stepsResult = allSteps.filter((step) =>
    activeStepIds.includes(step.id)
  );

  const visibleStepperSteps = stepsResult.filter((s) => s.stepNumber);
  const stepperActiveStep = visibleStepperSteps.findIndex(
    (s) => s.id === stepsResult[activeStep]?.id
  );

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box className="bg-white mb-4" sx={{ width: "100%" }}>
      {visibleStepperSteps.length > 0 && (
        <Stepper activeStep={stepperActiveStep}>
          {visibleStepperSteps.map((step, index) => {
            const stepProps = {};

            return (
              <Step key={step.id} {...stepProps}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <StepLabel
                    StepIconComponent={({ active, completed }) => (
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          border: "1px solid #E7E7E7",
                          backgroundColor:
                            active || completed ? "#041662" : "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: active || completed ? "#fff" : "#041662",
                          fontSize: "12px",
                          fontWeight: 500,
                          fontFamily: "Poppins",
                        }}
                      >
                        {index + 1}
                      </div>
                    )}
                  />
                  <span
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "18px",
                      color: "#888888",
                      marginTop: "4px",
                      textAlign: "center",
                    }}
                  >
                    {step.label}
                  </span>
                </div>
              </Step>
            );
          })}
        </Stepper>
      )}

      <React.Fragment>
        <Box sx={{ mt: 2, border: "1px solid #E7E7E7" }}>
          {stepsResult[activeStep]?.component || "Unknown step"}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", pt: 2, px: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{
              mr: 1,
              backgroundColor: "#e5e7eb",
              color: "#000",
              px: 2,
              py: 1,
              textTransform: "initial",
              fontFamily: "Poppins",
              "&:hover": {
                backgroundColor: "#d1d5db",
                color: "#000",
              },
            }}
          >
            Kembali
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <div className="d-flex gap-2">
            <Button
              onClick={() => {
                if (activeStep === stepsResult.length - 1) {
                  handleSave();
                } else {
                  handleNext();
                }
              }}
              sx={{
                mr: 1,
                backgroundColor: "#041662",
                color: "#fff",
                border: "1px solid grey",
                px: 2,
                py: 1,
                fontFamily: "Poppins",
                "&:hover": {
                  backgroundColor: "#041992",
                  color: "#fff",
                },
                textTransform: "initial",
              }}
            >
              {activeStep === stepsResult.length - 1
                ? editingIndex !== null && editingIndex !== undefined
                  ? "Perbarui"
                  : "Simpan"
                : "Selanjutnya"}
              <ArrowForward fontSize="14" />
            </Button>
          </div>
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default PemilikManfaat;
