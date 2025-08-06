import { ErrorMessage } from "formik";
import { FormGroup, Label, Input, FormFeedback, Button } from "reactstrap";

const checkboxOptions = [
  {
    label:
      "Memiliki modal dan/atau nilai barang yang disetorkan lebih dari 25% (dua puluh lima persen) sebagaimana tercantum dalam perikatan pendirian persekutuan komanditer",
    value: "1",
  },
  {
    label:
      "Menerima keuntungan atau laba lebih dari 25% (dua puluh lima persen) dari keuntungan atau laba yang diperoleh persekutuan komanditer per tahun",
    value: "2",
  },
  {
    label:
      "Memiliki kewenangan atau kekuasaan untuk mempengaruhi atau mengendalikan persekutuan komanditer tanpa harus mendapat otorisasi dari pihak manapun",
    value: "3",
  },
  { label: "Menerima manfaat dari persekutuan komanditer", value: "4" },
  {
    label:
      "Merupakan pemilik sebenarnya dari dana atas modal dan/atau nilai barang yang disetorkan pada persekutuan komanditer.",
    value: "5",
  },
];

const KriteriaPemilikManfaat = ({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  touched,
}) => {
  const group1 = ["1", "2"];
  const group2 = ["3", "4", "5"];

  const hasGroup1 = values.kriteria?.some((v) => group1.includes(v));
  const hasGroup2 = values.kriteria?.some((v) => group2.includes(v));

  const handleCheckboxChange = (value) => {
    const currentIndex = values.kriteria.indexOf(value);
    let newArray = [...values.kriteria];

    if (currentIndex > -1) {
      newArray.splice(currentIndex, 1);
    } else {
      newArray.push(value);
    }

    setFieldValue("kriteria", newArray);
  };
  
  return (
    <FormGroup tag="fieldset" className="d-flex flex-column gap-2">
      <span className="fw-medium">
        Pemilik Manfaat dari badan usaha merupakan orang perseorangan yang
        memenuhi kriteria: <span className="text-danger">*</span>
      </span>
      {checkboxOptions.map((option) => {
        let disabled = false;
        if (hasGroup1 && group2.includes(option.value)) {
          disabled = true;
        } else if (hasGroup2 && group1.includes(option.value)) {
          disabled = true;
        }
        return (
          <FormGroup check key={option.value}>
            <Label check>
              <Input
                type="checkbox"
                name="kriteria"
                value={option.value}
                checked={values.kriteria?.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
                // invalid={touched.kriteria && !!errors.kriteria}
                disabled={disabled}
              />
              {option.label}
            </Label>
          </FormGroup>
        );
      })}

      <ErrorMessage name="kriteria" component="div" className="text-danger" />
    </FormGroup>
  );
};

export default KriteriaPemilikManfaat;
