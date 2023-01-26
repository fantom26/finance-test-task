import { useDispatchedActions } from "hooks";
import { FC, useEffect } from "react";
import { Container } from "@mui/material";
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
    <>
      <Container>
        <Select />
        <TickerList />
        <Chart />
      </Container>
    </>
  );
};

export default Home;
