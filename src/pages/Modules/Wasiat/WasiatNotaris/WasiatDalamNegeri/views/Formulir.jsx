import { CustomButton } from "@/components/Common/Button";
import LineDashed from "@/components/Common/Line/Dashed";
import { Box } from "@mui/material";
import FormAktaWasiat from "./InformasiAkta";
import FormPemberiWasiat from "./InformasiPemberi";
import FormAlamatPemberi from "./InformasiAlamat";
import { warningMsg } from "@/helpers/Notification/toastNotification";

const FormulirPermohonanWasiat = ({ formik, setActiveStep }) => {
  async function handleNext() {
    const errors = await formik.validateForm();

    const filteredErrors = { ...errors };
    delete filteredErrors.pratinjau;

    formik.setTouched(
      Object.keys(formik.values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {}),
      true
    );

    if (Object.keys(filteredErrors).length === 0) {
      setActiveStep((prev) => prev + 1);
    } else {
      warningMsg("Harap melengkapi formulir dengan benar");
    }
  }

  return (
    <div className="page-content">
      <h4 className="mb-4">Formulir Permohonan</h4>

      <Box
        sx={{
          borderRadius: "16px",
          border: "1px solid #E7E7E7",
          padding: "16px",
          mb: 4,
        }}
      >
        <FormAktaWasiat formik={formik} />
        <LineDashed />
        <FormPemberiWasiat formik={formik} />
        <LineDashed />
        <FormAlamatPemberi formik={formik} />
        <LineDashed />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "flex-end",
            alignItems: "flex-end",
            pt: 3,
            mt: 2,
            pb: { xs: 2, sm: 2 },
          }}
        >
          <CustomButton
            onClick={handleNext}
            text="Selanjutnya"
            bgColor="#041662"
            hoverColor="#1e40af"
            style={{ width: "fit-content" }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default FormulirPermohonanWasiat;
