import { Formik, Form } from "formik";

import LineDashed from "@/components/Common/Line/Dashed";

import GroupButtonForm from "../components/GroupButtonForm";
import PersetujuanPemilikManfaat from "./PersetujuanPemilikManfaat";
import InitialValuesInformasiDokumen from "../../Schema/PemilikManfaat/InitialValue";
import ValidationSchemaInformasiDokumen from "../../Schema/PemilikManfaat";
import DataPemilikManfaat from "./DataPemilikManfaat";

const PemilikManfaat = ({ steps, activeStep, setActiveStep }) => {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Formik
      initialValues={InitialValuesInformasiDokumen}
      validationSchema={ValidationSchemaInformasiDokumen}
      onSubmit={(values) => {
        console.log("Form submitted Pemilik Manfaat:", values);
        handleNext();
      }}
    >
      {({ values, handleChange, handleBlur, setFieldValue }) => (
        <Form>
          <div
            className="border border-1 p-4"
            style={{ borderColor: "#E7E7E7", borderRadius: "12px" }}
          >
            <PersetujuanPemilikManfaat
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
            />

            <LineDashed />

            <DataPemilikManfaat
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
            />
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

export default PemilikManfaat;
