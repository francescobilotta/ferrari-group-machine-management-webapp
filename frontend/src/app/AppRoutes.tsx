import { LinearProgress } from "@mui/material";
import React, { Suspense } from "react";
import { /* Navigate, */ Route, Routes } from "react-router-dom";

import { Admin, Main, NotFound } from "../pages";
import { NotFoundDefaultContent } from "../views";
import MachinePageContent from "../views/MachinePageContent";

const MachineDashboardContent = React.lazy(
  () => import("../views/MachineDashboardContent")
);
const OpeningsCreatePageContent = React.lazy(
  () => import("../views/OpeningsCreatePageContent")
);
const OpeningsDashboardContent = React.lazy(
  () => import("../views/OpeningsDashboardContent")
);
const ProgressCreatePageContent = React.lazy(
  () => import("../views/ProgressCreatePageContent")
);
const ProgressesDashboardContent = React.lazy(
  () => import("../views/ProgressesDashboardContent")
);
const StopCreatePageContent = React.lazy(
  () => import("../views/StopCreatePageContent")
);
const StopsDashboardContent = React.lazy(
  () => import("../views/StopsDashboardContent")
);
const QtyDiscardedDashboardContent = React.lazy(
  () => import("../views/QtyDiscardedDashboardContent")
);
const QtyProgressedDashboardContent = React.lazy(
  () => import("../views/QtyProgressedDashboardContent")
);

function AppRoutes() {
  return (
    <Routes>
      <Route path="/">
        <Route
          path=""
          element={
            <Main>
              <Suspense
                fallback={<LinearProgress style={{ margin: "10rem" }} />}
              >
                <MachineDashboardContent />
              </Suspense>
            </Main>
          }
        />
        <Route
          path=":machineCode"
          element={
            <Main>
              <Suspense
                fallback={<LinearProgress style={{ margin: "10rem" }} />}
              >
                <MachinePageContent />
              </Suspense>
            </Main>
          }
        />
      </Route>
      <Route
        path="/progresses-dashboard"
        element={
          <Main>
            <Suspense fallback={<LinearProgress style={{ margin: "10rem" }} />}>
              <ProgressesDashboardContent />
            </Suspense>
          </Main>
        }
      />
      <Route
        path="/create-progress"
        element={
          <Main>
            <Suspense fallback={<LinearProgress style={{ margin: "10rem" }} />}>
              <ProgressCreatePageContent />
            </Suspense>
          </Main>
        }
      />
      <Route
        path="/stops-dashboard"
        element={
          <Main>
            <Suspense fallback={<LinearProgress style={{ margin: "10rem" }} />}>
              <StopsDashboardContent />
            </Suspense>
          </Main>
        }
      />
      <Route
        path="/create-stop"
        element={
          <Main>
            <Suspense fallback={<LinearProgress style={{ margin: "10rem" }} />}>
              <StopCreatePageContent />
            </Suspense>
          </Main>
        }
      />
      <Route
        path="/qtydiscarded-dashboard"
        element={
          <Main>
            <Suspense fallback={<LinearProgress style={{ margin: "10rem" }} />}>
              <QtyDiscardedDashboardContent />
            </Suspense>
          </Main>
        }
      />
      <Route
        path="/qtyprogressed-dashboard"
        element={
          <Main>
            <Suspense fallback={<LinearProgress style={{ margin: "10rem" }} />}>
              <QtyProgressedDashboardContent />
            </Suspense>
          </Main>
        }
      />
      <Route path="/admin">
        <Route
          path=""
          element={
            <Admin>
              <Suspense
                fallback={<LinearProgress style={{ margin: "10rem" }} />}
              >
                <MachineDashboardContent />
              </Suspense>
            </Admin>
          }
        />
        <Route
          path=":machineCode"
          element={
            <Admin>
              <Suspense
                fallback={<LinearProgress style={{ margin: "10rem" }} />}
              >
                <MachinePageContent />
              </Suspense>
            </Admin>
          }
        />
        <Route
          path="openings-dashboard"
          element={
            <Admin>
              <Suspense
                fallback={<LinearProgress style={{ margin: "10rem" }} />}
              >
                <OpeningsDashboardContent />
              </Suspense>
            </Admin>
          }
        />
        <Route
          path="create-openings"
          element={
            <Admin>
              <Suspense
                fallback={<LinearProgress style={{ margin: "10rem" }} />}
              >
                <OpeningsCreatePageContent />
              </Suspense>
            </Admin>
          }
        />
        <Route
          path="progresses-dashboard"
          element={
            <Admin>
              <Suspense
                fallback={<LinearProgress style={{ margin: "10rem" }} />}
              >
                <ProgressesDashboardContent />
              </Suspense>
            </Admin>
          }
        />
        <Route
          path="create-progress"
          element={
            <Admin>
              <Suspense
                fallback={<LinearProgress style={{ margin: "10rem" }} />}
              >
                <ProgressCreatePageContent />
              </Suspense>
            </Admin>
          }
        />
        <Route
          path="stops-dashboard"
          element={
            <Admin>
              <Suspense
                fallback={<LinearProgress style={{ margin: "10rem" }} />}
              >
                <StopsDashboardContent />
              </Suspense>
            </Admin>
          }
        />
        <Route
          path="create-stop"
          element={
            <Admin>
              <Suspense
                fallback={<LinearProgress style={{ margin: "10rem" }} />}
              >
                <StopCreatePageContent />
              </Suspense>
            </Admin>
          }
        />
        <Route
          path="qtydiscarded-dashboard"
          element={
            <Admin>
              <Suspense
                fallback={<LinearProgress style={{ margin: "10rem" }} />}
              >
                <QtyDiscardedDashboardContent />
              </Suspense>
            </Admin>
          }
        />
        <Route
          path="qtyprogressed-dashboard"
          element={
            <Admin>
              <Suspense
                fallback={<LinearProgress style={{ margin: "10rem" }} />}
              >
                <QtyProgressedDashboardContent />
              </Suspense>
            </Admin>
          }
        />
      </Route>
      <Route
        path="/not-found"
        element={
          <NotFound>
            <NotFoundDefaultContent />
          </NotFound>
        }
      />
      {/* <Route element={<Navigate to="not-found" />} path="*" /> */}
    </Routes>
  );
}

export default AppRoutes;
