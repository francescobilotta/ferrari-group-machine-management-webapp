import { Link, useMediaQuery } from "@mui/material";
import * as React from "react";
import { Link as RouterLink } from "react-router-dom";

const style = {
  link: {
    color: "#fff",
    fontWeight: 800,
    textDecoration: "none",
  },
};

function ToolbarContent() {
  const mobileDevice = useMediaQuery("(max-width:650px)");

  return (
    <>
      <Link
        component={RouterLink}
        style={{ textDecoration: "none" }}
        sx={{ ...style.link, flexGrow: 1 }}
        to="/admin"
      >
        {!mobileDevice && "Macchine"}
      </Link>
      <Link
        component={RouterLink}
        style={{ textDecoration: "none" }}
        sx={{ ...style.link, flexGrow: 1 }}
        to="/admin/openings-dashboard"
      >
        {!mobileDevice && "Aperture"}
      </Link>
      <Link
        component={RouterLink}
        style={{ textDecoration: "none" }}
        sx={{ ...style.link, flexGrow: 1 }}
        to="/admin/progresses-dashboard"
      >
        {!mobileDevice && "Avanzamenti"}
      </Link>
      <Link
        component={RouterLink}
        style={{ textDecoration: "none" }}
        sx={{ ...style.link, flexGrow: 1 }}
        to="/admin/stops-dashboard"
      >
        {!mobileDevice && "Fermi"}
      </Link>
      <Link
        component={RouterLink}
        style={{ textDecoration: "none" }}
        sx={{ ...style.link, flexGrow: 1 }}
        to="/admin/qtyprogressed-dashboard"
      >
        {!mobileDevice && "Qta Avanzate"}
      </Link>
      <Link
        component={RouterLink}
        style={{ textDecoration: "none" }}
        sx={{ ...style.link, flexGrow: 1 }}
        to="/admin/qtydiscarded-dashboard"
      >
        {!mobileDevice && "Qta Scartate"}
      </Link>
    </>
  );
}

export default ToolbarContent;
