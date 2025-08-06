import LineDashed from '@/components/Common/Line/Dashed';
import { useEffect, useRef, useState } from 'react';
import AlamatPemberiFidusia from './components/AlamatPemberiFidusia';
import InformasiPemberiFidusia from './components/InformasiPemberiFidusia';
import JenisPemberiFidusia from './components/JenisPemberiFidusia';
import MasterServices from '@/services/MasterServices';

const FormIdentitasPemberi = ({ formik, disabled = false }) => {
  const { values } = formik;
  const identityPemberi = values.identity_pemberi;

  const [jenisKorporasi, setJenisKorporasi] = useState([]);
  const [subJenisKorporasi] = useState([
    { label: 'Bank', value: 'bank' },
    {
      label: 'Lembaga Keuangan Bukan Bank',
      value: 'lembaga_keuangan_bukan_bank',
    },
    { label: 'Lainnya', value: 'lainnya' },
  ]);
  const [jenisBadanHukum, setJenisBadanHukum] = useState([]);

  const prevJenisPendaftaran = useRef();
  const prevIdJenisKorporasi = useRef();
  const prevKewarganegaraan = useRef();

  useEffect(() => {
    MasterServices.getOptionJenisKorporasi().then(setJenisKorporasi);
  }, []);

  useEffect(() => {
    if (!jenisKorporasi) return;

    MasterServices.getOptionBadanHukum(identityPemberi.id_jenis_korporasi).then(
      setJenisBadanHukum
    );
  }, [identityPemberi.id_jenis_korporasi]);

  // Reset berdasarkan jenis_pendaftaran
  useEffect(() => {
    const current = identityPemberi.jenis_pendaftaran;
    if (
      prevJenisPendaftaran.current &&
      prevJenisPendaftaran.current !== current
    ) {
      if (current === 'perseorangan') {
        formik.setFieldValue('identity_pemberi.id_jenis_korporasi', '');
        formik.setFieldValue('identity_pemberi.sub_jenis_korporasi', '');
        formik.setFieldValue('identity_pemberi.id_badan_hukum', '');
        formik.setFieldValue('identity_pemberi.jenis_penggunaan', '');
        formik.setFieldValue('identity_pemberi.pengguna_produktif', '');
      } else if (current === 'kooperasi') {
        formik.setFieldValue('identity_pemberi.kewarganegaraan', '');
        formik.setFieldValue('identity_pemberi.jenis_kelamin', '');
      }
    }
    prevJenisPendaftaran.current = current;
  }, [identityPemberi.jenis_pendaftaran]);

  // Reset berdasarkan id_jenis_korporasi
  useEffect(() => {
    const current = identityPemberi.id_jenis_korporasi;
    if (
      prevIdJenisKorporasi.current &&
      prevIdJenisKorporasi.current !== current
    ) {
      if (current === 'asing') {
        formik.setFieldValue('identity_pemberi.npwp', '');
        formik.setFieldValue('identity_pemberi.no_sk', '');
        formik.setFieldValue('identity_pemberi.no_pengesahan', '');
      }
    }
    prevIdJenisKorporasi.current = current;
  }, [identityPemberi.id_jenis_korporasi]);

  // Reset berdasarkan kewarganegaraan
  useEffect(() => {
    const current = identityPemberi.kewarganegaraan;
    if (
      prevKewarganegaraan.current &&
      prevKewarganegaraan.current !== current
    ) {
      if (current === 'WNA') {
        formik.setFieldValue('identity_pemberi.npwp', '');
        formik.setFieldValue('identity_pemberi.nik', '');
        formik.setFieldValue('identity_pemberi.id_negara_asal', '');
      } else if (current === 'WNI') {
        formik.setFieldValue('identity_pemberi.id_negara_asal', '');
      }
    }
    prevKewarganegaraan.current = current;
  }, [identityPemberi.kewarganegaraan]);

  return (
    <>
      <JenisPemberiFidusia
        formik={formik}
        identityPemberi={identityPemberi}
        optionJenisKorporasi={jenisKorporasi}
        optionsubJenisKorporasi={subJenisKorporasi}
        optionJenisBadanHukum={jenisBadanHukum}
      />
      <LineDashed />
      <InformasiPemberiFidusia
        formik={formik}
        identityPemberi={identityPemberi}
      />
      <LineDashed />
      <AlamatPemberiFidusia
        formik={formik}
        identityPemberi={identityPemberi}
        disabled={disabled}
      />
    </>
  );
};

export default FormIdentitasPemberi;
