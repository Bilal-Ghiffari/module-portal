import { Payment } from '@mui/icons-material';
import IdentitasPemberiValidationSchema, {
  initialValuesIdentitasPemberi,
} from './IdentitasPemberiValidationSchema';

import IdentitasPenerimaValidationSchema, {
  initialValuesIdentitasPenerima,
} from './IdentitasPenerimaValidationSchema';

import InformasiJaminanValidationSchema, {
  initialValuesInformasiJaminan,
} from './InformasiJaminanValidationSchema';

import ObyekJaminanValidationSchema, {
  initialValuesObyekJaminan,
} from './ObyekJaminanValidationSchema';

import PaymentValidationSchema, {
  initialValuesPayment,
} from './PaymentValidationSchema';

export const formSchemas = {
  validationSchemas: {
    identitasPemberi: IdentitasPemberiValidationSchema,
    identitasPenerima: IdentitasPenerimaValidationSchema,
    informasiJaminan: InformasiJaminanValidationSchema,
    ObyekJaminan: ObyekJaminanValidationSchema,
    Payment: PaymentValidationSchema,
  },
  initialValues: {
    identitasPemberi: initialValuesIdentitasPemberi,
    identitasPenerima: initialValuesIdentitasPenerima,
    informasiJaminan: initialValuesInformasiJaminan,
    ObyekJaminan: initialValuesObyekJaminan,
    Payment: initialValuesPayment,
  },
};

// Optional: Tetap eksport untuk backward compatibility
export const { validationSchemas, initialValues } = formSchemas;
