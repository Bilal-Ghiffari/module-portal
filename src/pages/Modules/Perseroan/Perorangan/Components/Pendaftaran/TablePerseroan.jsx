const TablePerseroan = ({ data }) => {
  const getStatusBadge = (status) => {
    const styles = {
      Terverifikasi: {
        backgroundColor: "#d1fae5",
        color: "#065f46",
      },
      Ditolak: {
        backgroundColor: "#fee2e2",
        color: "#991b1b",
      },
      default: {
        backgroundColor: "#fef9c3",
        color: "#92400e",
      },
    };

    const { backgroundColor, color } = styles[status] || styles.default;

    return (
      <span
        style={{
          backgroundColor,
          color,
          borderRadius: "12px",
          padding: "2px 8px",
          fontSize: "0.75rem",
          width: "100px",
          display: "inline-block",
          textAlign: "center",
          whiteSpace: "nowrap",
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <div
      style={{
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid #e0e0e0",
      }}
    >
      <table className="w-100">
        <thead style={{ backgroundColor: "#f3f4f6" }}>
          <tr>
            <th
              className="p-2 text-start"
              style={{ fontWeight: "500", fontSize: "0.9rem" }}
            >
              No
            </th>
            <th
              className="p-2 text-start"
              style={{ fontWeight: "500", fontSize: "0.9rem" }}
            >
              Nama Perseroan
            </th>
            <th
              className="p-2 text-start"
              style={{ fontWeight: "500", fontSize: "0.9rem" }}
            >
              Status
            </th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "#fff" }}>
          {data.map((item) => (
            <tr
              key={item.no}
              style={{
                borderBottom: "1px solid #f0f0f0",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f9fafb")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#fff")
              }
            >
              <td className="p-2" style={{ fontSize: "0.9rem" }}>
                {item.no}
              </td>
              <td className="p-2" style={{ fontSize: "0.9rem" }}>
                {item.nama}
              </td>
              <td className="p-2" style={{ fontSize: "0.9rem" }}>
                {getStatusBadge(item.status)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePerseroan;
