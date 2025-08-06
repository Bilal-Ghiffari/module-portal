import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import { ToastifyService } from "../../Toastify/toastifyService";
import { useFormik } from "formik";
// import { validationSchema } from "./validation";
import * as url from "@/helpers/url_helper";
import { errorMsg, successMsg } from "@/helpers/Notification/toastNotification";
import dayjs from "dayjs";
// Pages
import Swal from "sweetalert2";
import { filterEmptyValues } from "@/helpers/services/convert";
import { ArrowForward } from "@mui/icons-material";
import Layanan from "./Layanan";

// dummy dulu, buat validasi di setiap step
const stepFields = [
  ["nama_perseroan", "voucher"],
  ["checked"],
  ["checked"],
  ["checked"],
  ["checked"],
];

import { StepLabel } from "@mui/material";

const Pendaftaran = ({ label = "-" }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const isStepSkipped = (step) => skipped.has(step);
  const toastifyService = new ToastifyService();

  const formik = useFormik({
    initialValues: {
      metode_pembayaran: "",
    },
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (values) => {
      toastifyService.confirmationCreate().then((res) => {
        if (res) {
          // toastifyService.showLoading();
          const payload = {
            ...values,
          };
          console.log("payload", payload);
          toastifyService.info("API Belum tersedia");
          // postFormData(url.SP_POST_EVALUASI_DATA_IG, payload)
          //   .then(() => {
          //     successMsg("success");
          //     setValue(0);
          //     Swal.close();
          //   })
          //   .catch((err) => {
          //     errorMsg(err);
          //     Swal.close();
          //   });
        }
      });
    },
  });

  // useEffect(() => {
  //   setActiveStep(0);
  //   formik.resetForm();
  // }, [label]);

  console.log("formik", formik.values);

  const handleNext = () => {
    const currentStepFields = stepFields[activeStep];

    formik.validateForm().then((errors) => {
      const stepErrors = currentStepFields.reduce((acc, field) => {
        if (errors[field]) {
          acc[field] = errors[field];
        }
        return acc;
      }, {});

      if (Object.keys(stepErrors).length === 0) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
          const newSkipped = new Set(prevSkipped.values());
          newSkipped.delete(activeStep);
          return newSkipped;
        });
      } else {
        formik.setTouched({
          ...formik.touched,
          ...currentStepFields.reduce((acc, field) => {
            acc[field] = true;
            return acc;
          }, {}),
        });
      }
    });
  };

  const handleSubmit = async (status) => {
    console.log("status");
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        formik.setFieldValue("status", status);
        formik.submitForm();
      } else {
        formik.setTouched(
          Object.keys(errors).reduce((acc, key) => {
            acc[key] = true;
            return acc;
          }, {})
        );
      }
    });
  };

  const allSteps = [
    {
      id: "1",
      label: "Layanan",
      stepNumber: "Langkah 1",
      component: (
        <Layanan
          formik={formik}
          setActiveStep={setActiveStep}
          label={"Pembelian Voucher"}
          description={"Silahkan pilih layanan yang anda inginkan"}
        />
      ),
    },
    {
      id: "2",
      label: "Detail Voucher",
      stepNumber: "Langkah 2",
      component: (
        <Layanan
          formik={formik}
          setActiveStep={setActiveStep}
          label={"Detail Voucher"}
          description={"Berikut adalah rincian pemesanan voucher Anda"}
        />
      ),
    },
    {
      id: "3",
      label: "Metode",
      stepNumber: "Langkah 3",
      component: (
        <Layanan
          formik={formik}
          setActiveStep={setActiveStep}
          label={"Metode Pembayaran"}
          description={"Silahkan pilih metode pembayaran yang Anda inginkan"}
        />
      ),
    },
    {
      id: "4",
      label: "Pembayaran",
      stepNumber: "Langkah 4",
      component: (
        <Layanan
          formik={formik}
          setActiveStep={setActiveStep}
          label={"Pembayaran Voucher"}
          description={
            "Silakan lakukan pembayaran sebelum batas waktu yang ditentukan"
          }
        />
      ),
    },
  ];

  const stepsConfig = {
    "-": ["1", "2", "3", "4"],
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
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }

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
                  handleSubmit("submit");
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
                ? "Selesai"
                : "Selanjutnya"}
              <ArrowForward fontSize="14" />
            </Button>
          </div>
        </Box>
      </React.Fragment>
    </Box>
  );
};

export default Pendaftaran;
