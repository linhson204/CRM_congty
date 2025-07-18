import React, { useEffect } from "react";
import Highcharts from "highcharts";

export default function HightChart({ valueOptions }) {
  const defaultData = [0, 0, 0, 0, 0, 0, 0];
  const dataFolowingMonth = [1, 2, 4, 3, 5, 6, 8, 7, 9, 10.11, 12];
  const dataFolowingYear = [3, 6, 9, 3];
  const categories = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
  const categoriesFolowingMonth = [
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
  const categoriesFolowingYear = [2020, 2021, 2022, 2023];
  useEffect(() => {
    Highcharts.chart("container", {
      title: {
        text: " ",
      },

      xAxis: {
        type: "category",
        endOnTick: true,
        categories:
          valueOptions === "week"
            ? categories
            : valueOptions === "month"
            ? categoriesFolowingMonth
            : categoriesFolowingYear,
      },

      yAxis: {
        title: {
          text: "VND",
        },
      },

      tooltip: {
        headerFormat: "{point.x}<br />",
        pointFormat: "Doanh thu theo tuần: {point.y}",
      },

      accessibility: {
        enabled: false,
      },

      chart: {
        animation: false,
      },
      plotOptions: {
        series: {
          states: {
            hover: {
              animation: false,
            },
          },
        },
      },

      series: [
        {
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
      <figure className="highcharts-figure">
        <div id="container" style={{ overflow: "hidden" }}></div>
      </figure>
  );
}
