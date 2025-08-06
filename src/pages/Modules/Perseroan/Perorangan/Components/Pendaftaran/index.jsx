import React, { useState, useEffect, useMemo } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import { ToastifyService } from "../../../../../../components/Toastify/toastifyService";
import { useFormik } from "formik";
// import { validationSchema } from "./validation";
import {
  getMarinaNew,
  patchLayananFormData,
  postLayananFormData,
} from "../../../../../../helpers/api_helper";
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

import PemilikUsaha from "./PemilikUsaha";
import ExportSuratPermohonan from "./SuratPermohonan";
import FormulirPembubaran from "./FormulirPembubaran";
import { StepLabel } from "@mui/material";
import {
  generateStepSchemasByLabel,
  labelsStepConfig,
} from "./validationScehma";
import Detail from "../Detail";
import OnBoardingPendaftaran from "./OnBoarding";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiGetListByIdPerseroanPerorangan } from "@/helpers/backend_helper";
import { useLocation } from "react-router-dom";

const Pendaftaran = ({ label = "Pendaftaran Pendirian" }) => {
  const { state } = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const toastifyService = new ToastifyService();
  const navigate = useNavigate();
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
      voucher: "123456",

      // step 2
      rules_1: "",
      rules_2: "",

      // step 3
      nama_perseroan: "",
      email: "",
      provinsi_kantor: "",
      kabupaten_kantor: "",
      kecamatan_kantor: "",
      kelurahan_kantor: "",
      alamat_kantor: "",
      no_telp_kantor: "",
      kode_pos_kantor: "",
      rt_kantor: "",
      rw_kantor: "",
      total_modal_usaha: "",
      kegiatan_usaha: [],

      // step 4
      provinsi_pemilik: "",
      kabupaten_pemilik: "",
      kecamatan_pemilik: "",
      kelurahan_pemilik: "",
      alamat_pemilik: "",
      kode_pos_pemilik: "",
      rt_pemilik: "",
      rw_pemilik: "",
      nama_lengkap: "",
      no_telp: "",
      nik: "",
      tempat_lahir: "dalam_negeri",
      tanggal_lahir: "",
      npwp: "",
      pemilik_negara_lahir: "",
      jabatan: "Direktur",

      // step 5
      rules_10: "",
      rules_11: "",

      // step 7
      rules_3: "",
      rules_4: "",
      rules_5: "",
      rules_6: "",
      rules_7: "",
      rules_8: "",
      rules_9: "",

      // status untuk submit
      status_permohonan: "",
    },
    validationSchema: currentStepConfig.validation,
    enableReinitialize: true,
    onSubmit: (values) => {
      postData(values);
    },
  });

  const postData = (payload) => {
    toastifyService.confirmationCreate().then((res) => {
      if (res) {
        toastifyService.showLoading();
        let urlAPI = "/";
        switch (label) {
          case "Perubahan Data":
            urlAPI = url.POST_PERSEROAN_PERORANGAN_PERUBAHAN;
            break;

          default:
            urlAPI = url.POST_PERSEROAN_PERORANGAN;

            break;
        }

        const filteredPayload = Object.fromEntries(
          Object.entries(payload).filter(
            ([key]) => !key.startsWith("rules") && !key.endsWith("_nama")
          )
        );

        postLayananFormData(urlAPI, filterEmptyValues(filteredPayload))
          .then(() => {
            successMsg("success");
            Swal.close();
            navigate("/perseroan/perorangan");
          })
          .catch((err) => {
            const message = err?.response?.data?.message?.message?.[0] || err;
            toastifyService.info(message);
          });
      }
    });
  };
  const updateData = (payload) => {
    toastifyService.confirmationUpdate().then((res) => {
      if (res) {
        toastifyService.showLoading();

        const filteredPayload = Object.fromEntries(
          Object.entries(payload).filter(
            ([key]) => !key.startsWith("rules") && !key.endsWith("_nama")
          )
        );

        const { id_voucher, id,id_permohonan,id_ptp,created_by,updated_by, ...resultPy } = filteredPayload;

        patchLayananFormData(
          `${url.POST_PERSEROAN_PERORANGAN}/${formik.values?.id || state?.id}`,
          filterEmptyValues(resultPy)
        )
          .then(() => {
            successMsg("Sukses Memperbarui Data");
            Swal.close();
            navigate("/perseroan/perorangan");
          })
          .catch((err) => {
            const message = err?.response?.data?.message?.message?.[0] || err;
            toastifyService.info(message);
          });
      }
    });
  };

  useEffect(() => {
    setActiveStep(0);
    formik.resetForm();
  }, [label]);

  const handleSubmit = async (status, isDraft = false) => {
    if (isDraft) {
      // Langsung set status & submit tanpa validasi
      const { id_voucher, created_by, updated_by, ...res } = formik.values;
      const py = {
        ...res,
        status_permohonan: status,
      };
      // UNTUK UPDATE SAAT STATUS DRAFT DAN MAU DRAFT LAGI
      if (state?.type == "update") {
        updateData(py);
      } else {
        postData(py);
      }
      console.log("Submit draft tanpa validasi");
      return;
    }

    // Biasa: validasi dulu
    const allFields = activeStepIds.flatMap(
      (id) => stepSchemas[id]?.fields || []
    );
    const errors = await formik.validateForm();

    const filteredErrors = Object.keys(errors).reduce((acc, key) => {
      if (allFields.includes(key)) {
        acc[key] = errors[key];
      }
      return acc;
    }, {});

    if (Object.keys(filteredErrors).length === 0) {
      // UNTUK UPDATE SAAT STATUS DRAFT DAN MAU DISELESAIIN
      // DAN UNTUK UPDATE DI PERBAIKAN DATA (NO DRAFT)
      if (state?.type == "update" || label == "Perbaikan Data") {
        const py = {
          ...formik.values,
          status_permohonan: status,
        };
        updateData(py);
      } else {
        // UNTUK POST
        await formik.setFieldValue("status_permohonan", status);
        await formik.submitForm();
        console.log("Submit final");
      }
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

  const [isAvailable, setIsAvailable] = useState(false);

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
          isAvailable={isAvailable}
          setIsAvailable={setIsAvailable}
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
          isAvailable={isAvailable}
          setIsAvailable={setIsAvailable}
        />
      ),
    },
    {
      id: "3",
      label: "Data Perseroan",
      // icon: FiFileText,
      stepNumber: "Langkah 1",
      component: (
        <DataPerseroan
          formik={formik}
          disabled={label == "Perubahan Data" ? true : false}
        />
      ),
    },
    {
      id: "4",
      label: "Pemilik Usaha",
      // icon: FiUsers,
      stepNumber: "Langkah 2",
      component: (
        <PemilikUsaha
          formik={formik}
          disabled={label == "Perubahan Data" ? true : false}
          label={label}
        />
      ),
    },
    {
      id: "5",
      label: "Pemilik Manfaat",
      // icon: FiUsers,
      stepNumber: "Langkah 3",
      component: <ExportSuratPermohonan formik={formik} />,
    },
    {
      id: "6",
      label: "Konfirmasi Data",
      // icon: FiCheckCircle,
      stepNumber: "Langkah 4",
    },
    {
      id: "7",
      label: "Konfirmasi Data",
      // icon: FiCheckCircle,
      component: <FormulirPembubaran formik={formik} />,
    },
  ];

  // console.log("formik", formik.values);

  const fetchDetailData = () => {
    // toastifyService.showLoading();
    apiGetListByIdPerseroanPerorangan(
      formik.values?.nama_perseroan || state?.id
    )
      .then((res) => {
        const { no_permohonan, id_user, email_pemilik, ...values } = res;
        const kegiatan_usaha = (values.kegiatan_usaha || []).map(
          ({ id, id_pendirian, ...otherFields }) => otherFields
        );
        formik.setValues({
          ...values,
          kegiatan_usaha,
          voucher: "123456",
        });
        toastifyService.close();
      })
      .catch((err) => {
        if (err?.status == 500) {
          toastifyService.info(err?.message);
        } else {
          console.log("err", err);
          toastifyService.close();
        }
      });
  };

  useEffect(() => {
    if (state?.id && state?.type == "update") {
      setActiveStep(2);
      fetchDetailData();
    }
  }, [state?.id, state?.type]);

  const handleNext = () => {
    if (label === "Pendaftaran Pendirian" && activeStep === 0 && !isAvailable) {
      toastifyService.required("Silakan Cek Nama terlebih dahulu.");
      return;
    }

    // buat ambil detail data nya untuk perubahan data
    if (label !== "Pendaftaran Pendirian" && activeStep == 0) {
      fetchDetailData();
    }

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

        if (Object.keys(stepErrors).length === 0) {
          setActiveStep((prev) => prev + 1);
          return;
        }

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
      {visibleStepperSteps.length > 0 &&
        stepperActiveStep >= 0 &&
        stepperActiveStep <= visibleStepperSteps.length - 1 && (
          <Stepper activeStep={stepperActiveStep}>
            {visibleStepperSteps.map((step, index) => {
              const stepProps = {};
              return (
                <Step key={step.id} {...stepProps}>
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
            {label == "Pendaftaran Pendirian" && (
              <>
                {activeStep >= 2 && (
                  <Button
                    onClick={() => handleSubmit("Draft", true)}
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
                  handleSubmit("SK dan Sertifikat Terbit");
                } else {
                  handleNext();
                  // handleSubmit("SK dan Sertifikat Terbit");
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
