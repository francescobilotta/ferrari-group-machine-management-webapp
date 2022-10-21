import { Link, useMediaQuery } from "@mui/material";
import * as React from "react";

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
        href="/admin"
        style={{ textDecoration: "none" }}
        sx={{ ...style.link, flexGrow: 1 }}
      >
        {!mobileDevice && "Macchine"}
      </Link>
      <Link
        href="/admin/openings-dashboard"
        style={{ textDecoration: "none" }}
        sx={{ ...style.link, flexGrow: 1 }}
      >
        {!mobileDevice && "Aperture"}
      </Link>
      <Link
        href="/admin/progresses-dashboard"
        style={{ textDecoration: "none" }}
        sx={{ ...style.link, flexGrow: 1 }}
      >
        {!mobileDevice && "Avanzamenti"}
      </Link>
      <Link
        href="/admin/stops-dashboard"
        style={{ textDecoration: "none" }}
        sx={{ ...style.link, flexGrow: 1 }}
      >
        {!mobileDevice && "Fermi"}
      </Link>
      <Link
        href="/admin/qtyprogressed-dashboard"
        style={{ textDecoration: "none" }}
        sx={{ ...style.link, flexGrow: 1 }}
      >
        {!mobileDevice && "Qta Avanzate"}
      </Link>
      <Link
        href="/admin/qtydiscarded-dashboard"
        style={{ textDecoration: "none" }}
        sx={{ ...style.link, flexGrow: 1 }}
      >
        {!mobileDevice && "Qta Scartate"}
      </Link>
    </>
  );
}

export default ToolbarContent;
