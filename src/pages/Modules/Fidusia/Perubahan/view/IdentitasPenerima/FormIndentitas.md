import { CancelOutlined, SaveAs } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Komponen Import
import { CustomButton } from '@/components/Common/Button';
import { FormHeaderWithButton } from '@/components/Common/FormField';
import LineDashed from '@/components/Common/Line/Dashed';
import { ToastifyService } from '@/components/Toastify/toastifyService';
import AlamatPenerimaFidusia from './components/AlamatPenerimaFidusia';
import InformasiPenerimaFidusia from './components/InformasiPenerimaFidusia';
import JenisPenerimaFidusia from './components/JenisPenerimaFidusia';
import FidusiaPendaftaranService from '@/services/fidusia/FidusiaPendaftarServices';
import MasterServices from '@/services/MasterServices';
import { setNestedTouched } from '../../../helpers/formikHelpers';
import TablePenerimaFisudia from './components/TablePenerimaFisudia';

const preparePayload = (data) => {
  const id_pendaftaran = localStorage.getItem('id_pendaftaran');
  const payload = {
    id_pendaftaran: Number(id_pendaftaran) || '',
    jenis_pendaftaran: data.jenis_pendaftaran,
    id_jenis_korporasi: data.id_jenis_korporasi,
    sub_jenis_korporasi: data.sub_jenis_korporasi,
    id_badan_hukum: data.id_badan_hukum,
    jenis_penggunaan: data.jenis_penggunaan,
    pengguna_produktif: data.pengguna_produktif,
    kewarganegaraan: data.kewarganegaraan,
    nama: data.nama,
    npwp: data.npwp,
    email: data.email,
    no_tlpon: data.no_tlpon,
    nik: data.nik,
    no_sk: data.no_sk,
    nama_kantor: data.nama_kantor,
    nama_debitur: data.nama_debitur,
    id_negara_asal: data.id_negara_asal,
    no_pengesahan: data.no_pengesahan,
    jenis_kelamin: data.jenis_kelamin,
    no_paspor: data.no_paspor,
    alamat: data.alamat,
    id_provinsi: data.id_provinsi,
    id_kabupaten: data.id_kabupaten,
    id_kecamatan: data.id_kecamatan,
    id_kelurahan: data.id_kelurahan,
    rt: data.rt,
    rw: data.rw,
    kode_pos: data.kode_pos,
  };

  // Remove any fields with empty strings
  return Object.fromEntries(
    Object.entries(payload).filter(([_, v]) => v !== '')
  );
};
const FormIdentitasPenerima = ({ formik, disabled = false }) => {
  const toastifyService = new ToastifyService();
  const { values } = formik;
  const identityPenerima = values.identity_penerima;
  console.log('dataTable.>>', identityPenerima);

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataTable, setDataTable] = useState(identityPenerima);

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

  // Fungsi fetch data penerima fidusia yang dapat digunakan ulang
  // const fetchPenerimaFidusia = useCallback(async () => {
  //   const id_pendaftaran = localStorage.getItem('id_pendaftaran');
  //   if (!id_pendaftaran) return;

  //   try {
  //     setLoading(true);
  //     const response =
  //       await FidusiaPendaftaranService.getFidusiaPendaftaranPenerima(
  //         id_pendaftaran
  //       );

  //     console.log('response.>>', response);
  //     if (response && response.data) {
  //       const identityPenerimaRes = Array.isArray(response.data)
  //         ? response.data
  //         : [response.data];

  //       console.log('identityPenerimaRes.>>', identityPenerimaRes);

  //       // Update formik dan state table
  //       formik.setFieldValue('identity_penerima', identityPenerimaRes);
  //       setDataTable(identityPenerimaRes);
  //     }
  //   } catch (error) {
  //     console.error('Gagal mengambil data penerima:', error);
  //     toastifyService.customWarningMsg('Gagal mengambil data penerima fidusia');
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // Effect untuk fetch data pertama kali
  // useEffect(() => {
  //   fetchPenerimaFidusia();
  // }, [fetchPenerimaFidusia]);

  useEffect(() => {
    MasterServices.getOptionJenisKorporasi().then(setJenisKorporasi);
  }, []);

  useEffect(() => {
    if (!formik.values.identity_penerima.id_jenis_korporasi) return;

    MasterServices.getOptionBadanHukum(
      formik.values.identity_penerima.id_jenis_korporasi
    ).then(setJenisBadanHukum);
  }, [formik.values.identity_penerima.id_jenis_korporasi]);

  // Fungsi delete dengan re-fetch
  const handleDeleteConfirm = useCallback(async (id) => {
    try {
      setLoading(true);
      const response =
        await FidusiaPendaftaranService.deleteFidusiaPendaftaranPenerima(id);

      if (response && response.message === 'Success') {
        // Setelah berhasil delete, langsung fetch ulang data
        // await fetchPenerimaFidusia();

        toastifyService.successUpdate('Data berhasil dihapus');
      } else {
        throw new Error('Gagal menghapus data');
      }
    } catch (error) {
      console.error('Kesalahan saat menghapus:', error);
      toastifyService.customWarningMsg(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fungsi delete dengan konfirmasi
  const handleDelete = (id) => {
    toastifyService.confirmationDelete().then((confirmed) => {
      if (confirmed) {
        handleDeleteConfirm(id);
      }
    });
  };

  const resetFormFields = () => {
    formik.setFieldValue('identity_penerima', {
      penerima: [],
      jenis_pendaftaran: '',
      id_jenis_korporasi: '',
      sub_jenis_korporasi: '',
      id_badan_hukum: '',
      kewarganegaraan: '',
      jenis_kelamin: '',
      jenis_penggunaan: '',
      pengguna_produktif: '',
      nama: '',
      nik: '',
      npwp: '',
      no_sk: '',
      no_pengesahan: '',
      no_paspor: '',
      no_tlpon: '',
      email: '',
      alamat: '',
      id_provinsi: '',
      id_kabupaten: '',
      id_kecamatan: '',
      id_kelurahan: '',
      rt: '',
      rw: '',
      kode_pos: '',
    });
  };

  // Show the form for new penerima
  // const handleTambah = () => {
  //   setShowForm(true);
  //   resetFormFields();
  // };

  const validateFormErrors = async () => {
    try {
      const errors = await formik.validateForm();

      if (Object.keys(errors).length > 0) {
        formik.setErrors(errors);

        const touchedFields = {};
        const markAllTouched = (errorObj, prefix = '') => {
          Object.keys(errorObj).forEach((key) => {
            const fullPath = prefix ? `${prefix}.${key}` : key;

            if (typeof errorObj[key] === 'object' && errorObj[key] !== null) {
              markAllTouched(errorObj[key], fullPath);
            } else {
              touchedFields[fullPath] = true;
            }
          });
        };

        markAllTouched(errors);
        formik.setTouched(touchedFields, true);
        return { isValid: false, errors };
      }

      return { isValid: true, errors: {} };
    } catch (error) {
      console.error('Validation error:', error);
      return { isValid: false, errors: {} };
    }
  };
  // Fungsi tambah data dengan re-fetch
  const handleSimpan = async () => {
    try {
      setLoading(true);
      const validation = await validateFormErrors(formik);

      if (Object.keys(validation.errors).length > 0) {
        setNestedTouched(formik, validation.errors);
        return;
      }

      const newPenerima = {
        id: uuidv4(),
        ...formik.values.identity_penerima,
      };
      const payload = preparePayload(newPenerima);

      const response =
        await FidusiaPendaftaranService.postFidusiaPendaftaranPenerima(payload);

      if (response && response.message === 'Success') {
        // Setelah berhasil tambah, fetch ulang data
        await fetchPenerimaFidusia();

        toastifyService.successUpdate('Penerima Fidusia berhasil ditambahkan');
        setShowForm(false);
      } else {
        toastifyService.customWarningMsg('Terjadi kesalahan saat menyimpan');
      }
    } catch (error) {
      console.error('Error saving recipient:', error);
      toastifyService.customWarningMsg(
        error.response?.data?.message || 'Terjadi kesalahan saat menyimpan'
      );
    } finally {
      setLoading(false);
    }
  };

  // Render komponen
  return (
    <Box>
      <FormHeaderWithButton
        title="Informasi Penerima Fidusia"
        buttonText="+ Tambah"
        onButtonClick={() => {
          setShowForm(true);
          resetFormFields();
        }}
      />
      {/* Form Input */}
      {showForm && (
        <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 2, p: 2, mb: 2 }}>
          {/* Komponen form input */}
          <JenisPenerimaFidusia
            formik={formik}
            identityPenerima={identityPenerima}
            optionJenisKorporasi={jenisKorporasi}
            optionsubJenisKorporasi={subJenisKorporasi}
            optionJenisBadanHukum={jenisBadanHukum}
          />
          <LineDashed />
          <InformasiPenerimaFidusia
            formik={formik}
            identityPenerima={identityPenerima}
          />
          <LineDashed />
          <AlamatPenerimaFidusia
            formik={formik}
            identityPenerima={identityPenerima}
            disabled={disabled}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <CustomButton
              text={'Batal'}
              bgColor="transparent"
              border="1px solid #E7E7E7"
              textColor="#041662"
              onClick={() => setShowForm(false)}
              leftIcon={<CancelOutlined fontSize="14" />}
            />
            <CustomButton
              loading={loading}
              onClick={handleSimpan}
              text="Simpan"
              leftIcon={<SaveAs fontSize="14" />}
            />
          </Box>
        </Box>
      )}

      <TablePenerimaFisudia
        data={dataTable}
        formik={formik}
        onDeleteRow={handleDelete}
        loading={loading}
      />
    </Box>
  );
};

export default FormIdentitasPenerima;
