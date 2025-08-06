import { ErrorMessage } from "formik";
import { FaInfoCircle } from "react-icons/fa";
import { FormGroup, Input, Label } from "reactstrap";

const checkboxOptions = [
  {
    value: "1",
    label:
      "Informasi dan data yang disampaikan dalam permohonan ini adalah yang sebenarnya, tidak lain dari yang sebenarnya.",
  },
  {
    value: "2",
    label:
      "Permohonan ini telah memenuhi syarat dan tidak melanggar larangan apapun sesuai dengan ketentuan peraturan perundang-undangan yang berlaku.",
  },
  {
    value: "3",
    label:
      "Siap menerima sanksi apapun tidak terbatas sanksi pidana, perdata, dan/atau sanksi administratif sesuai ketentuan peraturan perundang-undangan yang berlaku.",
  },
  {
    value: "4",
    label:
      "Dengan menyetujui pernyataan ini berarti saya siap bertanggung jawab penuh dan menandatangani secara sah pernyataan ini.",
  },
];

const ESignature = ({ values, setFieldValue }) => {
  const data = localStorage.getItem("userSession") || "";
  const dataUser = JSON.parse(data);
  const name = dataUser.user_detail.fullname;

  const handleCheckboxChange = (value) => {
    const selected = values.pernyataan || [];
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];

    setFieldValue("pernyataan", updated);
  };

  return (
    <section className="d-flex flex-column gap-4">
      <div
        style={{
          backgroundColor: "#EFF7FF",
          borderRadius: "8px",
          padding: "12px 10px",
        }}
      >
        <span className="fw-medium fs-5">Pernyataan Elektronik</span>
      </div>

      <span>
        Saya, <strong>{name}</strong>, yang bertanda tangan di bawah
        ini, menyatakan bahwa:
      </span>

      <div className="d-flex justify-content-center">
        <section>
          <div tag="fieldset" className="d-flex flex-column gap-3">
            {checkboxOptions.map(({ value, label }) => (
              <div key={value}>
                <Label check className="d-flex gap-2">
                  <Input
                    type="checkbox"
                    name="pernyataan"
                    value={value}
                    checked={values.pernyataan?.includes(value)}
                    onChange={() => handleCheckboxChange(value)}
                  />{" "}
                  {label}
                </Label>
              </div>
            ))}

            <ErrorMessage
              name="pernyataan"
              component="div"
              className="text-danger"
            />
          </div>
        </section>
      </div>

      <div
        className="d-flex align-items-center gap-2"
        style={{
          backgroundColor: "#FEF7EE",
          borderRadius: "8px",
          padding: "8px 12px",
        }}
      >
        <FaInfoCircle color="#EF7A20" />
        <span>
          Dengan klik tombol “Selanjutnya”, anda telah menandatangani pernyataan
          ini secara elektronik
        </span>
      </div>
    </section>
  );
};

export default ESignature;
