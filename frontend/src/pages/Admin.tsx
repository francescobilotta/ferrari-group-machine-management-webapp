import * as React from "react";

import { AdminLayout } from "../layouts";

type Props = {
  children?: React.ReactNode;
};

function Admin({ children = undefined }: Props) {
  return <AdminLayout title="Pannello Admin">{children}</AdminLayout>;
}

export default Admin;
