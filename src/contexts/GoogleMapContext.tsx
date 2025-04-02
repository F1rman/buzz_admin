import { useLoadScript } from "@react-google-maps/api";
import React, { createContext, useEffect, useState, ReactNode } from "react";

interface GoogleContextProps {
  load: boolean;
  isError: Error | null;
}

const GoogleContext = createContext<GoogleContextProps>({
  load: false,
  isError: null,
});

const libraries: ("places")[] = ["places"];

interface GoogleMapProviderProps {
  children: ReactNode;
}

export function GoogleMapProvider({ children }: GoogleMapProviderProps) {
  const [load, setLoad] = useState<boolean>(false);
  const [isError, setIsError] = useState<Error | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || "",
    libraries,
  });

  useEffect(() => {
    if (isLoaded) {
      setLoad(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (loadError) {
      setIsError(loadError);
    }
  }, [loadError]);
  
  return (
    <GoogleContext.Provider value={{ load, isError }}>
      {children}
    </GoogleContext.Provider>
  );
}

export default GoogleContext;
