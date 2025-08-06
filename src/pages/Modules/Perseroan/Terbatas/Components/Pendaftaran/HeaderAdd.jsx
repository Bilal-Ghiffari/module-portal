import PopupTable from "@/pages/Modules/Perseroan/Terbatas/Components/Pendaftaran/PopupTable";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

const HeaderAdd = ({
  formik,
  disabled,
  label,
  editOpen,
  setEditOpen,
  editingIndex,
  setEditingIndex,
  activeEditLabel,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Box
      className="d-flex align-items-center justify-content-between"
      sx={{
        backgroundColor: "#EFF7FF",
        padding: 1,
        borderRadius: 2,
        mb: 2,
      }}
    >
      <Typography
        sx={{
          color: "#041662",
          fontSize: "14px",
          px: 0,
          fontFamily: "Poppins",
        }}
        className="fw-semibold"
      >
        {label}
      </Typography>
      {!disabled && (
        <>
          {(label !== "Maksud dan Tujuan" ||
            formik.values.maksud_tujuan_type === "1") && (
            <PopupTable
              formik={formik}
              type={label}
              setOpen={setOpen}
              open={
                open ||
                (editOpen && editingIndex !== null && activeEditLabel === label)
              }
              editingIndex={editingIndex}
              setEditingIndex={setEditingIndex}
              setEditOpen={setEditOpen}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default HeaderAdd;
