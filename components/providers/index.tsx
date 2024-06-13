import React from "react";
import ClerkProvider from "./clerk-provider";
import { ThemeProvider } from "./theme-provider";
import SonnerProvider from "./sonner-provider";

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
          storageKey="twitch-clone"
          
        >
          <SonnerProvider />
          {children}
        </ThemeProvider>
      </ClerkProvider>
    </>
  );
};

export default AppProvider;
