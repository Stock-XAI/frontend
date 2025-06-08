import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useEffect, useMemo, useState } from "react";

type Props = {
  data: Record<string, number[]> | "undefined";
  xlabel: string[];
};

const types = ["column", "line"];

const PosNegChart = ({ data, xlabel }: Props) => {
  console.log(data);
  const [label, setLabel] = useState<string[]>([
    "2011-01-01",
    "2011-02-01",
    "2011-03-01",
    "2011-04-01",
    "2011-05-01",
    "2011-06-01",
    "2011-07-01",
    "2011-08-01",
    "2011-09-01",
    "2011-10-01",
    "2011-11-01",
    "2011-12-01",
    "2012-01-01",
    "2012-02-01",
    "2012-03-01",
    "2012-04-01",
    "2012-05-01",
    "2012-06-01",
    "2012-07-01",
    "2012-08-01",
    "2012-09-01",
    "2012-10-01",
    "2012-11-01",
    "2012-12-01",
    "2013-01-01",
    "2013-02-01",
    "2013-03-01",
    "2013-04-01",
    "2013-05-01",
    "2013-06-01",
    "2013-07-01",
    "2013-08-01",
    "2013-09-01",
  ]);

  const [series, setSeries] = useState<
    {
      name: string;
      type: string;
      data: number[];
    }[]
  >([
    {
      name: "Importance",
      type: "column",
      data: [
        1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1, -6.09, 0.34,
        3.88, 13.07, 5.8, 2, 7.37, 8.1, 13.57, 15.75, 17.1, 19.8, -27.03, -54.4,
        -47.2, -43.3, -18.6, -48.6, -41.1, -39.6, -37.6, -29.4, -21.4, -2.4,
      ],
    },
    {
      name: "Change",
      type: "line",
      data: [
        0.2, 0.5, 0.4, 0.1, -0.3, -0.5, -0.4, -0.2, -0.15, -0.05, 0.1, 0.3, 0.6,
        0.4, 0.2, 0.3, 0.35, 0.5, 0.6, 0.65, 0.7, -0.6, -0.8, -0.7, -0.5, -0.3,
        -0.7, -0.6, -0.55, -0.5, -0.4, -0.3, -0.1,
      ],
    },
  ]);

  const allData = useMemo(() => series.flatMap((s) => s.data), [series]);
  const padding = 0.01; // 예: 1% 여유
  const minValue = Math.min(...allData) - padding;
  const maxValue = Math.max(...allData) + padding;

  useEffect(() => {
    if (!data || typeof data !== "object") return;

    const labels = Object.keys(data);
    const newSeries = labels.map((label, index) => ({
      name: label,
      type: types[index],
      data: data[label],
    }));

    setSeries(newSeries);
    setLabel(xlabel);
  }, [data]);

  const options: ApexOptions = {
    chart: {
      height: 600,
      type: "line",
      zoom: { enabled: false },
    },
    colors: ["#d9d9d9", "#8c8c8c"],
    plotOptions: {
      bar: {
        columnWidth: "80%",
        colors: {
          ranges: [
            { from: -100, to: -46, color: "#F15B46" },
            { from: -45, to: 0, color: "#FEB019" },
          ],
        },
      },
    },
    stroke: {
      width: [0, 2],
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: "category",
      categories: label,
      labels: { rotate: -90 },
    },
    yaxis: {
      min: minValue,
      max: maxValue,
      title: { text: "Value" },
      labels: {
        formatter: (val) => `${val}`,
      },
      axisTicks: {
        show: true,
      },
      axisBorder: {
        show: true,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  return <Chart options={options} series={series} type="line" height={600} />;
};

export default PosNegChart;
