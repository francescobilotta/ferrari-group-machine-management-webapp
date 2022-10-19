import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";

import DrawerContent from "./examples/DrawerContent";
import MainContent from "./examples/MainContent";
import ToolbarContent from "./examples/ToolbarContent";

const drawerWidth = 240;

type Props = {
  drawerContent?: React.ReactNode;
  mainContent?: React.ReactNode;
  toolbarContent?: React.ReactNode;
  open: boolean;
};

export default function ClippedDrawer({
  open,
  drawerContent = <DrawerContent open={open} />,
  mainContent = <MainContent />,
  toolbarContent = <ToolbarContent />,
}: Props) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>{toolbarContent}</Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          [`& .MuiDrawer-paper`]: {
            boxSizing: "border-box",
            width: drawerWidth,
          },
          flexShrink: 0,
          width: drawerWidth,
        }}
      >
        <Toolbar />
        {drawerContent}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Divider />
        {mainContent}
      </Box>
    </Box>
  );
}
