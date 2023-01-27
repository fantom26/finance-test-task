import { FC, useEffect } from "react";

import { Container } from "@mui/material";
import { useDispatchedActions } from "hooks";

import { Chart, Select, TickerList } from "./components/";

const Home: FC = () => {
  const { startConnecting } = useDispatchedActions();

  useEffect(() => {
    startConnecting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Container>
        <Select />
        <TickerList />
        <Chart />
      </Container>
    </div>
  );
};

export default Home;
