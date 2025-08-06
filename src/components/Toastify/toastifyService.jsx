import Swal from 'sweetalert2';

const deleteCookie = (cookieName) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export class ToastifyService {
  confirmSubmit = (text, cnfText = 'Kirim') => {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Perhatian !!',
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2A3042',
        cancelButtonColor: '#A8A8A8',
        confirmButtonText: `<span id="btn-confirm">${cnfText}</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  required = (teks) => {
    Swal.fire({
      icon: 'warning',
      title: 'Perhatian',
      html: `${teks}`,
      confirmButtonText: `<span id="btn-confirm">OK</span>`,
    });
  };

  showLoading = () => {
    Swal.fire({
      title: 'Memuat',
      html: 'Harap Tunggu...',
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };
  customShowLoading = ({ title, msg }) => {
    Swal.fire({
      title: title || 'Memuat',
      html: msg || 'Harap Tunggu...',
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  loadingSendData = () => {
    Swal.fire({
      title: 'Mengirim Data',
      html: 'Harap Tunggu...',
      backdrop: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };
  redirectSSO = () => {
    Swal.fire({
      title: 'Memuat',
      html: 'Proses Login SSO....',
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  close = () => Swal.close();

  info = (text, text2) => {
    Swal.fire({
      title: 'Perhatian !',
      html: `${text} ${
        text2 ? `<br><strong style="font-size: 18px;">${text2}</strong>` : ''
      }`,
      icon: 'warning',
    });
  };

  confirmationCreate = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Apakah Anda Yakin ?',
        text: 'Data Yang Anda Masukan Akan Dikirim',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2A3042',
        cancelButtonColor: '#A8A8A8',
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationCustom = (title, text) => {
    return new Promise((resolve) => {
      Swal.fire({
        title: `${title} ?`,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2A3042',
        cancelButtonColor: '#A8A8A8',
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationDownloadData = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Apakah Anda Yakin ?',
        text: 'Data Akan Terunduh ke Excel',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2A3042',
        cancelButtonColor: '#A8A8A8',
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationDelete = () => {
    return new Promise((resolve) => {
      Swal.fire({
        // confirmation before data deleted
        title: 'Apakah Anda Yakin ?',
        text: 'Data Anda Akan Dihapus !!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2A3042',
        cancelButtonColor: '#A8A8A8',
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  confirmationUpdate = () => {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Apakah Anda Yakin ?',
        text: 'Data Anda Sebelumnya akan Diperbaharui',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2A3042',
        cancelButtonColor: '#A8A8A8',
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  customWarningMsg = (msg) => {
    Swal.fire({
      title: 'Perhatian !',
      text: msg,
      icon: 'warning',
    });
  };

  customSuccessMsg = (msg) => {
    Swal.fire({
      title: 'Berhasil !',
      text: msg,
      icon: 'success',
    });
  };
  customWarningMsgWBackdrop = (msg) => {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Perhatian !',
        text: msg,
        icon: 'warning',
        backdrop: true, // Mengaktifkan backdrop
        allowOutsideClick: false, // Mencegah klik di luar untuk menutup
        allowEscapeKey: false, // Mencegah menutup dengan tombol escape
        confirmButtonText: 'OK', // Tombol konfirmasi
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true); // Mengembalikan true jika tombol OK ditekan
        } else {
          resolve(false); // Mengembalikan false jika modal ditutup dengan cara lain
        }
      });
    });
  };

  customConfirmation = (msg) => {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Apakah Anda Yakin ?',
        text: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#2A3042',
        cancelButtonColor: '#A8A8A8',
        confirmButtonText: `<span id="btn-confirm">Saya Yakin !</span>`,
        cancelButtonText: `<span id="btn-cancel">Batalkan</span>`,
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  };

  successUpdate = () => {
    Swal.fire({
      title: 'Sukses',
      text: 'Data Anda Berhasil Terupdate',
      icon: 'success',
    });
  };
}
