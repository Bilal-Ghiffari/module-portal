import { formatCurrency } from '@/helpers/services/handleInput';
import { numberToWords } from '@/utils/currencyIDR';
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import { Col, Row } from 'reactstrap';
import Header from '../../Header';
import Section from './Section';

dayjs.locale('id');

const KonfirmasiDataDetail = ({ formik, setActiveStep }) => {
  // Data dari formik
  const identityPemberi = formik.values.identity_pemberi;
  const identityPenerima = formik.values.identity_penerima || [];
  const informationJaminan = formik.values.information_jaminan || [];
  const objectJaminan = formik.values.object_jaminan || [];

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

  const alamatPemberiFidusia = [
    {
      label: 'Alamat',
      value: identityPemberi?.alamat || '-',
    },
    {
      label: 'Provinsi',
      value: identityPemberi?.provinsi || '-',
    },
    {
      label: 'Kabupaten/Kota',
      value: identityPemberi?.kabupaten || '-',
    },
    {
      label: 'Kecamatan',
      value: identityPemberi?.kecamatan || '-',
    },
    {
      label: 'Kelurahan',
      value: identityPemberi?.kelurahan || '-',
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

  const jenisObjekJaminan = [
    {
      label: 'Kategori Objek',
      value: objectJaminan?.[0]?.kategori_obyek || '-',
    },
    {
      label: 'Sub Kategori Objek',
      value: objectJaminan?.[0]?.jenis_kategori_obyek || '-',
    },
    {
      label: 'Merk',
      value: objectJaminan?.[0]?.value_jenis_kategori?.[0]?.value || '-',
    },
    {
      label: 'Tipe',
      value: objectJaminan?.[0]?.value_jenis_kategori?.[0]?.value || '-',
    },
    {
      label: 'Kurs',
      value: objectJaminan?.[0]?.kurs || '-',
    },
    {
      label: 'Nominal',
      value: objectJaminan?.[0]?.nilai_nominal || '-',
    },
    {
      label: 'Nominal Rupiah',
      value: objectJaminan?.[0]?.nilai_nominal_rupiah || '-',
    },
  ];

  const nilaiPenjaminan = [
    {
      label: 'Kategori Objek',
      value: objectJaminan?.[0]?.kategori_obyek || '-',
    },
  ];

  const tabelNilaiPenjaminan = objectJaminan || [];

  // const handleSubmit = async () => {
  //   try {
  //     setLoadingSubmit(true);
  //     const id_pendaftaran = localStorage.getItem('id_pendaftaran');

  //     // Validasi agreement
  //     const isAllAgreed = objectJaminan.every(
  //       (item) => item.agreement === 'setuju'
  //     );

  //     if (!isAllAgreed) {
  //       formik.setFieldError(
  //         'object_jaminan',
  //         'Semua objek jaminan harus disetujui'
  //       );
  //       setLoadingSubmit(false);
  //       return;
  //     }

  //     // Submit data
  //     const submitResponse = await FidusiaPendaftaranService.submitPendaftaran(
  //       id_pendaftaran,
  //       formik.values
  //     );

  //     // Handle success
  //     // Misalnya:
  //     // - Tampilkan notifikasi
  //     // - Redirect ke halaman berikutnya
  //   } catch (error) {
  //     console.error('Error submitting data:', error);
  //     // Handle error
  //   } finally {
  //     setLoadingSubmit(false);
  //   }
  // };

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
        <Section data={jenisObjekJaminan} />
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
      </Col>
    </Row>
  );
};

export default KonfirmasiDataDetail;
