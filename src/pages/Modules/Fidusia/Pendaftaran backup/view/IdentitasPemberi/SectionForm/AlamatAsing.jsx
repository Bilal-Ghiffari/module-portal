import {
  FormHeader,
  FormInputNested,
} from '@/components/Common/FormFieldNested';
// import Region from '@/components/Region';
import { Box } from '@mui/material';
import { Col, Row } from 'reactstrap';

const AlamatAsing = ({ formik }) => {
  return (
    <>
      <FormHeader title="Alamat Pemberi Fidusia (Luar Negeri)" />
      <Box className="form-horizontal">
        <Row>
          <Col xs="12" md="12" lg="12" xl="12">
            <FormInputNested
              formik={formik}
              name="identity_pemberi.alamat"
              title="Alamat Lengkap"
              placeholder="Tulis alamat lengkap"
              type="textarea"
              required
            />
          </Col>
        </Row>
      </Box>
    </>
  );
};

export default AlamatAsing;
