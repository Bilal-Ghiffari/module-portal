import { Container } from 'reactstrap';

const PageOnProgress = () => {
  return (
    <Container fluid className="page-content">
      <div className="w-100 d-flex align-items-center justify-content-center flex-column" style={{ height: 'calc(100vh - 300px)' }}>
        <i className="dripicons-broadcast text-secondary text-opacity-50" style={{ fontSize: '4rem' }} />
        <div className="fs-1 fw-semibold text-secondary text-opacity-50">Halaman Masih Dalam Pengembangan</div>
      </div>
    </Container>
  );
};
export default PageOnProgress;
