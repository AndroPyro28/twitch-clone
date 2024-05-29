import React from "react";
import ClerkProvider from "./clerk-provider";
import { ThemeProvider } from "./theme-provider";

interface IAppProviderProps {
  children: React.ReactNode;
}

const AppProvider: React.FC<IAppProviderProps> = ({ children }) => {
  return (
    <>
      <ClerkProvider>
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          storageKey="twitter-clone"
          
        >
          {children}
        </ThemeProvider>
      </ClerkProvider>
    </>
  );
};

export default AppProvider;
