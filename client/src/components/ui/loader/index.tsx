import { FC } from "react";

import { CircularProgress, Container, Stack } from "@mui/material";

export const Loader: FC = () => (
  <Container>
    <Stack alignItems="center" justifyContent="center" spacing={5}>
      <CircularProgress size={100} color="info" />
    </Stack>
  </Container>
);
