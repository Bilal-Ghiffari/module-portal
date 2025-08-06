import { Container } from "reactstrap";
import { DashboardFragments } from "../components/views/DashboardFrament";
import {
  applicationColumns,
  fragmentsData,
  salesData,
  userGrowthData,
} from "./dummy";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import { Row } from "reactstrap";
import { Col } from "reactstrap";
import { useDaftarPermohonan } from "./hooks/useDaftarPermohonan";
import CustomTablePewarganegaraan from "../components/Table";
import { useState } from "react";

const DashboardAdmin = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data, loading, error, pagination } = useDaftarPermohonan({
    page,
    limit,
  });

  console.log(data);
  const mappedApplications =
    data?.map((item, index) => ({
      no: (page - 1) * limit + index + 1,
      nama_lengkap: item.nama_lengkap_pemohon,
      negara_asal: item.kewarganegaraan_asal_pemohon_text || "-",
      tanggal_permohonan: new Date(item.created_at).toLocaleDateString("id-ID"),
    })) || [];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
    setPage(1);
  };

  return (
    <Container className="page-content bg-white" fluid>
      <DashboardFragments fragments={fragmentsData} />
      <Row style={{ marginTop: "20px" }}>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <BarChart
            title="Monthly Sales"
            data={salesData.data}
            labels={salesData.labels}
            backgroundColor="#93C9FD"
          />
        </Col>
        <Col xs="12" sm="12" md="12" lg="6" xl="6">
          <CustomTablePewarganegaraan
            data={mappedApplications}
            totalItems={pagination.totalData}
            currentPage={page}
            itemsPerPage={limit}
            title="Riwayat Permohonan"
            columns={applicationColumns}
            enableSearch={true}
            searchKeys={["nama_lengkap", "negara_asal"]}
            enablePagination={true}
            emptyMessage="Tidak ada permohonan yang cocok dengan pencarian Anda."
            onPageChange={handlePageChange}
            onSearch={handleSearch}
            loading={loading}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col xs={12}>
          <LineChart
            title="Grafik Permohonan"
            labels={userGrowthData.labels}
            datasets={userGrowthData.datasets}
            showLegend={true}
            yAxisTitle="Number of Users"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardAdmin;
