import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

import logo from '@/assets/logo/image 70.png'; // Logo Pengayoman
import qr from '@/assets/logo/barcode ahu.png'; // QR Code
import signature from '@/assets/ahu/signature.png';

// =======================
// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center', // Vertically center logo and text
    padding: 10, // Optional padding for the header
  },
  logo: {
    width: 60, // Adjust logo size as needed
    height: 60,
    marginRight: 20, // Space between logo and text
  },
  textContainer: {
    flex: 1, // Allow the text container to grow and take available space
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5, // Add space between text
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 3, // Space between subtitles
  },
  entry: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 3, // Space for entry text
  },
  sectionContainer: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
    // marginBottom: 2, // Mengurangi jarak bawah
    padding: 5,
    // border: '1px 0xp 0px 1px solid #000',
  },

  sectionTitle: {
    // fontWeight: 'bold',
    // fontSize: 12,
    textAlign: 'center',
    // marginBottom: 2, // Mengurangi jarak bawah
    padding: 5,
    border: '1px 0xp 0px 1px solid #000',
  },
  table: {
    borderWidth: 1,
    borderColor: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  label: {
    fontWeight: 'bold',
    width: '50%', // Set width untuk label
  },
  value: {
    width: '50%', // Set width untuk nilai
  },
  rowSection: {
    padding: 5,
    border: '1px 0xp 0px 1px solid #000',
  },

  footerNote: {
    marginTop: 20,
    borderTop: '1px solid #000',
    paddingTop: 5,
    fontSize: 8,
    textAlign: 'justify',
  },
  qrContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Menempatkan QR code di sebelah kiri
    marginTop: 20, // jarak bawah untuk signature
  },
  qr: {
    height: 80,
    width: 80,
  },
  signatureContainer: {
    marginTop: 20,
    alignItems: 'flex-end', // Misalkan Anda ingin menempatkan semuanya di tengah
  },
  signatureTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  signatureSubtitle: {
    marginBottom: 5,
  },
  signatureLabel: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  signature: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
});

const data = {
  id_pendaftaran: 10,
  id_notaris: 1910,
  jenis_transaksi: 'pendaftaran',
  nama_pemberi: 'fafa',
  alamat_pemberi: 'blaaaaa',
  nama_penerima: 'fasf',
  alamat_penerima: 'blaaaa',
  nomor_sertifikat: 'EX/FIDUSIA/PENDAFTARAN/10/2025',
  tgl_terbit: '2025-07-29',
  no_akta: '222222',
  nama_notaris: ' Maria Susanti, SH.',
  wilayah_notaris: 'DKI Jakarta',
  nilai_jaminan: 10000000,
  tgl_jatuh_tempo: '2025-07-29',
  jangka_waktu_perjanjian: 12,
  nilai_penjaminan: 10000000,
};

