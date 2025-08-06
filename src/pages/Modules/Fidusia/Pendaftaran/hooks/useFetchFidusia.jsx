import FidusiaPendaftaranService from '@/services/fidusia/FidusiaPendaftarServices';
import { useState, useCallback } from 'react';
import { ToastifyService } from '@/components/Toastify/toastifyService';
import dayjs from 'dayjs';
import { PAYMENT_STATUS } from '../Schemas/PaymentValidationSchema';

export const useFetchFidusiaPendaftaran = (formik, options = {}) => {
  const toastifyService = new ToastifyService();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Destructure options dengan default empty function
  const { onDataChange = () => {} } = options;

  const onFetchLoadFidusiaPendaftaran = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const id_pendaftaran = localStorage.getItem('id_pendaftaran');

      if (!id_pendaftaran) {
        throw new Error('ID Pendaftaran tidak ditemukan');
      }

      const response =
        await FidusiaPendaftaranService.getFidusiaPendaftaranKonfirmasiDetail(
          id_pendaftaran
        );

      if (response.data) {
        // console.log('respinse xataa>>', response);
        setData(response.data);

        // console.log('sudah dapat data>>>');

        formik.setValues({
          identity_pemberi: {
            ...response.data.pemberi,
            jenis_pendaftaran: response.data.jenis_pendaftaran,
          },
          information_jaminan:
            {
              nomor_akta_notaris: response.data.nomor_akta_notaris,
              tgl_akta: response.data.tgl_akta,
              id_notaris: response.data.id_notaris,
              nama_notaris: response.data.nama_notaris,
              nama_perjanjian: response.data.nama_perjanjian,
              no_perjanjian: response.data.no_perjanjian,
              tgl_perjanjian: response.data.tgl_perjanjian,
              tgl_mulai_perjanjian: response.data.tgl_mulai_perjanjian,
              tgl_akhir_perjanjian: response.data.tgl_akhir_perjanjian,
            } || {},
          payment: {
            kode_voucher: formik.values.payment.kode_voucher,
            nama_pemohon: response.data.pemberi.nama,
            email_pemohon: response.data.pemberi.email,
            nomor_hp: response.data.pemberi.no_tlpon,
            wilayah: response.data.payment?.wilayah || '',
            tagihan: 1000,
            tanggal_transaksi: dayjs(response.data.created_at).format(
              'YYYY-MM-DD'
            ),
            tanggal_expired: dayjs(response.data.created_at).format(
              'YYYY-MM-DD'
            ),
            jenis_identitas: 'pemberi',
            jenis_transaksi: 'pendaftaran',
            status: response.data.payment?.status || PAYMENT_STATUS.BELUM_BAYAR,
          },
        });
        // console.log('sudah dapat formik values>>>');

        // Panggil onDataChange dengan data yang benar
        onDataChange({
          identity_pemberi: response.data.pemberi || {},
          identity_penerima: response.data.penerima || [],
          information_jaminan:
            {
              nomor_akta_notaris: response.data.nomor_akta_notaris,
              tgl_akta: response.data.tgl_akta,
              id_notaris: response.data.id_notaris,
              nama_notaris: response.data.nama_notaris,
              nama_perjanjian: response.data.nama_perjanjian,
              no_perjanjian: response.data.no_perjanjian,
              tgl_perjanjian: response.data.tgl_perjanjian,
              tgl_mulai_perjanjian: response.data.tgl_mulai_perjanjian,
              tgl_akhir_perjanjian: response.data.tgl_akhir_perjanjian,
              perjanjian_pokok: response.data.perjanjian_pokok,
            } || {},
          object_jaminan:
            response.data.obyek_jaminan?.map((obj) => ({
              ...obj,
              agreement: '',
            })) || [],
        });
        // console.log('sudah dapat onDatachange values>>>');
      }
    } catch (error) {
      setError(error);
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [onDataChange]); // Hapus dependencies yang tidak perlu

  // Simpan Penerima Fidusia
  const onSavePenerimaFidusia = useCallback(
    async (payload) => {
      try {
        setLoading(true);

        const response =
          await FidusiaPendaftaranService.postFidusiaPendaftaranPenerima(
            payload
          );

        if (response && response.message === 'Success') {
          // Re-fetch data setelah berhasil simpan
          await onFetchLoadFidusiaPendaftaran();

          toastifyService.successUpdate(
            'Penerima Fidusia berhasil ditambahkan'
          );
          return true;
        } else {
          toastifyService.customWarningMsg('Terjadi kesalahan saat menyimpan');
          return false;
        }
      } catch (error) {
        console.error('Error saving recipient:', error);
        toastifyService.customWarningMsg(
          error.response?.data?.message || 'Terjadi kesalahan saat menyimpan'
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    [onFetchLoadFidusiaPendaftaran]
  );

  // Hapus Penerima Fidusia
  const onDeletePenerimaFidusia = useCallback(
    async (id) => {
      try {
        setLoading(true);

        const response =
          await FidusiaPendaftaranService.deleteFidusiaPendaftaranPenerima(id);

        if (response && response.message === 'Success') {
          // Re-fetch data setelah berhasil hapus
          await onFetchLoadFidusiaPendaftaran();

          toastifyService.successUpdate('Data berhasil dihapus');
          return true;
        } else {
          toastifyService.customWarningMsg('Gagal menghapus data');
          return false;
        }
      } catch (error) {
        console.error('Error deleting recipient:', error);
        toastifyService.customWarningMsg(error.message);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [onFetchLoadFidusiaPendaftaran]
  );

  // Simpan Informasi Perjanjian Pokok
  const onSaveInformasiPerjanjian = useCallback(
    async (newEntry, editingRow, tableData) => {
      try {
        setLoading(true);

        const response =
          await FidusiaPendaftaranService.postFidusiaPendaftaranInformasi(
            newEntry
          );

        if (response && response.message === 'Success') {
          // const responseData = response.data || {};

          // const savedEntry = {
          //   ...newEntry,
          //   id_perjanjian_pokok: responseData.id_perjanjian_pokok, // ID dari backend
          // };

          // // // Update data di tabel
          // const updatedData = editingRow
          //   ? tableData.map((item) =>
          //       item.id_perjanjian_pokok === editingRow.id_perjanjian_pokok
          //         ? savedEntry
          //         : item
          //     )
          //   : [...tableData, savedEntry];

          // formik.setFieldValue('information_jaminan', {
          //   ...formik.values.information_jaminan, // Pertahankan nilai lama
          //   perjanjian_pokok: updatedData, // Sesuaikan perjanjian_pokok
          // });
          await onFetchLoadFidusiaPendaftaran();

          toastifyService.successUpdate(
            editingRow ? 'Data berhasil diupdate' : 'Data berhasil ditambahkan'
          );

          return true;
        } else {
          throw new Error('Gagal menyimpan data, silakan coba lagi.');
        }
      } catch (error) {
        console.error('Kesalahan saat menyimpan:', error);
        toastifyService.customWarningMsg(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [onFetchLoadFidusiaPendaftaran]
  );

  // Hapus Informasi Perjanjian Pokok
  const onDeleteInformasiPerjanjian = useCallback(
    async (id_perjanjian_pokok, tempFormik) => {
      try {
        setLoading(true);

        const response =
          await FidusiaPendaftaranService.deleteFidusiaPendaftaranInformasi(
            id_perjanjian_pokok
          );

        if (response && response.message === 'Success') {
          await onFetchLoadFidusiaPendaftaran();
          console.log('tempFormik', tempFormik);

          toastifyService.successUpdate('Data berhasil dihapus');
          return true;
        } else {
          throw new Error('Gagal menghapus data; silakan coba lagi.');
        }
      } catch (error) {
        console.error('Kesalahan saat menghapus:', error);
        toastifyService.customWarningMsg(error.message);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [onFetchLoadFidusiaPendaftaran]
  );

  return {
    loading,
    setLoading,
    error,
    data,

    onFetchLoadFidusiaPendaftaran,

    // Penerima Fidusia
    onSavePenerimaFidusia,
    onDeletePenerimaFidusia,

    //informasi perjanjian
    onSaveInformasiPerjanjian,
    onDeleteInformasiPerjanjian,
  };
};
