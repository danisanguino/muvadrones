"use client";

import { withAuth } from "@/utils/withAuth";

const AdminPage = () => {
  return <h1>🛠️ Panel de Administración 🚀</h1>;
};

export default withAuth(["admin_empresa"])(AdminPage); // ✅ Debe ser EXACTAMENTE así
