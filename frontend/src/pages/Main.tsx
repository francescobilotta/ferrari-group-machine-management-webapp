import * as React from "react";

import { MainLayout } from "../layouts";

type Props = {
  children?: React.ReactNode;
};

function Main({ children = undefined }: Props) {
  return <MainLayout title="Machine Management Webapp">{children}</MainLayout>;
}

export default Main;
