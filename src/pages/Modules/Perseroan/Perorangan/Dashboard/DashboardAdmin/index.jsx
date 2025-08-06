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
  dummyDataPembubaran,
  dummyTop5KBLI,
} from "./mock";
import BarChart from "./Components/BarChart";
import PieChart from "./Components/PieChart";
import { useFormik } from "formik";

const DashboardAdmin = () => {
  const cards = [
    {
      id: "1",
      label: "Permohonan Pendirian",
      value: `4.680`,
      color: "#EFF7FF",
      dividerColor: "#60AAFA",
    },
    {
      id: "2",
      label: "Permohonan Perubahan",
      value: `4.680`,
      color: "#FEF7EE",
      dividerColor: "#F2933D",
    },
    {
      id: "3",
      label: "Permohonan Pembubaran",
      value: `4.680`,
      color: "#EFFAF3",
      dividerColor: "#51B67D",
    },
    {
      id: "4",
      label: "Permohonan Perbaikan",
      value: `4.680`,
      color: "#FDF3F3",
      dividerColor: "#EE7D7B",
    },
  ];

  // Transform dummyData ke bentuk props yang BarChart butuh:
  const labelsPermohonan = dummyDataKBLI.map((item) => item.label);
  const seriesPermohonan = dummyDataKBLI.map((item) => item.value);
  const rawValues = dummyDataKBLI.map((item) => item.rawValue);

  const labelsKBLI = dummyTop5KBLI.map((item) => item.label);
  const seriesKBLI = dummyTop5KBLI.map((item) => item.value);
  const labelsPembubaran = dummyDataPembubaran.map((item) => item.label);
  const seriesPembubaran = dummyDataPembubaran.map((item) => item.value);

  const formik = useFormik({
    initialValues: {
      Jenis: "Pendirian",
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
            <Typography
              sx={{
                fontSize: "0.95rem",
                fontFamily: "Poppins",
                color: "#202020",
                lineHeight: "24px",
              }}
            >
              Total Permohonan Bulan ini
            </Typography>
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
            <div className="d-flex align-items-center justify-content-between">
              <Header title={"Grafik Permohonan"} />
              <DynamicDropdown
                formik={formik}
                fieldName={"Jenis"}
                data={mockDropdown}
              />
            </div>
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
        {/* 5 KBLI Terpopuler */}
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
            <Header title={"5 KBLI Terpopuler"} />
            <PieChart
              series={seriesKBLI}
              labels={labelsKBLI}
              type="Pemohon"
              width={"250px"}
              colorLabel="#ffffff"
            />
          </Box>
        </Col>
        {/* Alasan Pembubaran Perseroan Tertinggi */}
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
            <Header title={"Alasan Pembubaran Perseroan Tertinggi"} />
            <PieChart
              series={seriesPembubaran}
              labels={labelsPembubaran}
              type="Pembubaran"
              width={"250px"}
              colorLabel="#ffffff"
            />
          </Box>
        </Col>
        {/* Provinsi dengan Jumlah Perseroan Perorangan Tertinggi */}
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
            <Header
              title={"Provinsi dengan Jumlah Perseroan Perorangan Tertinggi"}
            />
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
      </Row>
    </Container>
  );
};

export default DashboardAdmin;
