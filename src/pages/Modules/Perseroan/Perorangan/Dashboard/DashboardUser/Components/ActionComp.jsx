import { CustomTooltipMui } from "@/components/Common/TooltipMui";

const ActionComp = ({ handle, row }) => {
  return (
    <div className="d-flex align-items-center gap-3">
      <CustomTooltipMui title="Hapus" arrow>
        <div
          onClick={(e) => {
            e.stopPropagation();
            handle("delete", row.id_permohonan);
          }}
          className="action-item d-flex align-items-center m-0 p-0"
          style={{ cursor: "pointer" }}
        >
          <i className="bx bx-trash-alt fs-4" style={{ cursor: "pointer" }}></i>
        </div>
      </CustomTooltipMui>
      {row.status_permohonan == "Draft" && (
        <CustomTooltipMui title="Perbarui" arrow>
          <div
            onClick={(e) => {
              e.stopPropagation();
              handle("update", row.id_permohonan);
            }}
            className="action-item d-flex align-items-center m-0 p-0"
            style={{ cursor: "pointer" }}
          >
            <i className="bx bx-pencil fs-4" style={{ cursor: "pointer" }}></i>
          </div>
        </CustomTooltipMui>
      )}
    </div>
  );
};

export default ActionComp;
