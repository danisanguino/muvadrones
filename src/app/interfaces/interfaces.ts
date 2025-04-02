import { ReactNode } from "react";

export interface ICompanyContext {
  companyId: string | null;
  setCompanyId: (id: string) => void;
};

export interface ICompanyProviderProps {
  children: ReactNode;
};

export interface ICompany {
  id: string;
  nombre: string;
};

export interface IUser {
  id: string;
  nombre?: string | null;
  email: string;
  rol: string;
  empresa_id: string;
};

export interface IProject {
  id: string;
  nombre: string;
  empresa_id: string;
  Miniatura: string;
  Modelo3D: string;
  NubePuntos: string;
  Ortomosaico: string;
  CurvasNivel: string;
  MDT: string;
  MDS: string;
  PlanoCAD: string;
};

export interface IFbxModel {
  url: string;
}
