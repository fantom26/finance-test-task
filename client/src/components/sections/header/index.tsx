import {
  AppBar,
  Box,
  Container,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ paddingBlock: "10px" }}>
        <Container>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ flexGrow: 1 }}
          >
            <MuiLink
              component={RouterLink}
              to="/"
              color="inherit"
              data-testid="main-link"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="h6">Treding app</Typography>
            </MuiLink>

            <MuiLink
              component={RouterLink}
              to="/test"
              color="inherit"
              data-testid="test-link"
              style={{ textDecoration: "none" }}
            >
              <Typography variant="h6">test</Typography>
            </MuiLink>
          </Stack>
        </Container>
      </AppBar>
    </Box>
  );
};
