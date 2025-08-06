import { useCallback } from "react";
import { STEP_FIELDS } from "../constants/steps";
import { validationSchemas } from "../schemas";
import { createDraftSchema, getFilledValues } from "../../../utils/formHelper";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import {
  successMsg,
  warningMsg,
} from "@/helpers/Notification/toastNotification";
import * as yup from "yup";

export const useDraft = (
  currentPermohonanId,
  postPermohonan,
  patchPermohonan,
  processPayloadBasedOnTempatLahir
) => {
  const toastifyService = new ToastifyService();

  const saveDraft = useCallback(
    async (data) => {
      const shouldSave = await toastifyService.customConfirmation(
        "Apakah anda yakin akan menyimpan data ke draft?"
      );

      if (shouldSave) {
        const payload = processPayloadBasedOnTempatLahir(data);
        console.log("Draft values for current step (processed):", payload);
        console.log(currentPermohonanId);
        try {
          let response;
          if (!currentPermohonanId) {
            response = await postPermohonan(payload);
            if (response.message === "Success") {
              successMsg("Berhasil menyimpan ke draft");
            }
          } else {
            response = await patchPermohonan(payload);
            if (response.message === "Success") {
              successMsg("Berhasil memperbarui draft");
            }
          }
          return response;
        } catch (error) {
          console.error("Error saving draft:", error);
          toastifyService.customWarningMsg("Gagal menyimpan draft");
          throw error;
        }
      }

      return null;
    },
    [
      currentPermohonanId,
      postPermohonan,
      patchPermohonan,
      processPayloadBasedOnTempatLahir,
      toastifyService,
    ]
  );

  const createSelectiveSchema = useCallback((originalSchema, filledFields) => {
    if (!originalSchema || !originalSchema.fields) {
      return yup.object({});
    }
    const selectiveFields = {};

    Object.keys(filledFields).forEach((fieldName) => {
      const fieldValue = filledFields[fieldName];

      // Check if field has a meaningful value (not empty string, null, or undefined)
      const hasValue =
        fieldValue !== "" && fieldValue !== null && fieldValue !== undefined;

      if (hasValue && originalSchema.fields[fieldName]) {
        selectiveFields[fieldName] = originalSchema.fields[fieldName];
      }
    });
    return yup.object(selectiveFields);
  }, []);

  const handleDraft = useCallback(
    async (activeStep, formik, setStepErrors) => {
      const currentStepFields = STEP_FIELDS[activeStep];
      const currentSchema = validationSchemas[activeStep];
      let hasFormatErrors = false;
      const filledValues = getFilledValues(formik.values, currentStepFields);

      // Mark current step fields as touched
      // const newTouched = { ...formik.touched };
      // currentStepFields.forEach((field) => {
      //   newTouched[field] = true;
      // });
      // formik.setTouched(newTouched);

      // Get current step values
      const rawCurrentStepValues = currentStepFields.reduce((acc, field) => {
        acc[field] = formik.values[field];
        return acc;
      }, {});

      // Check if no data filled
      if (
        Object.keys(getFilledValues(rawCurrentStepValues, currentStepFields))
          .length === 0
      ) {
        toastifyService.customWarningMsg(
          "Tidak ada data yang perlu disimpan pada langkah ini. Harap isi form jika ingin menyimpan ke draft."
        );
        return;
      }

      try {
        if (currentSchema) {
          const selectiveShcema = createSelectiveSchema(
            currentSchema,
            filledValues
          );
          console.log("SELECTIVE SCHEMA", selectiveShcema);
          await selectiveShcema.validate(filledValues, { abortEarly: false });
        }
        // Clear errors if validation passes
        const clearedErrors = { ...formik.errors };
        currentStepFields.forEach((field) => {
          delete clearedErrors[field];
        });
        formik.setErrors(clearedErrors);
        setStepErrors((prev) => {
          const newErrors = { ...prev };
          if (newErrors[activeStep]) {
            currentStepFields.forEach(
              (field) => delete newErrors[activeStep][field]
            );
            if (Object.keys(newErrors[activeStep]).length === 0) {
              delete newErrors[activeStep];
            }
          }
          return newErrors;
        });
        console.log("EXECUTE TRY SAVEDRAFT");
        const draftResult = await saveDraft(filledValues);
        if (draftResult) {
          console.log("✅ Draft saved successfully:", draftResult);
        } else {
          console.log("ℹ️ User cancelled draft save");
        }
      } catch (error) {
        const fieldErrors = {};
        if (error.inner) {
          error.inner.forEach((err) => {
            if (
              currentStepFields.includes(err.path) &&
              rawCurrentStepValues[err.path] !== undefined &&
              rawCurrentStepValues[err.path] !== null &&
              rawCurrentStepValues[err.path] !== ""
            ) {
              fieldErrors[err.path] = err.message;
              hasFormatErrors = true;
            }
          });
        }

        if (hasFormatErrors) {
          formik.setErrors({ ...formik.errors, ...fieldErrors });
          setStepErrors((prev) => ({ ...prev, [activeStep]: fieldErrors }));
          toastifyService.customWarningMsg(
            "Beberapa input yang diisi memiliki format yang tidak valid. Mohon periksa kembali."
          );
        }
        // else {
        //   console.warn(
        //     "Unexpected validation error, saving draft anyway:",
        //     error
        //   );

        //   try {
        //     console.log("EXECUTE CATCH SAVEDRAFT");

        //     const fallbackResult = await saveDraft(
        //       getFilledValues(formik.values, currentStepFields)
        //     );
        //     if (fallbackResult) {
        //       console.log("✅ Fallback draft save successful:", fallbackResult);
        //       successMsg("Berhasil menyimpan ke draft");
        //     }
        //   } catch (fallbackError) {
        //     console.error("❌ Fallback draft save failed:", fallbackError);
        //     warningMsg("gagal menyimpan ke draft");
        //   }
        // }
      }
    },
    [saveDraft, toastifyService]
  );

  return {
    saveDraft,
    handleDraft,
  };
};
