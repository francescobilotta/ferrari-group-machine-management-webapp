/* eslint-disable react/require-default-props */
import { Box, SxProps, Theme } from "@mui/material";
import * as React from "react";
import { Helmet } from "react-helmet";

import PersistentDrawerLeft from "../../ui-kit/layout/drawer/PersistentDrawerLeft";
import { booleanToggle } from "../../ui-kit/utils";
import DrawerContent from "./DrawerContent";
import ToolbarContent from "./ToolbarContent";

const style = {
  root: {
    backgroundColor: (theme: Theme) => theme.palette.background.default,
    display: "flex",
    height: "100%",
    width: "100%",
  },
};

type Props = {
  children?: React.ReactNode;
  title?: string;
  sx?: SxProps<Theme>;
  drawerContent?: (open: boolean) => React.ReactNode;
  toolbarContent?: React.ReactNode;
  rtlDrawerHeaderCloseIcon?: React.ReactNode;
  ltrDrawerHeaderCloseIcon?: React.ReactNode;
  menuIcon?: React.ReactNode;
};

const MainLayout = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      children = undefined,
      title = "",
      sx = undefined,
      drawerContent = (open: boolean) => <DrawerContent open={open} />,
      toolbarContent = <ToolbarContent />,
      rtlDrawerHeaderCloseIcon = undefined,
      ltrDrawerHeaderCloseIcon = undefined,
      menuIcon = undefined,
    }: Props,
    ref
  ) => {
    const [open, setOpen] = React.useState(true);

    return (
      <Box ref={ref as any} sx={{ ...style.root, ...sx }}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <PersistentDrawerLeft
          drawerContent={drawerContent(open)}
          handleDrawerToggle={() => booleanToggle(open, setOpen)}
          ltrDrawerHeaderCloseIcon={ltrDrawerHeaderCloseIcon}
          mainContent={children}
          menuIcon={menuIcon}
          open={open}
          rtlDrawerHeaderCloseIcon={rtlDrawerHeaderCloseIcon}
          toolbarContent={toolbarContent}
        />
      </Box>
    );
  }
);

export default MainLayout;
