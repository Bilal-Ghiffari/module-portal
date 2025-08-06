import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import Button from "@mui/material/Button";
import { ToastifyService } from "../../../../../components/Toastify/toastifyService";
import { useFormik } from "formik";
// import { validationSchema } from "./validation";
import * as url from "../../../../../helpers/url_helper";
import {
  errorMsg,
  successMsg,
} from "../../../../../helpers/Notification/toastNotification";
import dayjs from "dayjs";
// Pages
import Swal from "sweetalert2";
import { filterEmptyValues, formatTanggal } from "@/helpers/services/convert";
import { ArrowForward } from "@mui/icons-material";
import OnBoardingPendaftaran from "./OnBoarding";

// dummy dulu, buat validasi di setiap step
const stepFields = [
  ["nama_perseroan", "voucher"],
  ["checked"],
  ["checked"],
  ["checked"],
  ["checked"],
];

import PemilikUsaha from "./PemilikUsaha";
import { StepLabel } from "@mui/material";
import Detail from "../Detail";
import {
  patchLayananFormData,
  postLayananFormData,
} from "@/helpers/api_helper";
import { useNavigate } from "react-router-dom";
import { apiGetListApostilleDetailPermohonanRiwayat } from "@/helpers/backend_helper";
import { useLocation } from "react-router-dom";

const Pendaftaran = ({ label = "Pendaftaran Pendirian" }) => {
  const { state } = useLocation();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const isStepSkipped = (step) => skipped.has(step);
  const toastifyService = new ToastifyService();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      data_document: [
        {
          tipe_dokumen: "dokumen_konvesional",
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
        },
      ],
      berkas: [],
      jenis_permohonan: "",
      tempat_lahir_pemohon: "dalam_negeri",
    },
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (values) => {
      postData(values);
    },
  });

  const postData = (values) => {
    toastifyService.confirmationCreate().then((res) => {
      if (res) {
        toastifyService.showLoading();

        const { data_document, ...res } = values;
        const payload = {
          ...res,
          id_jenis_dokumen: Number(res.id_jenis_dokumen),
          id_kab_kota_lahir_pemohon: Number(res.id_kab_kota_lahir_pemohon),
          id_negara: Number(res.id_negara),
          id_negara_lahir_pemohon: Number(res.id_negara_lahir_pemohon),
          id_provinsi_lahir_pemohon: Number(res.id_provinsi_lahir_pemohon),
        };

        const filteredPayload = Object.fromEntries(
          Object.entries(payload).filter(
            ([key]) => !key.startsWith("rules") && !key.endsWith("_nama")
          )
        );

        console.log("filteredPayload", filterEmptyValues(filteredPayload));
        postLayananFormData(
          url.APOSTILLE_PERMOHONAN_RIWAYAT,
          filterEmptyValues(filteredPayload)
        )
          .then(() => {
            successMsg("success");
            Swal.close();
            navigate("/apostille");
          })
          .catch((err) => {
            errorMsg(err);
            console.log("err", err);
            Swal.close();
          });
      }
    });
  };

  const updateData = (values) => {
    toastifyService.confirmationUpdate().then((res) => {
      if (res) {
        toastifyService.showLoading();

        const { data_document, id_permohonan, ...res } = values;
        const payload = {
          ...res,
          id_jenis_dokumen: Number(res.id_jenis_dokumen),
          id_kab_kota_lahir_pemohon: Number(res.id_kab_kota_lahir_pemohon),
          id_negara: Number(res.id_negara),
          id_negara_lahir_pemohon: Number(res.id_negara_lahir_pemohon),
          id_provinsi_lahir_pemohon: Number(res.id_provinsi_lahir_pemohon),
        };

        const filteredPayload = Object.fromEntries(
          Object.entries(payload).filter(
            ([key]) => !key.startsWith("rules") && !key.endsWith("_nama")
          )
        );

        console.log("filteredPayload", filterEmptyValues(filteredPayload));
        patchLayananFormData(
          `${url.APOSTILLE_PERMOHONAN_RIWAYAT}/${state?.id}`,
          filterEmptyValues(filteredPayload)
        )
          .then(() => {
            successMsg("success");
            Swal.close();
            navigate("/apostille");
          })
          .catch((err) => {
            errorMsg(err);
            console.log("err", err);
            Swal.close();
          });
      }
    });
  };

  useEffect(() => {
    setActiveStep(0);
    formik.resetForm();
  }, [label]);

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

  const handleSubmit = async (status, isDraft) => {
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

    const errors = await formik.validateForm();

    if (Object.keys(errors).length === 0) {
      // UNTUK UPDATE SAAT STATUS DRAFT DAN MAU DISELESAIIN
      // DAN UNTUK UPDATE DI PERBAIKAN DATA (NO DRAFT)
      if (state?.type == "update") {
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
      const touchedFields = Object.keys(errors).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      formik.setTouched(touchedFields, true); // true to trigger validation UI
    }
  };

  const allSteps = [
    {
      id: "1",
      label: "Boarding",
      // icon: FiUser,
      component: (
        <OnBoardingPendaftaran
          formik={formik}
          setActiveStep={setActiveStep}
          label={"Pendaftaran Permohonan Legalisasi Dokumen"}
        />
      ),
    },
    {
      id: "2",
      label: "Identitas Diri",
      stepNumber: "Langkah 1",
      component: <PemilikUsaha formik={formik} label={label} />,
    },
    {
      id: "3",
      label: "Konfirmasi Data",
      stepNumber: "Langkah 2",
    },
  ];

  const stepsConfig = {
    "Pendaftaran Pendirian": ["1", "2", "3", "4", "5", "6"],
  };

  console.log("formik", formik.values);
  // console.log("state", state);

  const fetchDetailData = () => {
    // toastifyService.showLoading();
    apiGetListApostilleDetailPermohonanRiwayat(state?.id)
      .then((res) => {
        const data = res.data;
        const {
          no_permohonan,
          data_dokumen,
          tanggal_lahir_pemohon,
          ...values
        } = data;
        formik.setValues({
          ...values,
          data_document: data.data_dokumen,
          tanggal_lahir_pemohon: formatTanggal(
            data?.tanggal_lahir_pemohon,
            "YYYY-MM-DD"
          ),
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
      setActiveStep(1);
      fetchDetailData();
    }
  }, [state?.id, state?.type]);

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
    <Box className="bg-white page-content mb-4" sx={{ width: "100%" }}>
      {visibleStepperSteps.length > 0 && stepperActiveStep >= 0 && (
        <Stepper activeStep={stepperActiveStep}>
          {visibleStepperSteps.map((step, index) => {
            const stepProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }

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
        {activeStep == stepsResult.length - 1 ? (
          <>
            <Detail formik={formik} />{" "}
          </>
        ) : (
          <Box sx={{ mt: 2 }}>
            {stepsResult[activeStep]?.component || "Unknown step"}
          </Box>
        )}

        {activeStep >= 1 && (
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2, px: 2 }}>
            <Button
              disabled={activeStep === 0 || state?.type == "update"}
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
              {label !== "Pembubaran Data" && (
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

              <Button
                onClick={() => {
                  if (activeStep === stepsResult.length - 1) {
                    handleSubmit("Dikirim");
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
        )}
      </React.Fragment>
    </Box>
  );
};

export default Pendaftaran;
