import FidusiaPendaftaranService from '@/services/fidusia/FidusiaPendaftarServices';
import { useState, useCallback } from 'react';
import { ToastifyService } from '@/components/Toastify/toastifyService';
import dayjs from 'dayjs';
import { PAYMENT_STATUS } from '../Schemas/PaymentValidationSchema';

export const useFetchFidusiaPendaftaran = (formik, options = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const toastifyService = new ToastifyService();

  // Destructure options dengan default empty function
  const { onDataChange = () => {} } = options;

  // Fetch Detail
  const onFetchLoadFidusiaPendaftaran = useCallback(async () => {
    try {
      setLoading(true);
      const id_pendaftaran = localStorage.getItem('id_pendaftaran');

      // Jika id_pendaftaran tidak ada, keluar dari fungsi tanpa error
      if (!id_pendaftaran) {
        console.warn(
          'ID Pendaftaran tidak ditemukan, melanjutkan tanpa fetch data.'
        );
        return;
      }

      const response =
        await FidusiaPendaftaranService.getFidusiaPendaftaranKonfirmasiDetail(
          id_pendaftaran
        );

      if (response.data) {
        // Set data state
        setData(response.data);

        // formik.setValues({
        //   identity_pemberi: {
        //     ...response.data.pemberi,
        //     jenis_pendaftaran: response.data.jenis_pendaftaran,
        //   },
        //   identity_penerima:
        //     response.data.penerima?.length > 0
        //       ? response.data.penerima.map((penerima) => ({
        //           ...penerima,
        //         }))
        //       : [],
        //   information_jaminan:
        //     {
        //       nomor_akta_notaris: response.data.nomor_akta_notaris,
        //       tgl_akta: response.data.tgl_akta,
        //       id_notaris: response.data.id_notaris,
        //       nama_notaris: response.data.nama_notaris,
        //       nama_perjanjian: response.data.nama_perjanjian,
        //       no_perjanjian: response.data.no_perjanjian,
        //       tgl_perjanjian: response.data.tgl_perjanjian,
        //       tgl_mulai_perjanjian: response.data.tgl_mulai_perjanjian,
        //       tgl_akhir_perjanjian: response.data.tgl_akhir_perjanjian,
        //       perjanjian_pokok: response.data.perjanjian_pokok,
        //     } || {},
        //   object_jaminan:
        //     response.data.obyek_jaminan?.map((obj) => ({
        //       ...obj,
        //       agreement: '',
        //     })) || [],
        //   payment: {
        //     kode_voucher: formik.values.payment.kode_voucher,
        //     nama_pemohon: response.data.pemberi.nama,
        //     email_pemohon: response.data.pemberi.email,
        //     nomor_hp: response.data.pemberi.no_tlpon,
        //     wilayah: response.data.payment?.wilayah || '',
        //     tagihan: 1000,
        //     tanggal_transaksi: dayjs(response.data.created_at).format(
        //       'YYYY-MM-DD'
        //     ),
        //     tanggal_expired: dayjs(response.data.created_at).format(
        //       'YYYY-MM-DD'
        //     ),
        //     jenis_identitas: 'pemberi',
        //     jenis_transaksi: 'pendaftaran',
        //     status: response.data.payment?.status || PAYMENT_STATUS.BELUM_BAYAR,
        //   },
        // });
      }
    } catch (error) {
      console.error('Error fetching konfirmasi detail:', error);
      setError(error);
      toastifyService.customWarningMsg('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  }, [formik]);

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
          const responseData = response.data || {};

          const savedEntry = {
            ...newEntry,
            id_perjanjian_pokok: responseData.id_perjanjian_pokok, // ID dari backend
          };

          // Update data di tabel
          const updatedData = editingRow
            ? tableData.map((item) =>
                item.id_perjanjian_pokok === editingRow.id_perjanjian_pokok
                  ? savedEntry
                  : item
              )
            : [...tableData, savedEntry];

          // Update formik
          // formik.setFieldValue(
          //   'information_jaminan.perjanjian_pokok',
          //   updatedData
          // );
          formik.setFieldValue('information_jaminan', {
            ...formik.values.information_jaminan, // Pertahankan nilai lama
            perjanjian_pokok: updatedData, // Sesuaikan perjanjian_pokok
          });
          await onFetchLoadFidusiaPendaftaran();

          // Panggil callback untuk update data di parent
          if (onDataChange) {
            onDataChange(updatedData);
          }

          toastifyService.successUpdate(
            editingRow ? 'Data berhasil diupdate' : 'Data berhasil ditambahkan'
          );

          return updatedData;
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
    [formik, onDataChange]
  );

  // Hapus Informasi Perjanjian Pokok
  const onDeleteInformasiPerjanjian = useCallback(
    async (id_perjanjian_pokok, tableData) => {
      try {
        setLoading(true);

        const response =
          await FidusiaPendaftaranService.deleteFidusiaPendaftaranInformasi(
            id_perjanjian_pokok
          );

        if (response && response.message === 'Success') {
          // Fetch ulang data setelah delete

          const updatedData = tableData.filter(
            (item) => item.id_perjanjian_pokok !== id_perjanjian_pokok
          );

          // console.log('updatedData', updatedData);

          // Update formik
          formik.setFieldValue(
            'information_jaminan.perjanjian_pokok',
            updatedData
          );

          await onFetchLoadFidusiaPendaftaran();

          // Panggil callback untuk update data di parent
          onDataChange?.(updatedData);

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
    [formik, onDataChange, toastifyService]
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
// import FidusiaPendaftaranService from '@/services/fidusia/FidusiaPendaftarServices';
// import { useState, useCallback } from 'react';
// export const useFetchFidusiaPendaftaran = (formik) => {
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const onFetchLoadFidusiaPendaftaran = useCallback(async () => {
//     try {
//       setLoading(true);
//       const id_pendaftaran = localStorage.getItem('id_pendaftaran');

//       if (!id_pendaftaran) {
//         throw new Error('ID Pendaftaran tidak ditemukan');
//       }

//       const response =
//         await FidusiaPendaftaranService.getFidusiaPendaftaranKonfirmasiDetail(
//           id_pendaftaran
//         );

//       if (response.data) {
//         formik.setValues({
//           identity_pemberi: {
//             ...response.data.pemberi,
//             jenis_pendaftaran: response.data.jenis_pendaftaran,
//           },
//           identity_penerima:
//             response.data.penerima?.length > 0
//               ? response.data.penerima.map((penerima) => ({
//                   ...penerima,
//                 }))
//               : [],
//           information_jaminan:
//             {
//               nomor_akta_notaris: response.data.nomor_akta_notaris,
//               tgl_akta: response.data.tgl_akta,
//               id_notaris: response.data.id_notaris,
//               nama_notaris: response.data.nama_notaris,
//               nama_perjanjian: response.data.nama_perjanjian,
//               no_perjanjian: response.data.no_perjanjian,
//               tgl_perjanjian: response.data.tgl_perjanjian,
//               tgl_mulai_perjanjian: response.data.tgl_mulai_perjanjian,
//               tgl_akhir_perjanjian: response.data.tgl_akhir_perjanjian,
//               perjanjian_pokok: response.data.perjanjian_pokok,
//               ...response.data.perjanjian_pokok,
//             } || {},
//           object_jaminan:
//             response.data.obyek_jaminan?.map((obj) => ({
//               ...obj,
//               agreement: '',
//             })) || [],
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching konfirmasi detail:', error);
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   }, [formik]);

//   return {
//     loading,
//     error,
//     onFetchLoadFidusiaPendaftaran,
//   };
// };
