import { apiGetKBLI } from "@/helpers/backend_helper";
import { errorMsg } from "@/helpers/Notification/toastNotification";
import MasterKbli from "@/services/kbli";
import { CircularProgress, Pagination } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  Input,
  InputGroup,
  InputGroupText,
  Modal,
  ModalBody,
  Button,
  Table,
} from "reactstrap";

const UraianCell = ({ text, maxLength = 100 }) => {
  const [showFull, setShowFull] = useState(false);

  if (!text) return <span>-</span>;

  const isLong = text.length > maxLength;
  const displayText = showFull ? text : text.slice(0, maxLength);

  return (
    <>
      {displayText}
      {!showFull && "... "}
      <br />
      {isLong && (
        <>
          <span
            onClick={() => setShowFull(!showFull)}
            className="btn btn-link p-0 cursor-pointer"
            style={{ color: "blue" }}
          >
            {showFull ? "Sembunyikan" : "Lihat Selengkapnya"}
          </span>
        </>
      )}
    </>
  );
};

const ModalKegiatanUsaha = ({
  isOpen,
  toggle,
  onSubmit,
  values,
  setFieldValue,
}) => {
  const [data, setData] = useState([]);
  const [isLoadingKBLI, setIsLoadingKBLI] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const selectedData = values.kegiatanUsaha || [];

  const handleChange = (event, value) => {
    setPage(value);
  };

  const fetchKBLI = async () => {
    setIsLoadingKBLI(true);
    try {
      const payload = {
        search,
        page,
        limit: 10,
      };
      const response = await MasterKbli.getListKBLI(payload);
      const data = response.data;
      if (data) {
        setData(data);
        setTotalPages(response.totalPages);
        setIsLoadingKBLI(false);
      }
    } catch (error) {
      errorMsg(error);
      setIsLoadingKBLI(false);
    }
  };

  useEffect(() => {
    if (isOpen == true) {
      fetchKBLI();
    }
  }, [isOpen, search, page]);

  const isChecked = (id) => {
    return selectedData.some((item) => item.id_kbli === id);
  };

  const handleToggleCheckbox = (row) => {
    const exists = selectedData.find((item) => item.kode === row.kode);
    if (exists) {
      const newData = selectedData.filter((item) => item.kode !== row.kode);
      setFieldValue("kegiatanUsaha", newData);
    } else {
      setFieldValue("kegiatanUsaha", [...selectedData, row]);
    }
  };

  const columns = [
    { header: "" },
    { header: "Kode KBLI", accessor: "kode" },
    { header: "Judul KBLI", accessor: "judul" },
    { header: "Uraian KBLI", accessor: "uraian" },
  ];

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered size="lg">
      <ModalBody style={{ padding: "40px" }}>
        <div className="d-flex flex-column justify-content-center align-items-center gap-5">
          {/* Header */}
          <div className="d-flex flex-column align-items-center">
            <span className="fs-2">Kegiatan Usaha</span>
            <span style={{ color: "#888888" }}>
              Silakan pilih kegiatan usaha anda
            </span>
          </div>

          {/* Search */}
          <div className="w-100">
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
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  padding: "10px 0px",
                  border: "none",
                  borderRadius: "8px",
                }}
              />
            </InputGroup>

            {/* Table */}
            <div className="mt-2">
              {isLoadingKBLI ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "400px" }}
                >
                  <CircularProgress />
                </div>
              ) : (
                <Table responsive>
                  <thead>
                    <tr>
                      {columns.map((col, idx) => (
                        <th key={idx}>{col.header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.length === 0 ? (
                      <tr>
                        <td colSpan={columns.length} className="text-center">
                          Data tidak tersedia
                        </td>
                      </tr>
                    ) : (
                      data.map((row, idx) => (
                        <tr key={idx}>
                          <td width={40} className="text-center">
                            <Input
                              type="checkbox"
                              checked={isChecked(row.id_kbli)}
                              onChange={() => handleToggleCheckbox(row)}
                            />
                          </td>
                          <td width={100}>{row.kode}</td>
                          <td width={200}>{row.judul}</td>
                          <td>
                            <UraianCell text={row.uraian} />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              )}
            </div>

            <div className="d-flex justify-content-center">
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChange}
                shape="rounded"
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="d-flex gap-2">
            <Button
              color="secondary"
              onClick={toggle}
              style={{ width: "150px", height: "40px" }}
            >
              Kembali
            </Button>
            {onSubmit && (
              <Button
                color="primary"
                onClick={toggle}
                style={{ width: "150px", height: "40px" }}
              >
                Simpan
              </Button>
            )}
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalKegiatanUsaha;
