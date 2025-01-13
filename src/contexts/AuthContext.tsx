import React, { createContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
    loading: boolean;
    logined: boolean;
    userData: any;
    setUserData: React.Dispatch<React.SetStateAction<any>>;
    setLogined: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
    loading: false,
    logined: false,
    userData: null,
    setUserData: () => { },
    setLogined: () => { },
});

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [loading, setLoading] = useState<boolean>(false);
    const [logined, setLogined] = useState<boolean>(false);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if (token) {
            setLogined(true);
            setUserData(JSON.parse(user!));
        } else {
            setLogined(false);
        }

    }, []);

    return (
        <AuthContext.Provider value={{ userData, setUserData, loading, logined, setLogined }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
