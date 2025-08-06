import FormIdentitasPenerima from './FormIdentitasPenerima';

const FidusiaFormPage = ({ formik, dataSource, onUpdateData }) => {
  return (
    <FormIdentitasPenerima
      formik={formik}
      dataSource={dataSource}
      onUpdateData={onUpdateData}
    />
  );
};

export default FidusiaFormPage;
