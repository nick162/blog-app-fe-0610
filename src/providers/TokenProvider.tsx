"use client";

import { useAuthStore } from "@/store/auth";
import { fromUnixTime, isAfter } from "date-fns";
import { FC, PropsWithChildren, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Harus di-import

interface JwtPayload {
  exp: number;
}

const TokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const { accessToken, clearAuth } = useAuthStore();

  useEffect(() => {
    const checkTokenValidity = () => {
      try {
        if (accessToken) {
          const decodedToken = jwtDecode<JwtPayload>(accessToken);
          const tokenExpiry = fromUnixTime(decodedToken.exp);

          if (isAfter(new Date(), tokenExpiry)) {
            clearAuth();
          }
        }
      } catch (error) {
        clearAuth();
      }
    };

    const interval = setInterval(checkTokenValidity, 1500);

    return () => clearInterval(interval);
  }, [accessToken, clearAuth]); // kasih dependency array

  return <>{children}</>;
};

export default TokenProvider;
