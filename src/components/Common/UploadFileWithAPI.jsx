import { deleteMarina, postLayananFormData } from "@/helpers/api_helper";
import FileUploadComponent from "./UploadFile";
import { ToastifyService } from "../Toastify/toastifyService";
import Swal from "sweetalert2";
import { errorMsg, successMsg } from "@/helpers/Notification/toastNotification";
import * as url from "@/helpers/url_helper";

export const renderFileUpload = (label, name, formik) => {
  const toastifyService = new ToastifyService();

  const handleUpload = (file) => {
    const jenisBerkas = name;
    const formData = new FormData();
    formData.append(jenisBerkas, file);

    postLayananFormData("/apostille/permohonan/upload", formData).then(
      (res) => {
        const result = res?.data;

        const newBerkasItem = {
          id_berkas: result?.id_berkas,
          jenis_berkas: result?.jenis_berkas,
          s3_key: result?.s3_key,
          name: result?.original_name,
        };

        const updatedBerkas = [
          ...formik.values.berkas.filter(
            (item) => item.jenis_berkas !== jenisBerkas
          ),
          newBerkasItem,
        ];

        formik.setFieldValue("berkas", updatedBerkas);
      }
    );
  };

  const handleDelete = () => {
    const fileToDelete = formik.values.berkas.find(
      (item) => item.jenis_berkas === name
    );

    console.log("fileToDelete", fileToDelete);

    if (!fileToDelete?.id_berkas) return;

    toastifyService.confirmationDelete().then((res) => {
      if (res) {
        toastifyService.showLoading();

        deleteMarina(
          `${url.APOSTILLE_PERMOHONAN_DOKUMEN}/${fileToDelete.id_berkas}`
        )
          .then(() => {
            successMsg("success");
            Swal.close();
          })
          .catch((err) => {
            errorMsg(err);
            console.log("err", err);
            Swal.close();
          });
      }
    });
  };

  return (
    <FileUploadComponent
      label={label}
      text="Pilih file Anda"
      name={name}
      resFile={handleUpload}
      maxSizeMb={10}
      searchLatLon={false}
      validType="pdf"
      specified={true}
      required
      fieldValue={
        formik.values.berkas.find((item) => item.jenis_berkas === name) || null
      }
      handleDelete={handleDelete}
    />
  );
};
