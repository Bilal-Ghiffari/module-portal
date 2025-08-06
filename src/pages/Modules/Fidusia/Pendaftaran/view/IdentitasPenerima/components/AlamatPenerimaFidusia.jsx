import SkeletonFormFields from '@/components/Common/SkeletonFormFields';
import AlamatIndonesia from '../SectionForm/AlamatIndonesia';
import AlamatAsing from '../SectionForm/AlamatAsing';

const AlamatPenerimaFidusia = ({ formik, identityPenerima }) => {
  const kewarganegaraan = identityPenerima.kewarganegaraan?.toLowerCase();
  const jenisKorporasi = identityPenerima.id_jenis_korporasi;
  // 1 indonesia 2 asing 3 lainnya
  if (
    kewarganegaraan === 'wni' ||
    jenisKorporasi === 1 ||
    jenisKorporasi === 3
  ) {
    return <AlamatIndonesia formik={formik} />;
  }

  if (kewarganegaraan === 'wna' || jenisKorporasi === 2) {
    return <AlamatAsing formik={formik} />;
  }

  return (
    <SkeletonFormFields
      count={3}
      infoMessage="Pilih Jenis Sub Pendaftaran terlebih dahulu"
    />
  );
};

export default AlamatPenerimaFidusia;
