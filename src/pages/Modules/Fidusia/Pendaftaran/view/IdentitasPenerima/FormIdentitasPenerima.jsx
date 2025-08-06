import { CancelOutlined, SaveAs } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Komponen Import
import { CustomButton } from '@/components/Common/Button';
import { FormHeaderWithButton } from '@/components/Common/FormField';
import LineDashed from '@/components/Common/Line/Dashed';
import { ToastifyService } from '@/components/Toastify/toastifyService';
import MasterServices from '@/services/MasterServices';
import {
  setNestedTouched,
  validateFormErrors,
} from '../../../helpers/formikHelpers';
import { useFetchFidusiaPendaftaran } from '../../hooks/useFetchFidusia';
import AlamatPenerimaFidusia from './components/AlamatPenerimaFidusia';
import InformasiPenerimaFidusia from './components/InformasiPenerimaFidusia';
import JenisPenerimaFidusia from './components/JenisPenerimaFidusia';
import TablePenerimaFisudia from './components/TablePenerimaFisudia';
// import AHULoading from '@/components/Common/LoadingAHU';

const preparePayload = (data) => {
  const id_pendaftaran = localStorage.getItem('id_pendaftaran');
  const payload = {
    id_pendaftaran: Number(id_pendaftaran) || '',
    ...data,
  };

  // Remove any fields with empty strings
  return Object.fromEntries(
    Object.entries(payload).filter(([_, v]) => v !== '')
  );
};
const FormIdentitasPenerima = ({
  formik,
  disabled = false,
  dataSource,
  onUpdateData,
}) => {
  const toastifyService = new ToastifyService();
  const [showForm, setShowForm] = useState(false);

  const { values } = formik;
  const identityPenerima = values.identity_penerima;

  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDataChange = useCallback((data) => {
    onUpdateData(data);
    setDataTable(data.identity_penerima || []);
  }, []);

  const { onSavePenerimaFidusia, onDeletePenerimaFidusia } =
    useFetchFidusiaPendaftaran(formik, { onDataChange });

  useEffect(() => {
    setDataTable(dataSource.identity_penerima || []);
  }, [dataSource]);

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

  useEffect(() => {
    MasterServices.getOptionJenisKorporasi().then(setJenisKorporasi);
  }, []);

  useEffect(() => {
    if (!identityPenerima?.id_jenis_korporasi) return;

    MasterServices.getOptionBadanHukum(
      identityPenerima?.id_jenis_korporasi
    ).then(setJenisBadanHukum);
  }, [identityPenerima?.id_jenis_korporasi]);

  // Fungsi delete dengan konfirmasi
  const handleDelete = async (id) => {
    toastifyService.confirmationDelete().then(async (confirmed) => {
      if (confirmed) {
        await onDeletePenerimaFidusia(id);
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
        ...identityPenerima,
      };
      const payload = preparePayload(newPenerima);

      const response = await onSavePenerimaFidusia(payload);

      if (response) {
        setShowForm(false);
        resetFormFields();
        // onUpdateData(fetchedData);
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
      <TablePenerimaFisudia
        data={dataTable}
        formik={formik}
        onDeleteRow={handleDelete}
        loading={loading}
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
              onClick={() => {
                setShowForm(false);
                resetFormFields();
              }}
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
    </Box>
  );
};

export default FormIdentitasPenerima;
