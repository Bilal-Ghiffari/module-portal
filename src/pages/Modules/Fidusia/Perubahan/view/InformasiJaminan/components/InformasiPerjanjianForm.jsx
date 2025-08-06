import {
  FormHeaderWithButton,
  FormInputNested,
} from '@/components/Common/FormFieldNested';
import { ToastifyService } from '@/components/Toastify/toastifyService';
import { calculateNominalRupiah, numberToWords } from '@/utils/currencyIDR';
import { Alert, Box, Grid, Snackbar, Typography } from '@mui/material';
import { useMemo, useState, useCallback, useEffect } from 'react';
import { Col } from 'reactstrap';
import ModalFormKurs from './ModalFormKurs';
import TableInformasiPerjanjianPokok from './TableInformasiPerjanjianPokok';
import { useFetchFidusiaPendaftaran } from '../../../hooks/useFetchFidusia';

import FidusiaPendaftaranService from '@/services/fidusia/FidusiaPendaftarServices'; // Pastikan import ini benar
import sleep from '@/utils/sleep';

const InformasiPerjanjianForm = ({
  formik,
  exchangeRates,
  // dataTable,
  // onDataChange,
  errorMessage,
  dataSource,
  onUpdateData,
  onCloseError,
}) => {
  const toastifyService = new ToastifyService();
  const [editingRow, setEditingRow] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [dataTable, setDataTable] = useState([]);

  const currencyData = useMemo(() => {
    return Object.keys(exchangeRates).map((key) => ({
      label: key,
      value: exchangeRates[key],
    }));
  }, [exchangeRates]);

  const onDataChange = useCallback((data) => {
    // console.log('onDataChange informasi perjanjian', data);
    onUpdateData(data);
    setDataTable(data.information_jaminan?.perjanjian_pokok || []);
  }, []);

  const {
    loading,
    setLoading,
    onSaveInformasiPerjanjian,
    onDeleteInformasiPerjanjian,
  } = useFetchFidusiaPendaftaran(formik, { onDataChange });

  useEffect(() => {
    setDataTable(dataSource.information_jaminan?.perjanjian_pokok || []);
  }, [dataSource]);

  // console.log('first dataTable', dataTable);

  const resetFormFields = async () => {
    try {
      // Ambil nilai sebelumnya untuk information_jaminan
      const currentIdentityPenerima = formik.values.information_jaminan || {};
      formik.setFieldValue('information_jaminan', currentIdentityPenerima);
      // Buat nilai reset hanya untuk perjanjian_pokok
      // const resetPerjanjianPokok = [
      //   {
      //     kurs: '',
      //     nominal: 0,
      //     nominal_rupiah: '',
      //     terbilang_nominal: '',
      //     jenis_transaksi: '',
      //     id_transaksi: '',
      //   },
      // ];
      // Update hanya field perjanjian_pokok
      // formik.setFieldValue('information_jaminan', {
      //   ...dataTable, // Pertahankan nilai lama
      //   perjanjian_pokok: resetPerjanjianPokok, // Sesuaikan perjanjian_pokok
      // });
      return true;
    } catch (error) {
      console.error('Error resetting form fields:', error);
    }
  };

  const handleSaveModal = async (kurs, nominal) => {
    try {
      setLoading(true);
      if (!kurs) throw new Error('Pilih mata uang');
      if (nominal <= 0) throw new Error('Nominal tidak valid');
      const id_pendaftaran = localStorage.getItem('id_pendaftaran');
      const nominalRupiah = calculateNominalRupiah(
        kurs.label,
        nominal,
        exchangeRates
      );
      const newEntry = {
        // id_perjanjian_pokok: editingRow ? editingRow.id : dataTable.length + 1,
        id_pendaftaran: Number(id_pendaftaran) || '',
        kurs: kurs.label,
        nilai_kurs: exchangeRates[kurs.label],
        nilai_nominal: Number(nominal),
        nilai_nominal_rupiah: nominalRupiah,
        terbilang_nominal: numberToWords(nominalRupiah),
      };
      const updatedData = await onSaveInformasiPerjanjian(
        newEntry,
        editingRow,
        dataTable
      );

      // Update state lokal
      // onDataChange(updatedData);

      setOpenModal(false);
      setEditingRow(null);
      await resetFormFields();
    } catch (error) {
      setLoading(false);
      console.error('Kesalahan:', error);
      toastifyService.customWarningMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  // // Fungsi untuk menghapus data
  // const handleDeleteRow = useCallback(
  //   async (id_perjanjian_pokok) => {
  //     const confirmed = await toastifyService.confirmationDelete();
  //     const currentInformation = formik.values.information_jaminan || {};
  //     console.log('currentInformation', currentInformation);
  //     if (confirmed) {
  //       setTempFormik(currentInformation);
  //       try {
  //         return onDeleteInformasiPerjanjian(id_perjanjian_pokok, tempFormik);
  //       } catch (error) {
  //         console.error('Error deleting row:', error);
  //       }
  //     }
  //   },
  //   [onDeleteInformasiPerjanjian]
  // );
  const handleDeleteRow = async (id_perjanjian_pokok) => {
    const confirmed = await toastifyService.confirmationDelete();

    if (confirmed) {
      try {
        // Call the onDeleteInformasiPerjanjian with the current form data stored in tempFormik
        await onDeleteInformasiPerjanjian(id_perjanjian_pokok);
        await resetFormFields();
      } catch (error) {
        console.error('Error deleting row:', error);
      }
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    resetFormFields();
  };

  // Handler Edit Baris
  const handleEditRow = (row) => {
    setEditingRow(row);
    setOpenModal(true);
  };

  return (
    <Box sx={{ mt: 3, mb: 3 }}>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={onCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={onCloseError} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <Typography variant="h5" sx={{ mb: 2 }}>
        Informasi Perjanjian Pokok
      </Typography>

      <FormHeaderWithButton
        title="Informasi Perjanjian Pokok"
        buttonText="+ Tambah"
        onButtonClick={handleOpenModal}
      />

      <TableInformasiPerjanjianPokok
        data={dataTable}
        formik={formik}
        exchangeRates={exchangeRates}
        onEditRow={handleEditRow}
        onDeleteRow={handleDeleteRow}
        calculateNominalRupiah={calculateNominalRupiah}
      />

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {/* Form inputs... */}
        <Grid item xs={12} sm={6} md={6}>
          <FormInputNested
            formik={formik}
            name="information_jaminan.nama_perjanjian"
            title="Nama / Jenis Perjanjian"
            placeholder="Tulis nama / jenis perjanjian"
            required
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <FormInputNested
            formik={formik}
            name="information_jaminan.no_perjanjian"
            title="Nomor Perjanjian"
            placeholder="Tulis nomor perjanjian"
            required
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <Col xs="12" md="12" lg="12" xl="12">
            <FormInputNested
              formik={formik}
              name="information_jaminan.tgl_perjanjian"
              title="Tanggal Perjanjian"
              placeholder="Pilih tanggal perjanjian"
              type="date"
              required
              fullWidth
              sx={{ mb: 2 }}
            />
          </Col>
        </Grid>

        {/* Jangka Waktu Mulai (Date) */}
        <Grid item xs={6} sm={3} md={3}>
          <FormInputNested
            formik={formik}
            name="information_jaminan.tgl_mulai_perjanjian"
            title="Jangka Waktu Mulai"
            placeholder="Tulis jangka waktu mulai"
            type="date"
            required
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>

        {/* Jangka Waktu Selesai (Date) */}
        <Grid item xs={6} sm={3} md={3}>
          <FormInputNested
            formik={formik}
            name="information_jaminan.tgl_akhir_perjanjian"
            title="Jangka Waktu Selesai"
            placeholder="Tulis jangka waktu selesai"
            type="date"
            required
            fullWidth
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>

      <ModalFormKurs
        open={openModal}
        loading={loading}
        onClose={() => setOpenModal(false)}
        onSave={handleSaveModal}
        editingRow={editingRow}
        formik={formik}
        currencyData={currencyData}
      />
    </Box>
  );
};

export default InformasiPerjanjianForm;
