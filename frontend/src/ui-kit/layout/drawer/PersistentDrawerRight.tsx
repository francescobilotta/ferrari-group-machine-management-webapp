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
  marginRight: -drawerWidth,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.sharp,
  }),
  ...(open && {
    marginRight: 0,
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
    marginRight: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  alignItems: "center",
  display: "flex",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

type Props = {
  drawerContent?: React.ReactNode;
  drawerHeaderOpenIcon?: React.ReactNode;
  drawerHeaderCloseIcon?: React.ReactNode;
  menuIcon?: React.ReactNode;
  mainContent?: React.ReactNode;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  toolbarContent?: React.ReactNode;
  open: boolean;
};

export default function PersistentDrawerRight({
  open,
  drawerContent = <DrawerContent open={open} />,
  drawerHeaderOpenIcon = <ChevronRightIcon />,
  drawerHeaderCloseIcon = <ChevronLeftIcon />,
  mainContent = <MainContent />,
  toolbarContent = <ToolbarContent />,
  menuIcon = <MenuIcon />,
  handleDrawerOpen,
  handleDrawerClose,
}: Props) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar open={open} position="fixed">
        <Toolbar>
          {toolbarContent}
          <IconButton
            aria-label="open drawer"
            color="inherit"
            edge="end"
            sx={{ ...(open && { display: "none" }) }}
            onClick={handleDrawerOpen}
          >
            {menuIcon}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        {mainContent}
      </Main>
      <Drawer
        anchor="right"
        open={open}
        variant="persistent"
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
          flexShrink: 0,
          width: drawerWidth,
        }}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl"
              ? drawerHeaderOpenIcon
              : drawerHeaderCloseIcon}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {drawerContent}
      </Drawer>
    </Box>
  );
}
