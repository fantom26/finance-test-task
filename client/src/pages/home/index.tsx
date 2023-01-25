import { useDispatchedActions } from "hooks";
import { FC, useEffect } from "react";
import { Container } from "@mui/material";
import { TickerList } from "./components/ticker-list";
import { Select } from "./components/select";

const Home: FC = () => {
  const { startConnecting } = useDispatchedActions();

  useEffect(() => {
    startConnecting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container>
        <Select />
        <TickerList />
      </Container>
    </>
  );
};

export default Home;
