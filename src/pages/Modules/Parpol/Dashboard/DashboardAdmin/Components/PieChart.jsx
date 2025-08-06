import {
  capitalizeTheFirstLetterOfEachWord,
  formatNumber,
} from "@/helpers/services/convert";
import Chart from "react-apexcharts";

const PieChart = ({
  series,
  labels,
  width = 380,
  type,
  colorLabel,
  title = "Top 10 Koperasi Tingkat Kabupaten / Kota",
}) => {
  const formattedLabels = Array.isArray(labels)
    ? labels.map((label) => capitalizeTheFirstLetterOfEachWord(label))
    : [];

  // Calculate percentages for labels
  const total = series.reduce((sum, value) => sum + value, 0);
  const percentages = series.map((value) => Math.round((value / total) * 100));

  // Custom colors similar to the reference image
  const colors = [
    "#4285F4", // Blue - Kabupaten Cianjur
    "#FFC145", // Light Yellow - Kabupaten Bandung
    "#41C5F4", // Light Blue - Kota Bekasi
    "#F37735", // Orange - Kota Bandung
    "#FFA145", // Light Orange - Kabupaten Bogor
    "#7BC043", // Green - Kabupaten Sukabumi
    "#3D9970", // Dark Green - Kabupaten Karawang
    "#214D72", // Navy Blue - Kabupaten Bekasi
    "#7B4EA8", // Purple - Kabupaten Garut
    "#A64EA8", // Dark Purple - Kabupaten Subang
    // Additional colors for more regions if needed
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A8",
    "#A833FF",
    "#33FFF5",
    "#F5FF33",
    "#FF5733",
    "#33FF57",
    "#3357FF",
  ];

  const options = {
    chart: {
      type: "pie",
      fontFamily: "Arial, sans-serif",
    },
    colors: colors,
    labels: formattedLabels,
    tooltip: {
      enabled: true,
      custom: ({ series, seriesIndex, w }) => {
        const label = w.globals.labels[seriesIndex];
        const value = series[seriesIndex];
        return `
            <div style="padding: 8px; background: #1f2937; color: #fff; border-radius: 4px; font-size: 12px; max-width: 200px; word-wrap: break-word;">
              <strong style="display: block; white-space: normal;">${capitalizeTheFirstLetterOfEachWord(
                label
              )}</strong>
              Nilai: ${formatNumber(value)} ${type}
            </div>
        `;
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return `${percentages[opts.seriesIndex]}%`;
      },
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        colors: ["#fff"],
      },
      dropShadow: {
        enabled: false,
      },
    },
    legend: {
      show: false,
      position: "bottom",
      fontSize: "12px",
      formatter: function (seriesName, opts) {
        return `<div style="display: flex; flex-direction: column;">
      <span>${seriesName}</span>
      <span style="color: #999; font-size: 12px;">${formatNumber(
        series[opts.seriesIndex]
      )} ${type}</span>
    </div>`;
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        radius: 0,
      },
      itemMargin: {
        horizontal: 5,
        vertical: 8,
      },
      labels: {
        colors: colorLabel ?? "#000",
        fontSize: "12px",
      },
    },

    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          legend: {
            position: "bottom",
            formatter: function (seriesName, opts) {
              return `${seriesName} - ${formatNumber(
                series[opts.seriesIndex]
              )} ${type}`;
            },
          },
          chart: {
            width: 200,
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  // Create custom legend display for two-column layout
const renderCustomLegend = () => {
  const halfLength = Math.ceil(formattedLabels.length / 2);
  const leftColumn = formattedLabels.slice(0, halfLength);
  const rightColumn = formattedLabels.slice(halfLength);

  const renderColumn = (columnLabels, offset) => (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      {columnLabels.map((label, idx) => (
        <div
          key={`legend-${offset + idx}`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px 0",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <div
            style={{
              display: "flex",
              minWidth: 0,
            }}
          >
            <div
              className="mt-1"
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                marginRight: "8px",
                backgroundColor: colors[offset + idx],
                flexShrink: 0,
              }}
            ></div>
            <span
              style={{
                fontSize: "12px",
                fontWeight: 500,
                color: "#333",
                maxWidth: "150px",
                overflowWrap: "break-word",
                wordBreak: "break-word",
              }}
            >
              {label}
            </span>
          </div>
          <span
            style={{
              fontSize: "12px",
              fontWeight: 500,
              color: "#333",
              marginLeft: "8px",
              flexShrink: 0,
            }}
          >
            {formatNumber(series[offset + idx])}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        margin: "0 auto",
        backgroundColor: "#fff",
        borderRadius: "8px",
        gap: "20px",
      }}
    >
      {renderColumn(leftColumn, 0)}
      {renderColumn(rightColumn, halfLength)}
    </div>
  );
};


  // Disable built-in legend if we're using custom legend
  if (formattedLabels.length > 5) {
    options.legend.show = false;
  }

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{
        alignItems: "stretch",
        height: "100%",
      }}
    >
      <Chart
        options={options}
        series={series}
        type="pie"
        width={width}
        height="300"
      />
      <div
        className="mt-4"
        style={{
          width: "100%",
        }}
      >
        {renderCustomLegend()}
      </div>
    </div>
  );
};

export default PieChart;
