import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

import logo from "@/assets/logo/image 70.png"; // Logo Pengayoman
import qr from "@/assets/logo/barcode ahu.png"; // QR Code
import signature from "@/assets/ahu/signature.png";

// =======================
// Styles
// =======================
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10.5,
    fontFamily: "Helvetica",
    position: "relative",
  },
  borderBoxParent: {
    border: "1px solid #999",
    padding: 20,
    position: "relative",
  },
  borderBox: {
    border: "1px solid #999",
    borderRadius: 10,
    padding: 20,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerItem: {
    width: 60,
    alignItems: "center",
  },
  headerCenter: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  mainTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
  },
  subText: {
    fontSize: 10,
    textAlign: "center",
  },
  logo: {
    width: 50,
    height: 50,
  },
  qr: {
    width: 50,
    height: 50,
  },
  titleBlock: {
    textAlign: "center",
    marginBottom: 20,
  },
  apostilleText: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
    fontSize: 9,
    fontWeight: 300,
  },
  structuredRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  structuredNumber: {
    width: 22,
    fontWeight: "bold",
    fontSize: 10.5,
    lineHeight: 1.6,
  },
  structuredTextBlock: {
    flex: 1,
  },
  structuredIndo: {
    fontSize: 10.5,
    fontWeight: "bold",
    marginBottom: 1,
    lineHeight: 1.4,
  },
  structuredEng: {
    fontSize: 9.5,
    fontStyle: "italic",
    color: "#444",
    lineHeight: 1.4,
  },
  centeredRow: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    textAlign: "center",
  },
  rowPair: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24,
    marginBottom: 20,
  },
  pairBlock: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
  },
  rightAligned: {
    justifyContent: "flex-end",
  },
  labelBlock: {
    flexShrink: 1,
  },
  bold: {
    fontWeight: "bold",
  },
  signatureBlock: {
    alignItems: "flex-end",
    textAlign: "right",
  },
  signatureImg: {
    width: 100,
    height: 50,
  },
  footerNote: {
    borderTop: "1px solid #000",
    marginTop: 15,
    paddingTop: 5,
    fontSize: 8,
    textAlign: "justify",
  },
  watermark: {
    position: "absolute",
    fontSize: 60,
    color: "#cccccc",
    rotate: "-45deg",
    top: "35%",
    left: "15%",
    opacity: 0.3,
    fontWeight: "bold",
  },
});

// =======================
// Data
// =======================
const dataPoints = [
  { no: 1, indo: "Negara Republik Indonesia", eng: "Republic Of Indonesia" },
  { no: " ", indo: "Dokumen publik ini", eng: "This public document" },
  {
    no: 2,
    indo: "telah di tandatangani oleh Bachrudin",
    eng: "has been signed by Bachrudin",
  },
  {
    no: 3,
    indo: "bertindak dalam kewenangan sebagai Kapolseklt Mlati",
    eng: "acting in the capacity of Kapolseklt Mlati",
  },
  {
    no: 4,
    indo: "dibubuhi segel/cap Instansi Testing",
    eng: "bears the seal/stamp of Instansi Testing",
  },
  { no: " ", indo: "Disahkan", eng: "Certified" },
  { no: 5, indo: "di Jakarta", eng: "at Jakarta" },
  {
    no: 6,
    indo: "tanggal 15 Agustus 2024",
    eng: "the 15th day of August 2024",
  },
  {
    no: 7,
    indo: "oleh Direktur Otoritas Pusat dan Hukum Internasional",
    eng: "by Director of Central Authority and International Law",
  },
  {
    no: 8,
    indo: "Nomor AHU.AH.12.05.01-39 Tahun 2024",
    eng: "No AHU.AH.12.05.01-39 Tahun 2024",
  },
  { no: 9, indo: "Segel/Cap", eng: "Seal/stamp" },
  { no: 10, indo: "Tanda Tangan", eng: "Signature" },
];

