import { Link } from "react-router-dom";

const Section = ({ data, title, modul, col = "6" }) => {
  return (
    <div className={`mb-4`} style={{ padding: "0px 7px" }}>
      <div>
        {data.map((field, index) => (
          <div key={index} className={`data-item ${index % 2 === 0 ? "" : ""}`}>
            <div className="data-label">{field.label}</div>
            <div className="data-value">
              {field.label === "File Juknis" ? (
                <Link
                  to={data.file_juknis?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {field.value}
                </Link>
              ) : (
                field.value
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
