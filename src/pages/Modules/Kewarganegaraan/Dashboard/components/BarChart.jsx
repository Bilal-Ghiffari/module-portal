import React, { useRef, useEffect } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Chart from "chart.js/auto";

const BarChart = ({
  title,
  data,
  labels,
  backgroundColor = "rgba(54, 162, 235, 0.6)",
  borderColor = "rgba(54, 162, 235, 1)",
  borderWidth = 1,
  maintainAspectRatio = true,
  aspectRatio = 2,
}) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: title,
              data: data,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: borderWidth,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: maintainAspectRatio,
          aspectRatio: aspectRatio,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.dataset.label}: ${context.raw}`;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                drawBorder: false,
                color: "rgba(0, 0, 0, 0.05)",
              },
              ticks: {
                stepSize: Math.ceil(Math.max(...data) / 5),
              },
            },
            x: {
              grid: {
                display: false,
                drawBorder: false,
              },
            },
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
    maintainAspectRatio,
    aspectRatio,
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
        <div style={{ position: "relative", height: "300px" }}>
          <canvas ref={chartRef} />
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChart;
