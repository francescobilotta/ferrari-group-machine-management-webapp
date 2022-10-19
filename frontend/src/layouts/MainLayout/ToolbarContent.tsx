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
        href="/"
        style={{ textDecoration: "none" }}
        sx={{ ...style.link, flexGrow: 1 }}
      >
        {!mobileDevice && "Macchine"}
      </Link>
      <Link
        href="/progresses-dashboard"
        style={{ textDecoration: "none" }}
        sx={{ ...style.link, flexGrow: 1 }}
      >
        {!mobileDevice && "Avanzamenti"}
      </Link>
      <Link
        href="/stops-dashboard"
        style={{ textDecoration: "none" }}
        sx={{ ...style.link, flexGrow: 1 }}
      >
        {!mobileDevice && "Fermi"}
      </Link>
      <Link
        href="/qtyprogressed-dashboard"
        style={{ textDecoration: "none" }}
        sx={{ ...style.link, flexGrow: 1 }}
      >
        {!mobileDevice && "Qta Avanzate"}
      </Link>
      <Link
        href="/qtydiscarded-dashboard"
        style={{ textDecoration: "none" }}
        sx={{ ...style.link, flexGrow: 1 }}
      >
        {!mobileDevice && "Qta Scartate"}
      </Link>
    </>
  );
}

export default ToolbarContent;
