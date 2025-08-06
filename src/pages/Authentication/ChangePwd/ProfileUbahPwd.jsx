import { useEffect } from 'react';
import { Container } from 'reactstrap';

import { UbahPwd } from './UbahPwd';
import { useDispatch } from 'react-redux';
import { changeBreadcrumb } from '@/store/actions';

const breadCrumb = [
  { link: '/', label: 'Beranda' },
  { link: '#', label: 'Ubah Password' },
];

const ProfileUbahPwd = () => {
  document.title = 'Profil Ubah Password | AHU RI';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeBreadcrumb(breadCrumb));
  }, []);

  return (
    <Container fluid={true} className="page-content px-3 pt-3">
      <div className="mb-3">
        <h1 className="text-primary fs-4 fw-bold text-uppercase m-0">Ubah Kata Sandi</h1>
      </div>
      <UbahPwd />
    </Container>
  );
};

export default ProfileUbahPwd;
