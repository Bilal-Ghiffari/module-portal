import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DataKurator from "../Laporan/DataKurator";

const PopupTable = ({
  formik,
  label,
  setOpen,
  open,
  editingIndex,
  setEditingIndex,
  setEditOpen,
  fieldName,
}) => {
  const handleOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(true);
    setEditingIndex(null);
  };
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    setEditOpen(false);
    setEditingIndex(null);
  };

  return (
    <div>
      <button
        type="button"
        className="px-2 py-2 border-0 text-primary d-flex align-items-center gap-1 px-3"
        onClick={(e) => handleOpen(e)}
        style={{
          backgroundColor: "#E7E7E7", // abu-abu muda
          borderRadius: "6px", // optional: biar agak rounded
        }}
      >
        + Tambah
      </button>

      <Dialog
        open={open}
        onClose={(e) => {
          handleClose(e);
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <div className="text-center w-100">
            <p className="m-0 p-0 fs-5 fw-bold">Tambah {label}</p>
            <p className="m-0 p-0 fs-6">Silakan isi data dibawah ini</p>
          </div>
          <IconButton
            onClick={(e) => {
              handleClose(e);
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DataKurator
            formik={formik}
            editingIndex={editingIndex}
            setEditingIndex={setEditingIndex}
            fieldName={fieldName}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopupTable;
