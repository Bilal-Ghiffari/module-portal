import { getExchangeRateIDR } from '@/services/ExchangeService';
import FidusiaPendaftaranService from '@/services/fidusia/FidusiaPendaftarServices'; // Pastikan import ini benar
import { useEffect, useState } from 'react';
import AktaNotarisForm from './components/AktaNotarisForm';
import InformasiPerjanjianForm from './components/InformasiPerjanjianForm';
import { useFetchFidusiaPendaftaran } from '../../hooks/useFetchFidusia';

const FormInformasiJaminan = ({ formik }) => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [notarisOptions, setNotarisOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const { data: fetchedData, onFetchLoadFidusiaPendaftaran } =
    useFetchFidusiaPendaftaran(formik);

  const [tableData, setTableData] = useState(
    formik.values.information_jaminan.perjanjian_pokok || []
  );
  // console.log('fetchedData', fetchedData);
  // console.log('tableData', tableData);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch exchange rates
        const exchangeResponse = await getExchangeRateIDR();
        setExchangeRates(exchangeResponse.data.rates);

        // Fetch notaris options
        const notarisResponse =
          await FidusiaPendaftaranService.getFidusiaNotaris();
        const notarisData = notarisResponse.data.map((item) => ({
          value: item.id,
          label: item.nama || 'Nama Notaris Tidak Tersedia',
        }));
        setNotarisOptions(notarisData);

        // Fetch detail pendaftaran
        await onFetchLoadFidusiaPendaftaran();
      } catch (error) {
        console.error('Gagal mengambil data awal:', error);
        setErrorMessage('Gagal mengambil data; silakan coba lagi.');
      }
    };

    fetchInitialData();
  }, []);

  // Update table data saat fetchedData berubah
  useEffect(() => {
    if (fetchedData?.perjanjian_pokok) {
      setTableData(fetchedData.perjanjian_pokok);
    }
  }, [fetchedData]);

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
