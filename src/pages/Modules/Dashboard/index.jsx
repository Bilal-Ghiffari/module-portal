import {
  
  Col,
  Container,
  Row,
} from 'reactstrap';
import WelcomeComp from './WelcomeComp';
import TableListNew from '@/components/Common/TableListNew';
import { useState } from 'react';
import { dummyData } from './dummy';
import CardCustomSA from '@/components/Common/CardCustomSA';
import RunningText from './RunningText';
import Breadcrumb from '@/components/Common/Breadcrumb';
import FAQ from './components/Faq';
import Calendar from './Calendar/index';
import { getUserDetail } from '@/helpers/services/getStorage';

const breadCrumb = [
  { link: '/', label: 'Beranda' },
  { link: '/', label: 'Home' },
];
const reports = [
  { title: 'Total Transaksi', iconClass: 'bx bx-copy-alt', text: '1,235' },
  { title: 'Voucher Biling', iconClass: 'bx bx-archive-in', text: '$35, 723' },
  { title: 'Dokumen Upload', iconClass: 'bx bx-purchase-tag-alt', text: '$16.2' },
];

const column = [
  { id: 'NAMA_LENGKAP', label: 'Nama' },
  { id: 'NAMA_PROVINSI_PENEMPATAN', label: 'Provinsi' },
  { id: 'NAMA_KABUPATEN_PENEMPATAN', label: 'Kabupaten' },
  { id: 'ALAMAT_KELURAHAN_DESA', label: 'Desa' },
];

const Dashboard = () => {
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const handlePageChange = (e) => {
    const n_query = { ...query, page: e };
    setQuery(n_query);
  };
  const color = ['#2A3042', '#0c5460', '#721c24', '#155724'];
  const user = getUserDetail();
  const roleCode = user.roles?.[0]?.role_code || '';
  return (
    <Container
      fluid
      className="page-content"
      style={{ padding: `calc(60px + 24px - 19px) calc(24px * 0.75) 180px calc(24px * 0.75)` }}>
      <RunningText roleCode={roleCode} />
      <Breadcrumb content={breadCrumb} title="Dashboard" />
      <div className="position-relative">
        <Row className="my-2">
          <Col xl="4">
            <WelcomeComp />
            <Calendar />
          </Col>
          <Col xl="8">
            <Row>
              {/* Reports Render */}
              {(reports || [])?.map((report, idx) => {
                return (
                  <Col md="4" key={'_col_' + idx}>
                    <CardCustomSA
                      title={report.title}
                      text={report.text}
                      iconClass={report.iconClass}
                      color={color[idx]}
                      link={report.link}
                      isActive={true}
                      clicked={() => {}}
                      disButton={true}
                    />
                  </Col>
                );
              })}
            </Row>

            <Row style={{ marginTop: '-25px' }}>
              <Col lg="12" className="bg-white rounded-4 p-3">
                <h1 className="fs-5 fw-bold text-primary my-2">LOG Transaksi Terakhir</h1>
                <TableListNew
                  data={dummyData.data}
                  totalData={dummyData.total_count}
                  column={column}
                  onPageChange={handlePageChange}
                  page={query.page}
                  limit={query.limit}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <FAQ />
      </div>
    </Container>
  );
};

export default Dashboard;
