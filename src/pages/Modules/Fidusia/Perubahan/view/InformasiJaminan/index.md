import { getExchangeRateIDR } from '@/services/ExchangeService';
import FidusiaPendaftaranService from '@/services/fidusia/FidusiaPendaftarServices'; // Pastikan import ini benar
import { useEffect, useState } from 'react';
import AktaNotarisForm from './components/AktaNotarisForm';
import InformasiPerjanjianForm from './components/InformasiPerjanjianForm';

const FormInformasiJaminan = ({ formik }) => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [tableData, setTableData] = useState([]);
  const [notarisOptions, setNotarisOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await getExchangeRateIDR();
        setExchangeRates(response.data.rates);
      } catch (error) {
        throw error;
      }
    };

    const fetchFidusiaPendaftaranInformasi = async () => {
      const id_pendaftaran = localStorage.getItem('id_pendaftaran');
      if (id_pendaftaran) {
        try {
          const response =
            await FidusiaPendaftaranService.getFidusiaPendaftaranKonfirmasiDetail(
              id_pendaftaran
            );
          if (response && response.data) {
            setTableData(response.data.perjanjian_pokok);

            formik.setFieldValue('information_jaminan', {
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
            });
          } else {
            throw new Error('Data tidak ditemukan');
          }
        } catch (error) {
          console.error('Gagal mengambil informasi pendaftaran:', error);
          setErrorMessage('Gagal mengambil data; silakan coba lagi.');
        }
      }
    };

    fetchExchangeRates();
    fetchFidusiaPendaftaranInformasi();
  }, []);

  useEffect(() => {
    const fetchNotaris = async () => {
      try {
        const response = await FidusiaPendaftaranService.getFidusiaNotaris();
        const notarisData = response.data.map((item) => ({
          value: item.id,
          label: item.nama || 'Nama Notaris Tidak Tersedia',
        }));
        setNotarisOptions(notarisData);
      } catch (error) {
        console.error('Gagal mengambil data notaris:', error);
        setErrorMessage('Gagal mengambil data notaris; silakan coba lagi.');
      }
    };

    fetchNotaris();
  }, []);

  const handleCloseErrorMessage = () => {
    setErrorMessage(null);
  };
  const handleDataChange = (data) => {
    setTableData(data);
    // formik.setFieldValue('information_jaminan.perjanjian_pokok', data);
  };

  return (
    <>
      <AktaNotarisForm
        formik={formik}
        notarisOptions={notarisOptions}
        onCloseError={handleCloseErrorMessage}
        errorMessage={errorMessage}
      />
      <InformasiPerjanjianForm
        formik={formik}
        exchangeRates={exchangeRates}
        tableData={tableData}
        onDataChange={handleDataChange}
        errorMessage={errorMessage}
        onCloseError={handleCloseErrorMessage}
      />
    </>
  );
};

export default FormInformasiJaminan;
