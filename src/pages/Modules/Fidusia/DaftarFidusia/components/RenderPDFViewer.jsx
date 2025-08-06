import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import SertifikatPDF from './Sertifikat';

const RenderPDFViewer = ({ actionType, currentRow }) => {
  const renderActionComponent = () => {
    switch (actionType) {
      case 'sertifikat':
        return <SertifikatPDF data={currentRow} />;
      case 'riwayat':
        return <SertifikatPDF data={currentRow} />;
      case 'lampiran':
        return <SertifikatPDF data={currentRow} />;
      case 'pernyataan':
        return <SertifikatPDF data={currentRow} />;
      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <PDFDownloadLink
        document={<SertifikatPDF data={currentRow} />}
        fileName={`Sertifikat Apostille - ${actionType}.pdf`}
        style={styles.downloadLink}
      >
        {({ loading }) =>
          loading ? 'Mempersiapkan dokumen...' : 'Download Sertifikat'
        }
      </PDFDownloadLink>
      <div style={styles.viewerWrapper}>
        <PDFViewer width="100%" height="100%">
          {renderActionComponent()}
        </PDFViewer>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    padding: '16px',
    backgroundColor: '#f5f5f5', // or any desired background color
  },
  downloadLink: {
    padding: '8px',
    marginBottom: '16px',
    backgroundColor: 'blue', // customize as needed
    color: '#fff',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '12px',
  },
  viewerWrapper: {
    height: '800px', // Adjust height as necessary
    overflowY: 'auto', // Allows scrolling when content overflows
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // Internet Explorer and Edge
  },
  // For WebKit Browsers
  '@media screen and (min-width: 1px)': {
    '.viewerWrapper::-webkit-scrollbar': {
      display: 'none',
    },
  },
};

export default RenderPDFViewer;

// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
// import SertifikatPDF from './Sertifikat';

// const RenderPDFViewer = ({ actionType, currentRow }) => {
//   console.log('actionType', actionType);
//   console.log('currentRow', currentRow);
//   const renderActionComponent = () => {
//     switch (actionType) {
//       case 'sertifikat':
//         return <SertifikatPDF data={currentRow} />;
//       case 'riwayat':
//         return <SertifikatPDF data={currentRow} />;
//       case 'lampiran':
//         return <SertifikatPDF data={currentRow} />;
//       case 'pernyataan':
//         return <SertifikatPDF data={currentRow} />;
//       default:
//         return null;
//     }
//   };
//   return (
//     <div>
//       <PDFDownloadLink
//         document={<SertifikatPDF />}
//         fileName={`Sertifikat Apostille - ${actionType}.pdf`}
//         className="bg-primary"
//         style={{
//           padding: 8,
//           marginBottom: '100px',
//           color: '#fff',
//           borderRadius: 4,
//           textDecoration: 'none',
//           fontSize: 12,
//         }}
//       >
//         {({ loading }) =>
//           loading ? 'Mempersiapkan dokumen...' : 'Download Sertifikat'
//         }
//       </PDFDownloadLink>
//       <PDFViewer width="100%" height="800px" className="mb-4">
//         {/* <SertifikatPDF /> */}
//         {renderActionComponent()}
//       </PDFViewer>
//     </div>
//   );
// };

// export default RenderPDFViewer;
