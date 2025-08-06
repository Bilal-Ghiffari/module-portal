import {
  capitalizeTheFirstLetterOfEachWord,
  formatNumber,
} from "@/helpers/services/convert";
import Chart from "react-apexcharts";

const LineChart = ({
  approvedSeries, // Data permohonan disetujui
  rejectedSeries, // Data permohonan ditolak
  labels,
  width = "100%",
  colorLabel,
}) => {
  const formattedLabels = labels.map((label) =>
    capitalizeTheFirstLetterOfEachWord(label)
  );

  const options = {
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    colors: ["#00C853", "#D50000"], // Hijau dan Merah
    stroke: {
      curve: "smooth",
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: ["#00C853", "#D50000"],
      strokeWidth: 2,
      strokeColors: "#fff",
    },
    xaxis: {
      categories: formattedLabels,
      labels: {
        rotate: -45,
        style: {
          colors: colorLabel ?? "#fff",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: colorLabel ?? "#fff",
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${formatNumber(val)} permohonan`,
      },
    },
    legend: {
      show: true,
      position: "top", // bisa juga "bottom", "left", "right"
      horizontalAlign: "center",
      labels: {
        colors: colorLabel ?? "#fff",
        useSeriesColors: false, // gunakan warna manual
      },
      markers: {
        width: 12,
        height: 12,
        radius: 12,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    grid: {
      borderColor: "#666",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 300 },
        },
      },
    ],
  };

  const series = [
    {
      name: "Disetujui",
      data: approvedSeries,
    },
    {
      name: "Ditolak",
      data: rejectedSeries,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      width={width}
      height={"85%"}
    />
  );
};

export default LineChart;
