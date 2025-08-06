import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TableKegiatanUsaha from "./TableKegiatanUsaha";
import { getRiwayatPermohonan } from "./Columns";
import { dummy } from "..";
import Sticker from "./Sticker";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import { useFormik } from "formik";
import ButtonCustom from "@/components/Common/ButtonCustom";

const PopupCRUD = ({ setOpen, open, status, label }) => {
  const handleClose = () => setOpen(false);

  const configColumn = {
    "Daftar Permohonan": getRiwayatPermohonan(),
    "Daftar Verifikasi": getRiwayatPermohonan(),
  };
  const column = configColumn[label] || {};

  const listLabels = ["Penugasan Permohonan", "Detail Permohonan"];

  const formik = useFormik({
    initialValues: {
      jenis_permohonan: "apostille",
    },
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{ zIndex: "9", marginTop: "40px" }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="text-center w-100">
            <h4
              className="fw-bold m-0 p-0 text-capitalize"
              style={{ fontSize: "1rem", color: "#041662" }}
            >
              {status} {label}
            </h4>
            {/* <p className="text-muted fs-6 mt-2">
              {!listLabels.includes(label)
                ? "Ediwn Calisto"
                : "0189923/0075/2024"}
            </p> */}
          </div>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {!listLabels.includes(label) && (
            <TableKegiatanUsaha data={dummy} column={column} />
          )}
          {label == "Detail Permohonan Legalisasi" && (
            <Sticker label={"Detail Permohonan Legalisasi"} />
          )}
          {label == "Detail Permohonan Apostille" && (
            <Sticker label={"Detail Permohonan Apostille"} />
          )}
          {label == "Penugasan Permohonan" && (
            <>
              <DynamicDropdown
                formik={formik}
                fieldName={"petugas_baru"}
                data={[]}
                label="Petugas Baru"
                required
              />
              <div className="w-100 d-flex align-items-end justify-content-end">
                <ButtonCustom onClick={formik.handleSubmit} label="Submit" />
              </div>{" "}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupCRUD;
