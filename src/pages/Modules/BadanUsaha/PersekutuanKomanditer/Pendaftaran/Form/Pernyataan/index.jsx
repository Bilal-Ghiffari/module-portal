import { Formik, Form } from "formik";

import GroupButtonForm from "../components/GroupButtonForm";
import ESignature from "./ESignature";
import PernyataanValidationSchema from "../../Schema/Pernyataan/PernyataanValidationSchema";
import InitialValuesPernyataan from "../../Schema/Pernyataan";
import LineDashed from "@/components/Common/Line/Dashed";
import UnggahDokumen from "./UnggahDokumen";

const Pernyataan = ({ steps, activeStep, setActiveStep }) => {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Formik
      initialValues={InitialValuesPernyataan}
      validationSchema={PernyataanValidationSchema}
      onSubmit={(values) => {
        console.log("Form submitted Pernyataan:", values);
        handleNext();
      }}
    >
      {({ values, handleChange, handleBlur, setFieldValue }) => (
        <Form>
          <div
            className="border border-1 p-4"
            style={{ borderColor: "#E7E7E7", borderRadius: "12px" }}
          >
            <UnggahDokumen
              values={values}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
            />

            <LineDashed />

            <ESignature
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

export default Pernyataan;