// =======================
// Component
// =======================
const ApostillePDF = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        {/* <Text style={styles.watermark}>CONTOH</Text> */}

        <View style={styles.borderBoxParent}>
          {/* === Header === */}
          <View style={styles.header}>
            <View style={styles.headerItem}>
              <Image src={logo} style={styles.logo} />
            </View>
            <View style={styles.headerCenter}>
              <Text style={styles.mainTitle}>
                KEMENTERIAN HUKUM REPUBLIK INDONESIA
              </Text>
              <Text style={styles.subText}>
                Ministry of Law Republic of Indonesia
              </Text>
            </View>
            <View style={styles.headerItem}>
              <Image src={qr} style={styles.qr} />
            </View>
          </View>

          {/* === Main Box === */}
          <View style={styles.borderBox}>
            {/* Title */}
            <View style={styles.titleBlock}>
              <Text style={styles.apostilleText}>APOSTILLE</Text>
              <Text style={styles.italic}>
                (Convention de La Haye du 5 octobre 1961)
              </Text>
            </View>

            {/* Structured Data */}
            {dataPoints.map((item, idx) => {
              if ([5, 9].includes(item.no)) {
                const nextItem = dataPoints[idx + 1];
                return (
                  <View style={styles.rowPair} key={idx}>
                    {/* Left Item */}
                    <View style={styles.pairBlock}>
                      <Text style={styles.structuredNumber}>{item.no}.</Text>
                      <View style={styles.labelBlock}>
                        <Text style={styles.structuredIndo}>{item.indo}</Text>
                        <Text style={styles.structuredEng}>{item.eng}</Text>
                      </View>
                    </View>
                    {/* Right Item */}
                    <View style={[styles.pairBlock, styles.rightAligned]}>
                      <Text style={styles.structuredNumber}>
                        {nextItem.no}.
                      </Text>
                      <View style={styles.labelBlock}>
                        <Text style={styles.structuredIndo}>
                          {nextItem.indo}
                        </Text>
                        <Text style={styles.structuredEng}>{nextItem.eng}</Text>
                      </View>
                    </View>
                  </View>
                );
              }

              if ([6, 10].includes(item.no)) return null;

              if (item.no === " ") {
                return (
                  <View style={styles.centeredRow} key={idx}>
                    <Text style={styles.structuredIndo}>{item.indo}</Text>
                    <Text style={styles.structuredEng}>{item.eng}</Text>
                  </View>
                );
              }

              return (
                <View style={styles.structuredRow} key={idx}>
                  <Text style={styles.structuredNumber}>{item.no}.</Text>
                  <View style={styles.structuredTextBlock}>
                    <Text style={styles.structuredIndo}>{item.indo}</Text>
                    <Text style={styles.structuredEng}>{item.eng}</Text>
                  </View>
                </View>
              );
            })}

            {/* === Signature Block === */}
            <View style={styles.signatureBlock}>
              <Image src={signature} style={styles.signatureImg} />
              <Text style={styles.bold}>Tudiono, S.H, M.P.P.</Text>
              <Text>Direktur Otoritas Pusat dan Hukum Internasional</Text>
            </View>
          </View>

          {/* === Footer Note === */}
          <Text style={styles.footerNote}>
            SERTIFIKAT APOSTILLE INI HANYA MENYATAKAN KEASLIAN TANDA TANGAN,
            KEWENANGAN PENANDA TANGAN DOKUMEN, DAN JIKA ADA, IDENTITAS SEGEL
            ATAU CAP YANG DILEKATKAN DI ATASNYA.{" "}
            <Text style={styles.italic}>
              THIS APOSTILLE CERTIFICATE ONLY CERTIFIES THE AUTHENTICITY OF THE
              SIGNATURE AND THE CAPACITY OF THE PERSON WHO HAS SIGNED THE PUBLIC
              DOCUMENT, AND, WHERE APPROPRIATE, THE IDENTITY OF THE SEAL OR
              STAMP WHICH THE PUBLIC DOCUMENT BEARS.
            </Text>
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default ApostillePDF;
