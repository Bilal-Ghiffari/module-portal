import { Col } from "reactstrap";
import {
  FormHeader,
  FormInput,
  FormSelect,
} from "@/components/Common/FormField";
import { Box } from "@mui/material";
import { Row } from "reactstrap";
import { FIELD_OPTIONS } from "../../constants/options";
import { useSelector } from "react-redux";
import { FormAutocomplete } from "@/components/Common/AutoComplete";

const InformasiPernikahanSection = ({ formik }) => {
  const { statusKawin } = useSelector((state) => state.master);

  return (
    <>
      <FormHeader title={"Informasi Pernikahan"} />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormAutocomplete
              formik={formik}
              name="status_kawin"
              placeholder="status perkawinan"
              title="Status Perkawinan"
              options={statusKawin.data}
              required
            />
          </Col>
          <Col xs="12" md="12" lg="12" xl="6">
            <FormInput
              formik={formik}
              name="tgl_kawin"
              placeholder="Tulis tanggal pernikahan"
              type="date"
              title="Tanggal Pernikahan"
              required
            />
          </Col>
        </Row>
        <Row>
          <FormInput
            formik={formik}
            name="no_buku_nikah"
            placeholder="Tulis nomor buku nikah"
            title="Nomor Buku NIkah/Akta Nikah"
            required
          />
        </Row>
        <Row>
          <FormInput
            formik={formik}
            name="no_skim"
            placeholder="Tulis nomor SKIM"
            title="Nomor SKIM (Surat Keterangan Keimigrasian)"
            required
          />
        </Row>
      </Box>
    </>
  );
};

export default InformasiPernikahanSection;
