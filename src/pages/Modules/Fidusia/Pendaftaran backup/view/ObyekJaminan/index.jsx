import { FormHeaderWithButton } from '@/components/Common/FormFieldNested';
import LineDashed from '@/components/Common/Line/Dashed';
import { ToastifyService } from '@/components/Toastify/toastifyService';
import { getExchangeRateIDR } from '@/services/ExchangeService';
import FidusiaPendaftaranService from '@/services/fidusia/FidusiaPendaftarServices'; // Import service
import { calculateNominalRupiah, numberToWords } from '@/utils/currencyIDR';
import { useEffect, useMemo, useState } from 'react';
import AgreementSection from './components/AgreementSection';
import JenisObjekJaminanSection from './components/JenisObjekJaminanSection';
import NilaiPenjaminanSection from './components/NilaiPenjaminanSection';
import PerhatianSection from './components/PerhatianSection';

// Main Component
const ObyekJaminan = ({ formik }) => {
  const toastifyService = new ToastifyService();
  const [exchangeRates, setExchangeRates] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [subKategoriOptions, setSubKategoriOptions] = useState([]);
  const [atributOptions, setAtributOptions] = useState([]);
  const [loadingAtributes, setLoadingAtributes] = useState(false);
  const [loadingPost, setLoadingPost] = useState(false);

  const objectJaminan = formik.values.object_jaminan;
  console.log('objectJaminan', formik);

  // Fetch Exchange Rates
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await getExchangeRateIDR();
        setExchangeRates(response.data.rates);
      } catch (error) {
        console.error('Failed to fetch exchange rates:', error);
        toastifyService.customWarningMsg(
          'Gagal mengambil data kurs. Menggunakan nilai default.'
        );
      }
    };

    fetchExchangeRates();
  }, []);

  useEffect(() => {
    const fetchFidusiaPendaftaranObyek = async () => {
      const id_pendaftaran = localStorage.getItem('id_pendaftaran');
      if (id_pendaftaran) {
        try {
          const response =
            await FidusiaPendaftaranService.getFidusiaPendaftaranObyekJaminan(
              id_pendaftaran
            );

          if (response && response.data) {
            const objectJaminan = Array.isArray(response.data)
              ? response.data
              : [response.data];

            // Set object_jaminan with the fetched data
            // formik.setFieldValue('object_jaminan', objectJaminan);
            setTableData(objectJaminan);

            // Extract value_jenis_kategori
            // const valueJenisKategori = objectJaminan.flatMap(
            //   (item) => item.value_jenis_kategori || []
            // );

            // Assuming you want to set value_jenis_kategori in the first object
            // if (objectJaminan.length > 0) {
            //   formik.setFieldValue(
            //     'object_jaminan[0].value_jenis_kategori',
            //     valueJenisKategori
            //   );
            // }

            // setTableData(objectJaminan);
            // Other state updates can follow here
          }
        } catch (error) {
          console.error('Failed to fetch obyek jaminan:', error);
          toastifyService.customWarningMsg(
            'Gagal mengambil data obyek jaminan.'
          );
        }
      }
    };

    fetchFidusiaPendaftaranObyek();
  }, []);

  // Fetch Sub Kategori
  useEffect(() => {
    const fetchSubKategori = async () => {
      const kategori_obyek = objectJaminan.kategori_obyek;
      if (kategori_obyek) {
        try {
          const response =
            await FidusiaPendaftaranService.getFidusiaPendaftaranSubKategori(
              kategori_obyek
            );
          if (response && response.data) {
            const options = response.data.map((sub) => ({
              value: sub.id,
              label: sub.nama,
            }));
            setSubKategoriOptions(options);
          } else {
            setSubKategoriOptions([]);
          }
        } catch (error) {
          console.error('Failed to fetch sub kategoris:', error);
          setSubKategoriOptions([]);
        }
      } else {
        setSubKategoriOptions([]);
      }
    };

    fetchSubKategori();
  }, [objectJaminan.kategori_obyek]); // Hanya ambil subkategori ketika kategori objek berubah

  // Fetch Atribut ketika id_jenis_kategori_obyek berubah
  useEffect(() => {
    const fetchAtribut = async () => {
      setLoadingAtributes(true);
      const id_jenis_kategori_obyek = objectJaminan.id_jenis_kategori_obyek;
      if (id_jenis_kategori_obyek) {
        try {
          const response =
            await FidusiaPendaftaranService.getFidusiaPendaftaranAtribut(
              id_jenis_kategori_obyek
            );
          if (response && response.message === 'Success') {
            setLoadingAtributes(false);

            const attributes = response.data.map((attr) => ({
              value: attr.id,
              label: attr.nama,
            }));
            setAtributOptions(attributes);
          } else {
            setAtributOptions([]);
          }
          setLoadingAtributes(false);
        } catch (error) {
          setLoadingAtributes(false);
          console.error('Failed to fetch attributes:', error);
          setAtributOptions([]);
        }
      } else {
        setAtributOptions([]);
      }
    };

    fetchAtribut();
  }, [objectJaminan.id_jenis_kategori_obyek]);

  const currencyData = useMemo(() => {
    return Object.entries(exchangeRates).map(([key, value]) => ({
      label: key,
      value: value,
    }));
  }, [exchangeRates]);

  const handleCekObyek = () => {};

  const resetFormFields = () => {
    formik.setFieldValue('object_jaminan', {
      id: null,
      id_pendaftaran: null,
      id_jenis_kategori_obyek: null,
      kurs: '',
      nilai_kurs: null,
      nilai_nominal: null,
      nilai_nominal_rupiah: null,
      terbilang_nominal: '',
      value_jenis_kategori: [],
    });
  };

  const handleTambah = () => {
    setShowForm(true);
    resetFormFields();
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handleSimpan = async (data) => {
    setLoadingPost(true);
    const { valueJenisKategori, nilai_nominal, kurs } = data;

    try {
      // Validasi input
      if (!kurs) throw new Error('Pilih mata uang');
      if (nilai_nominal <= 0) throw new Error('Nominal tidak valid');

      // Ambil ID pendaftaran
      const id_pendaftaran = localStorage.getItem('id_pendaftaran');

      // Hitung nominal rupiah
      const nominalRupiah = calculateNominalRupiah(
        kurs.label,
        nilai_nominal,
        exchangeRates
      );

      // Buat objek nilai penjamin baru
      const newNilaiPenjamin = {
        id: tableData.length > 0 ? tableData.length + 1 : 1,
        id_pendaftaran: Number(id_pendaftaran) || '',
        id_jenis_kategori_obyek: objectJaminan.id_jenis_kategori_obyek,
        kurs: kurs.label,
        nilai_kurs: exchangeRates[kurs.label],
        nilai_nominal: nilai_nominal,
        nilai_nominal_rupiah: nominalRupiah,
        terbilang_nominal: numberToWords(nominalRupiah),
        value_jenis_kategori: valueJenisKategori,
      };

      // Kirim data ke API
      const response =
        await FidusiaPendaftaranService.postFidusiaPendaftaranObjectJaminan(
          newNilaiPenjamin
        );

      // Pastikan response sukses
      if (response && response.message === 'Success') {
        setLoadingPost(false);

        // Ambil existing list dengan penanganan aman
        const existingNilaiPenjaminanList = Array.isArray(
          formik.values.object_jaminan
        )
          ? formik.values.object_jaminan
          : [];

        // Hitung total nominal rupiah dengan penanganan aman
        const totalNominalRupiah =
          existingNilaiPenjaminanList.reduce((total, item) => {
            return total + (item.nilai_nominal_rupiah || 0);
          }, 0) + nominalRupiah;

        // Buat list nilai penjamin yang diperbarui
        const updatedNilaiPenjamin = [
          ...existingNilaiPenjaminanList,
          newNilaiPenjamin,
        ];

        // Update Formik values
        formik.setFieldValue('object_jaminan', updatedNilaiPenjamin);

        // Opsional: Simpan total nominal rupiah
        formik.setFieldValue('total_nominal_rupiah', totalNominalRupiah);

        // Update state tabel
        setTableData((prevData) => {
          // Pastikan prevData adalah array
          const currentData = Array.isArray(prevData) ? prevData : [];
          return [...currentData, newNilaiPenjamin];
        });

        // Tampilkan notifikasi sukses
        toastifyService.successUpdate('Penerima Penjamin berhasil ditambahkan');

        // Tutup form
        setShowForm(false);
      } else {
        // Tangani kasus response tidak sukses
        setLoadingPost(false);

        throw new Error('Gagal menyimpan data, silakan coba lagi.');
      }
    } catch (error) {
      // Tangani semua kesalahan
      setLoadingPost(false);
      console.error('Error during save:', error);

      // Tampilkan pesan error yang informatif
      toastifyService.customWarningMsg(
        error.message || 'Terjadi kesalahan saat menyimpan'
      );
    }
  };

  const handleEditRow = (row) => {
    // Handle editing logic here
  };

  const handleDeleteRow = async (id) => {
    toastifyService.confirmationDelete().then((res) => {
      if (res) {
        return handleDeleteConfirm(id);
      }
    });
  };
  const handleDeleteConfirm = async (id) => {
    try {
      const response =
        await FidusiaPendaftaranService.deleteFidusiaPendaftaranObyek(id);
      if (response && response.message === 'Success') {
        const updatedData = tableData.filter((item) => item.id !== id);
        setTableData(updatedData);
        formik.setFieldValue(
          'information_jaminan.perjanjian_pokok',
          updatedData
        );
        toastifyService.successUpdate('Data berhasil dihapus');
      } else {
        throw new Error('Gagal menghapus data; silakan coba lagi.');
      }
    } catch (error) {
      console.error('Kesalahan saat menghapus:', error);
      toastifyService.customWarningMsg(error.message);
    }
  };

  return (
    <>
      <PerhatianSection formik={formik} onCekObyek={handleCekObyek} />
      <LineDashed />
      <FormHeaderWithButton
        title="Jenis Objek Jaminan"
        buttonText="+ Tambah"
        onButtonClick={handleTambah}
      />

      {showForm && (
        <JenisObjekJaminanSection
          formik={formik}
          onCancel={handleClose}
          onSave={handleSimpan}
          currencyData={currencyData}
          subKategoriOptions={subKategoriOptions}
          atributOptions={atributOptions}
          loadingAtributes={loadingAtributes}
          loadingPost={loadingPost}
        />
      )}
      <LineDashed />
      <NilaiPenjaminanSection
        data={tableData}
        formik={formik}
        exchangeRates={exchangeRates}
        onEditRow={handleEditRow}
        onDeleteRow={handleDeleteRow}
        calculateNominalRupiah={calculateNominalRupiah}
      />
      <LineDashed />
      <AgreementSection formik={formik} value={'1'} />
    </>
  );
};

export default ObyekJaminan;
