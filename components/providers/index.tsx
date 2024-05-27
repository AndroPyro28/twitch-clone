import React from "react";
import ClerkProvider from "./ClerkProvider";
import { ThemeProvider } from "./ThemeProvider";

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
