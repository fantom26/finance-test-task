import { useAppSelector } from "hooks";
import { FC } from "react";
import { getSocketInfo } from "store/selectors";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { green, red } from "@mui/material/colors";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { Box } from "@mui/material";

dayjs.extend(LocalizedFormat);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
};

export const Chart: FC = () => {
  const { tickers, pricesOfTicker, tickerForChart } =
    useAppSelector(getSocketInfo);

  const currentTicker = tickers.find(
    (ticker) => ticker.ticker === tickerForChart
  );

  const data = {
    labels:
      pricesOfTicker?.AAPL?.x.map((date) => dayjs(date).format("LTS")) || [],
    datasets: [
      {
        label: `Ticker of ${tickerForChart}`,
        data: pricesOfTicker?.[tickerForChart]?.y || [],
        borderColor: currentTicker?.incremented ? green[700] : red[700],
        backgroundColor: currentTicker?.incremented ? green[700] : red[700],
      },
    ],
  };
  return (
    <>
      {tickerForChart.length > 0 ? (
        <Box sx={{ marginBlock: 4 }}>
          <Line options={options} data={data} />
        </Box>
      ) : null}
    </>
  );
};
