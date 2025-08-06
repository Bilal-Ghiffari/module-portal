import { Input } from "reactstrap";
import TablePengajuanNama from "../components/Table";
import { useState } from "react";
import { FaInfoCircle, FaSearch } from "react-icons/fa";
import { CustomButton } from "@/components/Common/Button";
import { ErrorMessage } from "formik";

const InformasiCV = ({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  duplicate,
  setDuplicate,
}) => {
  const [data, setData] = useState([
    {
      nomor: 1923819288,
      name: "PT Budi Man United",
      singkatan: "BMU",
    },
  ]);

  const columns = [
    { header: "No", accessor: "no" },
    { header: "Nama yang Telah Terdaftar", accessor: "name", color: "red" },
    { header: "Singkatan CV", accessor: "singkatan", color: "red" },
  ];

  const actionCheckDuplicate = () => {
    const namaDuplikat = data.some(
      (item) => item.name.toLowerCase() === values.namaCV.toLowerCase()
    );

    const singkatanDuplikat = data.some(
      (item) =>
        item.singkatan.toLowerCase() === values.singkatanCV.toLowerCase()
    );

    setDuplicate({
      nama: namaDuplikat,
      singkatan: singkatanDuplikat,
    });
  };

  return (
    <section className="d-flex flex-column gap-3">
      <div
        style={{
          backgroundColor: "#EFF7FF",
          borderRadius: "8px",
          padding: "12px 10px",
        }}
      >
        <span className="fw-medium fs-5">Informasi CV</span>
      </div>

      <section className="d-flex flex-column gap-3">
        <div className="row g-2">
          <div className="col-6 d-flex flex-column gap-1">
            <label>
              Nama CV yang diinginkan (tanpa awalan CV){" "}
              <span className="text-danger">*</span>
            </label>
            <Input
              name="namaCV"
              placeholder="Tulis Nama CV"
              value={values.namaCV}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{
                borderRadius: "6px",
              }}
            />
            <ErrorMessage
              name="namaCV"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="col-6 d-flex flex-column gap-1">
            <label>
              Singkatan CV yang diinginkan{" "}
              <span className="text-danger">*</span>
            </label>
            <div className="row g-2">
              <div className="col">
                <Input
                  name="singkatanCV"
                  placeholder="Tulis Singkatan CV"
                  value={values.singkatanCV}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    borderRadius: "6px",
                  }}
                />
              </div>

              <div className="col-2">
                <CustomButton
                  text={"Cari"}
                  textColor="#fff"
                  bgColor="#1F7C4D"
                  border="1px solid #E7E7E7"
                  sx={{ width: "100%", borderRadius: "6px", height: "38px" }}
                  leftIcon={<FaSearch />}
                  onClick={actionCheckDuplicate}
                />
              </div>
            </div>
            <ErrorMessage
              name="singkatanCV"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="col-1 d-flex align-items-center">
            <div className="w-100"></div>
          </div>
        </div>

        {(duplicate.nama || duplicate.singkatan) && (
          <div
            className="d-flex align-items-center gap-2"
            style={{
              backgroundColor: "#FEF7EE",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
          >
            <FaInfoCircle color="#EF7A20" />
            <span style={{ fontSize: "12px" }}>
              {duplicate.nama && duplicate.singkatan
                ? "Nama dan singkatan CV yang Anda pilih mirip dengan entri di database AHU."
                : duplicate.nama
                ? "Nama CV yang Anda pilih mirip dengan entri di database AHU."
                : "Singkatan CV yang Anda pilih mirip dengan entri di database AHU."}
              &nbsp;Silakan tinjau kembali daftar di bawah sebelum melanjutkan.
            </span>
          </div>
        )}

        <TablePengajuanNama
          columns={columns}
          data={data}
          setData={setData}
          striped
          bordered
          hover
        />
      </section>
    </section>
  );
};

export default InformasiCV;
