import FormKoperasi from './FormInformasiKorporasi';
import FormPerseorangan from './FormInformasiPerseorangan';

const InformasiPemberiFidusia = ({ formik }) => {
  const jenisPendaftar =
    formik.values.identity_pemberi.jenis_pendaftar?.toLowerCase();

  if (jenisPendaftar === 'kooperasi') {
    return <FormKoperasi formik={formik} />;
  }

  if (jenisPendaftar === 'perseorangan') {
    return <FormPerseorangan formik={formik} />;
  }

  return null;
};

export default InformasiPemberiFidusia;
