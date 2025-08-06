import FormPerseorangan from '../SectionForm/FormInformasiPerseorangan';
import FormInfoKoperasiID from '../SectionForm/FormInformasiKorporasi';
import FormInfoKoperasiAsing from '../SectionForm/FormInformasiKoperasiAsing';
import SkeletonFormFields from '@/components/Common/SkeletonFormFields';

const InformasiPemberiFidusia = ({ formik, identityPenerima }) => {
  const jenisPendaftar = identityPenerima.jenis_pendaftaran?.toLowerCase();
  const jenisKorporasi = identityPenerima.id_jenis_korporasi;

  if (!jenisPendaftar) {
    return (
      <SkeletonFormFields
        count={3}
        infoMessage="Pilih Jenis Pendaftaran terlebih dahulu"
      />
    );
  }

  switch (jenisPendaftar) {
    case 'perseorangan':
      return (
        <FormPerseorangan formik={formik} identityPenerima={identityPenerima} />
      );

    case 'kooperasi':
      switch (jenisKorporasi) {
        case 2: // ID untuk "asing"
          return (
            <FormInfoKoperasiAsing
              formik={formik}
              identityPenerima={identityPenerima}
            />
          );
        case 1: // ID untuk "indonesia"
          return (
            <FormInfoKoperasiID
              formik={formik}
              identityPenerima={identityPenerima}
            />
          );
        default:
          return (
            <div>
              <p>Pilih Jenis Korporasi terlebih dahulu</p>
            </div>
          );
      }

    default:
      return (
        <div>
          <p>Jenis Pendaftar tidak diketahui</p>
        </div>
      );
  }
};

export default InformasiPemberiFidusia;
