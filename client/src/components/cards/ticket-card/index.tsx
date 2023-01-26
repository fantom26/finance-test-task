import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Avatar, Button, Card, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { ITicker } from "utils/declarations";
import { green, red } from "@mui/material/colors";
import { useDispatchedActions } from "hooks";

interface ITicketCard {
  info: ITicker;
}

export const TicketCard: FC<ITicketCard> = (props) => {
  const { info } = props;
  const { selectTickerForChart } = useDispatchedActions();

  return (
    <Card sx={{ padding: "15px" }}>
      <Stack
        gap="15px"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Avatar
          sx={{
            bgcolor: info.incremented ? green[200] : red[200],
          }}
        >
          {info.incremented ? (
            <ArrowUpward style={{ color: green[700] }} />
          ) : (
            <ArrowDownward style={{ color: red[700] }} />
          )}
        </Avatar>
        <Stack>
          <Typography variant="h6">{info.ticker}</Typography>
          <Typography variant="body1" color="secondary.main">
            {info.price}
          </Typography>
        </Stack>
        <Stack>
          <Typography
            variant="body1"
            color={info.incremented ? green[700] : red[700]}
          >
            {info.incremented ? "" : "-"}
            {info.change_percent}%
          </Typography>
          <Typography
            variant="body1"
            color={info.incremented ? green[700] : red[700]}
          >
            {info.incremented ? "" : "-"}
            {info.change}
          </Typography>
        </Stack>
        <Button
          variant="contained"
          onClick={() => selectTickerForChart(info.ticker)}
        >
          Show chart
        </Button>
      </Stack>
    </Card>
  );
};
