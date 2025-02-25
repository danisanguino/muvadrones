"use client"

import { createContext, use, useState } from "react";
import { ICompanyContext, ICompanyProviderProps } from '../interfaces/interfaces';


//Create context
const CompanyContext = createContext<ICompanyContext | undefined>(undefined);

//Create provider
const CompanyProvider = ({ children }: ICompanyProviderProps) => {

  const [companyId, setCompanyId] = useState<string | null>(null);

  return (
    <CompanyContext.Provider value={{ companyId, setCompanyId }}>
      {children}
    </CompanyContext.Provider>
  );
};

//Create hook
export const useCompany = () => {
  const context = use(CompanyContext);
  if(!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};

export { CompanyProvider };