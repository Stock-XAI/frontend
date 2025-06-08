import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";

type Props = {
  data: Record<string, number[]> | "undefined";
  xlabel: string[];
};

const AreaChart = ({ data, xlabel }: Props) => {
  const [label, setLabel] = useState<string[]>([
    "2018-09-19T00:00:00.000Z",
    "2018-09-19T01:30:00.000Z",
    "2018-09-19T02:30:00.000Z",
    "2018-09-19T03:30:00.000Z",
    "2018-09-19T04:30:00.000Z",
    "2018-09-19T05:30:00.000Z",
    "2018-09-19T06:30:00.000Z",
  ]);

  const [series, setSeries] = useState<
    {
      name: string;
      data: number[];
    }[]
  >([
    {
      name: "series1",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "series2",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
  ]);

  useEffect(() => {
    if (!data || typeof data !== "object") return;

    const labels = Object.keys(data);
    const newSeries = labels.map((label) => ({
      name: label,
      data: data[label],
    }));

    setSeries(newSeries);
    setLabel(xlabel);
  }, [data]);

  const options: ApexOptions = {
    chart: {
      type: "area",
      zoom: {
        enabled: false,
      },
    },
    colors: ["#d9d9d9", "#bfbfbf", "#a6a6a6", "#8c8c8c"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "category",
      categories: label,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
  };

  return <Chart options={options} series={series} type="area" height={600} />;
};

export default AreaChart;
