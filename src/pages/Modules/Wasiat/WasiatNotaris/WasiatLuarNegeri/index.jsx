import { useState } from "react";
import { useFormik } from "formik";

import OnBoardingPermohonan from "./views/OnBoarding";
import FormulirPermohonanWasiat from "./views/Formulir";
import PratinjauPermohonanWasiat from "./views/Pratinjau";
import { initialValues } from "./initialValues";
import validationSchema from "./schema";
import { usePostPermohonan } from "./hooks/usePostPermohonan";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchDesaRequestByKecamatan,
  fetchKecamatanRequestByKotaKab,
  fetchKotaKabRequestByProvinsi,
  fetchPekerjaanRequest,
  fetchProvinsiRequest,
} from "@/store/actions";

export default function FormPermohonanWasiat() {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const { postPermohonan } = usePostPermohonan();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await postPermohonan(values);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <OnBoardingPermohonan formik={formik} setActiveStep={setActiveStep} />
        );
      case 1:
        return (
          <FormulirPermohonanWasiat
            formik={formik}
            setActiveStep={setActiveStep}
          />
        );
      case 2:
        return (
          <PratinjauPermohonanWasiat
            formik={formik}
            setActiveStep={setActiveStep}
          />
        );
      default:
        return <div>Langkah tidak ditemukan</div>;
    }
  };

  useEffect(() => {
    dispatch(fetchProvinsiRequest());
    dispatch(fetchPekerjaanRequest());
  }, []);

  useEffect(() => {
    if (formik.values.id_provinsi_pemberi) {
      dispatch(
        fetchKotaKabRequestByProvinsi(formik.values.id_provinsi_pemberi)
      );
    }
  }, [formik.values.id_provinsi_pemberi]);

  useEffect(() => {
    if (formik.values.id_kab_kota_pemberi) {
      dispatch(
        fetchKecamatanRequestByKotaKab(formik.values.id_kab_kota_pemberi)
      );
    }
  }, [formik.values.id_kab_kota_pemberi]);

  useEffect(() => {
    if (formik.values.id_kec_pemberi) {
      dispatch(fetchDesaRequestByKecamatan(formik.values.id_kec_pemberi));
    }
  }, [formik.values.id_kec_pemberi]);

  return <>{renderStepContent()}</>;
}
