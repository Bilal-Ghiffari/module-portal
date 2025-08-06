import Button from "@mui/material/Button";

const ButtonCustom = ({ onClick, label }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        mr: 1,
        backgroundColor: "#041662",
        color: "#fff",
        border: "1px solid grey",
        px: 2,
        py: 1,
        "&:hover": {
          backgroundColor: "#041992",
          color: "#fff",
        },
        textTransform: "initial",
      }}
    >
      {label}
    </Button>
  );
};

export default ButtonCustom;
