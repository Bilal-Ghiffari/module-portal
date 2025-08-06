export const getVerifikator = (status_aktivitas) => {
  let verifikator;

  switch (status_aktivitas) {
    case 0:
      verifikator = "Pembelian Voucher";
      break;
    case 1:
      verifikator = "Pendaftaran Permohonan";
      break;
    case 2:
      verifikator = "PBK";
      break;
    case 3:
      verifikator = "FU";
      break;
    case 4:
      verifikator = "Kasi";
      break;
    case 5:
      verifikator = "Kasubdit";
      break;
    case 6:
      verifikator = "Direktur";
      break;
    case 7:
      verifikator = "SK Terbit";
      break;
    default:
      verifikator = "Status tidak dikenali";
  }

  return verifikator;
};
