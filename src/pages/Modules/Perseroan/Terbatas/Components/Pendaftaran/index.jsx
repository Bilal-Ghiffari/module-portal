import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { useFormik } from "formik";
// import { validationSchema } from "./validation";
import * as url from "../../../../../../helpers/url_helper";
import {
  errorMsg,
  successMsg,
} from "../../../../../../helpers/Notification/toastNotification";
import dayjs from "dayjs";
// Pages
import Swal from "sweetalert2";
import { extractErrors, filterEmptyValues } from "@/helpers/services/convert";
import DataPerseroan from "./DataPerseroan";
import { ArrowForward } from "@mui/icons-material";
import FormulirPembubaran from "./FormulirPembubaran";
import { StepLabel } from "@mui/material";
import {
  generateStepSchemasByLabel,
  labelsStepConfig,
} from "./validationScehma";
import Detail from "../Detail";
import OnBoardingPendaftaran from "./OnBoarding";

const Pendaftaran = ({ label = "Pendaftaran Pendirian" }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const isStepSkipped = (step) => skipped.has(step);
  const toastifyService = new ToastifyService();

  const stepSchemas = useMemo(() => generateStepSchemasByLabel(label), [label]);
  // Step IDs sesuai label
  const activeStepIds = labelsStepConfig[label]?.steps || [];
  const currentStepId = activeStepIds[activeStep];
  const currentStepConfig = stepSchemas[currentStepId] || {
    fields: [],
    validation: null,
  };

  const formik = useFormik({
    initialValues: {
      // step 1
      voucher: "",

      // step 2
      rules_1: "",
      rules_2: "",

      // step 3
      nama_perseroan: "",
      modal_disetor: "Dalam bentuk Uang",
      maksud_tujuan_type:'1',
      maksud_tujuan: [
        {
          nama_pendiri: "",
          jenis_kelamin: "",
          tanggal_lahir: "",
          disabilitas: "",
        },
      ],
      modal_dasar: [
        {
          klasifikasi_saham: "",
          total_modal: "",
          harga_perlembar: "",
          lembar_saham: "",
        },
      ],
      modal_ditempatkan: [
        {
          klasifikasi_saham: "",
          total_modal: "",
          harga_perlembar: "",
          lembar_saham: "",
        },
      ],
      pemegang_saham: [
        {
          tanggal_lahir: "",
          jenis_pemegang_saham: "",
          kewarganegaraan: "",
          nama_lengkap: "",
          nik: "",
          npwp: "",
          email: "",
          no_hp: "",
          tempat_lahir: "",
          pemegang_saham_sebagai: [],
          klasifikasi_saham: "",
          lembar_saham: "",
          penanggung_jawab_pajak: "",
          jabatan_pengurus: "",
          alamat: "",
          no_telp: "",
          rt: "",
          rw: "",
          kode_pos: "",
          provinsi: "",
          kabupaten: "",
          kecamatan: "",
          kelurahan: "",
        },
      ],
      pemilik_manfaat: [
        {
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
        },
      ],
      // status untuk submit
      status: "",
    },
    validationSchema: currentStepConfig.validation,
    enableReinitialize: true,
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

  useEffect(() => {
    setActiveStep(0);
    formik.resetForm();
  }, [label]);

  // console.log("formik", formik.values);

  const handleSubmit = async (status, isDraft = false) => {
    if (isDraft) {
      // Langsung set status & submit tanpa validasi
      await formik.setFieldValue("status", status);
      await formik.submitForm();
      console.log("Submit draft tanpa validasi");
      return;
    }

    // Biasa: validasi dulu
    const allFields = activeStepIds.flatMap(
      (id) => stepSchemasByLabel[id]?.fields || []
    );
    const errors = await formik.validateForm();

    const filteredErrors = Object.keys(errors).reduce((acc, key) => {
      if (allFields.includes(key)) {
        acc[key] = errors[key];
      }
      return acc;
    }, {});

    if (Object.keys(filteredErrors).length === 0) {
      await formik.setFieldValue("status", status);
      await formik.submitForm();
      console.log("Submit final");
    } else {
      formik.setTouched(
        Object.keys(filteredErrors).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
      console.log("Ada error, tidak submit");
    }
  };

  const allSteps = [
    {
      id: "1",
      label: "Boarding",
      component: (
        <OnBoardingPendaftaran
          formik={formik}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          label={label}
        />
      ),
    },
    {
      id: "2",
      label: "Daftar Perseroan",
      component: (
        <OnBoardingPendaftaran
          formik={formik}
          setActiveStep={setActiveStep}
          activeStep={activeStep}
          label={label}
        />
      ),
    },
    {
      id: "3",
      label: "Data Perseroan",
      stepNumber: "Langkah 1",
      component: (
        <DataPerseroan
          formik={formik}
          disabled={label == "Perubahan Data" ? true : false}
          page="Data Perseroan"
        />
      ),
    },
    {
      id: "4",
      label: "Modal PT",
      stepNumber: "Langkah 2",
      component: (
        <DataPerseroan
          formik={formik}
          disabled={label == "Perubahan Data" ? true : false}
          page="Modal PT"
        />
      ),
    },
    {
      id: "5",
      label: "Pengurus PT",
      stepNumber: "Langkah 3",
      component: (
        <DataPerseroan
          formik={formik}
          disabled={label == "Perubahan Data" ? true : false}
          page="Pengurus PT"
        />
      ),
    },
    {
      id: "6",
      label: "Konfirmasi Data",
      stepNumber: "Langkah 4",
    },
    {
      id: "7",
      label: "Konfirmasi Data",
      component: <FormulirPembubaran formik={formik} />,
    },
  ];

    console.log("formik", formik.values);


  const handleNext = () => {
    if (!currentStepConfig.validation) {
      setActiveStep((prev) => prev + 1);
      return;
    }

    currentStepConfig.validation
      .validate(formik.values, { abortEarly: false })
      .then(() => {
        setActiveStep((prev) => prev + 1);
      })
      .catch((err) => {
        const stepErrors = {};
        err.inner.forEach((e) => {
          if (currentStepConfig.fields.includes(e.path)) {
            stepErrors[e.path] = e.message;
          }
        });
        formik.setTouched({
          ...formik.touched,
          ...currentStepConfig.fields.reduce(
            (a, c) => ({ ...a, [c]: true }),
            {}
          ),
        });
        const allErrors = extractErrors(stepErrors);
        console.log("allErrors", allErrors);
        toastifyService.required(allErrors);
      });
  };

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

  const getBackgroundColor = (index) => {
    if (index === stepperActiveStep) {
      return "#1976d2"; // Active step color
    }
    if (index < stepperActiveStep) {
      return "#4caf50"; // Completed step color
    }
    return "#F3F3F4"; // Inactive step color
  };

  return (
    <Box className="bg-white page-content mb-4" sx={{ width: "100%" }}>
      {visibleStepperSteps.length > 0 && stepperActiveStep >= 0 && (
        <Stepper activeStep={stepperActiveStep}>
          {visibleStepperSteps.map((step, index) => {
            const stepProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            const IconComponent = step.icon;
            const backgroundColor = getBackgroundColor(index);
            return (
              <Step key={step.id} {...stepProps}>
                {/* <Box className="d-flex align-items-center">
                  <IconComponent
                    className="p-2 rounded-3 text-white"
                    style={{ backgroundColor, marginRight: "8px" }}
                    size={40}
                  />
                  <Box>
                    <Typography variant="body1" className="fw-semibold">
                      {step.label}
                    </Typography>
                    <Typography variant="body2" className="fw-lighter">
                      {step.stepNumber}
                    </Typography>
                  </Box>
                </Box> */}
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
                      }}
                    >
                      {index + 1}
                    </div>
                  )}
                >
                  <span
                    style={{
                      fontFamily: "Poppins",
                      fontWeight: 400,
                      fontSize: "12px",
                      lineHeight: "18px",
                      color: "#888888",
                    }}
                  >
                    {step.label}
                  </span>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      )}

      <React.Fragment>
        {activeStep == stepsResult.length - 1 &&
        label === "Pendaftaran Pendirian" ? (
          <>
            <Detail formik={formik} />
          </>
        ) : (
          <Box sx={{ mt: 2 }}>
            {stepsResult[activeStep]?.component || "Unknown step"}
          </Box>
        )}

        <Box sx={{ display: "flex", flexDirection: "row", pt: 2, px: 2 }}>
          {activeStep >= 1 && (
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
          )}
          <Box sx={{ flex: "1 1 auto" }} />
          <div className="d-flex gap-2">
            {label !== "Pembubaran Data" && (
              <>
                {activeStep >= 2 && (
                  <Button
                    onClick={() => handleSubmit("draft", true)}
                    sx={{
                      backgroundColor: "#f97316",
                      color: "#fff",
                      px: 2,
                      py: 1,
                      fontFamily: "Poppins",
                      textTransform: "initial",
                      "&:hover": {
                        backgroundColor: "#ea580c",
                        color: "#fff",
                      },
                    }}
                  >
                    Draft
                  </Button>
                )}
              </>
            )}

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
