import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const CountdownTimer = () => {
  // targetTime = sekarang + 1 hari
  const targetTime = dayjs().add(1, "day");

  const calculateTimeLeft = () => {
    const diff = targetTime.diff(dayjs(), "second");
    if (diff <= 0) return { jam: 0, menit: 0, detik: 0 };

    const jam = Math.floor(diff / 3600);
    const menit = Math.floor((diff % 3600) / 60);
    const detik = diff % 60;

    return { jam, menit, detik };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="fw-bold">
      {timeLeft.jam} jam {timeLeft.menit} menit {timeLeft.detik} detik
    </span>
  );
};

export default CountdownTimer;
