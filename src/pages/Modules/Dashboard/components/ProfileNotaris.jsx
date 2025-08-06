import { RiInfoCardLine } from 'react-icons/ri';
import { FaRegUserCircle } from 'react-icons/fa';

const InfoItem = ({ label, value }) => (
  <tr className="border-bottom border-white-50">
    <td className="py-1 pe-3 fw-medium text-nowrap small">{label}</td>
    <td className="py-1 small">{value || '-'}</td>
  </tr>
);

const Section = ({ title, children }) => (
  <div className="mb-4">
    <div className="d-flex align-items-center mb-2 bg-primary p-2 rounded">
      <div className="bg-warning p-1 rounded me-2">
        <RiInfoCardLine size={16} />
      </div>
      <h2 className="fs-6 fw-bold text-warning mb-0">{title}</h2>
    </div>
    {children}
  </div>
);

const DocPreview = ({ title, src }) => (
  <div className="text-center" style={{ width: '8rem' }}>
    <p className="small fw-medium mb-1">{title}</p>
    <img src={src} alt={title} className="img-fluid border border-secondary rounded shadow-sm" />
  </div>
);

const DetailNotaris = ({ detail }) => (
  <div
    className="p-0 text-white"
    style={{ minHeight: '97vh', maxHeight: '97vh', overflowY: 'auto' }}>
    {/* Header */}
    <div className="d-flex align-items-center mb-2 bg-primary p-2 rounded">
      <div className="bg-warning p-1 rounded me-2">
        <FaRegUserCircle size={16} />
      </div>
      <h2 className="fs-6 fw-bold text-warning mb-0">Profile Notaris</h2>
    </div>

    {/* Foto dan Identitas */}
    <div className="d-flex flex-column gap-3 mb-4 px-3">
      <div className="d-flex justify-content-center align-items-center">
        {detail?.FOTO ? (
          <img
            width={144}
            height={144}
            src={detail?.FOTO}
            alt={`Foto ${detail?.NAMA_LENGKAP}`}
            className="rounded object-fit-cover border border-secondary shadow"
          />
        ) : (
          <div
            className="bg-light text-center d-flex justify-content-center align-items-center rounded border border-secondary shadow"
            style={{ width: 144, height: 144 }}>
            <p className="text-muted small mb-0">Tidak ada foto</p>
          </div>
        )}
      </div>

      <table className="table table-sm text-white">
        <tbody>
          <InfoItem label="Nama Lengkap" value={detail?.NAMA_LENGKAP} />
          <InfoItem label="Nama Kecil" value={detail?.NAMA_KECIL} />
          <InfoItem label="Alias" value={detail?.ALIAS} />
          <InfoItem
            label="Tempat, Tanggal Lahir"
            value={`${detail?.TEMPAT_LAHIR}, ${detail?.TGL_LAHIR?.split(' ')[0]}`}
          />
          <InfoItem
            label="Jenis Kelamin"
            value={detail?.JENIS_KELAMIN === '1' ? 'Laki-laki' : 'Perempuan'}
          />
          <InfoItem label="Alamat" value={detail?.ALAMAT_JALAN} />
        </tbody>
      </table>
    </div>

    {/* Surat Keputusan */}
    <div className="px-3">
      <Section title="Surat Keputusan">
        <table className="table table-sm text-white">
          <tbody>
            <InfoItem label="NO SK Kehakiman" value={detail?.NO_SK_KEHAKIMAN ?? '-'} />
            <InfoItem label="Tanggal SK Kehakiman" value={detail?.TGL_SK_KEHAKIMAN ?? '-'} />
            <InfoItem label="NO SK Pelantikan" value={detail?.NO_SK_PELANTIKAN} />
            <InfoItem label="Tanggal SK Pelantikan" value={detail?.TGL_SK_PELANTIKAN} />
            <InfoItem label="NO SK Pengangkatan" value={detail?.NO_SK_PENGANGKATAN} />
            <InfoItem label="Tanggal SK Pengangkatan" value={detail?.TGL_SK_PENGANGKATAN} />
            <InfoItem label="Kota SK" value={detail?.KOTA_SK ?? '-'} />
            <InfoItem label="Provinsi Penempatan" value={detail?.NAMA_PROVINSI_PENEMPATAN} />
            <InfoItem label="Kabupaten Penempatan" value={detail?.NAMA_KABUPATEN_PENEMPATAN} />
            <InfoItem
              label="Status Notaris"
              value={detail?.STATUS === 1 ? 'Aktif' : 'Tidak Aktif'}
            />
          </tbody>
        </table>
      </Section>
    </div>

    {/* Kontak */}
    <div className="px-3">
      <Section title="Kontak">
        <table className="table table-sm text-white">
          <tbody>
            <InfoItem label="Nomor Handphone" value={detail?.NO_HP} />
            <InfoItem label="Telepon Rumah/Kantor" value={detail?.NO_TELP} />
            <InfoItem label="Email Utama" value={detail?.EMAIL} />
            <InfoItem label="Email Alternatif" value={detail?.EMAIL_ALTERNATIF} />
          </tbody>
        </table>
      </Section>
    </div>
  </div>
);
export default DetailNotaris;
