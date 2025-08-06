// NotaDinasPDF.js
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import dayjs from "dayjs";
import barcode from "@/assets/logo/barcode ahu.png";
import logo from "@/assets/logo/image 70.png";

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 11,
    lineHeight: 1.6,
    fontFamily: "Helvetica",
    color: "#000",
  },
  logo: {
    width: 100,
    height: 70,
    objectFit: "contain",
    marginBottom: 10,
    alignSelf: "center",
  },
  header: {
    textAlign: "center",
  },
  title: {
    fontSize: 13,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: "#000",
  },
  divider2: {
    marginTop: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  centerBlock: {
    alignItems: "center",
    marginVertical: 30,
  },
  companyName: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 30,
  },
  paragraph: {
    textAlign: "justify",
    marginVertical: 10,
  },
  dateText: {
    marginTop: 80,
    alignSelf: "flex-end",
    marginRight: "-20px",
  },
  barcodeImage: {
    width: 140,
    height: 60,
    objectFit: "contain",
    marginVertical: 10,
    alignSelf: "flex-end",
  },
  signatureBlock: {
    alignSelf: "flex-end",
    width: 240,
  },
  signatureText: {
    textAlign: "right",
    marginRight: "-20px",
  },
});

// Component
const Surat = ({ data }) => {
  const formattedDate = dayjs(data?.tanggalTerbit).format("DD MMMM YYYY");
  const formattedYears = dayjs(data?.tanggalTerbit).format("YYYY");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Logo */}
        <Image src={logo} style={styles.logo} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            KEMENTERIAN HUKUM DAN HAK ASASI MANUSIA REPUBLIK INDONESIA
          </Text>
        </View>

        <View style={styles.divider} />
        <View style={styles.divider2} />

        {/* Title Block */}
        <View style={styles.centerBlock}>
          <Text style={{ fontWeight: "bold" }}>
            SERTIFIKAT PENDAFTARAN PENDIRIAN PERSEROAN PERORANGAN
          </Text>
          <Text>
            Nomor: {data?.nomorSk} Tahun {formattedYears}
          </Text>

          <Text style={styles.companyName}>{data?.namaPerseroan}</Text>
          <Text>Berkedudukan di Kab. {data?.kotaDomisili}</Text>
        </View>

        {/* Body Text */}
        <Text style={styles.paragraph}>
          Telah terdaftar sebagai badan hukum dan tercatat dalam pangkalan data
          Direktorat Jenderal Administrasi Hukum Umum. Sertifikat ini berlaku
          sejak tanggal diterbitkan.
        </Text>

        {/* Date */}
        <View style={styles.dateText}>
          <Text>Jakarta, {formattedDate}</Text>
        </View>

        {/* Barcode */}
        <Image src={data?.qrCodeBase64} style={styles.barcodeImage} />

        {/* Signature */}
        <View style={styles.signatureBlock}>
          <Text style={styles.signatureText}>
            a.n. Menteri Hukum dan Hak Asasi Manusia,
          </Text>
          <Text style={styles.signatureText}>
            Direktur Jenderal Administrasi Hukum Umum
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default Surat;
