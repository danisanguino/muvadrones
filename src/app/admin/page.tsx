"use client";

import { withAuth } from "@/utils/withAuth";

function AdminPage() {
  return <h1>Panel de administración</h1>;
}

export default withAuth(["admin_empresa"])(AdminPage);