// SertifikatPDF Component
const SertifikatPDF = ({}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* === Header === */}
        {/* === Header === */}
        <View style={styles.header}>
          <Image src={logo} style={styles.logo} />
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              KEMENTERIAN HUKUM REPUBLIK INDONESIA
            </Text>
            <Text style={styles.subtitle}>KANTOR WILAYAH KALIMANTAN BARAT</Text>
            <Text style={styles.subtitle}>
              KANTOR PENDAFTARAN JAMINAN FIDUSIA
            </Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.title}>SERTIFIKAT JAMINAN FIDUSIA</Text>
          <Text style={styles.entry}>NOMOR : {data.nomor_sertifikat}</Text>
          <Text style={styles.entry}>
            TANGGAL : {data.tgl_terbit} JAM : 00:00:00
          </Text>
          <Text style={styles.entry}>DEMI KEADILAN</Text>
          <Text style={styles.entry}>BERDASARKAN KETUHANAN YANG MAHA ESA</Text>
        </View>

        <Text style={styles.sectionTitle}>PEMBERI FIDUSIA</Text>
        <View style={[styles.table, { borderWidth: 1, borderColor: 'black' }]}>
          <Text style={styles.row}>Nama : {data.nama_pemberi}</Text>
          <Text style={styles.row}>Alamat : {data.alamat_pemberi}</Text>
        </View>

        {/* === Penerima Fidusia === */}
        <Text style={styles.sectionTitle}>PENERIMA FIDUSIA</Text>
        <View style={[styles.table, { borderWidth: 1, borderColor: 'black' }]}>
          <Text style={styles.row}>Nama : {data.nama_penerima}</Text>
          <Text style={styles.row}>Alamat : {data.alamat_penerima}</Text>
        </View>

        {/* === Jaminan Fidusia === */}
        <Text style={styles.sectionTitle}>JAMINAN FIDUSIA</Text>
        <View style={[styles.table, { borderWidth: 1, borderColor: 'black' }]}>
          <Text style={styles.rowSection}>
            Jaminan Fidusia ini diberikan untuk menjamin pelunasan utang PEMBERI
            FIDUSIA sejumlah Rp. {data.nilai_jaminan} (satu juta lima ratus ribu
            rupiah).
          </Text>
          <Text style={styles.rowSection}>
            Berdasarkan perjanjian pinjaman dengan Nomor entah dan Tanggal
            {data.tgl_perjanjian}.
          </Text>
          <Text style={styles.rowSection}>
            Dengan jangka waktu perjanjian {data.jangka_waktu}.
          </Text>
          <Text style={styles.rowSection}>
            Dengan nilai penjaminan sejumlah Rp {data.nilai_penjaminan} (lima
            ratus empat puluh juta rupiah).
          </Text>
          <Text style={styles.rowSection}>
            Obyek Jaminan Fidusia sesuai yang tertuang dalam Akta nomor
            {data.no_akta}, tanggal {data.tgl_perjanjian} yang dibuat Notaris
            {data.nama_notaris} berkedudukan di {data.wilayah_notaris}.
          </Text>
        </View>

        {/* === Footer Note === */}
        <Text style={styles.footerNote}>
          Sertifikat Jaminan Fidusia ini diproses melalui Online System yang
          Aplikasinya diisi oleh Pemohon. Apabila dikemudian hari format isian
          tidak sesuai dengan data yang sebenarnya, maka Pemohon dapat menerima
          sanksi sesuai dengan peraturan perundang-undangan.
        </Text>
      </Page>

      {/* === Keterangan Obyek di Halaman Kedua === */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>
          KETERANGAN OBYEK JAMINAN FIDUSIA
        </Text>

        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.label}>Kategori Obyek:</Text>
            <Text style={styles.value}>Obyek Berserial Nomor (Hak Cipta)</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>
              Nomor Sertifikat Pencatatan Ciptaan:
            </Text>
            <Text style={styles.value}>ciptain apa ajh</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Bukti Obyek:</Text>
            <Text style={styles.value}>g ada</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Nilai Obyek:</Text>
            <Text style={styles.value}>IDR 2.000.000,00 (dua juta rupiah)</Text>
          </View>
        </View>

        {/* === QR Code Positioned on the Left === */}
        <View style={styles.qrContainer}>
          <Image src={qr} style={styles.qr} />
          <View style={styles.signatureContainer}>
            <Text style={styles.signatureTitle}>a.n. MENTERI HUKUM</Text>
            <Text style={styles.signatureSubtitle}>REPUBLIK INDONESIA</Text>
            <Text style={styles.signatureSubtitle}>
              u.b. KEPALA KANTOR WILAYAH KALIMANTAN BARAT
            </Text>
            <Text style={styles.signatureLabel}>TTD</Text>
            <View style={styles.signature}>
              <Image src={signature} style={{ width: 100, height: 50 }} />
              <Text>Dr. HARNIATI, S.H., LLM.</Text>
              <Text>(196805301998032001)</Text>
            </View>
          </View>
        </View>

        {/* === Signature Section === */}
      </Page>
    </Document>
  );
};

export default SertifikatPDF;
