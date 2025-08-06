import { toast } from 'react-toastify';

export const loadingMsg = () => {
  toast.dismiss();
  toast.loading('Please wait...');
};

export const successMsg = (msg) => {
  toast.dismiss();
  toast.success(msg, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
  });
};
export const warningMsg = (msg) => {
  toast.dismiss();
  toast.warning(msg, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
  });
};

export const errorMsg = (err, defaultMsg = 'Internal Server Error') => {
  toast.dismiss();
  if (err.response?.data?.status === 401) {
    toast.error('Token Anda Sudah Kadaluarsa, Harap Login Ulang');
    setTimeout(() => {
      return (window.location.href = '/logout');
    }, 1000);
  } else {
    toast.error(`${err.response?.data?.message || defaultMsg} ${err.response?.data?.error ? `- ${err.response?.data?.error}` : ''} `);
  }
};

export const dismissLoadingMsg = (toastId) => {
  // Dismiss the toast with the given ID
  toast.dismiss(toastId);
};
