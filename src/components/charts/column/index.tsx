import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";

type Props = {
  data: Record<string, number[]> | "undefined";
};

const ColumnChart = ({ data }: Props) => {
  const [series, setSeries] = useState<
    {
      name: string;
      data: number[];
    }[]
  >([
    {
      name: "PRODUCT A",
      data: [44, 55, 41, 67, 22, 43],
    },
    {
      name: "PRODUCT B",
      data: [13, 23, 20, 8, 13, 27],
    },
    {
      name: "PRODUCT C",
      data: [11, 17, 15, 15, 21, 14],
    },
    {
      name: "PRODUCT D",
      data: [21, 7, 25, 13, 22, 8],
    },
  ]);

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    if (!data || typeof data !== "object") return;

    const sortedDates = Object.keys(data).sort();
    setCategories(sortedDates);

    const newSeries = [
      "Date String",
      "Open",
      "High",
      "Low",
      "Close",
      "Volume",
      "Changes",
    ].map((label, i) => ({
      name: label,
      data: sortedDates.map((date) => data[date][i]),
    }));

    setSeries(newSeries);
  }, [data]);

  const options: ApexOptions = {
    chart: {
      type: "bar" as const,
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: [
      "#f2f2f2",
      "#d9d9d9",
      "#bfbfbf",
      "#a6a6a6",
      "#8c8c8c",
      "#737373",
      "#595959",
    ],
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
        dataLabels: {
          total: {
            enabled: false,
            style: {
              fontSize: "13px",
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      // type: "datetime",
      type: "category",
      categories: categories,
    },
    legend: {
      position: "right",
      offsetY: 40,
    },
    fill: {
      opacity: 1,
    },
  };

  return <Chart options={options} series={series} type="bar" height={600} />;
};

export default ColumnChart;
