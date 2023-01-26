import { FC, useEffect } from "react";
import { Container } from "@mui/material";
import { useDispatchedActions } from "hooks";
import { TickerList } from "./components/ticker-list";
import { Select } from "./components/select";
import { Chart } from "./components/chart";

const Home: FC = () => {
  const { startConnecting, endConnecting } = useDispatchedActions();

  useEffect(() => {
    startConnecting();

    return () => {
      endConnecting();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div data-testid="main-page">
      <Container>
        <Select />
        <TickerList />
        <Chart />
      </Container>
    </div>
  );
};

export default Home;
