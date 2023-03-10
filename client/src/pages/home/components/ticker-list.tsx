import { FC } from "react";

import { Grid } from "@mui/material";
import { TicketCard } from "components/cards";
import { useAppSelector } from "hooks";
import { getTickerInfo } from "store/selectors";

export const TickerList: FC = () => {
  const { tickers, selectedTickerNames } = useAppSelector(getTickerInfo);

  return (
    <Grid container spacing={2} sx={{ marginTop: 3 }}>
      {tickers
        .filter((ticker) => selectedTickerNames.includes(ticker.ticker))
        .map((ticker, index) => (
          <Grid key={index} item xs={12} sm={12} md={6} lg={4}>
            <TicketCard key={index} info={ticker} />
          </Grid>
        ))}
    </Grid>
  );
};
