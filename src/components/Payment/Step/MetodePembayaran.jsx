import Checked from "@/components/Common/Checked";
import bca from "@/assets/bank/BCA.png";
import mandiri from "@/assets/bank/Mandiri.png";
import bri from "@/assets/bank/Bri.png";
import bni from "@/assets/bank/BNI.png";

const MetodePembayaran = ({ formik }) => {
  const data = [
    {
      id: "1",
      icon: bca,
      label: "BCA",
      value: "bca",
    },
    {
      id: "2",
      icon: mandiri,
      label: "Mandiri",
      value: "mandiri",
    },
    {
      id: "3",
      icon: bri,
      label: "BRI",
      value: "bri",
    },
    {
      id: "4",
      icon: bni,
      label: "BNI",
      value: "bni",
    },
  ];

  return (
    <div className="d-flex flex-column gap-2">
      {data.map((bank) => (
        <div
          key={bank.id}
          style={{ border: "1px solid #ccc" }}
          className="rounded-2 d-flex justify-content-between align-items-center p-2"
        >
          <div className="d-flex align-items-center gap-3">
            <img src={bank.icon} alt={bank.label} style={{ width: "50px" }} />
            <p className="m-0 p-0 fw-bold">Bank {bank.label} (Virtual Account)</p>
          </div>
          <Checked
            value={bank.value}
            fieldName="metode_pembayaran" // contoh: sesuaikan dengan nama field formik Anda
            formik={formik}
          />
        </div>
      ))}
    </div>
  );
};

export default MetodePembayaran;
