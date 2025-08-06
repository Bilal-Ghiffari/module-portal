import { CircularProgress } from "@mui/material";


export const LoadingWithMessage = ({ text }) => {
  return (
    <div>
      <CircularProgress size={72} />
      <p>{text ?? "Sedang memuat data..."}</p>
    </div>
  );
};
