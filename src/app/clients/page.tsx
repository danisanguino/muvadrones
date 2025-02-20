"use client";

import { withAuth } from "@/utils/withAuth";

const ClientsPage = () => {
  return <h1>Panel de clientes 🛡️</h1>;
};

export default withAuth(["cliente"])(ClientsPage);