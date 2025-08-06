import { Formik } from "formik";
import * as Yup from "yup";
import sticker from "@/assets/ahu/sticker-apostille.png";
import { FormInput } from "@/components/Common/FormField";
import Sertifikat from "./Sertifikat";

const validationSchema = Yup.object().shape({
  nama_lengkap: Yup.string().required("Required"),
});

const Sticker = ({ label }) => {
  return (
    <Formik
      initialValues={{ nama_lengkap: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Submitted values:", values);
        // lakukan sesuatu seperti cetak atau API call di sini
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div>
            {label == "Detail Permohonan Legalisasi" ? (
              <img src={sticker} style={{ width: "100%" }} alt="Sticker" />
            ) : (
              <Sertifikat name={formik.values.nama_lengkap}/>
            )}{" "}
            <div className="d-flex align-items-center gap-2 mt-4">
              <div className="w-75">
                <FormInput
                  formik={formik}
                  name="nama_lengkap"
                  type="text"
                  placeholder="Nama Lengkap"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mt-1">
                Submit
              </button>
            </div>
            <div className="w-full d-flex align-items-center justify-content-center gap-2 my-2">
              <button type="button" className="btn btn-outline-primary">
                Cetak
              </button>
              <button type="button" className="btn btn-outline-primary">
                Request Cetak Ulang
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Sticker;
