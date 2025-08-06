import { useState } from "react";

const Action = () => {
  const [actionRowId, setActionRowId] = useState(null);

  const toggleActionMenu = (rowId) => {
    setActionRowId((prevId) => (prevId === rowId ? null : rowId));
  };
  return (
    <div className="d-flex justify-content-between fa-lg text-muted position-relative">
      <i
        onClick={() => toggleActionMenu(row.id)}
        className="dripicons-gear fs-4"
        style={{ cursor: "pointer" }}
      ></i>
      {actionRowId === row.id && (
        <div
          className={`action-menu position-absolute bg-white rounded-3 shadow-sm ${
            actionRowId === row.id ? "active" : ""
          }`}
          style={{ left: "30px", zIndex: 1000 }}
        >
          <div className="action-item d-flex align-items-center m-0">
            <i className="mdi mdi-eye-outline fs-4"></i>
            <p className="text-decoration-none text-dark fs-6 m-0 p-0 ms-2">
              Detail
            </p>
          </div>
          <div className="action-item d-flex align-items-center m-0">
            <i className="bx bx-pencil fs-4"></i>
            <p className="text-decoration-none text-dark fs-6 m-0 p-0 ms-2">
              Edit
            </p>
          </div>
          <div className="action-item d-flex align-items-center m-0">
            <i className="bx bx-trash-alt fs-4"></i>
            <p className="text-decoration-none text-dark fs-6 m-0 p-0 ms-2">
              Hapus
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Action;
