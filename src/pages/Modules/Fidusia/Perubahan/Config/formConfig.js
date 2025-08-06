import * as Yup from 'yup';
import { formSchemas } from '../Schemas';

export const stepFormConfigs = {
  0: {
    fieldName: 'onboarding',
    initialValues: {}, // onboarding / voucher
    validationSchema: Yup.object({}),
  },
  1: {
    fieldName: 'identity_pemberi',
    initialValues: {
      identity_pemberi: formSchemas.initialValues.identitasPemberi,
    },
    validationSchema: Yup.object({
      identity_pemberi: formSchemas.validationSchemas.identitasPemberi,
    }),
  },
  2: {
    fieldName: 'identity_penerima',
    initialValues: {
      identity_penerima: formSchemas.initialValues.identitasPenerima,
    },
    validationSchema: Yup.object({
      identity_penerima: formSchemas.validationSchemas.identitasPenerima,
    }),
  },
  3: {
    fieldName: 'information_jaminan',
    initialValues: {
      information_jaminan: formSchemas.initialValues.informasiJaminan,
    },
    validationSchema: Yup.object({
      information_jaminan: formSchemas.validationSchemas.informasiJaminan,
    }),
  },

  4: {
    fieldName: 'object_jaminan',
    initialValues: {
      object_jaminan: formSchemas.initialValues.ObyekJaminan,
    },
    validationSchema: Yup.object({
      object_jaminan: formSchemas.validationSchemas.ObyekJaminan,
    }),
  },
  5: {
    fieldName: 'konfirmasi_data',
    initialValues: {}, // konfimasi data detail / voucher
    validationSchema: Yup.object({}),
  },
  6: {
    fieldName: 'payment',
    initialValues: {
      payment: formSchemas.initialValues.Payment,
    },
    validationSchema: Yup.object({
      payment: formSchemas.validationSchemas.Payment,
    }),
  },
};

export const initialValues = Object.values(stepFormConfigs).reduce(
  (acc, step) => ({ ...acc, ...step.initialValues }),
  {}
);

export const validationSchemas = Object.fromEntries(
  Object.entries(stepFormConfigs).map(([step, config]) => [
    step,
    config.validationSchema,
  ])
);

// Untuk keperluan validasi field per step
export const STEP_FIELDS = Object.entries(stepFormConfigs).map(([key, step]) =>
  Object.keys(step.initialValues)
);

// Optional: Tambahkan fungsi untuk mendapatkan validation schema berdasarkan step
export const getValidationSchemaForStep = (step) => {
  return validationSchemas[step] || Yup.object({});
};
