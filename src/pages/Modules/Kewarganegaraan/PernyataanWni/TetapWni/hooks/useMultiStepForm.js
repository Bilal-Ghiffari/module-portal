import { useState, useEffect, useCallback, useMemo } from "react";
import { useFormik } from "formik";
import { validationSchemas } from "../Schemas";
import { initialValues as defaultInitialValues } from "../initialValue";
import { useGetPermohonan } from "./useGetPermohonan";
import { usePostPermohonan } from "./usePostPermohonan";
import { usePatchPermohonan } from "./usePatchPermohonan";
import { useFormValidation } from "./useFormValidation";
import { useDraft } from "./useDraft";
import { useNavigation } from "./useNavigation";
import { useSubmit } from "./useSubmit";

// Constants for tempat lahir
const DALAM_NEGERI = "Dalam Negeri";
const LUAR_NEGERI = "Luar Negeri";

export const useMultiStepForm = (label, permohonanIdFromUrl) => {
  const [activeStep, setActiveStep] = useState(permohonanIdFromUrl ? 1 : 0);
  const [skipped, setSkipped] = useState(new Set());
  const [stepErrors, setStepErrors] = useState({});
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    loading: loadingGet,
    error: errorGet,
    data: dataPermohonan,
  } = useGetPermohonan(permohonanIdFromUrl, activeStep);

  const {
    postPermohonan,
    response: postResponse,
    loading: postLoading,
    error: postError,
  } = usePostPermohonan();

  const {
    patchPermohonan,
    response: patchResponse,
    loading: patchLoading,
    error: patchError,
  } = usePatchPermohonan();

  const currentPermohonanId = permohonanIdFromUrl;
  // console.log("Get Data permohonan ===>", dataPermohonan);
  const formInitialValues = useMemo(() => {
    if (
      dataPermohonan &&
      dataPermohonan.id_permohonan === currentPermohonanId
    ) {
      return {
        ...defaultInitialValues,
        ...dataPermohonan,
        status_kawin_pasangan: dataPermohonan.status_kawin_pasangan || "Kawin",
      };
    }
    return defaultInitialValues;
  }, [dataPermohonan, currentPermohonanId]);

  // Helper function to process payload based on tempat_lahir_pasangan
  const processPayloadBasedOnTempatLahir = useCallback((payload) => {
    const processedPayload = { ...payload };

    if (processedPayload.tempat_tinggal_pemohon === DALAM_NEGERI) {
      delete processedPayload.id_negara_tinggal_pemohon;
    } else if (processedPayload.tempat_tinggal_pemohon === LUAR_NEGERI) {
      delete processedPayload.id_provinsi_tinggal_pemohon;
      delete processedPayload.id_kab_kota_tinggal_pemohon;
    } else {
      delete processedPayload.id_provinsi_tinggal_pemohon;
      delete processedPayload.id_kab_kota_tinggal_pemohon;
      delete processedPayload.id_negara_tinggal_pemohon;
    }

    // delete processedPayload.tempat_tinggal_pemohon;
    return processedPayload;
  }, []);

  // Initialize specialized hooks
  const { validateCurrentStep, validateAllSteps } = useFormValidation();
  const { handleDraft } = useDraft(
    currentPermohonanId,
    postPermohonan,
    patchPermohonan,
    processPayloadBasedOnTempatLahir
  );
  const { handleNext, handleBack } = useNavigation(
    currentPermohonanId,
    postPermohonan,
    patchPermohonan,
    processPayloadBasedOnTempatLahir
  );
  const { handleSubmit, successSubmit } = useSubmit(
    currentPermohonanId,
    patchPermohonan,
    processPayloadBasedOnTempatLahir
  );

  const formik = useFormik({
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
    initialValues: formInitialValues,
    validationSchema: validationSchemas[activeStep],
    onSubmit: async (values) => {
      console.log("Formik onSubmit called with:", values);
    },
  });

  // Reset form when label changes
  useEffect(() => {
    resetForm();
  }, [label]);

  const resetForm = useCallback(() => {
    setActiveStep(permohonanIdFromUrl ? 1 : 0);
    formik.resetForm();
    setStepErrors({});
    setCompletedSteps(new Set());
    setSkipped(new Set());
  }, [formik, permohonanIdFromUrl]);

  const isStepSkipped = useCallback((step) => skipped.has(step), [skipped]);

  // Wrapper functions that include state setters
  const wrappedHandleNext = useCallback(() => {
    return handleNext(
      activeStep,
      setActiveStep,
      setStepErrors,
      setCompletedSteps,
      setSkipped,
      validateCurrentStep,
      formik
    );
  }, [activeStep, handleNext, validateCurrentStep, formik]);

  const wrappedHandleBack = useCallback(() => {
    return handleBack(activeStep, setActiveStep, resetForm);
  }, [activeStep, handleBack, resetForm]);

  const wrappedHandleDraft = useCallback(() => {
    return handleDraft(activeStep, formik, setStepErrors);
  }, [activeStep, formik, handleDraft]);

  const wrappedHandleSubmit = useCallback(() => {
    return handleSubmit(
      activeStep,
      formik,
      validateAllSteps,
      setStepErrors,
      setIsSubmitting
    );
  }, [activeStep, formik, handleSubmit, validateAllSteps]);

  return {
    activeStep,
    setActiveStep,
    skipped,
    stepErrors,
    completedSteps,
    isSubmitting,
    formik,
    isStepSkipped,
    handleNext: wrappedHandleNext,
    handleBack: wrappedHandleBack,
    handleDraft: wrappedHandleDraft,
    handleSubmit: wrappedHandleSubmit,
    resetForm,
    dataPermohonan,
    loadingGet,
    postLoading,
    patchLoading,
    processPayloadBasedOnTempatLahir,
    successSubmit,
  };
};
