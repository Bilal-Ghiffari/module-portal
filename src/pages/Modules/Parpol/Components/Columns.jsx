import { CustomTooltipMui } from "@/components/Common/TooltipMui";
import { Chip } from "@mui/material";
import ActionComp from "../../Perseroan/Terbatas/Components/Pendaftaran/ActionComp";

export const getNotarisCol = ({ handle }) => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "nama_notaris", label: "Nama Notaris", align: "left" },
  { id: "kedudukan", label: "Kedudukan", align: "left" },
  { id: "no_akta", label: "No Akta", align: "left" },
  { id: "tanggal_akta", label: "Tanggal Akta", align: "left" },
  { id: "perihal_akta", label: "Perihal Akta", align: "left" },
  {
    id: "aksi",
    label: "Aksi",
    align: "left",
    width: "100px",
    cell: (row, index) => <ActionComp handle={handle} index={index} />,
  },
];
