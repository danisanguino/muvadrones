import { CompanyProvider } from "./context/companyContext"; // Asegúrate de importar correctamente el contexto
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CompanyProvider> 
          {children}
        </CompanyProvider>
      </body>
    </html>
  );
}
