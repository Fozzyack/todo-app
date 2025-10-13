import { createContext, useContext } from "react";

export const RefreshTokenContext = createContext<
    RefreshTokenContextType | undefined
>(undefined);

export const useRefreshTokenContext = () => {
    const context = useContext(RefreshTokenContext);
    if (!context) {
        throw new Error(
            "Trying to Use Context outside of RefreshToken Provider"
        );
    }
    return context;
};
