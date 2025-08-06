import React, { useState } from "react";
import { ToastifyService } from "../Toastify/toastifyService";

const HorizontalToggle = () => {
  const [isOn, setIsOn] = useState(false);
  const toastifyService = new ToastifyService();

  const handleToggle = () => {
    toastifyService
      .confirmationCustom(
        `${isOn ? "Nonaktifkan KBLI ini" : "Aktifkan KBLI ini"} `,
        "Perubahan status akan berdampak pada data korporasi terkait."
      )
      .then((res) => {
        if (res) {
          setIsOn(!isOn);
        }
      });
  };

  return (
    <label
      style={{
        display: "inline-block",
        width: "40px",
        height: "20px",
        borderRadius: "999px",
        backgroundColor: isOn ? "#4caf50" : "#ccc",
        position: "relative",
        cursor: "pointer",
        transition: "background-color 0.2s",
      }}
    >
      <input
        type="checkbox"
        checked={isOn}
        onChange={handleToggle}
        style={{ display: "none" }}
      />
      <span
        style={{
          position: "absolute",
          top: "2px",
          left: isOn ? "22px" : "2px",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: "white",
          transition: "left 0.2s",
        }}
      ></span>
    </label>
  );
};

export default HorizontalToggle;
