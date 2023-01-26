import { FC, useEffect, useState } from "react";

import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Avatar, Button, Card, Stack, Typography } from "@mui/material";
import { green, red } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useDispatchedActions } from "hooks";
import { ITicker } from "utils/declarations";

interface ITicketCard {
  info: ITicker;
}

export const TicketCard: FC<ITicketCard> = (props) => {
  const { info } = props;
  const { selectTickerForChart } = useDispatchedActions();
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setChanged(true);

    setTimeout(() => {
      setChanged(false);
    }, 1000);
  }, [info]);

  return (
    <Card sx={{ padding: "15px" }}>
      <Stack gap="15px" direction="row" alignItems="center" justifyContent="space-between">
        <Avatar
          sx={{
            bgcolor: info.incremented ? green[200] : red[200]
          }}
        >
          {info.incremented ? <ArrowUpward style={{ color: green[700] }} /> : <ArrowDownward style={{ color: red[700] }} />}
        </Avatar>
        <Stack>
          <Typography variant="h6">{info.ticker}</Typography>
          <Box className="price">
            <Typography variant="body1" color="secondary.main" className={changed ? "changed" : ""}>
              {info.price}
            </Typography>
          </Box>
        </Stack>
        <Stack>
          <Typography variant="body1" className={changed ? "changed" : ""} style={{ fontWeight: 700 }} color={info.incremented ? green[700] : red[700]}>
            {info.incremented ? "+" : "-"}
            {info.change_percent}%
          </Typography>
          <Typography variant="body1" className={changed ? "changed" : ""} style={{ fontWeight: 700 }} color={info.incremented ? green[700] : red[700]}>
            {info.incremented ? "+" : "-"}
            {info.change}
          </Typography>
        </Stack>
        <Button variant="contained" onClick={() => selectTickerForChart(info.ticker)}>
          Show chart
        </Button>
      </Stack>
    </Card>
  );
};
