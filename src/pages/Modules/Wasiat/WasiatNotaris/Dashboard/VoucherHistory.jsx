import CustomTableDashboard from "@/components/Common/Dashboard/TableDashboard";
import { Chip } from "@mui/material";

const SectionPembelianVoucher = ({ vouchers }) => {
  const applicationColumns = [
    { id: "no", label: "No" },
    { id: "voucherCode", label: "Kode Voucher" },
    { id: "service", label: "Layanan" },
    { id: "expiryDate", label: "Tanggal Kedaluarsa" },
    { id: "purchaseAmount", label: "Jumlah Pembelian" },
    { id: "billAmount", label: "Jumlah Tagihan" },
    {
      id: "status",
      label: "Status",
      renderCell: (status, row) => (
        <Chip
          label={status}
          size="small"
          style={{
            backgroundColor: row.statusColor,
          }}
          sx={{
            fontWeight: 500,
            fontFamily: "Poppins",
            fontSize: "12px",
            color: row.textColor,
          }}
        />
      ),
    },
  ];

  return (
    <CustomTableDashboard
      data={vouchers}
      title="Riwayat Pembelian Voucher"
      columns={applicationColumns}
      enableSearch={true}
      searchKeys={["name", "applicationNumber"]} // Specify which keys to search
      enablePagination={true} // Enable pagination
      rowsPerPage={5} // Set 5 rows per page
      emptyMessage="Tidak ada permohonan yang cocok dengan pencarian Anda."
    />
  );
};

export default SectionPembelianVoucher;
