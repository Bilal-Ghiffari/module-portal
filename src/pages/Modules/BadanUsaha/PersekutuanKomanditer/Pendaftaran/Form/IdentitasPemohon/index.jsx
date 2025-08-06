import { Formik, Form } from "formik";
import { useRef, useEffect } from "react";
import InitialValuesIdentitasPemohon from "../../Schema/IdentitasPemohon/InitialValue";
import ValidationSchemaIdentitasPemohon from "../../Schema/IdentitasPemohon";
import DataCV from "./DataCV";
import LineDashed from "@/components/Common/Line/Dashed";
import KegiatanUsaha from "./KegiatanUsaha";
import AlamatCV from "./AlamatCV";
import AktaNotaris from "./AktaNotaris";
import Aset from "./Aset";
import Sekutu from "./Sekutu";
import GroupButtonForm from "../components/GroupButtonForm";
import Pengurus from "./Pengurus";

const IdentitasPemohon = ({
  steps,
  activeStep,
  setActiveStep,
  activeSection,
}) => {
  const sectionRefs = {
    dataCV: useRef(null),
    kegiatanUsaha: useRef(null),
    alamatCV: useRef(null),
    aktaNotaris: useRef(null),
    aset: useRef(null),
    sekutu: useRef(null),
    pengurus: useRef(null),
  };

  useEffect(() => {
    if (activeSection && sectionRefs[activeSection]) {
      const element = sectionRefs[activeSection].current;
      if (element) {
        const yOffset = -100;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  }, [activeSection]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Formik
      initialValues={InitialValuesIdentitasPemohon()}
      validationSchema={ValidationSchemaIdentitasPemohon}
      onSubmit={(values) => {
        console.log("Form submitted:", values);
        handleNext();
      }}
    >
      {({ values, handleChange, handleBlur, setFieldValue }) => (
        <Form>
          <div
            className="border border-1 p-4"
            style={{ borderColor: "#E7E7E7", borderRadius: "12px" }}
          >
            <div ref={sectionRefs.dataCV}>
              <DataCV
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
            </div>

            <LineDashed />

            <div ref={sectionRefs.kegiatanUsaha}>
              <KegiatanUsaha
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
            </div>

            <LineDashed />

            <div ref={sectionRefs.alamatCV}>
              <AlamatCV
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
            </div>

            <LineDashed />

            <div ref={sectionRefs.aktaNotaris}>
              <AktaNotaris
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
            </div>

            <LineDashed />

            <div ref={sectionRefs.aset}>
              <Aset
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
            </div>

            <LineDashed />

            <div ref={sectionRefs.sekutu}>
              <Sekutu
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
            </div>

            <LineDashed />

            <div ref={sectionRefs.pengurus}>
              <Pengurus
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                setFieldValue={setFieldValue}
              />
            </div>
          </div>

          <GroupButtonForm
            steps={steps}
            activeStep={activeStep}
            handleBack={handleBack}
          />
        </Form>
      )}
    </Formik>
  );
};

export default IdentitasPemohon;
