import { Box, TextField } from "@mui/material";
import TablePengajuanNama from "./components/Table";
import { useState } from "react";
import { Input } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import { InputGroup } from "reactstrap";
import { InputGroupText } from "reactstrap";
import { CustomButton } from "@/components/Common/Button";
import { BsPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const PengajuanNama = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([
    {
      nomor: 1923819288,
      name: "PT Budi Man United",
      singkatan: "BMU",
    },
  ]);
  const columns = [
    { header: "No", accessor: "no" },
    { header: "Nomor Pengajuan", accessor: "nomor" },
    { header: "Nama Badan Usaha", accessor: "name" },
    { header: "Singkatan CV", accessor: "singkatan" },
    {
      header: "Aksi",
      accessor: "aksi",
    },
  ];

  return (
    <div>
      <div style={{ minHeight: "100vh" }}>
        <Box className="bg-white page-content mb-4">
          <h3
            className="text-center"
            style={{ fontWeight: 500, fontSize: 24, color: "#041662" }}
          >
            Daftar Pengajuan Nama CV
          </h3>

          <section className="d-flex flex-column gap-3 mt-5">
            <div className="row g-2">
              <div className="col-7 d-flex flex-column gap-1">
                <InputGroup
                  style={{ border: "1px solid #ddd", borderRadius: "8px" }}
                >
                  <InputGroupText
                    style={{ background: "transparent", border: "none" }}
                  >
                    <FaSearch />
                  </InputGroupText>
                  <Input
                    name="search"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      padding: "10px 0px",
                      border: "none",
                      borderRadius: "6px",
                    }}
                  />
                </InputGroup>
              </div>

              <div className="col-1">
                <div className="w-100">
                  <CustomButton
                    text={"Filter"}
                    textColor="#6D6D6D"
                    bgColor="white"
                    border="1px solid #E7E7E7"
                    sx={{ width: "100%", borderRadius: "6px" }}
                    leftIcon={<span className="mdi mdi-tune-variant"></span>}
                  />
                </div>
              </div>

              <div className="col">
                <div className="w-100">
                  <CustomButton
                    text={"Tambah Pengajuan Nama Baru"}
                    textColor="#fff"
                    bgColor="#1F7C4D"
                    border="1px solid #E7E7E7"
                    sx={{ width: "100%", borderRadius: "6px" }}
                    leftIcon={<BsPlus size={24} />}
                    onClick={() => navigate("create")}
                  />
                </div>
              </div>
            </div>

            <TablePengajuanNama
              columns={columns}
              data={data}
              setData={setData}
              striped
              bordered
              hover
            />
          </section>
        </Box>
      </div>
    </div>
  );
};

export default PengajuanNama;
