import React, { useRef, useEffect } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Chart from "chart.js/auto";

const LineChart = ({
  title,
  data,
  labels,
  datasets = null, // For multiple datasets
  backgroundColor = "rgba(54, 162, 235, 0.2)",
  borderColor = "rgba(54, 162, 235, 1)",
  borderWidth = 2,
  pointBackgroundColor = "rgba(54, 162, 235, 1)",
  pointRadius = 4,
  pointHoverRadius = 6,
  fill = false,
  tension = 0.4,
  maintainAspectRatio = true,
  aspectRatio = 2,
  showLegend = false,
  yAxisTitle = "",
  xAxisTitle = "",
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      const chartData = datasets || [
        {
          label: title,
          data: data,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: borderWidth,
          pointBackgroundColor: pointBackgroundColor,
          pointRadius: pointRadius,
          pointHoverRadius: pointHoverRadius,
          fill: fill,
          tension: tension,
        },
      ];

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: chartData,
        },
        options: {
          responsive: true,
          maintainAspectRatio: maintainAspectRatio,
          aspectRatio: aspectRatio,
          plugins: {
            legend: {
              display: showLegend,
              position: "bottom",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.dataset.label}: ${context.raw}`;
                },
              },
            },
            title: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: false,
              title: {
                display: !!yAxisTitle,
                text: yAxisTitle,
              },
              grid: {
                drawBorder: false,
                color: "rgba(0, 0, 0, 0.05)",
              },
            },
            x: {
              title: {
                display: !!xAxisTitle,
                text: xAxisTitle,
              },
              grid: {
                display: false,
                drawBorder: false,
              },
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
        },
      });
    }

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [
    data,
    labels,
    title,
    backgroundColor,
    borderColor,
    borderWidth,
    pointBackgroundColor,
    pointRadius,
    pointHoverRadius,
    fill,
    tension,
    maintainAspectRatio,
    aspectRatio,
    showLegend,
    yAxisTitle,
    xAxisTitle,
    datasets,
  ]);

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        border: "1px solid #E7E7E7",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        p: 2,
      }}
    >
      <CardContent>
        <Box
          sx={{
            borderBottom: "1px solid #E7E7E7",
            marginBottom: 3,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "#202020",
              fontFamily: "Poppins",
              fontSize: "16px",
            }}
          >
            {title}
          </Typography>
        </Box>
        <div style={{ position: "relative", height: "auto", width: "100%" }}>
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChart;
