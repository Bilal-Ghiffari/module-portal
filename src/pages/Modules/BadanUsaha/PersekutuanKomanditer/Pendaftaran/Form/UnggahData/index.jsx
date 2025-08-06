import { Formik, Form } from "formik";

import GroupButtonForm from "../components/GroupButtonForm";

const UnggahData = ({ steps, activeStep, setActiveStep }) => {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <Formik
      initialValues={{ data: "" }}
      // validationSchema={PernyataanValidationSchema}
      onSubmit={(values) => {
        console.log("Form submitted Pernyataan:", values);
        handleNext();
      }}
    >
      {({ values, handleChange, handleBlur, setFieldValue }) => (
        <Form>
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

export default UnggahData;
