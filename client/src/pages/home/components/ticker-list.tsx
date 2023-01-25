import { Grid } from "@mui/material";
import { TicketCard } from "components/cards";
import { useAppSelector } from "hooks";
import { FC } from "react";
import { getSocketInfo } from "store/selectors";

export const TickerList: FC = () => {
  const { tickers, selectedTickerNames } = useAppSelector(getSocketInfo);

  return (
    <Grid container spacing={2} sx={{ marginTop: 3 }}>
      {tickers
        .filter((ticker) => selectedTickerNames.includes(ticker.ticker))
        .map((ticker, index) => (
          <Grid key={index} item xs={4}>
            <TicketCard key={index} info={ticker} />
          </Grid>
        ))}
    </Grid>
  );
};
