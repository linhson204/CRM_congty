import React, { useEffect } from "react";
import Highcharts from "highcharts";

export default function HightChartThuChi({ valueOptions }) {
  const defaultData = [0, 0, 0, 250000, 230000, 0, 0];
  const dataFolowingMonth = [];
  const dataFolowingYear = [1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const categories = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const categoriesFolowingMonth = [];

  for (let i = 1; i <= 31; i++) {
    categoriesFolowingMonth.push(i);
    if (i == 1 || i == 2 || i == 5) {
      dataFolowingMonth.push(i);
    } else {
      dataFolowingMonth.push(0);
    }
  }
  const categoriesFolowingYear = [
    "T1",
    "T2",
    "T4",
    "T3",
    "T5",
    "T6",
    "T8",
    "T7",
    "T9",
    "T10",
    "T11",
    "T12",
  ];
  useEffect(() => {
    Highcharts.chart("container", {
      chart: {
        type: "column",
      },
      title: false,
      xAxis: {
        categories:
          valueOptions === "week"
            ? categories
            : valueOptions === "month"
            ? categoriesFolowingMonth
            : categoriesFolowingYear,
        crosshair: true,
        accessibility: {
          description: "Countries",
        },
      },

      yAxis: {
        title: {
          text: "VND",
        },
      },
      tooltip: {
        valueSuffix: " VNĐ",
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: "Tổng thu",
          color: "blue",
          data:
            valueOptions === "week"
              ? defaultData
              : valueOptions === "month"
              ? dataFolowingMonth
              : dataFolowingYear,
          pointStart: 0,
        },
        {
          name: "Tổng chi",
          color: "red",
          data:
            valueOptions === "week"
              ? defaultData
              : valueOptions === "month"
              ? dataFolowingMonth
              : dataFolowingYear,
          pointStart: 0,
        },
      ],
    });
  }, [valueOptions]);

  return (
    <figure className="highcharts-figure2">
      <div id="container" style={{ height: "500px", width: "90%" }}></div>
    </figure>
  );
}
