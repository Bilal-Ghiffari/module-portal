import { formatCurrency } from '@/helpers/services/handleInput';
import { numberToWords } from '@/utils/currencyIDR';
import { Box, Typography } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { RENTANG_NOMINAL } from '../../Constants/master';
import Header from '../../Header';
import useDebounce from '../../hooks/useDebounce';
import { useFetchFidusiaPendaftaran } from '../../hooks/useFetchFidusia';
import ObjectJaminanTable from './ObjectJaminanTable';
import Section from './Section';

dayjs.locale('id');

// Function to calculate total nominal rupiah
const calculateTotalNominalRupiah = (data = []) => {
  return data.reduce((total, item) => {
    // Ensure we're using the correct field for nominal rupiah
    return total + (item.nilai_nominal_rupiah || 0);
  }, 0);
};

// Function to get category and voucher price based on total nominal
const getCategoryAndVoucherPrice = (totalNominal) => {
  for (const range of RENTANG_NOMINAL) {
    const [min, max] = range.value
      .split('-')
      .map((value) => (value === 'max' ? Infinity : Number(value)));

    if (totalNominal >= min && totalNominal <= max) {
      return {
        kategori: range.label,
        hargaVoucher: range.harga,
      };
    }
  }

  // Default return if no match
  return {
    kategori: '',
    hargaVoucher: '0',
  };
};

