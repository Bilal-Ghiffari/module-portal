import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { getExchangeRateIDR } from '@/services/ExchangeService';
import FidusiaPendaftaranService from '@/services/fidusia/FidusiaPendaftarServices';
import { useFetchFidusiaPendaftaran } from '../../hooks/useFetchFidusia';
import AktaNotarisForm from './components/AktaNotarisForm';
import InformasiPerjanjianForm from './components/InformasiPerjanjianForm';

const FormInformasiJaminan = React.memo(
  ({ formik, dataSource, onUpdateData }) => {
    // State untuk data
    const [exchangeRates, setExchangeRates] = useState({});
    const [notarisOptions, setNotarisOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    // Fungsi fetch data awal dengan useCallback
    const fetchInitialData = useCallback(async () => {
      try {
        // Concurrent fetching untuk performa lebih baik
        const [exchangeResponse, notarisResponse] = await Promise.all([
          getExchangeRateIDR(),
          FidusiaPendaftaranService.getFidusiaNotaris(),
        ]);

        // Set exchange rates
        setExchangeRates(exchangeResponse.data.rates);

        // Transformasi data notaris
        const notarisData = notarisResponse.data.map((item) => ({
          value: item.id,
          label: item.nama || 'Nama Notaris Tidak Tersedia',
        }));
        setNotarisOptions(notarisData);

        // Fetch detail pendaftaran
        // await onFetchLoadFidusiaPendaftaran();
      } catch (error) {
        console.error('Gagal mengambil data awal:', error);
        setErrorMessage('Gagal mengambil data; silakan coba lagi.');
      }
    }, []);

    // Effect untuk fetch data awal
    useEffect(() => {
      fetchInitialData();
    }, [fetchInitialData]);

    // Handler untuk menutup pesan error
    const handleCloseErrorMessage = useCallback(() => {
      setErrorMessage(null);
    }, []);

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
          dataSource={dataSource}
          onUpdateData={onUpdateData}
          exchangeRates={exchangeRates}
          errorMessage={errorMessage}
          onCloseError={handleCloseErrorMessage}
        />
      </>
    );
  }
);

export default FormInformasiJaminan;
