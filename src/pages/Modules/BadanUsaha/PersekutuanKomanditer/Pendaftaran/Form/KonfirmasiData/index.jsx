import { Formik, Form } from "formik";

import GroupButtonForm from "../components/GroupButtonForm";
import PernyataanValidationSchema from "../../Schema/Pernyataan/PernyataanValidationSchema";
import InitialValuesPernyataan from "../../Schema/Pernyataan";
import DataCV from "./DataCV";
import LineDashed from "@/components/Common/Line/Dashed";
import AlamatCV from "./AlamatCV";
import Aset from "./Aset";
import AktaNotaris from "./AktaNotaris";
import KegiatanUsaha from "./KegiatanUsaha";
import DataPemilikManfaat from "./DataPemilikManfaat";
import Pengurus from "./Pengurus";
import Sekutu from "./Sekutu";

const KonfirmasiData = ({
  steps,
  activeStep,
  setActiveStep,
  setActiveSection,
}) => {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <>
      {/* <Formik
        // initialValues={InitialValuesPernyataan}
        // validationSchema={PernyataanValidationSchema}
        onSubmit={() => {
          console.log("Next");
        }}
      >
        {({ values, handleChange, handleBlur, setFieldValue }) => (
          <Form> */}
      <div
        className="border border-1 p-4"
        style={{ borderColor: "#E7E7E7", borderRadius: "12px" }}
      >
        <DataCV
          // values={values}
          // handleChange={handleChange}
          // handleBlur={handleBlur}
          // setFieldValue={setFieldValue}
          setActiveStep={setActiveStep}
          setActiveSection={setActiveSection}
        />

        <LineDashed />

        <KegiatanUsaha
          // values={values}
          // handleChange={handleChange}
          // handleBlur={handleBlur}
          // setFieldValue={setFieldValue}
          setActiveStep={setActiveStep}
          setActiveSection={setActiveSection}
        />

        <LineDashed />

        <AlamatCV
          // values={values}
          // handleChange={handleChange}
          // handleBlur={handleBlur}
          // setFieldValue={setFieldValue}
          setActiveStep={setActiveStep}
          setActiveSection={setActiveSection}
        />

        <LineDashed />

        <AktaNotaris
          // values={values}
          // handleChange={handleChange}
          // handleBlur={handleBlur}
          // setFieldValue={setFieldValue}
          setActiveStep={setActiveStep}
          setActiveSection={setActiveSection}
        />

        <LineDashed />

        <Aset
          // values={values}
          // handleChange={handleChange}
          // handleBlur={handleBlur}
          // setFieldValue={setFieldValue}
          setActiveStep={setActiveStep}
          setActiveSection={setActiveSection}
        />

        <LineDashed />

        <Sekutu
          // values={values}
          // handleChange={handleChange}
          // handleBlur={handleBlur}
          // setFieldValue={setFieldValue}
          setActiveStep={setActiveStep}
          setActiveSection={setActiveSection}
        />

        <LineDashed />

        <Pengurus
          // values={values}
          // handleChange={handleChange}
          // handleBlur={handleBlur}
          // setFieldValue={setFieldValue}
          setActiveStep={setActiveStep}
          setActiveSection={setActiveSection}
        />

        <LineDashed />

        <DataPemilikManfaat
          // values={values}
          // handleChange={handleChange}
          // handleBlur={handleBlur}
          // setFieldValue={setFieldValue}
          setActiveStep={setActiveStep}
        />
      </div>

      <GroupButtonForm
        steps={steps}
        activeStep={activeStep}
        handleBack={handleBack}
        onSubmit={handleNext}
        useFormik={false}
      />
      {/* </Form>
        )}
      </Formik> */}
    </>
  );
};

export default KonfirmasiData;
