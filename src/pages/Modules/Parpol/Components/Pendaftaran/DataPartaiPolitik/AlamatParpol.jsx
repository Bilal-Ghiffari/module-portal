import { FormInput } from "@/components/Common/FormField";
import FileUploadComponent from "@/components/Common/UploadFile";
import { DynamicDropdown } from "@/components/DynamicDropdown";
import { Row, Col } from "reactstrap";
import Region from "@/components/Region";
import FileUploadBox from "../../FileUploadBox";
import RegionNested from "@/components/RegionNested";

const AlamatParpol = ({ formik }) => {
  return (
    <Row>
      <Col xs="12" className="px-3">
        <FormInput
          formik={formik}
          name={"alamat_kantor_pusat"}
          type="text"
          placeholder="Alamat Kantor Pusat"
          required
        />
      </Col>
      <RegionNested
        formik={formik}
        provinsiKey="provinsi_parpol"
        kabupatenKey="kabupaten_parpol"
        kecamatanKey="kecamatan_parpol"
        kelurahanKey="kelurahan_parpol"
        showNegara={false}
        col="3"
        required
      />
      <Col xs="12" md="6" lg="4" xl="2" className="px-3">
        <FormInput
          formik={formik}
          name="latitude"
          placeholder="Latitude"
          type="number"
          required
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="2" className="px-3">
        <FormInput
          formik={formik}
          name="longitude"
          placeholder="Longitude"
          type="number"
          required
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="3" className="px-3">
        <FormInput
          formik={formik}
          name="rt_parpol"
          placeholder="RT"
          type="number"
          required
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="3" className="px-3">
        <FormInput
          formik={formik}
          name="rw_parpol"
          placeholder="RW"
          type="number"
          required
        />
      </Col>
      <Col xs="12" md="6" lg="4" xl="2" className="px-3">
        <FormInput
          formik={formik}
          name="kode_pos_parpol"
          placeholder="Kode Pos"
          type="number"
          required
        />
      </Col>

      <Col xs="6" className="px-3">
        <FileUploadBox
          id="foto_kantor_depan"
          formik={formik}
          label="Foto Kantor Tampak Depan"
        />

        {/* <FileUploadComponent
          label="Foto Kantor Tampak Depan"
          text="Pilih file Anda"
          name={`foto_kantor_depan`}
          resFile={(file) =>
            formik.setFieldValue(`foto_kantor_depan`, file)
          }
          maxSizeMb={10}
          searchLatLon={false}
          validType="pdf"
          specified={true}
          required
          fieldValue={formik.values?.foto_kantor_depan}
        /> */}
      </Col>

      <Col xs="6" className="px-3">
        <FileUploadBox
          id="foto_kantor_belakang"
          formik={formik}
          label="Foto Kantor Tampak Belakang"
        />
      </Col>
    </Row>
  );
};

export default AlamatParpol;
