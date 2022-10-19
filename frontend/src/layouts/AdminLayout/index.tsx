/* eslint-disable react/require-default-props */
import { Box, CssBaseline, SxProps, Theme, Toolbar } from "@mui/material";
import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { Helmet } from "react-helmet";

import ToolbarContent from "./ToolbarContent";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  backgroundColor: "#0047AB",
  transition: theme.transitions.create(["margin", "width"], {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.sharp,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const style = {
  root: {
    backgroundColor: (theme: Theme) => theme.palette.background.default,
    display: "flex",
    height: "100%",
    maxWidth: 1000,
    width: "100%",
  },
};

type Props = {
  children?: React.ReactNode;
  title?: string;
  sx?: SxProps<Theme>;
  toolbarContent?: React.ReactNode;
};

const AdminLayout = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      children = undefined,
      title = "",
      sx = undefined,
      toolbarContent = <ToolbarContent />,
    }: Props,
    ref
  ) => {
    return (
      <Box ref={ref as any} sx={{ ...style.root, ...sx }}>
        <Helmet>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <title>{title}</title>
        </Helmet>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed">
            <Toolbar>{toolbarContent}</Toolbar>
          </AppBar>
          <Main>
            <DrawerHeader />
            {children}
          </Main>
        </Box>
      </Box>
    );
  }
);

export default AdminLayout;
