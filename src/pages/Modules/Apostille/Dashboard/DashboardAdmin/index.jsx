import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { Row, Col } from "reactstrap";
import Card from "./Components/Card";
import Header from "./Components/Header";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import TableListNew from "@/components/Common/TableListNew";
import {
  getColumn,
  mockDropdown,
  mockTable,
  dummyDataKBLI,
} from "./mock";
import BarChart from "./Components/BarChart";
import LineChart from "./Components/LineChart";
import { useFormik } from "formik";

const DashboardAdmin = () => {
  const cards = [
    {
      id: "1",
      label: "Total Permohonan",
      value: `4.680`,
      color: "#EFF7FF",
      dividerColor: "#60AAFA",
    },
    {
      id: "2",
      label: "Total Belum Verifikasi",
      value: `4.680`,
      color: "#FEF7EE",
      dividerColor: "#F2933D",
    },
    {
      id: "3",
      label: "Total Disetujui",
      value: `4.680`,
      color: "#EFFAF3",
      dividerColor: "#51B67D",
    },
    {
      id: "4",
      label: "Total Ditolak",
      value: `4.680`,
      color: "#FDF3F3",
      dividerColor: "#EE7D7B",
    },
  ];

  // Transform dummyData ke bentuk props yang BarChart butuh:
  const labelsPermohonan = dummyDataKBLI.map((item) => item.label);
  const seriesPermohonan = dummyDataKBLI.map((item) => item.value);
  const rawValues = dummyDataKBLI.map((item) => item.rawValue);

  const formik = useFormik({
    initialValues: {
      Jenis: "",
    },
    enableReinitialize: true,
    // validationSchema,
    onSubmit: (values) => {
      console.log("payload", values);
    },
  });

  return (
    <Container className="page-content bg-white">
      <Row className="g-4 mb-4 align-items-stretch">
        {/* Total Permohonan Bulan ini */}
        <Col xs="12">
          <Box sx={{ p: 3, border: "1px solid #E7E7E7", borderRadius: "8px" }}>
            <div className="d-flex align-items-center justify-content-between">
              <Typography
                className="m-0 p-0"
                sx={{
                  fontSize: "0.95rem",
                  fontFamily: "Poppins",
                  color: "#202020",
                  lineHeight: "24px",
                }}
              >
                Dashboard Apostille
              </Typography>{" "}
              <DynamicDropdown
                formik={formik}
                fieldName={"Jenis"}
                data={mockDropdown}
              />
            </div>

            <Divider sx={{ my: 2, color: "#E7E7E7" }} />
            <Row>
              <Card data={cards} />
            </Row>
          </Box>
        </Col>
        {/* Grafik Permohonan */}
        <Col xs="6">
          <Box
            sx={{
              p: 3,
              border: "1px solid #E7E7E7",
              borderRadius: "8px",
              height: "500px",
              overflowY: "auto",
            }}
          >
            <Header title={"Grafik Permohonan"} />
            <Divider sx={{ color: "#E7E7E7" }} />

            <BarChart
              series={seriesPermohonan}
              labels={labelsPermohonan}
              rawValues={rawValues}
              type="Permohonan"
              width={"100%"}
              colorLabel="#ffffff"
            />
          </Box>
        </Col>
        {/* Riwayat Permohonan */}
        <Col xs="6">
          <Box
            sx={{
              p: 3,
              border: "1px solid #E7E7E7",
              borderRadius: "8px",
              height: "500px",
              overflowY: "auto",
            }}
          >
            <Header title={"Riwayat Permohonan"} />
            <TableListNew
              data={mockTable}
              totalData={mockTable.length}
              column={getColumn()}
              isServerSide
              // onPageChange={handlePageChange}
              // limit={query.limit}
            />
          </Box>
        </Col>
        {/* Grafik Permohonan Berdasarkan Jenis */}
        <Col xs="12">
          <Box
            sx={{
              p: 3,
              border: "1px solid #E7E7E7",
              borderRadius: "8px",
              height: "350px",
              overflowY: "auto",
            }}
          >
            <Header title={"Grafik Permohonan Berdasarkan Jenis"} />
            <LineChart
              approvedSeries={[100, 120, 150, 130, 170]}
              rejectedSeries={[20, 15, 10, 25, 30]}
              labels={["Jan", "Feb", "Mar", "Apr", "Mei"]}
              colorLabel="#000"
            />
          </Box>
        </Col>
        {/* Alasan Pembubaran Perseroan Tertinggi */}
        {/* <Col xs="6">
          <Box
            sx={{
              p: 3,
              border: "1px solid #E7E7E7",
              borderRadius: "8px",
              height: "500px",
              overflowY: "auto",
            }}
          >
            <Header title={"Alasan Pembubaran Perseroan Tertinggi"} />
            <PieChart
              series={seriesPembubaran}
              labels={labelsPembubaran}
              type="Pembubaran"
              width={"250px"}
              colorLabel="#ffffff"
            />
          </Box>
        </Col> */}
      </Row>
    </Container>
  );
};

export default DashboardAdmin;
