import { Link } from "react-router-dom";

const Section = ({ data, widthLabel = "w-25", widthValue = "w-50" }) => {
  return (
    <div className={`mb-4`} style={{ padding: "0px 7px" }}>
      <div>
        {data.map((field, index) => (
          <div key={index} className={`data-item ${index % 2 === 0 ? "" : ""}`}>
            <div className={`data-label ${widthLabel}`}>{field.label}</div>
            <div className={`data-value ${widthValue}`}>: {field.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
