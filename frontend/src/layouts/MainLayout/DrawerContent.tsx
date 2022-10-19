import {
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import * as React from "react";
import {
  Database as DatabaseIcon,
  List as ListIcon,
  PauseCircle as PauseCircleIcon,
  Plus as PlusIcon,
  Printer as PrinterIcon,
} from "react-feather";
import { Link as RouterLink } from "react-router-dom";

const style = {
  link: {
    color: "#000",
    textDecoration: "none",
  },
  nested: {
    pl: 2,
  },
};

type Props = {
  open?: boolean;
};

function DrawerContent({ open = true }: Props) {
  return (
    <List disablePadding component="div">
      <ListItem sx={{ marginTop: 3 }}>
        <ListItemIcon>
          <PrinterIcon />
        </ListItemIcon>
        <ListItemText primary="Macchine" />
      </ListItem>

      {open ? (
        <Link component={RouterLink} sx={{ ...style.link }} to="/">
          <ListItemButton sx={{ ...style.nested }}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard macchine" />
          </ListItemButton>
        </Link>
      ) : undefined}

      <ListItem sx={{ marginTop: 3 }}>
        <ListItemIcon>
          <DatabaseIcon />
        </ListItemIcon>
        <ListItemText primary="Avanzamenti" />
      </ListItem>

      {open ? (
        <>
          <Link
            component={RouterLink}
            sx={{ ...style.link }}
            to="/progresses-dashboard"
          >
            <ListItemButton sx={{ ...style.nested }}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard avanzamenti" />
            </ListItemButton>
          </Link>
          <Link
            component={RouterLink}
            sx={{ ...style.link }}
            to="/create-progress"
          >
            <ListItemButton sx={{ ...style.nested }}>
              <ListItemIcon>
                <PlusIcon />
              </ListItemIcon>
              <ListItemText primary="Creazione avanzamento" />
            </ListItemButton>
          </Link>
        </>
      ) : undefined}

      <ListItem sx={{ marginTop: 3 }}>
        <ListItemIcon>
          <PauseCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Fermi" />
      </ListItem>

      {open ? (
        <>
          <Link
            component={RouterLink}
            sx={{ ...style.link }}
            to="/stops-dashboard"
          >
            <ListItemButton sx={{ ...style.nested }}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard fermi" />
            </ListItemButton>
          </Link>
          <Link component={RouterLink} sx={{ ...style.link }} to="/create-stop">
            <ListItemButton sx={{ ...style.nested }}>
              <ListItemIcon>
                <PlusIcon />
              </ListItemIcon>
              <ListItemText primary="Crea fermo" />
            </ListItemButton>
          </Link>
        </>
      ) : undefined}

      {open ? (
        <Link
          component={RouterLink}
          sx={{ ...style.link }}
          to="/qtyprogressed-dashboard"
        >
          <ListItemButton sx={{ ...style.nested, marginTop: 3 }}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard qta avanzate" />
          </ListItemButton>
        </Link>
      ) : undefined}

      {open ? (
        <Link
          component={RouterLink}
          sx={{ ...style.link }}
          to="/qtydiscarded-dashboard"
        >
          <ListItemButton sx={{ ...style.nested, marginTop: 3 }}>
            <ListItemIcon>
              <ListIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard qta scartate" />
          </ListItemButton>
        </Link>
      ) : undefined}
    </List>
  );
}

export default DrawerContent;