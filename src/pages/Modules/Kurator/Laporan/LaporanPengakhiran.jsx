import { FormInput } from "@/components/Common/FormField";
import ButtonCustom from "@/components/Common/ButtonCustom";
import { Col, Row } from "reactstrap";
import FileUploadComponent from "@/components/Common/UploadFile";

const LaporanPengakhiran = ({ formik, type }) => {
  return (
    <>
      <Row>
        {type == "Pengurus" ? (
          <>
            <Col xs="12" className="px-3">
              <FormInput
                formik={formik}
                placeholder="Nomor Laporan Pengakhiran PKPU ke Hakim Pengawas"
                type="text"
                required
                usePlaceholder
              />
            </Col>
            <Col xs="12" className="px-3">
              <FormInput
                formik={formik}
                placeholder="Tanggal Laporan Pengakhiran PKPU ke Hakim Pengawas"
                type="date"
                required
                usePlaceholder
              />
            </Col>
          </>
        ) : (
          <>
            <Col xs="12" className="px-3">
              <FormInput
                formik={formik}
                placeholder="Nomor Laporan Pengakhiran Kepailitan ke Hakim Pengawas"
                type="text"
                required
                usePlaceholder
              />
            </Col>
            <Col xs="12" className="px-3">
              <FormInput
                formik={formik}
                placeholder="Tanggal Laporan Pengakhiran Kepailitan ke Hakim Pengawas"
                type="date"
                required
                usePlaceholder
              />
            </Col>
          </>
        )}
        <Col xs="12" className="px-3">
          <FileUploadComponent
            label="Bukti Pengumuman"
            text="Pilih file Anda"
            name="bukti_pengumuman"
            resFile={(file) => formik.setFieldValue("bukti_pengumuman", file)}
            maxSizeMb={10}
            searchLatLon={false}
            validType="pdf"
            specified={true}
            required
            fieldValue={formik.values.bukti_pengumuman}
          />
        </Col>
      </Row>
      <div className="w-100 text-end">
        <ButtonCustom onClick={formik.handleSubmit} label={"Simpan"} />
      </div>
    </>
  );
};

export default LaporanPengakhiran;
