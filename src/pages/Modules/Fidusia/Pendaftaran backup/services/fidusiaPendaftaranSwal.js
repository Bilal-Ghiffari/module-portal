import Swal from 'sweetalert2';

export const FidusiaPendaftaranSwal = {
  async checkExistingPendaftaran({ formik, setActiveStep, setLoading }) {
    const id_pendaftaran = localStorage.getItem('id_pendaftaran');

    // Jika tidak ada ID Pendaftaran, lanjutkan
    if (!id_pendaftaran) {
      this.startNewPendaftaran(formik, setActiveStep);
      return;
    }

    try {
      setLoading(true);

      // Konfirmasi melanjutkan atau buat baru
      const result = await this.confirmContinueOrNew(id_pendaftaran, formik);

      if (result) {
        setActiveStep((prevStep) => prevStep + 1);
      }
    } catch (error) {
      console.error('Error checking pendaftaran:', error);
      this.showErrorAlert('Gagal memeriksa pendaftaran. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  },

  async confirmContinueOrNew(id_pendaftaran, formik) {
    return new Promise((resolve) => {
      Swal.fire({
        title: 'Pendaftaran Existing Ditemukan',
        text: 'Ada pendaftaran yang sedang berlangsung. Apa yang ingin Anda lakukan?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Lanjutkan Pendaftaran',
        cancelButtonText: 'Buat Pendaftaran Baru',
        reverseButtons: true,
        customClass: {
          popup: 'custom-swal-popup',
          title: 'custom-swal-title',
          content: 'custom-swal-content',
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          // Lanjutkan pendaftaran existing
          await this.loadExistingPendaftaran(id_pendaftaran, formik);
          resolve(true);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Buat pendaftaran baru
          this.startNewPendaftaran(formik);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  },

  async loadExistingPendaftaran(id_pendaftaran, formik) {
    try {
      this.showSuccessAlert('Berhasil memuat data pendaftaran sebelumnya');
    } catch (error) {
      console.error('Error loading existing pendaftaran:', error);
      this.showErrorAlert('Gagal memuat data pendaftaran');
    }
  },

  startNewPendaftaran(formik, setActiveStep) {
    // Hapus ID Pendaftaran dari localStorage
    localStorage.removeItem('id_pendaftaran');
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    // Set semua value formik menjadi kosong
    formik.setValues({
      identity_pemberi: {},
      identity_penerima: [],
      information_jaminan: {},
      object_jaminan: [],
    });

    this.showInfoAlert('Memulai pendaftaran baru');
  },

  // Utility methods for alerts
  showSuccessAlert(message) {
    Swal.fire({
      icon: 'success',
      title: 'Sukses',
      text: message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  },

  showErrorAlert(message) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  },

  showInfoAlert(message) {
    Swal.fire({
      icon: 'info',
      title: 'Informasi',
      text: message,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  },
};

export default FidusiaPendaftaranSwal;
