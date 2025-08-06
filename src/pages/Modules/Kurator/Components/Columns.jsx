import { CustomTooltipMui } from "@/components/Common/TooltipMui";
import { Chip } from "@mui/material";
import ActionComp from "./ActionComp";

export const getKuratorCol = ({ handle }) => [
  {
    id: "no",
    label: "No",
    width: "5%",
    align: "left",
    cell: (row, index) => <span>{index + 1}</span>,
  },
  { id: "nama", label: "Nama", align: "left" },
  { id: "nik", label: "NIK", align: "left" },
  { id: "alamat", label: "Alamat", align: "left" },
  {
    id: "aksi",
    label: "Aksi",
    align: "left",
    width: "100px",
    cell: (row, index) => <ActionComp handle={handle} index={index} />,
  },
];
