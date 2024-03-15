import { Bar } from "@ant-design/charts";
import { useQuery } from "@apollo/client";
import { FETCH_MONTH_ON_MONTH } from "../graphql/queries";
import Navbar from "./Navbar";
import "./common.css";
export const Charts = () => {
  const { data } = useQuery(FETCH_MONTH_ON_MONTH);

  var config = {
    data: data?.monthlyApplicationCounts,
    xField: "month",
    yField: "count",
  };
  return (
    <>
      <Navbar />
      <Bar className="charts" {...config} />;
    </>
  );
};
