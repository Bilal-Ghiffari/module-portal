import { FormInput } from "@/components/Common/FormField";
import ButtonCustom from "@/components/Common/ButtonCustom";
import { Col, Row } from "reactstrap";

const GantiKurator = ({ formik }) => {
  return (
    <>
      <Row>
        <Col xs="12" md="6" className="px-3">
          <FormInput
            formik={formik}
            name={`nama`}
            placeholder="Nama"
            type="text"
            required
          />
        </Col>
        <Col xs="12" md="6" className="px-3">
          <FormInput
            formik={formik}
            name={`nik`}
            placeholder="NIK"
            type="text"
            required
          />
        </Col>
        <Col xs="12" className="px-3">
          <FormInput
            formik={formik}
            name={`alamat`}
            placeholder="Alamat"
            type="text"
            required
          />
        </Col>
      </Row>
      <div className="w-100 text-end">
        <ButtonCustom onClick={formik.handleSubmit} label={"Simpan"} />
      </div>
    </>
  );
};

export default GantiKurator;
