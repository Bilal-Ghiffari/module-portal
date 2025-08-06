import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import SertifikatPDF from "./SertifikatPDF";

const Sertifikat = ({ name }) => {
  return (
    <div>
      <PDFViewer width="100%" height="800px" className="mb-4">
        <SertifikatPDF />
      </PDFViewer>
      <PDFDownloadLink
        document={<SertifikatPDF />}
        fileName={`Sertifikat Apostille - ${name}.pdf`}
        className="bg-primary"
        style={{
          padding: 8,
          marginTop: "100px",
          color: "#fff",
          borderRadius: 4,
          textDecoration: "none",
          fontSize: 12,
        }}
      >
        {({ loading }) =>
          loading ? "Mempersiapkan dokumen..." : "Download Sertifikat"
        }
      </PDFDownloadLink>
    </div>
  );
};

export default Sertifikat;
