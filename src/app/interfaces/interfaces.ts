import { ReactNode } from "react";

export interface ICompanyContext {
  companyId: string | null;
  setCompanyId: (id: string) => void;
}

export interface ICompanyProviderProps {
  children: ReactNode;
}