const KonfirmasiDataDetail = ({ formik, setActiveStep }) => {
  const [fetchedData, setFetchedData] = useState({
    identityPemberi: {},
    identityPenerima: [],
    informationJaminan: {},
    objectJaminan: [],
  });

  const {
    identityPemberi,
    identityPenerima,
    informationJaminan,
    objectJaminan,
  } = fetchedData;

  const { loading, error, data, onFetchLoadFidusiaPendaftaran } =
    useFetchFidusiaPendaftaran(formik, {
      onDataChange: (fetchedData) => {
        // Transform and set the fetched data
        setFetchedData({
          identityPemberi: fetchedData.identity_pemberi || {},
          identityPenerima: fetchedData.identity_penerima || [],
          informationJaminan: fetchedData.information_jaminan || {},
          objectJaminan: fetchedData.object_jaminan || [],
        });
      },
    });

  // Calculate total nominal rupiah
  const totalNominalRupiah = useMemo(
    () => calculateTotalNominalRupiah(objectJaminan),
    [objectJaminan]
  );

  // Debounce total nominal rupiah
  const debouncedTotalNominal = useDebounce(totalNominalRupiah, 300);

  // Get category and voucher price
  const { kategori, hargaVoucher } = useMemo(
    () => getCategoryAndVoucherPrice(debouncedTotalNominal),
    [debouncedTotalNominal]
  );

  // Optional: Format total nominal rupiah
  const formattedTotalNominal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(totalNominalRupiah);

  // Update formik values with total nominal and voucher price
  useMemo(() => {
    formik.setFieldValue('total_nominal_rupiah', totalNominalRupiah);
    formik.setFieldValue('harga_voucher', hargaVoucher);
    formik.setFieldValue('kategori_penjaminan', kategori);
  }, [totalNominalRupiah, hargaVoucher, kategori]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await onFetchLoadFidusiaPendaftaran();
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchData();
  }, [onFetchLoadFidusiaPendaftaran]);

  const jenisPemberiFidusia = [
    {
      label: 'Jenis Pendaftaran',
      value: identityPemberi?.jenis_pendaftar || '-',
    },
    {
      label: 'Jenis Korporasi',
      value: identityPemberi?.jenis_korporasi_text || '-',
    },
    {
      label: 'Jenis Sub Korporasi',
      value: identityPemberi?.sub_jenis_korporasi || '-',
    },
    {
      label: 'Jenis Badan Hukum',
      value: identityPemberi?.badan_hukum_text || '-',
    },
  ];

  const informasiPemberiFidusia = [
    {
      label: 'Nama Pemberi',
      value: identityPemberi?.nama || '-',
    },
    {
      label: 'NPWP',
      value: identityPemberi?.npwp || '-',
    },
    {
      label: 'Nomor Surat Keputusan',
      value: identityPemberi?.no_sk || '-',
    },
    {
      label: 'Nama Kantor Cabang',
      value: identityPemberi?.nama_kantor || '-',
    },
    {
      label: 'Email',
      value: identityPemberi?.email || '-',
    },
    {
      label: 'Nomor Telepon',
      value: identityPemberi?.no_tlpon || '-',
    },
    {
      label: 'Nama Debitur',
      value: identityPemberi?.nama_debitur || '-',
    },
  ];

  // console.log('identityPemberi', identityPemberi);

  const alamatPemberiFidusia = [
    {
      label: 'Alamat',
      value: identityPemberi?.alamat || '-',
    },
    {
      label: 'Provinsi',
      value: identityPemberi?.provinsi_text || '-',
    },
    {
      label: 'Kabupaten/Kota',
      value: identityPemberi?.kabupaten_text || '-',
    },
    {
      label: 'Kecamatan',
      value: identityPemberi?.kecamatan_text || '-',
    },
    {
      label: 'Kelurahan',
      value: identityPemberi?.kelurahan_text || '-',
    },
    {
      label: 'RT',
      value: identityPemberi?.rt || '-',
    },
    {
      label: 'RW',
      value: identityPemberi?.rw || '-',
    },
    {
      label: 'Kode Pos',
      value: identityPemberi?.kode_pos || '-',
    },
  ];

  const aktaNotarisJaminanFidusia = [
    {
      label: 'Nomor Akta',
      value: informationJaminan?.nomor_akta_notaris || '-',
    },
    {
      label: 'Nama Notaris/Kedudukan',
      value: informationJaminan?.nama_notaris || '-',
    },
    {
      label: 'Tanggal Akta',
      value: informationJaminan?.tgl_akta
        ? dayjs(informationJaminan.tgl_akta).format('DD MMMM YYYY')
        : '-',
    },
  ];

  const informasiPerjanjianPokok = [
    {
      label: 'Nama/Jenis Perjanjian',
      value: informationJaminan?.nama_perjanjian || '-',
    },
    {
      label: 'Nomor Perjanjian',
      value: informationJaminan?.no_perjanjian || '-',
    },
    {
      label: 'Tanggal Perjanjian',
      value: informationJaminan?.tgl_perjanjian || '-',
    },
    {
      label: 'Jangka Waktu Perjanjian',
      value: `${informationJaminan?.tgl_mulai_perjanjian || '-'} s/d ${
        informationJaminan?.tgl_akhir_perjanjian || '-'
      }`,
    },
  ];

  const tabelPerjanjianPokok = informationJaminan?.perjanjian_pokok || [];

  // console.log('objectJaminan', JSON.stringify(objectJaminan, null, 2));

  // const jenisObjekJaminan = [
  //   {
  //     label: 'Kategori Objek',
  //     value: objectJaminan?.[0]?.kategori_obyek || '-',
  //   },
  //   {
  //     label: 'Sub Kategori Objek',
  //     value: objectJaminan?.[0]?.jenis_kategori_obyek || '-',
  //   },
  //   {
  //     label: 'Merk',
  //     value: objectJaminan?.[0]?.value_jenis_kategori?.[0]?.value || '-',
  //   },
  //   {
  //     label: 'Tipe',
  //     value: objectJaminan?.[0]?.value_jenis_kategori?.[0]?.value || '-',
  //   },
  //   {
  //     label: 'Kurs',
  //     value: objectJaminan?.[0]?.kurs || '-',
  //   },
  //   {
  //     label: 'Nominal',
  //     value: objectJaminan?.[0]?.nilai_nominal || '-',
  //   },
  //   {
  //     label: 'Nominal Rupiah',
  //     value: objectJaminan?.[0]?.nilai_nominal_rupiah || '-',
  //   },
  // ];

  // const nilaiPenjaminan = [
  //   {
  //     label: 'Kategori Objek',
  //     value: objectJaminan?.[0]?.kategori_obyek || '-',
  //   },
  // ];

  const tabelNilaiPenjaminan = objectJaminan || [];

  const handleBackStep = (step) => {
    setActiveStep(step);
  };
  return (
    <Row>
      {/* Jenis Pemberi Fidusia */}
      <Col xs="12" md="12" className="mb-4">
        <Header
          label="Jenis Pemberi Fidusia"
          onEdit={() => handleBackStep(1)}
        />
        <Section data={jenisPemberiFidusia} />
      </Col>
      {/* Informasi Pemberi Fidusia */}
      <Col xs="12" md="12" className="mb-4">
        <Header
          label="Informasi Pemberi Fidusia"
          onEdit={() => handleBackStep(1)}
        />
        <Section data={informasiPemberiFidusia} />
      </Col>
      {/* Alamat Pemberi Fidusia */}
      <Col xs="12" md="12" className="mb-4">
        <Header
          label="Alamat Pemberi Fidusia"
          onEdit={() => handleBackStep(1)}
        />
        <Section data={alamatPemberiFidusia} />
      </Col>
      {/* Informasi Penerima Fidusia */}
      <Col xs="12" md="12" className="mb-4">
        <Header
          label="Informasi Penerima Fidusia"
          onEdit={() => handleBackStep(2)}
        />
        <table className="table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>NPWP</th>
              <th>No Telepon</th>
              <th>Jenis Korporasi</th>
            </tr>
          </thead>
          <tbody>
            {identityPenerima?.map((penerima, index) => (
              <tr key={index}>
                <td>{penerima?.nama || '-'}</td>
                <td>{penerima?.npwp || '-'}</td>
                <td>{penerima?.no_tlpon || '-'}</td>
                <td>{penerima?.sub_jenis_korporasi || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Col>
      {/* Akta Notaris Jaminan Fidusia */}
      <Col xs="12" md="12" className="mb-4">
        <Header
          label="Akta Notaris Jaminan Fidusia"
          onEdit={() => handleBackStep(3)}
        />
        <Section data={aktaNotarisJaminanFidusia} col={1} />
      </Col>

      {/* Perjanjian Pokok */}
      <Col xs="12" md="12" className="mb-4">
        <Header label=" Perjanjian Pokok" onEdit={() => handleBackStep(3)} />
        <table className="table">
          <thead>
            <tr>
              <th>Kurs</th>
              <th>Nominal</th>
              <th>Nominal Rupiah</th>
              <th>Sebutan</th>
            </tr>
          </thead>
          <tbody>
            {tabelPerjanjianPokok?.map((item, index) => (
              <tr key={index}>
                <td style={{ width: '5%' }}>{item.kurs || '-'}</td>
                <td>{item.nilai_nominal || '-'}</td>
                <td style={{ width: '30%' }}>
                  Rp {formatCurrency(Number(item.nilai_nominal_rupiah)) || '-'}
                </td>
                <td style={{ width: '40%' }}>
                  {numberToWords(item.nilai_nominal_rupiah) || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Section data={informasiPerjanjianPokok} />
      </Col>
      {/* Jenis Objek Jaminan */}
      <Col xs="12" md="12" className="mb-4">
        <Header label="Jenis Objek Jaminan" onEdit={() => handleBackStep(4)} />
        {/* <Section data={jenisObjekJaminan} /> */}
        <ObjectJaminanTable objectJaminan={fetchedData.objectJaminan} />
      </Col>
      {/* Nilai Penjaminan */}
      <Col xs="12" md="12" className="mb-4">
        <Header label=" Nilai Penjaminan" onEdit={() => handleBackStep(4)} />
        <table className="table">
          <thead>
            <tr>
              <th>Kurs</th>
              <th>Nominal</th>
              <th>Nominal Rupiah</th>
              <th>Sebutan</th>
            </tr>
          </thead>
          <tbody>
            {tabelNilaiPenjaminan?.map((item, index) => (
              <tr key={index}>
                <td style={{ width: '5%' }}>{item.kurs || '-'}</td>
                <td>{item.nilai_nominal || '-'}</td>
                <td style={{ width: '30%' }}>
                  Rp {formatCurrency(Number(item.nilai_nominal_rupiah)) || '-'}
                </td>
                <td style={{ width: '40%' }}>
                  {numberToWords(item.nilai_nominal_rupiah) || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Section data={informasiPerjanjianPokok} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ fontWeight: 500 }}
          >
            Total Nilai Penjaminan
          </Typography>
          <Typography
            variant="h5"
            color="primary"
            sx={{
              fontWeight: 700,
              color: '#041662', // Your primary color
              letterSpacing: '-0.5px',
            }}
          >
            {formattedTotalNominal}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 1.5,
            marginBottom: 1.5,
            paddingTop: 1.5,
            paddingBottom: 1.5,
            borderTop: '1px solid #E5E7EB',
            borderBottom: '1px solid #E5E7EB',
          }}
        >
          <Typography
            variant="body1"
            color="text.primary"
            sx={{ fontWeight: 500 }}
          >
            Harga Voucher
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#12B76A', // Green color for voucher price
              letterSpacing: '-0.5px',
            }}
          >
            Rp {hargaVoucher}
          </Typography>
        </Box>
      </Col>
    </Row>
  );
};

export default KonfirmasiDataDetail;
