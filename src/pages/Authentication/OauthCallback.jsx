import { ToastifyService } from '@/components/Toastify/toastifyService';
import { setAxiosAuthorization } from '@/helpers/api_helper';
import { apiPostOauthSSO } from '@/helpers/backend_helper';
import { errorMsg } from '@/helpers/Notification/toastNotification';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

const OauthCallback = () => {
  const toastifyService = new ToastifyService();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const postData = async (payload) => {
    try {
      const res = await apiPostOauthSSO(payload);
      localStorage.setItem('userSession', JSON.stringify(res.data));
      Cookies.set('userSession', JSON.stringify(res.data));
      setAxiosAuthorization(res?.data?.token);
      navigate('/profile');
    } catch (error) {
      navigate('/login');
      errorMsg(error);
    } finally {
      toastifyService.close();
    }
  };

  useEffect(() => {
    // Convert query params to an object
    const params = {};
    queryParams.forEach((value, key) => {
      params[key] = value;
    });

    console.log('parameter didapat: ', params); // Logs all parameters as an object
    postData(params);
    toastifyService.redirectSSO();
  }, []);
  return <></>;
};
export default OauthCallback;
