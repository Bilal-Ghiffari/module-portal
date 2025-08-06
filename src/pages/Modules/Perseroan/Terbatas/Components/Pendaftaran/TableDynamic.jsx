import TableListNew from "@/components/Common/TableListNew";
import { ToastifyService } from "@/components/Toastify/toastifyService";
import { formatCurrency } from "@/helpers/services/handleInput";
import { Checkbox, Box, TextField } from "@mui/material";
import { useState, useMemo } from "react";
import ActionComp from "./ActionComp";
import { CustomTooltipMui } from "@/components/Common/TooltipMui";

const TableDynamic = ({
  data = [],
  total_count,
  formik,
  showSelect = true,
  label,
  fieldName,
  setEditOpen,
  setEditingIndex,
  setActiveEditLabel,
}) => {
  const [query, setQuery] = useState({ page: 1, limit: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const toastifyService = new ToastifyService();

  const handleCheckboxChange = (row) => {
    const current = formik.values.kegiatan_usaha || [];
    const exists = current.some((item) => item.id_kbli === row.id_kbli);
    let newSelected = exists
      ? current.filter((item) => item.id_kbli !== row.id_kbli)
      : [...current, row];

    formik.setFieldValue("kegiatan_usaha", newSelected);
  };

  const handle = (type, index) => {
    switch (type) {
      case "edit":
        const itemToEdit = formik.values?.[fieldName]?.[index];
        if (itemToEdit) {
          setEditingIndex(index);
          setActiveEditLabel(label);
          setEditOpen(true);
        }
        break;
      case "delete":
        toastifyService.confirmationDelete().then((res) => {
          if (res) {
            const newData = formik.values?.[fieldName]
              .filter((_, idx) => idx !== index)
              .filter((item) => item !== null && item !== undefined);
            formik.setFieldValue(fieldName, newData);
          }
        });

        break;
      default:
        break;
    }
  };

  const columnKegiatanUsaha = [
    ...(showSelect
      ? [
          {
            id: "pilih",
            label: "Pilih",
            width: "5%",
            cell: (row) => (
              <Checkbox
                color="primary"
                checked={formik.values?.kegiatan_usaha?.some(
                  (item) => item.id_kbli === row.id_kbli
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCheckboxChange(row);
                }}
              />
            ),
          },
        ]
      : []),
    { id: "kode", label: "Kode KBLI", align: "left" },
    { id: "judul", label: "Judul KBLI", align: "left" },
    {
      id: "uraian",
      label: "Uraian KBLI",
      align: "left",
      cell: (row, index) => (
        <CustomTooltipMui title={row.uraian} arrow>
          <span
            style={{
              display: "inline-block",
              wordWrap: "break-word",
              whiteSpace: "normal",
              maxWidth: "300px",
            }}
          >
            {row.uraian.slice(0, 100)}...
          </span>
        </CustomTooltipMui>
      ),
    },
    ...(!showSelect
      ? [
          {
            id: "aksi",
            label: "Aksi",
            align: "left",
            width: "100px",
            cell: (row, index) => <ActionComp handle={handle} index={index} />,
          },
        ]
      : []),
  ];
  const columnMaksudTujuan = [
    {
      id: "no",
      label: "No",
      width: "5%",
      align: "left",
      cell: (row, index) => <span>{index + 1}</span>,
    },
    { id: "nama_pendiri", label: "Nama Pendiri", align: "left" },
    { id: "jenis_kelamin", label: "Jenis Kelamin", align: "left" },
    { id: "tanggal_lahir", label: "Tanggal Lahir", align: "left" },
    { id: "disabilitas", label: "Status Disabilitas", align: "left" },
    {
      id: "aksi",
      label: "Aksi",
      align: "left",
      width: "100px",
      cell: (row, index) => <ActionComp handle={handle} index={index} />,
    },
  ];
  const columnNotarisPengganti = [
    {
      id: "no",
      label: "No",
      width: "5%",
      align: "left",
      cell: (row, index) => <span>{index + 1}</span>,
    },
    { id: "nama_lengkap", label: "Nama Lengkap", align: "left" },
    { id: "no_sk", label: "Nomor SK", align: "left" },
    { id: "tanggal_sk", label: "Tanggal SK", align: "left" },
    { id: "status", label: "Status", align: "left" },
  ];
  const columnModalDasar = [
    {
      id: "no",
      label: "No",
      width: "5%",
      align: "left",
      cell: (row, index) => <span>{index + 1}</span>,
    },
    { id: "klasifikasi_saham", label: "Klasifikasi Saham", align: "left" },
    {
      id: "harga_perlembar",
      label: "Harga Perlembar",
      align: "left",
      cell: (row, index) => (
        <span>{formatCurrency(row?.harga_perlembar, true)}</span>
      ),
    },
    {
      id: "lembar_saham",
      label: "Jumlah Lembar Saham",
      align: "left",
      cell: (row, index) => <span>{formatCurrency(row?.lembar_saham)}</span>,
    },
    {
      id: "total_modal",
      label: "Total Modal",
      align: "left",
      cell: (row, index) => (
        <span>{formatCurrency(row?.total_modal, true)}</span>
      ),
    },
    {
      id: "aksi",
      label: "Aksi",
      align: "left",
      width: "100px",
      cell: (row, index) => <ActionComp handle={handle} index={index} />,
    },
  ];
  const columnPengurusPemegangSaham = [
    {
      id: "no",
      label: "No",
      width: "5%",
      align: "left",
      cell: (row, index) => <span>{index + 1}</span>,
    },
    { id: "nama_lengkap", label: "Nama Lengkap", align: "left" },
    {
      id: "jabatan_pengurus",
      label: "Jabatan Pemegang Saham",
      align: "left",
    },
    { id: "klasifikasi_saham", label: "Klasifikasi Saham", align: "left" },
    {
      id: "lembar_saham",
      label: "Jumlah Lembar Saham",
      align: "left",
      cell: (row, index) => <span>{formatCurrency(row?.lembar_saham)}</span>,
    },
    {
      id: "penanggung_jawab_pajak",
      label: "Penanggung Jawab Pajak",
      align: "left",
    },
    {
      id: "aksi",
      label: "Aksi",
      align: "left",
      width: "100px",
      cell: (row, index) => <ActionComp handle={handle} index={index} />,
    },
  ];
  const columnPemilikManfaat = [
    {
      id: "no",
      label: "No",
      width: "5%",
      align: "left",
      cell: (row, index) => <span>{index + 1}</span>,
    },
    { id: "nama_lengkap", label: "Nama Lengkap", align: "left" },
    { id: "no_identitas", label: "Nomor Identitas", align: "left" },
    {
      id: "tempat_tgl_lahir",
      label: "Tempat / Tanggal Lahir",
      align: "left",
      cell: (row, index) => (
        <span>
          {row.tempat_lahir}, {row.tanggal_lahir}
        </span>
      ),
    },
    { id: "kewarganegaraan", label: "Kewarganegaraan", align: "left" },
    { id: "alamat", label: "Alamat", align: "left" },
    { id: "npwp", label: "NPWP", align: "left" },
    {
      id: "hubungan_antara_korporasi_dengan_pemilik_manfaat",
      label: "Hubungan",
      align: "left",
    },
    {
      id: "aksi",
      label: "Aksi",
      align: "left",
      width: "100px",
      cell: (row, index) => <ActionComp handle={handle} index={index} />,
    },
  ];

  const configColumn = {
    "Maksud dan Tujuan": columnMaksudTujuan,
    "Kegiatan Usaha": columnKegiatanUsaha,
    "Notaris Pengganti": columnNotarisPengganti,
    "Modal Dasar": columnModalDasar,
    "Modal Ditempatkan": columnModalDasar,
    "Pengurus dan Pemegang Saham": columnPengurusPemegangSaham,
    "Pemilik Manfaat": columnPemilikManfaat,
  };
  const column = configColumn[label];

  // ✅ Filter data pakai searchTerm (case-insensitive)
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowerSearch = searchTerm.toLowerCase();
    return data.filter((item) =>
      Object.values(item).some((val) =>
        val?.toString().toLowerCase().includes(lowerSearch)
      )
    );
  }, [data, searchTerm]);

  const handlePageChange = (page) => {
    setQuery((prev) => ({ ...prev, page }));
    // fetchData if needed
  };

  // console.log("data", data);
  // console.log("filteredData", filteredData);
  // console.log("label", label);
  // console.log("column", column);

  return (
    <>
      {showSelect && (
        <div className="px-2 d-flex align-items-center justify-content-between">
          <TextField
            size="small"
            placeholder="Cari..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mb: 2 }}
            className="w-50"
          />
          <Box sx={{ mb: 2 }}>
            <strong>Selected:</strong>{" "}
            {formik.values?.kegiatan_usaha?.length || 0}
          </Box>
        </div>
      )}

      <Box
        sx={{
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #e0e0e0",
        }}
      >
        <TableListNew
          data={filteredData}
          totalData={total_count || 0}
          column={column}
          isServerSide
          onPageChange={handlePageChange}
          limit={query.limit}
          page={query.page}
        />
      </Box>
    </>
  );
};

export default TableDynamic;
