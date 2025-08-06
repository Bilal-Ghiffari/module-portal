export const getVerifikator = (status_aktivitas) => {
  // 'Pembelian voucher' -> 0
  // 'Pendaftaran permohonan' -> 1
  // 'Verifikasi oleh Konseptor' -> 2
  // 'Verifikasi oleh Subkoordinator' -> 3
  // 'Verifikasi oleh Koordinator' -> 4
  // 'Verifikasi oleh Direktur' -> 5
  // 'SK Terbit' -> 6

  let verifikator;

  switch (status_aktivitas) {
    case 0:
      verifikator = "Pembelian Voucher";
      break;
    case 1:
      verifikator = "Pendaftaran Permohonan";
      break;
    case 2:
      verifikator = "konseptor";
      break;
    case 3:
      verifikator = "sub-koordinator";
      break;
    case 4:
      verifikator = "koordinator";
      break;
    case 5:
      verifikator = "direktur";
      break;
    case 6:
      verifikator = "SK Terbit";
      break;
    default:
      verifikator = "Status tidak dikenali";
  }

  return verifikator;
};
