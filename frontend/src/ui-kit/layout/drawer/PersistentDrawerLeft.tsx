import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";

import DrawerContent from "./examples/DrawerContent";
import MainContent from "./examples/MainContent";
import ToolbarContent from "./examples/ToolbarContent";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  marginLeft: `-${drawerWidth}px`,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.sharp,
  }),
  ...(open && {
    marginLeft: 0,
    transition: theme.transitions.create("margin", {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.sharp,
  }),
  ...(open && {
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
  }),
  backgroundColor: "#0047AB",
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

type Props = {
  drawerContent?: React.ReactNode;
  rtlDrawerHeaderCloseIcon?: React.ReactNode;
  ltrDrawerHeaderCloseIcon?: React.ReactNode;
  menuIcon?: React.ReactNode;
  mainContent?: React.ReactNode;
  handleDrawerToggle: () => void;
  toolbarContent?: React.ReactNode;
  open: boolean;
};

export default function PersistentDrawerLeft({
  open,
  drawerContent = <DrawerContent open={open} />,
  rtlDrawerHeaderCloseIcon = <ChevronRightIcon />,
  ltrDrawerHeaderCloseIcon = <ChevronLeftIcon />,
  mainContent = <MainContent />,
  toolbarContent = <ToolbarContent />,
  menuIcon = <MenuIcon />,
  handleDrawerToggle,
}: Props) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar open={open} position="fixed">
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            color="inherit"
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
            onClick={handleDrawerToggle}
          >
            {menuIcon}
          </IconButton>
          {toolbarContent}
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={open}
        variant="persistent"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
          flexShrink: 0,
          width: drawerWidth,
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === "rtl"
              ? rtlDrawerHeaderCloseIcon
              : ltrDrawerHeaderCloseIcon}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {drawerContent}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {mainContent}
      </Main>
    </Box>
  );
}
