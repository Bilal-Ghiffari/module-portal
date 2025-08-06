import { CustomTooltipMui } from "@/components/Common/TooltipMui";

const ActionComp = ({ handle, index }) => {
  return (
    <div className="d-flex align-items-center gap-3">
      <CustomTooltipMui title="Edit" arrow>
        <div
          onClick={() => handle("edit", index)}
          className="action-item d-flex align-items-center m-0 p-0"
        >
          <i className="bx bx-pencil fs-4"></i>
        </div>
      </CustomTooltipMui>
      <CustomTooltipMui title="Hapus" arrow>
        <div
          onClick={() => handle("delete", index)}
          className="action-item d-flex align-items-center m-0 p-0"
        >
          <i className="bx bx-trash-alt fs-4"></i>
        </div>
      </CustomTooltipMui>
    </div>
  );
};

export default ActionComp;
