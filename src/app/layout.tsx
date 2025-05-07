import { CompanyProvider } from "./context/companyContext"; 
import { ReactNode } from "react";
import "../css/styles.css";

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
