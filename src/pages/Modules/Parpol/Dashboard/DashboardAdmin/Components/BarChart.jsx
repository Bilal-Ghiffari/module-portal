import {
  capitalizeTheFirstLetterOfEachWord,
  formatNumber,
} from "@/helpers/services/convert";
import Chart from "react-apexcharts";

const BarChart = ({
  series,
  labels,
  width = 380,
  type,
  colorLabel,
  rawValues,
}) => {
  const formattedLabels = labels.map((label) =>
    capitalizeTheFirstLetterOfEachWord(label)
  );

  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    colors: ["#60AAFA"],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 4,
        barHeight: "90%",
        columnWidth: "70%",
      },
    },
    dataLabels: {
      enabled: false,
      formatter: (val, opts) => {
        const index = opts.dataPointIndex;
        const percentage = rawValues?.[index] ?? 0;
        return `JUMLAH: ${formatNumber(val)} (${formatNumber(percentage)}%)`;
      },
      style: {
        colors: ["#ffffff"], // Putih bersih
        fontSize: "12px", // Sedikit lebih besar
        fontWeight: "bold", // Tebal
        textShadow: "1px 1px 2px #000", // Tambahkan bayangan agar lebih terlihat di background gelap
      },
      offsetX: 10, // Geser sedikit ke kanan (untuk horizontal bar)
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 2,
        color: "#000", // bayangan hitam
        opacity: 0.6,
      },
    },

    xaxis: {
      categories: formattedLabels,
      labels: {
        rotate: -45, // biar tidak tumpang tindih
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
      custom: ({ seriesIndex, dataPointIndex, w }) => {
        const jumlah = w.globals.series[seriesIndex][dataPointIndex]; // jumlah asli
        const persentase = rawValues?.[dataPointIndex] ?? 0;

        return `
      <div style="padding: 8px; background: #1f2937; color: #fff; border-radius: 4px; font-size: 12px;">
        <strong>${capitalizeTheFirstLetterOfEachWord(
          labels[dataPointIndex]
        )}</strong><br/>
        Jumlah: ${formatNumber(jumlah)} ${type}<br/>
      </div>
    `;
      },
    },

    legend: {
      show: false,
    },
    grid: {
      borderColor: "#666",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
        },
      },
    ],
  };

  const formattedSeries = [
    {
      name: type,
      data: series,
    },
  ];

  return (
    <Chart
      options={options}
      series={formattedSeries}
      type="bar"
      width={width}
      height={'100%'}
    />
  );
};

export default BarChart;
