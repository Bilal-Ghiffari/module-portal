import { Table as ReactstrapTable } from "reactstrap";
import { FaTrash, FaPen } from "react-icons/fa";
import { formatCurrency } from "@/helpers/services/handleInput";

const TablePersekutuanKomanditer = ({
  columns,
  data,
  striped = false,
  bordered = false,
  hover = false,
  onEdit,
  onDelete,
}) => {
  const handleEdit = (index) => {
    if (typeof onEdit === "function") onEdit(index);
  };

  const handleDelete = (index) => {
    if (typeof onDelete === "function") onDelete(index);
  };

  return (
    <div style={{ overflow: "auto" }}>
      <ReactstrapTable striped={striped} bordered={bordered} hover={hover}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                style={col.width ? { width: `${col.width}px` } : {}}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center">
                Data tidak tersedia
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col, colIdx) => {
                  const style = col.width ? { width: `${col.width}px` } : {};
                  const className =
                    col.accessor === "no" || col.accessor === "aksi"
                      ? "text-center"
                      : undefined;

                  if (col.accessor === "no") {
                    return (
                      <td key={colIdx} style={style} className={className}>
                        {idx + 1}
                      </td>
                    );
                  }

                  if (col.accessor === "aksi") {
                    return (
                      <td key={colIdx} style={style} className={className}>
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            type="button"
                            className="btn p-0"
                            onClick={() => handleEdit(idx)}
                          >
                            <FaPen color="green" />
                          </button>
                          <button
                            type="button"
                            className="btn p-0"
                            onClick={() => handleDelete(idx)}
                          >
                            <FaTrash color="red" />
                          </button>
                        </div>
                      </td>
                    );
                  }

                  if (col.type === "currency") {
                    return (
                      <td key={colIdx} style={style}>
                        Rp. {formatCurrency(row[col.accessor])}
                      </td>
                    );
                  }

                  return (
                    <td key={colIdx} style={style}>
                      {row[col.accessor]}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </ReactstrapTable>
    </div>
  );
};

export default TablePersekutuanKomanditer;
