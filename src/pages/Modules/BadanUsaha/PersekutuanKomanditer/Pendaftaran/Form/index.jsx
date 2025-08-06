import HorizontalStepper from "@/components/Common/Stepper/HorizontalStepper";
import { Box } from "@mui/material";
import { useState } from "react";
import IdentitasPemohon from "./IdentitasPemohon";
import PemilikManfaat from "./PemilikManfaat";
import Pernyataan from "./Pernyataan";
import KonfirmasiData from "./KonfirmasiData";
import UnggahData from "./UnggahData";
import { useRef, useEffect } from "react";

import CheckIcon from "@/assets/icons/check.png";

const steps = [
  "Informasi CV",
  "Pemilik Manfaat",
  "Unggah Dokumen",
  "Konfirmasi Data",
];

const FormPendafataran = () => {
  const topRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (activeStep === 0) {
      // if (sectionRef.current) {
      //   sectionRef.current.scrollIntoView({ behavior: "smooth" });
      // } else {
      //   window.scrollTo({ top: 0, behavior: "smooth" });
      // }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [activeStep]);

  return (
    <div ref={topRef} className="d-flex flex-column gap-4">
      {activeStep < 4 ? (
        <>
          <h3 style={{ fontWeight: 500, fontSize: 24, color: "#041662" }}>
            Formulir Pendaftaran
          </h3>
          <Box sx={{ width: "100%" }}>
            <HorizontalStepper steps={steps} activeStep={activeStep} />
          </Box>
        </>
      ) : (
        <section
          className="d-flex justify-content-center align-items-start text-center mt-5"
          style={{ height: "100vh" }}
        >
          <div
            style={{
              width: "828px",
              border: "1px solid #DBEBFE",
              borderRadius: "12px",
              padding: "40px",
            }}
          >
            <div className="mb-4">
              <img
                src={CheckIcon}
                alt="Success"
                style={{
                  width: 80,
                  height: 80,
                }}
              />
            </div>

            <span className="fw-medium" style={{ fontSize: "28px" }}>
              Pendaftaran Berhasil!
            </span>

            <hr style={{ borderColor: "#DBEBFE", margin: "24px 0px" }} />

            <span className="mx-2">
              Pendaftaran Anda telah berhasil. Silakan buka laman dashboard
              untuk mengunduh sertifikat pendirian Perseroan Perorangan.
            </span>
          </div>
        </section>
      )}

      {activeStep === 0 && (
        <IdentitasPemohon
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          activeSection={activeSection}
        />
      )}

      {activeStep === 1 && (
        <PemilikManfaat
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}

      {activeStep === 2 && (
        <Pernyataan
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      )}

      {activeStep === 3 && (
        <KonfirmasiData
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          setActiveSection={setActiveSection}
        />
      )}
    </div>
  );
};

export default FormPendafataran;
